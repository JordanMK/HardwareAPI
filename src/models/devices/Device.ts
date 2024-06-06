import mongoose, { Schema } from 'mongoose';
import { IDevice } from '../../types/models';

const componentSchema = new Schema<IDevice>(
	{
		brand: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		images: {
			type: [String],
			required: true,
		},
	},
	{ discriminatorKey: 'deviceType' }
);

export default mongoose.model<IDevice>('Device', componentSchema);
