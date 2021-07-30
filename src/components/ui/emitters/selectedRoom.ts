import EventEmitter from 'eventemitter3';
import { Room } from '../../../graphql';

const emitter = new EventEmitter();

const SelectedRoom = {
	on: (event: any, fn: (room: Room) => void) => emitter.on(event, fn),
	once: (event: any, fn: (...args: any[]) => void) => emitter.once(event, fn),
	off: (event: any, fn?: ((...args: any[]) => void) | undefined) =>
		emitter.off(event, fn),
	emit: (event: any, payload: Room) => emitter.emit(event, payload)
};

Object.freeze(SelectedRoom);

export default SelectedRoom;
