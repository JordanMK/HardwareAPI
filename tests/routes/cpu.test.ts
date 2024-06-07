import assert from 'assert';
import Component from '../../src/models/components/Component';
import { server } from '.';
import CPU from '../../src/models/components/CPU';
import { randomInt } from 'crypto';

describe('GET /api/v1/components/:id', () => {
	it('should return 400 if the ID is invalid', async () => {
		const response = await server
			.get('/api/v1/components/invalid-id')
			.expect(400);
		assert.strictEqual(response.body.message, 'Invalid ID');
	});

	it('should return 404 if the component is not found', async () => {
		const response = await server
			.get('/api/v1/components/60d5ec49a7c5b452d88c7d2b')
			.expect(404);
		assert.strictEqual(response.body.message, 'Component not found');
	});

	it('should return a component if the ID is valid and component exists', async () => {
		const component = {
			id: '6650aa113e20478fcca9af8a',
		};

		Component.findById(component.id);

		const response = await server
			.get(`/api/v1/components/${component.id}`)
			.expect(200);

		assert.ok(Object.values(response.body).includes(component.id));
	});

	it('should return 400 if additional query parameters are provided', async () => {
		const response = await server
			.get('/api/v1/components/60d5ec49a7c5b452d88c7d2b?extra=true')
			.expect(400);
		assert.strictEqual(
			response.body.message,
			'This route does not allow additional query parameters'
		);
	});
});

describe('GET /api/v1/components/cpu', () => {
	it('should return cpu based on query', async () => {
		const components = [{ brand: 'Intel' }];

		const response = await server
			.get('/api/v1/components/cpu')
			.query({ brand: components[0].brand })
			.expect(200);
		assert(Array.isArray(response.body));
		assert(response.body.length >= 1);
		assert(response.body[0].brand === components[0].brand);
	});
});

describe('POST /api/v1/components/cpu', () => {
	it('should create a new CPU component', async () => {
		const newCPUComponent = {
			name: 'cpu' + randomInt(400),
			socket: 'Socket XYZ',
			architecture: 'string',
			baseClock: 3,
			boostClock: 4,
			tdp: 5,
			cores: 6,
			threads: 7,
			technology: 8,
			integratedGraphics: {
				name: 'string',
				brand: 'string',
				generation: 'string',
				architecture: 'string',
				baseClock: 0,
				boostClock: 1,
			},
			brand: 'Intel',
			series: 'String',
			generation: 'String',
			hyperthreading: true,
			pcieSupport: 'x16',
			maxPcieLanes: 16,
			virtualisationSupport: true,
			cache: {
				l1: 1,
				l2: 2,
				l3: 3,
			},
			family: 'String',
			images: [],
		};

		const response = await server
			.post('/api/v1/components/cpu')
			.set('Authorization', 'Bearer ' + process.env.TOKEN)
			.send(newCPUComponent)
			.expect(201);

		assert.strictEqual(response.body.name, newCPUComponent.name);
		assert.strictEqual(response.body.socket, newCPUComponent.socket);

		const cpuInDB = await CPU.findById(response.body._id);
		assert.deepStrictEqual(cpuInDB?.toObject().name, newCPUComponent.name);
	});

	it('should handle duplicate CPU component names', async () => {
		CPU.find({ name: 'New CPU' });

		const newCPUComponent = {
			name: 'cpu1',
			socket: 'Socket XYZ',
			architecture: 'string',
			baseClock: 3,
			boostClock: 4,
			tdp: 5,
			cores: 6,
			threads: 7,
			technology: 8,
			integratedGraphics: {
				name: 'string',
				brand: 'string',
				generation: 'string',
				architecture: 'string',
				baseClock: 0,
				boostClock: 1,
			},
			brand: 'Intel',
			series: 'String',
			generation: 'String',
			hyperthreading: true,
			pcieSupport: 'x16',
			maxPcieLanes: 16,
			virtualisationSupport: true,
			cache: {
				l1: 1,
				l2: 2,
				l3: 3,
			},
			family: 'String',
			images: [],
		};

		const response = await server
			.post('/api/v1/components/cpu')
			.set('Authorization', 'Bearer ' + process.env.TOKEN)
			.send(newCPUComponent)
			.expect(409);

		assert.strictEqual(response.body.message, 'This component already exists');
	});

	it('should handle server errors', async () => {
		CPU.create = async () => {
			throw new Error('Test error');
		};

		const newCPUComponent = {
			name: 'cpu' + randomInt(400),
			socket: 'Socket XYZ',
			architecture: 'string',
			baseClock: 3,
			boostClock: 4,
			tdp: 5,
			cores: 6,
			threads: 7,
			technology: 8,
			integratedGraphics: {
				name: 'string',
				brand: 'string',
				generation: 'string',
				architecture: 'string',
				baseClock: 0,
				boostClock: 1,
			},
			brand: 'Intel',
			series: 'String',
			generation: 'String',
			hyperthreading: true,
			pcieSupport: 'x16',
			maxPcieLanes: 16,
			virtualisationSupport: true,
			cache: {
				l1: 1,
				l2: 2,
				l3: 3,
			},
			family: 'String',
			images: [],
		};

		const response = await server
			.post('/api/v1/components/cpu')
			.set('Authorization', 'Bearer ' + process.env.TOKEN)
			.send(newCPUComponent)
			.expect(500);

		assert.strictEqual(response.body.message, 'Test error');
	});
});
