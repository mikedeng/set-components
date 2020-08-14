/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
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

		expect(utils.addExtraFields).to.exist;
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
		];

		const newTree = utils.addTreeFields(treeData, {
			callback: (el) => {
				return { ...el, uuid: Math.random() };
			},
		});

		// check structure
		expect(newTree[0].name).to.exist;
		expect(newTree[0].title).to.exist;
		expect(newTree[1].children).to.exist;
		expect(newTree[1].children[0].name).to.exist;
		expect(newTree[1].children[0].title).to.exist;
		expect(newTree[1].children[0].children[0].name).to.exist;
		expect(newTree[1].children[0].children[0].title).to.exist;

		// check parentValue
		expect(newTree[0].parentValue).to.equal(null);
		expect(newTree[1].children[0].parentValue).to.equal(2);
		expect(newTree[1].children[0].children[0].parentValue).to.equal(22);

		// check valuePaths
		expect(newTree[0].valuePaths).to.eql([1]);
		expect(newTree[1].children[0].valuePaths).to.eql([2, 22]);
		expect(newTree[1].children[0].children[0].valuePaths).to.eql([2, 22, 222]);

		expect(newTree[0].titlePaths).to.eql(['name1']);
		expect(newTree[1].children[0].titlePaths).to.eql(['name2', 'name22']);
		expect(newTree[1].children[0].children[0].titlePaths).to.eql(['name2', 'name22', 'name222']);

		// check childrenIds
		expect(newTree[0].childrenIds).to.eql([]);
		expect(newTree[1].childrenIds).to.eql([22]);
		expect(newTree[1].allChildrenIds).to.eql([22, 222]);

		// check autoLevel
		expect(newTree[0].autoLevel).to.equal(1);
		expect(newTree[1].children[0].autoLevel).to.equal(2);
		expect(newTree[1].children[0].children[0].autoLevel).to.equal(3);

		// check value = id
		expect(newTree[0].value).to.equal(treeData[0].id);
		expect(newTree[0].value).to.equal(1);

		// check title = name
		expect(newTree[0].title).to.equal(treeData[0].name);
		expect(newTree[0].title).to.equal('name1');

		// check children.value = children.id
		expect(newTree[1].children[0].value).to.equal(newTree[1].children[0].id);
		expect(newTree[1].children[0].value).to.equal(22);

		// check children.title = children.name
		expect(newTree[1].children[0].children[0].title).to.equal(newTree[1].children[0].children[0].name);
		expect(newTree[1].children[0].children[0].title).to.equal('name222');

		expect(newTree[0].uuid).to.exist;
		expect(newTree[1].children[0].children[0].uuid).to.exist;

		const tree = new utils.Tree(treeData, {
			callback: (el) => {
				return { ...el, uuid: Math.random() };
			},
		});

		expect(tree.data[0].name).to.exist;
		expect(tree.data[1].children[0].children[0].name).to.exist;
		const foundNode = tree.findNode({ id: 2 });
		expect(foundNode).to.exist;
		expect(foundNode.title).to.equal('name2');
		expect(foundNode.parent).to.be.null;

		const foundNode222 = tree.findNode({ id: 222 });
    expect(foundNode222.parent.title).to.equal('name22');
    
		expect(foundNode222.paths.length).to.equal(3);
		expect(foundNode222.parent.parent.title).to.equal('name2');
		expect(foundNode222.parent.parent.parent).to.equal(null);
	});
});
