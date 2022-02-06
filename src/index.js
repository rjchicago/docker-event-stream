const DockerEventStream = require('./DockerEventStream');

DockerEventStream.init({
    filter: {
      scope: 'local',
      type: ['container'],
      container: ['foo', 'bar'],
      event: ['start', 'die']
    }
});
DockerEventStream.on('container.start', console.log);
DockerEventStream.on('container.die', console.log);
