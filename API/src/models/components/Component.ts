import mongoose, { Schema } from 'mongoose';
import { IComponent } from '../../types/models';

const componentSchema = new Schema<IComponent>(
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
	{ discriminatorKey: 'componentType' }
);

export default mongoose.model<IComponent>('Component', componentSchema);
