import { Schema } from 'mongoose';
import { ComponentType, IGPUComponent } from '../../types/models';
import Component from './Component';

const GPUComponent = new Schema<IGPUComponent>({
	family: { type: String, required: true },
	series: { type: String, required: true },
	generation: { type: String, required: true },
	architecture: { type: String, required: true },
	baseClock: { type: Number, required: true },
	boostClock: { type: Number, required: true },
	vram: { type: Number, required: true },
	memoryType: { type: String, required: true },
	memorySpeed: { type: Number, required: true },
	tdp: { type: Number, required: true },
	busWidth: { type: Number, required: true },
	pcieSupport: { type: String, required: true },
	maxPcieLanes: { type: Number, required: true },
	computeCores: { type: Number, required: true },
	virtualisationSupport: { type: Boolean, required: true },
});

export default Component.discriminator<IGPUComponent>(
	ComponentType.GPU,
	GPUComponent
);
