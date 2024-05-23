import { Request, Response } from 'express';
import Component from '../../models/components/Component';
import { IComponent } from '../../types/models';

const getAllComponents = async (req: Request, res: Response): Promise<void> => {
	// #swagger.tags = ['Components']
	/*  #swagger.parameters['$ref'] = ['#/components/parameters/componentBrand', '#/components/parameters/componentName', '#/components/parameters/componentType'] */
	try {
		const components: IComponent[] = await Component.find(req.query);
		res.status(200).json(components);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const getComponentById = async (req: Request, res: Response): Promise<void> => {
	// #swagger.tags = ['Components']
	try {
		const component: IComponent | null = await Component.findById(
			req.params.id
		);
		res.status(200).json(component);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

export default { getAllComponents, getComponentById };
