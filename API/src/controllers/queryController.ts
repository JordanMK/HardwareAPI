export const transformDotNotation = (obj: {
	[key: string]: any;
}): {
	[key: string]: any;
} => {
	const result: { [key: string]: any } = {};

	Object.keys(obj).forEach((key) => {
		const keys = key.split('.');
		let currentLevel = result;

		keys.forEach((part, index) => {
			if (index === keys.length - 1) {
				currentLevel[part] = obj[key];
			} else {
				if (!currentLevel[part]) {
					currentLevel[part] = {};
				}
				currentLevel = currentLevel[part];
			}
		});
	});

	return result;
};
