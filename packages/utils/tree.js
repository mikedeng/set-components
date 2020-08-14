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

		valuePaths = [],
		titlePaths = [],

		parentValue = null,
		parent = null,
		paths = [],
		autoLevel = 1,
		callback,
	} = opts;

	const value = getFieldValue(element, valueField);
	const title = getFieldValue(element, titleField);
	const children = element[childrenField];

	const childrenIds = children?.map((e) => getFieldValue(e, valueField) || e.value) || [];
	const allChildrenIds = [];
	getAllChildrenIds(children, childrenField, allChildrenIds, valueField);

	const newParentValues = [...valuePaths, value];
	const newTitlePaths = [...titlePaths, title];
	const newPaths = [...paths, element];

	const newEl = {
		...element,
		[valueAlias]: value,
		[titleAlias]: title,
		parentValue,
		parent,
		paths: newPaths,
		valuePaths: newParentValues,
		titlePaths: newTitlePaths,
		childrenIds,
		allChildrenIds,
		autoLevel,
	};

	const newChildren =
		children?.map((e) =>
			addExtraFields(e, {
				valueField,
				titleField,
				childrenField,
				valueAlias,
				titleAlias,
				childrenAlias,
				parentValue: value,
				parent: newEl,
				paths: newPaths,
				valuePaths: newParentValues,
				titlePaths: newTitlePaths,
				autoLevel: autoLevel + 1,
				callback,
			})
		) || [];

	newEl[childrenAlias] = newChildren;
	if (callback) {
		return callback(newEl);
	}

	return newEl;
}

export function addTreeFields(treeData, opts) {
	return treeData?.map((e) => addExtraFields(e, opts)) || [];
}

const pluck = (e, keys) => {
	return keys
		.map((key) => {
			return { [key]: e[key] };
		})
		.reduce((h, c) => {
			return { ...h, ...c };
		}, {});
};

export function findNode(treeData, value) {
	for (let i = 0; i < treeData.length; i += 1) {
		const node = treeData[i];
		const keys = Object.keys(value);
		const newObj = pluck(node, keys);
		if (_.isEqual(newObj, value)) {
			return node;
			// eslint-disable-next-line
		} else if (node?.children?.length > 0) {
			return findNode(node.children, value);
		}
	}

	return null;
}

export function Tree(treeData, opts) {
	// eslint-disable-next-line
	const tree = addTreeFields(treeData, opts);
	// eslint-disable-next-line

	// eslint-disable-next-line
	tree.findNode = (value) => findNode(tree, value);
	// eslint-disable-next-line
	return tree;
}

export default {};
