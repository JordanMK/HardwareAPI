import Joi from 'joi';
import componentValidator from './components/component.validator';
import cpuValidator from './components/cpu.validator';
import gpuValidator from './components/gpu.validator';
import ramValidator from './components/ram.validator';
import computerValidator from './devices/computer.validator';
import deviceValidator from './devices/device.validator';
import userValidator from './users/user.validator';

export default {
	componentValidator,
	cpuValidator,
	gpuValidator,
	ramValidator,
	deviceValidator,
	computerValidator,
	userValidator,
};
