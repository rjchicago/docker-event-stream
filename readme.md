# docker-event-stream

A simple, lightweight, zero-dependency [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter) for [Docker Events](https://docs.docker.com/engine/reference/commandline/events/).

## installation

``` sh
npm install @rjchicago/docker-event-stream --save
```

## use

Save an example file `index.js`

``` javascript
const DockerEventStream = require('@rjchicago/docker-event-stream');

DockerEventStream.init();
DockerEventStream.on('event', console.log);
```

In one shell, run the above app:

``` sh
node index.js
```

In another shell, test an event:

``` sh
docker run --rm -it alpine:3.15 sh
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

## docker-compose

When running Node.js inside of Docker, you need map the docker socket under volumes in your docker-compose.yml:

``` yaml
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
```

> See [docker](./examples/docker) under [examples](./examples)

## contribution

Please do! Open a pull request with your code or idea and let's chat!

## license

### The MIT License (MIT)

Copyright 2022 Ryan T. Jones

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
