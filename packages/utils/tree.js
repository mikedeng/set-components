import _ from 'lodash';
import { pluck } from './object';

const DefaultValueField = 'value';
const DefaultTitleField = 'title';
/**
 * 创建树对象
 *
 * @export
 * @param {*} treeData
 * @param {*} opts
 * @returns 返回树，和 findNode 方法, 其中 findNode 方法可以直接传 value 字段值，也可以是对象，例如 { value: 2 }
 */
export class Tree {
	constructor(treeData, opts, addFields = true) {
		this.raw_data = treeData;

		if (addFields) {
			this.data = this.addTreeFields(this.raw_data, opts) || [];
		} else {
			this.data = treeData;
		}

		this.opts = opts;
	}

	getFieldValue = (e, field) => {
		return _.isFunction(field) ? field(e) : e[field];
	};

	getAllChildrenIds = (children, childrenField, array, valueField) => {
		// eslint-disable-next-line
		children?.forEach((e) => {
			const value = this.getFieldValue(e, valueField) || e.value;
			array.push(value);
			this.getAllChildrenIds(e[childrenField], childrenField, array, valueField);
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
			@param {string|function} [opts.valueField='value'] 指定 value 的默认 field
			@param {string|function} [opts.titleField = 'title'] 指定 title 的默认 field
			@param {string} [opts.childrenField = 'children']  指定 children 的默认 field
			@param {string} [opts.valueAlias = 'value']  指定 value 的显示别名
			@param {string} [opts.titleAlias = 'title']  指定 title 的显示别名
			@param {string} [opts.childrenAlias = 'children'] 指定 children 的显示别名
			@param {function} [opts.callback] 遍历树中的每一个对象
	 */
	addExtraFields(element = {}, opts = {}) {
		const {
			valueField = 'value',
			titleField = 'title',
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

		if (!Object.keys(element).includes(valueField)) {
			throw new Error(`请设置正确的 valueField，默认是 ${DefaultValueField}`);
		}

		if (!Object.keys(element).includes(titleField)) {
			throw new Error(`请设置正确的 titleField, 默认是 ${DefaultTitleField}`);
		}

		const value = this.getFieldValue(element, valueField);
		const title = this.getFieldValue(element, titleField);
		const children = element[childrenField];

		const childrenIds = children?.map((e) => this.getFieldValue(e, valueField) || e.value) || [];
		const allChildrenIds = [];
		this.getAllChildrenIds(children, childrenField, allChildrenIds, valueField);

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

		const newParent = _.cloneDeep(_.omit(newEl, 'children'));
		const newChildren =
			children?.map((e) =>
				this.addExtraFields(e, {
					valueField,
					titleField,
					childrenField,
					valueAlias,
					titleAlias,
					childrenAlias,
					parentValue: value,
					parent: newParent,
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
			@param {string|function} [opts.valueField='value'] 指定 value 的默认 field
			@param {string|function} [opts.titleField = 'title'] 指定 title 的默认 field
			@param {string} [opts.childrenField = 'children']  指定 children 的默认 field
			@param {string} [opts.valueAlias = 'value']  指定 value 的显示别名
			@param {string} [opts.titleAlias = 'title']  指定 title 的显示别名
			@param {string} [opts.childrenAlias = 'children'] 指定 children 的显示别名
			@param {function} [opts.callback] 遍历树中的每一个对象
	 */
	addTreeFields(treeData, opts) {
		return treeData?.map((e) => this.addExtraFields(e, opts)) || [];
	}

	forEach2(children, fn) {
		// eslint-disable-next-line no-unused-expressions
		children?.forEach((e) => {
			fn(e);
			this.forEach2(e.children, fn);
		});
	}

	forEach(fn) {
		this.forEach2(this.data, fn);
	}

	__map2(children, fn) {
		return children?.map((e) => {
			const newEl = fn(e);
			// eslint-disable-next-line
			return { ...newEl, children: this.__map2(e.children, fn) };
		});
	}

	map(fn) {
		// eslint-disable-next-line
		const newData = this.__map2(this.data, fn);
		const tree = new Tree(newData, this.opts, false);
		return tree;
	}

	find(value) {
		// eslint-disable-next-line
		return this.__find(this.data, value);
	}

	__find(treeData, value) {
		for (let i = 0; i < treeData.length; i += 1) {
			const node = treeData[i];
			let flag;
			if (_.isFunction(value)) {
				flag = value(node);
			} else if (_.isObject(value)) {
				const keys = Object.keys(value);
				const newObj = pluck(node, keys);
				flag = _.isEqual(newObj, value);
			} else {
				flag = node.value === value;
			}

			if (flag) {
				return node;
			}

			const { children = [] } = node;

			if (children.length > 0) {
				// eslint-disable-next-line
				const foundNode = this.__find(children, value);
				if (foundNode) {
					return foundNode;
				}
			}
		}

		return null;
	}
}

export default {};
