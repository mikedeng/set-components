import React from 'react';
import { Checkbox } from 'antd';
import styles from './index.less';

const MyCheckbox = props => {
  const { indeterminate, checked } = props;
  return <Checkbox className={styles.checkbox} checked={checked} indeterminate={indeterminate} />;
};

export default MyCheckbox;
