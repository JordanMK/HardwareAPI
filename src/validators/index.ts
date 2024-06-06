import Joi from 'joi';
import componentValidator from './components/component.validator';
import cpuValidator from './components/cpu.validator';
import gpuValidator from './components/gpu.validator';
import ramValidator from './components/ram.validator';
import computerValidator from './devices/computer.validator';
import deviceValidator from './devices/device.validator';

export default {
	componentValidator,
	cpuValidator,
	gpuValidator,
	ramValidator,
	deviceValidator,
	computerValidator,
};
