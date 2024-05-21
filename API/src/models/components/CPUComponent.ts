import { Schema } from 'mongoose';
import { ICPUComponent } from '../../types/models';
import Component from './Component';

const CPUComponent = new Schema<ICPUComponent>({
	family: { type: String, required: true },
	series: { type: String, required: true },
	generation: { type: String, required: true },
	architecture: { type: String, required: true },
	cores: { type: Number, required: true },
	threads: { type: Number, required: true },
	baseClock: { type: Number, required: true },
	boostClock: { type: Number, required: true },
	tdp: { type: Number, required: true },
	socket: { type: String, required: true },
	technologie: { type: Number, required: true },
	integratedGraphics: {
		name: { type: String },
		brand: { type: String },
		generation: { type: String },
		architecture: { type: String },
		baseClock: { type: Number },
		boostClock: { type: Number },
	},
	cache: {
		l1: { type: String },
		l2: { type: String },
		l3: { type: String },
	},
	hyperthreading: { type: Boolean, required: true },
	pcieSupport: { type: String, required: true },
	maxPcieLanes: { type: Number, required: true },
	virtualisationSupport: { type: Boolean, required: true },
});

export default Component.discriminator('CPU', CPUComponent);
