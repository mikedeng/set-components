import React, { Component } from "react";
import _ from "lodash";
import MyMenu from "./MyMenu";

class MenuContainer extends Component {
  state = {
    value: [],
    checked: false,
    open: false,
    data: {},
    indeterminate: false
  };

  componentDidMount() {
    const { data, value } = this.props;
    this.setState({ data, value }, () => {
      this.determinChecked();
    });
  }

  componentWillReceiveProps(nextProps) {
    const { value: newValue } = nextProps;
    const { value, data } = this.state;
    if (!_.isEqual(newValue, value)) {
      const len = newValue?.length;
      const dataLen = data.length;
      this.setState({
        value: newValue,
        indeterminate: len > 0 && len < dataLen,
        checked: len === dataLen
      });
    }
  }

  toggleSelectKeys = (key, fn) => {
    const { value } = this.state;
    const newSelectKeys = [...value];

    const index = newSelectKeys.indexOf(key);
    if (index !== -1) {
      newSelectKeys.splice(index, 1);
    } else {
      newSelectKeys.push(key);
    }

    if (fn) {
      fn(newSelectKeys);
    }
    this.setState({ value: newSelectKeys });
  };

  determinChecked = () => {
    const { value, data } = this.state;
    const len = value?.length || 0;
    const dataLen = data.length;
    const indeterminate = len > 0 && len < dataLen;
    const checked = value.length === dataLen;
    this.setState({ indeterminate, checked });
  };

  handleClick = event => {
    const { key } = event;
    const { onChange } = this.props;

    this.toggleSelectKeys(key, newKeys => {
      this.determinChecked();
      onChange(newKeys);
    });
  };

  handleTitleClick = () => {
    this.setState(({ checked, data }) => {
      const newCheck = !checked;
      const newValue = newCheck ? data.subCodes : [];
      return { checked: newCheck, indeterminate: false, value: newValue };
    });
  };

  render() {
    const { theme } = this.props;
    const { data, value, indeterminate, checked, open } = this.state;
    if (Object.keys(data).length === 0) {
      return null;
    }

    return (
      <MyMenu
        indeterminate={indeterminate}
        checked={checked}
        onChange={this.handleClick}
        onTitleClick={this.handleTitleClick}
        onToggleOpen={val => this.setState({ open: val })}
        data={data}
        value={value}
        open={open}
        theme={theme}
      />
    );
  }
}

export default MenuContainer;
