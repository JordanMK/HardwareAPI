import mongoose, { Schema } from 'mongoose';
import { IComponent } from '../../types/models';

const componentSchema = new Schema<IComponent>({
	brand: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	componentType: {
		type: String,
		required: true,
	},
	images: {
		type: [String],
		required: true,
	},
});

export default mongoose.model<IComponent>('Component', componentSchema);
