import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		await mongoose.connect(
			process.env.DATABASE_URI ?? 'mongodb://localhost/myDatabase'
		);
		console.log('MongoDB connected...');
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

export default connectDB;
