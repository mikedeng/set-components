import _ from 'lodash';
import React, { Component } from 'react';
import CheckItem from '../CheckItem';
import styles from './index.less';
import MenuContainer from './MenuContainer';

class EnityType extends Component {
  state = {
    checkedAll: false,
    indeterminate: false,
    value: [],
  };

  componentDidMount() {
    const { value } = this.props;
    this.setCheckState(value);
  }

  componentWillReceiveProps(nextProps) {
    const { value: newValue } = nextProps;
    const { value } = this.state;

    if (!_.isEqual(value, newValue)) {
      this.setCheckState(newValue);
    }
  }

  handleClickAll = callback => {
    const { options } = this.props;
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

  setCheckState = newChecks => {
    this.setState(() => {
      let checkedAll = false;
      let indeterminate = false;
      const { options } = this.props;

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
    const { options, onChange } = this.props;
    const { checkedAll, indeterminate, value } = this.state;

    return (
      <div className={styles.container}>
        <CheckItem
          checked={checkedAll}
          indeterminate={indeterminate}
          onClick={() =>
            this.handleClickAll(newChecks => {
              if (onChange) {
                onChange(newChecks);
              }
            })
          }
        >
          <i style={{ fontStyle: 'normal' }}>全选</i>
        </CheckItem>
        {options?.map((option, key) => {
          const filterValue = _.intersection(value, option.subCodes);

          return (
            <MenuContainer
              key={key}
              data={option}
              value={filterValue}
              onChange={vals => {
                const otherSubCodes = _.difference(value, option.subCodes);
                const newChecks = otherSubCodes.concat(vals);
                if (onChange) {
                  onChange(newChecks);
                }

                this.setCheckState(newChecks);
              }}
            />
          );
        })}
      </div>
    );
  }
}

export default EnityType;
