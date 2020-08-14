/**
 * 根据传入的数，加千分位与保留小数点后n位；
 * @param {*} value 要格式化的数据
 * @param {*} pointCount 保留小数点的位数
 */
export function toDecimalString(value = 0, pointCount = 2) {
	const withPoint = (+value).toFixed(pointCount);
	const reg = /(\d{1,3})(?=(\d{3})+(\.|$))/g;
	return withPoint.replace(reg, '$1,');
}

export default {};
