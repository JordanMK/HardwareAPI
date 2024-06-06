import { Schema } from 'mongoose';
import {
	ComponentType,
	ComputerType,
	DeviceType,
	IComputer,
} from '../../types/models';
import Device from './Device';

const Computer = new Schema<IComputer>({
	brand: { type: String, required: true },
	name: { type: String, required: true },
	computerType: {
		type: String,
		enum: Object.values(ComponentType),
		required: true,
	},
	images: { type: [String] },
	cpu: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: ComponentType.CPU,
	},
	gpu: { type: Schema.Types.ObjectId, ref: ComponentType.GPU },
	ram: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: ComponentType.RAM,
	},
	ramModules: { type: Number, required: true },
	ramCapacity: { type: Number, required: true },
});

export default Device.discriminator<IComputer>(DeviceType.COMPUTER, Computer);
