# docker-compose example

See sample [Dockerfile](./Dockerfile) and [docker-compose.yml](./docker-compose.yml).

``` sh
# build
docker-compose build

# run
docker-compose up
```

In another shell, run an example event...

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

``` sh
# cleanup
docker-compose down
```
