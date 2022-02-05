const { spawn } = require('child_process');
const EventEmitter = require('events');

class DockerEventStream {
    static init = (options = {}) => {
        DockerEventStream.options = {};
        Object.assign(DockerEventStream.options, {since: '0s'}, options);
        DockerEventStream._eventEmitter = new EventEmitter();
        console.log(`DockerEventStream.init(${JSON.stringify(DockerEventStream.options, 1, 1)});`);
        DockerEventStream.listen();
    };

    static on = (type, listener) => {
        console.log(`DockerEventStream.on('${type}');`)
        DockerEventStream._eventEmitter.addListener(type, listener);
    };

    static get since() {
        const since = DockerEventStream._since || DockerEventStream.options.since || '0s';
        DockerEventStream._since = Math.floor(new Date().getTime() / 1000);
        return `--since ${since}`;
    };

    static get host() {
        return (DockerEventStream.options.host && DockerEventStream.options.port)
            ? `-H ${DockerEventStream.options.host}:${DockerEventStream.options.port}`
            : '';
    }

    static get format() {
        return '--format "{{json .}}"';
    }

    static get filter() {
        const formatFilter = (key, value) => `--filter "${key}=${value}"`;
        const filter = DockerEventStream.options.filter || {};
        return Object.keys(filter).map(key => {
            return Array.isArray(filter[key])
                ? filter[key].map(value => formatFilter(key, value)).join(' ')
                : formatFilter(key, filter[key]);
        }).join(' ') || '';
    }

    static parseJsonPerRow = (data) => {
        const rows = data.match(/^(.+)$/gm);
        if (rows === null) return [];
        return rows.map(JSON.parse);
    };

    static emit = (event) => {
        const {Type: type, Action: action} = event;
        DockerEventStream._eventEmitter.emit('event', event);
        DockerEventStream._eventEmitter.emit(type, event);
        DockerEventStream._eventEmitter.emit(`${type}.${action}`, event);
    }

    static onData = (data) => {
        const events = DockerEventStream.parseJsonPerRow(data);
        events.map(DockerEventStream.emit);
    };

    static onClose = (code) => {
        if (code) console.log(`docker events exited ${code}`);
        DockerEventStream.listen();
    };

    static listen = async () => {
        const child = spawn('docker', [ 
            DockerEventStream.host, 
            'events', 
            DockerEventStream.since, 
            DockerEventStream.format, 
            DockerEventStream.filter
        ], { shell: true });
        child.stderr.pipe(process.stderr);
        child.stdout.setEncoding('utf8');
        child.stdout.on('data', DockerEventStream.onData);
        child.on('close', DockerEventStream.onClose);
    };
}

module.exports = {
    init: DockerEventStream.init,
    on: DockerEventStream.on
};
