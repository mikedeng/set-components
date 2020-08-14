import _ from 'lodash';
import {pluck } from './object';

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

/**
 * 为单个对象添加其它字段
 	@returns 返回对象，和被添加的对象 
		{ 
			valuePaths {Array} -- 所有value
		  | titlePaths {Array} -- 所有title 
		  | parentValue {*} -- 父节点value
		  | parent {Object} -- 父节点
		  | paths {Object[]} -- 当前父级及当前节点的列表
		  | autoLevel {number} -- 当前节点等级
	  }
    @param {Object} [element={}]
    @param {Object} [opts={}] 要添加的内容
    @param {string|function} [opts.valueField='id'] 指定 value 的默认 field
		@param {string|function} [opts.titleField = 'name'] 指定 name 的默认 field
		@param {string} [opts.childrenField = 'children']  指定 children 的默认 field
		@param {string} [opts.valueAlias = 'value']  指定 value 的显示别名
		@param {string} [opts.titleAlias = 'title']  指定 title 的显示别名
		@param {string} [opts.childrenAlias = 'children'] 指定 children 的显示别名
		@param {function} [opts.callback] 遍历树中的每一个对象
 */
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

/**
 * 为树状数据中的每个对象添加额外字段
 	@returns 返回树，并在每个节点上添加额外的字段，这些字段包括
		{ 
			valuePaths {Array} -- 所有value
		  | titlePaths {Array} -- 所有title 
		  | parentValue {*} -- 父节点value
		  | parent {Object} -- 父节点
		  | paths {Object[]} -- 当前父级及当前节点的列表
		  | autoLevel {number} -- 当前节点等级
	  }
    @param {Object []} [treeData] 
    @param {Object} [opts={}] 要添加的内容
    @param {string|function} [opts.valueField='id'] 指定 value 的默认 field
		@param {string|function} [opts.titleField = 'name'] 指定 name 的默认 field
		@param {string} [opts.childrenField = 'children']  指定 children 的默认 field
		@param {string} [opts.valueAlias = 'value']  指定 value 的显示别名
		@param {string} [opts.titleAlias = 'title']  指定 title 的显示别名
		@param {string} [opts.childrenAlias = 'children'] 指定 children 的显示别名
		@param {function} [opts.callback] 遍历树中的每一个对象
 */
export function addTreeFields(treeData, opts) {
	return treeData?.map((e) => addExtraFields(e, opts)) || [];
}


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

/**
 * 创建树对象
 *
 * @export
 * @param {*} treeData
 * @param {*} opts
 * @returns 返回树，和 findNode 方法, 其中 findNode 方法可以直接传 value 字段值，也可以是对象，例如 { value: 2 }
 */
export function Tree(treeData, opts) {
	this.data = addTreeFields(treeData, opts);

	this.findNode = (value) => findNode(this.data, value);
}

export default {};
