import EventEmitter from 'eventemitter3';

const emitter = new EventEmitter();

const AddedRoom = {
	on: (event: any, fn: (...args: any[]) => void) => emitter.on(event, fn),
	once: (event: any, fn: (...args: any[]) => void) => emitter.once(event, fn),
	off: (event: any, fn?: ((...args: any[]) => void) | undefined) =>
		emitter.off(event, fn),
	emit: (event: any, payload: any) => emitter.emit(event, payload)
};

Object.freeze(AddedRoom);

export default AddedRoom;
