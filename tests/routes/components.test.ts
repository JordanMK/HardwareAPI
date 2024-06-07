import assert from 'assert';
import { app } from '../../src/server'; // Adjust the import path accordingly
import Component from '../../src/models/components/Component';
import { ComponentType } from '../../src/types/models';
import mongoose from 'mongoose';
import { server } from '.';

describe('GET /api/v1/components/componentTypes', () => {
	it('should return all component types', async () => {
		const response = await server
			.get('/api/v1/components/componentTypes')
			.expect(200);
		assert(Array.isArray(response.body));
		assert.equal(
			response.body.toString(),
			Object.values(ComponentType).toString()
		);
	});
});

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

describe('GET /api/v1/components', () => {
	it('should return components based on query', async () => {
		const components = [{ name: 'Fury Beast' }, { name: 'Intel UHD Graphics' }];

		const response = await server
			.get('/api/v1/components')
			.query({ name: components[0].name })
			.expect(200);
		assert(Array.isArray(response.body));
		assert(response.body.length === 1);
		assert(response.body[0].name === components[0].name);
	});

	// it('should return 500 on server error', async () => {
	// 	const response = await request.get('/api/v1/components').expect(500);
	// 	assert.strictEqual(response.body.message, 'Test error');
	// });
});
