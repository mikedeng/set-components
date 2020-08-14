export const pluck = (e, keys) => {
	return keys
		.map((key) => {
			return { [key]: e[key] };
		})
		.reduce((h, c) => {
			return { ...h, ...c };
		}, {});
};

export default {};
