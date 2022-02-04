const DockerEventStream = require('@rjchicago/docker-event-stream');

DockerEventStream.init();
DockerEventStream.on('event', console.log);
