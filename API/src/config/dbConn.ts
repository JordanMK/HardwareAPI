import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		await mongoose
			.connect(process.env.DATABASE_URI as string)
			.then(() => console.log('MongoDB connected...'))
			.catch((error) => console.error(error));
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

export default connectDB;
