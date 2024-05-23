export interface IComponent {
	brand: string;
	name: string;
	componentType: ComponentType;
	images: string[];
}

export interface ICPUComponent extends IComponent {
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
	cache: {
		l1: string; // in kb
		l2: string; // in kb
		l3: string; // in kb
	};
	hyperthreading: boolean;
	pcieSupport: string;
	maxPcieLanes: number;
	virtualisationSupport: boolean;
}

export interface IGPUComponent extends IComponent {
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

export interface IRAMComponent extends IComponent {
	series: string;
	memoryType: string;
	formFactor: string;
	eccSupport: boolean;
	baseClock: number; // in Mhz
	memorySpeed: number; // in MT/s
	casLatency: string;
	voltage: number; // in volts
}

export interface IUser {
	id: string;
	username: string;
	email: string;
	password: string;
	role: UserRole;
}

export interface IUserMethods {
	generateAccessToken: () => string;
	generateRefreshToken: () => string;
}

export enum ComponentType {
	CPU = 'CPU',
	GPU = 'GPU',
	RAM = 'RAM',
}

export enum UserRole {
	ADMIN = 'admin',
	USER = 'user',
}
