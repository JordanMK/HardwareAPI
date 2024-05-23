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
			componentSchema: {
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
			},
		},
		parameters: {
			componentBrand: {
				name: 'brand',
				in: 'query',
				required: false,
				schema: {
					type: 'string',
				},
			},
			componentName: {
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
