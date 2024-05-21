export enum ComponentType {
	CPU = 'CPU',
	GPU = 'GPU',
	RAM = 'RAM',
}

export interface Component {
	brand: string;
	name: string;
	componentType: ComponentType;
	images: string[];
}

export interface CPUComponent extends Component {
	family: string;
	series: string;
	generation: string;
	architecture: string;
	cores: number;
	threads: number;
	baseClock: number; // in MHz
	boostClock: number; // in MHz
	tdp: number; // in Watt
	socket: string;
	technologie: number; // in nm
	integratedGraphics?: {
		name: string;
		brand: string;
		generation: string;
		architecture: string;
		baseClock: number; // in MHz
		boostClock: number; // in MHz
	};
	cache?: {
		l1: string; // in kb
		l2: string; // in kb
		l3: string; // in kb
	};
	hyperthreading: boolean;
	pcieSupport: string;
	maxPcieLanes: number;
	virtualisationSupport: boolean;
}

export interface GPUComponent extends Component {
	family: string;
	series: string;
	generation: string;
	architecture: string;
	baseClock: number; // in MHz
	boostClock: number; // in MHz
	vram: number; // in MB
	memoryType: string;
	memorySpeed: number; // in MB
	tdp: number;
	busWidth: number; // in bits
	pcieSupport: string;
	maxPcieLanes: number;
	computeCores: number;
	virtualisationSupport: boolean;
}

export interface RAMComponent extends Component {
	series: string;
	memoryType: string;
	formFactor: 'DIMM' | 'SO-DIMM' | 'MicroDIMM' | 'Mini-DIMM';
	eccSupport: boolean;
	baseClock: number; // in Mhz
	memorySpeed: number; // in MT/s
	casLatency: string;
	voltage: number; // in volts
}
