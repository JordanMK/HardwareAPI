import { CorsOptions } from 'cors';

const whitelist = ['http://localhost:4000', 'http://localhost:5173'];
const corsOptions: CorsOptions = {
	origin: (origin, callback) => {
		if (whitelist.includes(origin as string) || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	optionsSuccessStatus: 200,
};

export default corsOptions;
