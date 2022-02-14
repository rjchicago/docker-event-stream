# docker-event-stream

A simple, lightweight, zero-dependency [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter) for [Docker Events](https://docs.docker.com/engine/reference/commandline/events/).

## installation

``` sh
npm install @rjchicago/docker-event-stream --save
```

## init

Call `DockerEventStream.init()` to initialize. By default, `DockerEventStream` will emit **all** events for both scopes `local` and `swarm`.

You may pass `options` in the init call to connect a remote host, limit or filter events.

``` js
const options = {
  host: $HOST, // hostname or IP
  port: $PORT, // i.e. 2375
  since: $SINCE, // i.e. '10s'
  filter: {
    $FILTER1_KEY: $FILTER1_VALUE, // i.e. scope: 'local'
    $FILTER2_KEY: $FILTER2_VALUE, // i.e. type: 'container'
    $FILTER3_KEY: [ $FILTER3_VALUE1, $FILTER3_VALUE2 ] // i.e. event: [ 'start', 'die' ]
  }
}
```

## use

In this demo, we'll use the default configuration and log all events to console.

Demo `index.js`:

``` javascript
const DockerEventStream = require('@rjchicago/docker-event-stream');

DockerEventStream.init();
DockerEventStream.on('event', console.log);
```

To bring up our demo app, run the following...

``` sh
# create demo folder
mkdir docker-event-stream-demo
cd docker-event-stream-demo

# init
npm init -y
npm install -s @rjchicago/docker-event-stream

# create demo index.js
echo "const DockerEventStream = require('@rjchicago/docker-event-stream');
DockerEventStream.init();
DockerEventStream.on('event', console.log);" > index.js

# run demo
node index.js
```

Next, in another shell, test an event:

``` sh
docker run --rm alpine echo "hello"
```

In the application shell, you will see the stream of docker events...

``` js
{
  status: 'create',
  id: 'd5af2dc4f43d6866bd2a8991a0584268ac5aad94b7014ff5c5dfa2f1259037bd',
  from: 'alpine:3.15',
  Type: 'container',
  Action: 'create',
  Actor: {
    ID: 'd5af2dc4f43d6866bd2a8991a0584268ac5aad94b7014ff5c5dfa2f1259037bd',
    Attributes: { image: 'alpine:3.15', name: 'random_name' }
  },
  scope: 'local',
  time: 1643984948,
  timeNano: 1643984948954996500
}
```

## options

### since

See [Docker Events docs](https://docs.docker.com/engine/reference/commandline/events/#limiting-filtering-and-formatting-the-output)

* `since` can be Unix timestamps, date formatted timestamps, or Go duration strings (e.g. 10m, 1h30m).
* if you do not provide the `since` option, only new and/or live events will be emitted.

### filtering

See [Docker Events docs](https://docs.docker.com/engine/reference/commandline/events/#limiting-filtering-and-formatting-the-output)

> The currently supported filters are:
>  
> * config (config=`name or id`)
> * container (container=`name or id`)
> * daemon (daemon=`name or id`)
> * event (event=`event action`)
> * image (image=`repository or tag`)
> * label (label=`key` or label=`key`=`value`)
> * network (network=`name or id`)
> * node (node=`id`)
> * plugin (plugin=`name or id`)
> * scope (scope=`local or swarm`)
> * secret (secret=`name or id`)
> * service (service=`name or id`)
> * type (type=`container or image or volume or network or daemon or plugin or service or node or secret or config`)
> * volume (volume=`name`)

NOTE:

> * using the same filter multiple times will be handled as `OR`.
> * using multiple filters will be handled as `AND`.

#### example

The following will listen on "local" events since "30s" ago from containers "foo" `OR` "bar" only:

``` js
const options = {
  since: 30s,
  filter: {
    scope: 'local',
    container: ['foo', 'bar']
  }
}
```

## docker-compose

When running Node.js inside of Docker, you need map the docker socket under volumes in your docker-compose.yml:

``` yaml
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
```

> See [docker](./examples/docker) under [examples](./examples)

## publish

Increment the package version and commit with the follow message format:

> `Release ${VERSION}`

The Github Actions Workflow is automated using [publish-to-npm](https://github.com/marketplace/actions/publish-to-npm)

## contribution

Please do! Open a pull request with your code or idea and let's chat!

## license

### The MIT License (MIT)

Copyright 2022 Ryan T. Jones

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[![GitHub Super-Linter](https://github.com/<OWNER>/<REPOSITORY>/workflows/Lint%20Code%20Base/badge.svg)](https://github.com/marketplace/actions/super-linter)
