import _ from 'lodash';

const getFieldValue = (e, field) => {
	return _.isFunction(field) ? field(e) : e[field];
};

const getAllChildrenIds = (children, childrenField, array, valueField) => {
	// eslint-disable-next-line
	children?.forEach((e) => {
		const value = getFieldValue(e, valueField) || e.value;
		array.push(value);
		getAllChildrenIds(e[childrenField], childrenField, array, valueField);
	});
};

export function addExtraFields(element = {}, opts = {}) {
	const {
		valueField = 'id',
		titleField = 'name',
		childrenField = 'children',

		valueAlias = 'value',
		titleAlias = 'title',
		childrenAlias = 'children',
		parentValue = null,
		valuePaths = [],
		titlePaths = [],
		autoLevel = 1,
		callback,
	} = opts;

	const newElement = { ...element };
	let { value, title, children } = newElement;
	value = getFieldValue(newElement, valueField);
	title = getFieldValue(newElement, titleField);
	children = newElement[childrenField];

	const childrenIds = children?.map((e) => getFieldValue(e, valueField) || e.value) || [];
	const allChildrenIds = [];
	getAllChildrenIds(children, childrenField, allChildrenIds, valueField);

	const newParentValues = [...valuePaths, value];
	const newTitlePaths = [...titlePaths, title];

	const newEl = {
		...newElement,
		[valueAlias]: value,
		[titleAlias]: title,
		parentValue,
		valuePaths: newParentValues,
		titlePaths: newTitlePaths,
		childrenIds,
		allChildrenIds,
		autoLevel,
	};

	children =
		children?.map((e) =>
			addExtraFields(e, {
				valueField,
				titleField,
				childrenField,
				valueAlias,
				titleAlias,
				childrenAlias,
				parentValue: value,
				valuePaths: newParentValues,
				titlePaths: newTitlePaths,
				autoLevel: autoLevel + 1,
				callback,
			})
		) || [];

	newEl[childrenAlias] = children;
	if (callback) {
		return callback(newEl);
	}

	return newEl;
}

export function addTreeFields(treeData, opts) {
	return treeData?.map((e) => addExtraFields(e, opts)) || [];
}

export default {};
