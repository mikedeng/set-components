import React, { Component } from 'react';
import Checkbox from '../Checkbox';
import styles from './index.less';

class CheckItem extends Component {
  state = {
    checked: false,
  };

  componentDidMount() {
    const { checked } = this.props;
    this.toggleCheck(checked);
  }

  componentWillReceiveProps(nextProps) {
    const { checked: newChecked } = nextProps;
    this.toggleCheck(newChecked);
  }

  toggleCheck = newChecked => {
    const { checked } = this.state;
    if (newChecked !== checked) {
      this.setState({ checked: newChecked });
    }
  };

  handleClick = value => {
    const { onClick } = this.props;
    this.setState(({ checked }) => {
      onClick(value, !checked);
      return { checked: !checked };
    });
  };

  render() {
    const { indeterminate, children, value } = this.props;
    const { checked } = this.state;
    return (
      <ul
        onClick={() => this.handleClick(value)}
        className={checked ? styles.menuSelected : styles.menu}
      >
        <li style={{ cursor: 'pointer' }}>
          <Checkbox checked={checked} indeterminate={indeterminate} />
          <span>{children}</span>
        </li>
      </ul>
    );
  }
}

export default CheckItem;
