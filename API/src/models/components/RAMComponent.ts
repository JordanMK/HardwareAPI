import { Schema } from 'mongoose';
import { IRAMComponent } from '../../types/models';
import Component from './Component';

const RAMComponent = new Schema<IRAMComponent>({
	series: { type: String, required: true },
	memoryType: { type: String, required: true },
	formFactor: { type: String, required: true },
	eccSupport: { type: Boolean, required: true },
	baseClock: { type: Number, required: true },
	memorySpeed: { type: Number, required: true },
	casLatency: { type: String, required: true },
	voltage: { type: Number, required: true },
});

export default Component.discriminator<IRAMComponent>('RAM', RAMComponent);
