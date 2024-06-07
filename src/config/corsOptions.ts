import { CorsOptions } from 'cors';

const whitelist = ['http://localhost:3000', 'https://hardwareapi.onrender.com'];
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
