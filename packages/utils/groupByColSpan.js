import _ from 'lodash';

export function groupByColSpan(array, size) {
	let lastIndex = 0;
	const groups = array.map((item) => {
		const remainCounts = size - (lastIndex % size);
		const span = item.colSpan || 1;
		if (span > remainCounts) {
			lastIndex += remainCounts;
		}

		// eslint-disable-next-line
		const _group = Math.floor(lastIndex / size) + 1;
		lastIndex += span;

		return Object.assign(item, { _group });
	});

	const newGroups = _.compact(groups);
	const groupedObj = _.groupBy(newGroups, '_group');
	return Object.keys(groupedObj).map((key) => {
		const values = groupedObj[key];
		return values.map((e) => {
      // eslint-disable-next-line
			delete e._group;
			return e;
		});
	});
}

export default {};
