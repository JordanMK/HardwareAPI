import swaggerAutogen from 'swagger-autogen';

const options = {
	openapi: 'OpenAPI 3',
	language: 'en-US',
	disableLogs: false,
	autoHeaders: false,
	autoQuery: false,
	autoBody: false,
};

const swaggerDocument = {
	info: {
		version: '1.0.0',
		title: 'HardwareAPI',
		description: 'API for hardware an computer components',
		contact: {
			name: 'API Support',
			email: 'jordanmalekera.dev@proton.me',
		},
	},
	servers: [{ url: 'http://localhost:4000' }],
	schemes: ['http'],
	consumes: ['application/json'],
	produces: ['application/json'],
	tags: [],
	securityDefinitions: {},
	components: {
		schemas: {
			Component: {
				brand: 'string',
				name: 'string',
				componentType: {
					enum: ['CPU', 'GPU', 'RAM'],
				},
				images: ['string'],
			},
			CPU: {
				brand: 'string',
				name: 'string',
				componentType: {
					enum: ['CPU', 'GPU', 'RAM'],
				},
				images: ['string'],
				family: 'string',
				series: 'string',
				generation: 'string',
				architecture: 'string',
				cores: 0,
				threads: 0,
				baseClock: 0.0,
				boostClock: 0.0,
				tdp: 0.0,
				socket: 'string',
				technologie: 0.0,
				integratedGraphics: {
					name: 'string',
					brand: 'string',
					generation: 'string',
					architecture: { type: 'string' },
					baseClock: 0.0,
					boostClock: 0.0,
				},
				cache: {
					l1: 'string',
					l2: 'string',
					l3: 'string',
				},
				hyperthreading: true,
				pcieSupport: 'string',
				maxPcieLanes: 0,
				virtualisationSupport: { type: 'boolean' },
			},
			GPU: {
				brand: 'string',
				name: 'string',
				componentType: {
					enum: ['CPU', 'GPU', 'RAM'],
				},
				images: {
					type: 'array',
					items: {
						type: 'string',
					},
				},
				family: 'string',
				series: 'string',
				generation: 'string',
				architecture: 'string',
				cores: 'integer',
				threads: 'integer',
				baseClock: { type: 'number', format: 'float' },
				boostClock: { type: 'number', format: 'float' },
				tdp: { type: 'number', format: 'float' },
				socket: 'string',
				technologie: { type: 'number', format: 'float' },
				integratedGraphics: {
					type: 'object',
					properties: {
						name: 'string',
						brand: 'string',
						generation: 'string',
						architecture: 'string',
						baseClock: { type: 'number', format: 'float' },
						boostClock: { type: 'number', format: 'float' },
					},
				},
				cache: {
					type: 'object',
					properties: {
						l1: 'string',
						l2: 'string',
						l3: 'string',
					},
				},
				hyperthreading: 'boolean',
				pcieSupport: 'string',
				maxPcieLanes: 'integer',
				virtualisationSupport: 'boolean',
			},
		},
		parameters: {
			component: {
				brand: {
					name: 'brand',
					in: 'query',
					required: false,
					schema: {
						type: 'string',
					},
				},
				name: {
					name: 'name',
					in: 'query',
					required: false,
					schema: {
						type: 'string',
					},
				},
				componentType: {
					name: 'componentType',
					in: 'query',
					required: false,
					schema: {
						type: 'enum',
						enum: ['CPU', 'GPU', 'RAM'],
					},
				},
				images: {
					name: 'images',
					in: 'query',
					required: false,
					schema: {
						type: 'array',
						items: {
							type: 'string',
						},
					},
				},
			},
			cpu: {
				family: {
					name: 'family',
					in: 'query',
					required: false,
					schema: {
						type: 'string',
					},
				},
				series: {
					name: 'series',
					in: 'query',
					required: false,
					schema: {
						type: 'string',
					},
				},
				generation: {
					name: 'generation',
					in: 'query',
					required: false,
					schema: {
						type: 'string',
					},
				},
				architecture: {
					name: 'architecture',
					in: 'query',
					required: false,
					schema: {
						type: 'string',
					},
				},
				cores: {
					name: 'cores',
					in: 'query',
					required: false,
					schema: {
						type: 'integer',
					},
				},
				threads: {
					name: 'threads',
					in: 'query',
					required: false,
					schema: {
						type: 'integer',
					},
				},
				baseClock: {
					name: 'baseClock',
					in: 'query',
					required: false,
					schema: {
						type: 'number',
						format: 'float',
					},
				},
				boostClock: {
					name: 'boostClock',
					in: 'query',
					required: false,
					schema: {
						type: 'number',
						format: 'float',
					},
				},
				tdp: {
					name: 'tdp',
					in: 'query',
					required: false,
					schema: {
						type: 'number',
						format: 'float',
					},
				},
				socket: {
					name: 'socket',
					in: 'query',
					required: false,
					schema: {
						type: 'string',
					},
				},
				technologie: {
					name: 'technologie',
					in: 'query',
					required: false,
					schema: {
						type: 'number',
						format: 'float',
					},
				},
				integratedGraphics: {
					name: 'integratedGraphics',
					in: 'query',
					required: false,
					schema: {
						type: 'object',
						properties: {
							name: {
								type: 'string',
							},
							brand: {
								type: 'string',
							},
							generation: {
								type: 'string',
							},
							architecture: {
								type: 'string',
							},
							baseClock: {
								type: 'number',
								format: 'float',
							},
							boostClock: {
								type: 'number',
								format: 'float',
							},
						},
					},
				},
				cache: {
					name: 'cache',
					in: 'query',
					required: false,
					schema: {
						type: 'object',
						properties: {
							l1: {
								type: 'string',
							},
							l2: {
								type: 'string',
							},
							l3: {
								type: 'string',
							},
						},
					},
				},
				hyperthreading: {
					name: 'hyperthreading',
					in: 'query',
					required: false,
					schema: {
						type: 'boolean',
					},
				},
				pcieSupport: {
					name: 'pcieSupport',
					in: 'query',
					required: false,
					schema: {
						type: 'string',
					},
				},
				maxPcieLanes: {
					name: 'maxPcieLanes',
					in: 'query',
					required: false,
					schema: {
						type: 'integer',
					},
				},
				virtualisationSupport: {
					name: 'virtualisationSupport',
					in: 'query',
					required: false,
					schema: {
						type: 'boolean',
					},
				},
			},
		},
		securitySchemes: {
			bearerAuth: {
				type: 'http',
				scheme: 'bearer',
				in: 'header',
			},
		},
	},
	definitions: {
		successResponse200: {
			code: 200,
			message: 'Success',
		},
		errorResponse400: {
			code: 400,
			message:
				'The request was malformed or invalid. Please check the request parameters.',
		},
		errorResponse401: {
			code: 401,
			message: 'Authentication failed or user lacks proper authorization.',
		},
		errorResponse403: {
			code: 403,
			message: 'You do not have permission to access this resource.',
		},
		errorResponse404: {
			code: 404,
			message: 'The requested resource could not be found on the server.',
		},
		errorResponse500: {
			code: 500,
			message:
				'An unexpected error occurred on the server. Please try again later.',
		},
	},
};

const swaggerFile = './swagger.json';
const apiRouteFile = ['../server.ts'];
swaggerAutogen({ openapi: '3.0.0' })(
	swaggerFile,
	apiRouteFile,
	swaggerDocument
);
