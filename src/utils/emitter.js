import EventEmitter from 'events'; //event tu nodejs

const _emitter = new EventEmitter();
_emitter.setMaxListeners(0)//unlimit listener

export const emitter = _emitter;