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
		name: {
			type: String,
			required: function () {
				return this.integratedGraphics;
			},
		},
		brand: {
			type: String,
			required: function () {
				return this.integratedGraphics;
			},
		},
		generation: {
			type: String,
			required: function () {
				return this.integratedGraphics;
			},
		},
		architecture: {
			type: String,
			required: function () {
				return this.integratedGraphics;
			},
		},
		baseClock: {
			type: Number,
			required: function () {
				return this.integratedGraphics;
			},
		},
		boostClock: {
			type: Number,
			required: function () {
				return this.integratedGraphics;
			},
		},
	},
	cache: {
		l1: { type: String, required: true },
		l2: { type: String, required: true },
		l3: { type: String, required: true },
	},
	hyperthreading: { type: Boolean, required: true },
	pcieSupport: { type: String, required: true },
	maxPcieLanes: { type: Number, required: true },
	virtualisationSupport: { type: Boolean, required: true },
});

export default Component.discriminator('CPU', CPUComponent);
