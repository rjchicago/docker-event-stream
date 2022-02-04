const DockerEventStream = require('../DockerEventStream');

DockerEventStream.init();
DockerEventStream.on('event', console.log);
