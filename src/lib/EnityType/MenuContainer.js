import React, { Component } from "react";
import _ from "lodash";
import MyMenu from "./MyMenu";

class MenuContainer extends Component {
  state = {
    value: [],
    checked: false,
    open: false,
    data: {}
  };

  componentDidMount() {
    const { data, value } = this.props;
    this.setState({ data, value }, () => {
      this.determinChecked();
    });
  }

  componentWillReceiveProps(nextProps) {
    const { value: newValue } = nextProps;
    const { value } = this.state;
    if (!_.isEqual(newValue, value)) {
      this.setState({
        value: newValue,
        checked: newValue && newValue.length > 0
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
    const { value } = this.state;
    const checked = value && value.length > 0;
    this.setState({ checked });
  };

  handleClick = event => {
    const { key } = event;
    const { onChange } = this.props;

    this.toggleSelectKeys(key, newKeys => {
      this.determinChecked();
      onChange(newKeys);
    });
  };

  render() {
    const { data, value, checked, open } = this.state;
    if (Object.keys(data).length === 0) {
      return null;
    }

    return (
      <MyMenu
        checked={checked}
        onChange={this.handleClick}
        onToggleOpen={val => this.setState({ open: val })}
        data={data}
        value={value}
        open={open}
      />
    );
  }
}

export default MenuContainer;
