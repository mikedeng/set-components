import _ from 'lodash';
import React, { Component } from 'react';
import classNames from 'classnames';
import CheckItem from '../CheckItem';
import styles from './index.less';
import MenuContainer from './MenuContainer';

class EntityType extends Component {
	state = {
		checkedAll: false,
		indeterminate: false,
		value: [],
	};

	componentDidMount() {
		const { value, options = [] } = this.props;
		this.renewOptions(options, value);
	}

	componentWillReceiveProps(nextProps) {
		const { value: newValue, options: newOptions } = nextProps;
		const { value, options } = this.state;
		if (!_.isEqual(value, newValue) || !_.isEqual(options, newOptions)) {
			this.renewOptions(newOptions, newValue);
		}
	}

	renewOptions = (options, value) => {
		const newOptions = this.extendOptions(options);
		this.setState({ options: newOptions }, () => {
			this.setCheckState(value);
		});
	};

	extendOptions = (options) => {
		const newOptions = options?.map((e) => {
			// eslint-disable-next-line
			if (!e.hasOwnProperty('subCodes')) {
				Object.defineProperty(e, 'subCodes', {
					emberable: false,
					get() {
						return this.children?.map((e) => e.code);
					},
				});
			}

			return e;
		});

		// eslint-disable-next-line
		if (!newOptions.hasOwnProperty('subCodes')) {
			Object.defineProperty(newOptions, 'subCodes', {
				emberable: false,
				get() {
					return this.map((e) => e.subCodes).reduce((hash, e) => hash.concat(e), []);
				},
			});
		}

		return newOptions;
	};

	handleClickAll = (callback) => {
		const { options } = this.state;
		this.setState(({ checkedAll }) => {
			const newCheckAll = !checkedAll;
			const newChecks = newCheckAll ? options.subCodes : [];

			if (callback) {
				callback(newChecks);
			}

			return {
				indeterminate: false,
				checkedAll: newCheckAll,
				value: newChecks,
			};
		});
	};

	setCheckState = (newChecks) => {
		this.setState(({ options }) => {
			let checkedAll = false;
			let indeterminate = false;

			// 如果没有选择任何项目
			if (!newChecks || newChecks.length === 0) {
				checkedAll = false;
				indeterminate = false;
			} else if (newChecks && newChecks.length === options.subCodes.length) {
				// 如果全选
				checkedAll = true;
				indeterminate = false;
			} else {
				// 部分选择
				checkedAll = false;
				indeterminate = true;
			}

			return { value: newChecks, checkedAll, indeterminate };
		});
	};

	render() {
		const { onChange, className, style, theme } = this.props;
		const { options, checkedAll, indeterminate, value } = this.state;

		if (!options || options.length === 0) {
			return null;
		}

		return (
  		<div
				className={classNames(theme === 'light' ? styles['container-light'] : styles.container, className)}
				style={{ ...style }}
			>
				<CheckItem
					theme={theme}
					checked={checkedAll}
					indeterminate={indeterminate}
					onClick={() =>
						this.handleClickAll((newChecks) => {
							if (onChange) {
								onChange(newChecks);
							}
						})
					}
				>
					<i style={{ fontStyle: 'normal' }}>全选</i>
				</CheckItem>
				{options?.map((option, key) => {
					// TODO: tuning
					const filterValue = _.intersection(value, option.subCodes);
					return (
						<MenuContainer
							key={key}
							data={option}
							value={filterValue}
							onChange={(vals) => {
								// TODO: tuning
								const otherSubCodes = _.difference(value, option.subCodes);
								const newChecks = otherSubCodes.concat(vals);
								if (onChange) {
									onChange(newChecks);
								}

								this.setCheckState(newChecks);
							}}
							theme={theme}
						/>
					);
				})}
			</div>
		);
	}
}

export default EntityType;
