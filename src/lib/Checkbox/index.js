import React, { Fragment } from "react";
import { Checkbox } from "antd";
import styles from "./style/index.less";

const MyCheckbox = props => {
  const { onChange } = props;
  return (
    <div>
      <Checkbox
        className={styles.checkbox2}
        {...props}
        onChange={e => onChange(e.target.checked)}
      />
    </div>
  );
};

export default MyCheckbox;
