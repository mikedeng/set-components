import _ from 'lodash';

// cron 表达式列表
export function getCronOptions() {
	const days = ['日', '一', '二', '三', '四', '五', '六'];
	const daysofWeek = _.range(1, 7).map((day, index) => {
		return { value: `* * * * ${day}`, name: `每周${days[index]}` };
	});

	const daysofMonth = _.range(1, 31).map((day) => {
		return { value: `* * ${day} * *`, name: `每月${day}日` };
	});

	return [...daysofWeek, ...daysofMonth];
}

export default {};
