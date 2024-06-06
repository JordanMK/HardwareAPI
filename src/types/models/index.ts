import { ObjectId } from 'mongoose';

export interface IComponent {
	id: ObjectId;
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
	technology: number; // in nm
	integratedGraphics?: {
		name: string;
		brand: string;
		generation: string;
		architecture: string;
		baseClock: number; // in MHz
		boostClock: number; // in MHz
	};
	cache: {
		l1: number; // in kb
		l2: number; // in kb
		l3: number; // in kb
	};
	hyperthreading: boolean;
	pcieSupport: string;
	maxPcieLanes: number;
	virtualisationSupport: boolean;
}

interface ICPUComponentQuery {
	id?: ObjectId;
	brand?: string;
	name?: string;
	family?: string;
	series?: string;
	generation?: string;
	architecture?: string;
	cores?: number;
	threads?: number;
	baseClock?: number; // in MHz
	boostClock?: number; // in MHz
	tdp?: number; // in Watt
	socket?: string;
	technology?: number; // in nm
	integratedGraphicsName?: string;
	integratedGraphicsBrand?: string;
	integratedGraphicsGeneration?: string;
	integratedGraphicsArchitecture?: string;
	integratedGraphicsBaseClock?: string;
	integratedGraphicsBoostClock?: string;
	cacheL1?: string;
	cacheL2?: string;
	cacheL3?: string;
	hyperthreading?: boolean;
	pcieSupport?: string;
	maxPcieLanes?: number;
	virtualisationSupport?: boolean;
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
	id: ObjectId;
	username: string;
	email: string;
	password: string;
	role: UserRole;
	refreshToken?: string;
}

export interface IUserMethods {
	generateAccessToken: () => string;
	generateRefreshToken: () => string;
}

export interface IDevice {
	id: ObjectId;
	brand: string;
	name: string;
	deviceType: DeviceType;
	images: string[];
}

export enum DeviceType {
	COMPUTER = 'Computer',
}

export interface IComputer {
	id: ObjectId;
	brand: string;
	name: string;
	images: string[];
	computerType: ComputerType;
	cpu: ICPUComponent;
	gpu?: IGPUComponent;
	ram: IComputerRAMComponents;
	ramModules: number;
	ramCapacity: number; // in GB
}

export enum ComputerType {
	DESKTOP = 'Desktop',
	LAPTOP = 'Laptop',
}

interface IComputerRAMComponents extends IRAMComponent {
	modules: number;
	capacity: number; // in GB
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
