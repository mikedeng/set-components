/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import _ from 'lodash';
import { utils } from '../../packages';

describe('utils: check exists', () => {
	it('检查所有方法都存在', () => {
		// text.js
		expect(utils.getOptionName).to.exist;
		expect(utils.YMD).to.exist;
		expect(utils.YMDHms).to.exist;
		expect(utils.formatDate).to.exist;
		expect(utils.formatLongName).to.exist;
		expect(utils.renderLongName).to.exist;
		expect(utils.emptify).to.exist;
		expect(utils.omitStr).to.exist;

		// message.js
		expect(utils.showMessage).to.exist;
		expect(utils.showError).to.exist;
		expect(utils.renderTableIndex).to.exist;

		// url.js
		expect(utils.getPageQuery).to.exist;
		expect(utils.getPagePath).to.exist;
		expect(utils.getQueryPath).to.exist;
		expect(utils.isUrl).to.exist;

		// interval.js
		expect(utils.Interval).to.exist;

		// number.js
		expect(utils.toDecimalString).to.exist;

		// options.js
		expect(utils.getEnumObject).to.exist;

		expect(utils.Tree.prototype.find).to.exist;
		expect(utils.Tree.prototype.map).to.exist;
	});

	it('检查正确性: formatLongName', () => {
		const emptyString01 = null;
		const opString01 = utils.formatLongName(emptyString01, 4);
		expect(opString01).to.equal(null);

		const emptyString02 = '';
		const opString1 = utils.formatLongName(emptyString02, 4);
		expect(opString1).to.equal('');

		const testStr = 'this is set-components';
		const opString03 = utils.formatLongName(testStr, 4);
		expect(opString03).to.equal('this...');

		const opString04 = utils.formatLongName(testStr, 4, '');
		expect(opString04).to.equal('this');
	});

	it('检查正确性: tree', () => {
		const treeData = [
			{
				id: 1,
				name: 'name1',
			},
			{
				id: 2,
				name: 'name2',
				children: [
					{
						id: 22,
						name: 'name22',
						children: [
							{
								id: 222,
								name: 'name222',
							},
						],
					},
				],
			},

			{
				id: 3,
				name: 'name3',
				children: [
					{
						id: 33,
						name: 'name33',
						children: [
							{
								id: 333,
								name: 'name333',
							},
						],
					},
				],
			},
		];

		const newTree = new utils.Tree(treeData, {
			valueField: 'id',
			titleField: 'name',
			callback: (el) => {
				return { ...el, uuid: Math.random() };
			},
		});

		expect(newTree.data).to.exist;
		// check structure
		expect(newTree.data[0].name).to.exist;
		expect(newTree.data[0].title).to.exist;
		expect(newTree.data[1].children).to.exist;
		expect(newTree.data[1].children[0].name).to.exist;
		expect(newTree.data[1].children[0].title).to.exist;
		expect(newTree.data[1].children[0].children[0].name).to.exist;
		expect(newTree.data[1].children[0].children[0].title).to.exist;

		// check parentValue
		expect(newTree.data[0].parentValue).to.equal(null);
		expect(newTree.data[1].children[0].parentValue).to.equal(2);
		expect(newTree.data[1].children[0].children[0].parentValue).to.equal(22);

		// check valuePaths
		expect(newTree.data[0].valuePaths).to.eql([1]);
		expect(newTree.data[1].children[0].valuePaths).to.eql([2, 22]);
		expect(newTree.data[1].children[0].children[0].valuePaths).to.eql([2, 22, 222]);

		expect(newTree.data[0].titlePaths).to.eql(['name1']);
		expect(newTree.data[1].children[0].titlePaths).to.eql(['name2', 'name22']);
		expect(newTree.data[1].children[0].children[0].titlePaths).to.eql(['name2', 'name22', 'name222']);

		// check childrenIds
		expect(newTree.data[0].childrenIds).to.eql([]);
		expect(newTree.data[1].childrenIds).to.eql([22]);
		expect(newTree.data[1].allChildrenIds).to.eql([22, 222]);

		// check autoLevel
		expect(newTree.data[0].autoLevel).to.equal(1);
		expect(newTree.data[1].children[0].autoLevel).to.equal(2);
		expect(newTree.data[1].children[0].children[0].autoLevel).to.equal(3);

		// check value = id
		expect(newTree.data[0].value).to.equal(treeData[0].id);
		expect(newTree.data[0].value).to.equal(1);

		// check title = name
		expect(newTree.data[0].title).to.equal(treeData[0].name);
		expect(newTree.data[0].title).to.equal('name1');

		// check children.value = children.id
		expect(newTree.data[1].children[0].value).to.equal(newTree.data[1].children[0].id);
		expect(newTree.data[1].children[0].value).to.equal(22);

		// check children.title = children.name
		expect(newTree.data[1].children[0].children[0].title).to.equal(newTree.data[1].children[0].children[0].name);
		expect(newTree.data[1].children[0].children[0].title).to.equal('name222');

		expect(newTree.data[0].uuid).to.exist;
		expect(newTree.data[1].children[0].children[0].uuid).to.exist;

		const tree = new utils.Tree(treeData, {
			valueField: 'id',
			titleField: 'name',
			callback: (el) => {
				return { ...el, uuid: Math.random() };
			},
		});

		expect(tree.data[0].name).to.exist;
		expect(tree.data[1].children[0].children[0].name).to.exist;

		const found222 = tree.find(222);
		expect(found222.value).to.equal(222);

		const foundNode = tree.find({ id: 2 });
		expect(foundNode).to.exist;
		expect(foundNode.title).to.equal('name2');
		expect(foundNode.parent).to.be.null;

		const foundNode222 = tree.find({ id: 222 });
		expect(foundNode222.parent.title).to.equal('name22');

		expect(foundNode222.paths.length).to.equal(3);
		expect(foundNode222.parent.parent.title).to.equal('name2');
		expect(foundNode222.parent.parent.parent).to.equal(null);

		const newTreeWith333 = new utils.Tree(treeData, {
			valueField: 'id',
			titleField: 'name',
		});

		const foundNode333 = newTreeWith333.find(333) || {};
		expect(foundNode333.value).to.equal(333);
		expect(foundNode333.value).to.equal(333);

		const foundNodeWithFn = tree.find((e) => e.title === 'name222');
		expect(foundNodeWithFn.value).to.equal(222);

		const values = [];
		newTreeWith333.forEach((e) => {
			e.disableCheckbox = true;
			values.push(e.value);
		});
		expect(values).to.eql([1, 2, 22, 222, 3, 33, 333]);
		expect(newTreeWith333.data[0].disableCheckbox).to.be.true;
		expect(newTreeWith333.data[2].children[0].disableCheckbox).to.be.true;

		const values2 = [];
		const newTree2 = new utils.Tree(treeData, {
			valueField: 'id',
			titleField: 'name',
			callback(e) {
				values2.push(e.value);
				return { ...e, disableCheckbox: false };
			},
		});

		const newValues2 = values2.sort();
		const rawArray = [1, 2, 22, 222, 3, 33, 333].sort();
		expect(newValues2).to.eql(rawArray);
		expect(newTree2.data[0].disableCheckbox).to.be.false;
		expect(newTree2.data[2].children[0].disableCheckbox).to.be.false;

		const newTree2x = new utils.Tree(treeData, {
			valueField: 'id',
			titleField: 'name',
			callback(e) {
				return { ...e, disableCheckbox: false };
			},
		});
		const newTree3 = newTree2x.map((e) => ({ ...e, disableCheckbox: true }));
		expect(newTree3.data[0].disableCheckbox).to.be.true;
		expect(newTree3.data[2].children[0].disableCheckbox).to.be.true;


		const treeData2 = [
			{
				value: 1,
				title: 'name1',
			},
			{
				value: 2,
				title: 'name2',
				children: [
					{
						value: 22,
						title: 'name22',
						children: [
							{
								value: 222,
								title: 'name222',
							},
						],
					},
				],
			},

			{
				value: 3,
				title: 'name3',
				children: [
					{
						value: 33,
						title: 'name33',
						children: [
							{
								value: 333,
								title: 'name333',
							},
						],
					},
				],
			},
		];

		const newTree2Y = new utils.Tree(treeData2);
		const newTree3Y = newTree2Y.map((e) => ({ ...e, disableCheckbox: true }));
		expect(newTree3Y.data[0].disableCheckbox).to.be.true;
		expect(newTree3Y.data[2].children[0].disableCheckbox).to.be.true;

		const newTree2Y2 = new utils.Tree([]);
		expect(newTree2Y2).to.exist;
	});
});
