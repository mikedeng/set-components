export function Interval(fn, ms) {
	const obj = {
		timer_id: null,
		start() {
			const that = this;
			if (this.timer_id) {
				that.clear();
			}

			fn();
			this.timer_id = setTimeout(() => {
				fn();
				that.start();
			}, ms);
		},
		clear() {
			clearTimeout(this.timer_id);
		},
	};

	return obj;
}

export default {};
