import React, { Component } from 'react';
import { Button, Upload, Icon } from 'antd';
import _ from 'lodash';

export default class UploadFormItem extends Component {
  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      const aaa = {
        data: nextProps.value || [],
      };
      return aaa;
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      postList: [],
    };
  }

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };

  handleUpload = file => {
    const { dispatch, config } = this.props;

    // return Promise.resolve(
    dispatch({
      type: 'global/fetchUpload',
      payload: {
        code: config.pageType,
        file,
      },
    }).then(result => {
      if (result.status === 200) {
        this.setState(
          ({ fileList, postList }) => {
            const newPostList = [...postList, result.data];
            return { fileList: [...fileList, file], postList: newPostList };
          },
          () => {
            const { postList } = this.state;
            this.triggerChange(JSON.stringify(_.flatten(postList)));
          }
        );
      }
    });
  };

  render() {
    const {
      disabled,
      config: { multiple },
    } = this.props;
    const { fileList, postList } = this.state;
    const props = {
      onRemove: file => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        const newPostList = postList.slice();
        newFileList.splice(index, 1);
        newPostList.splice(index, 1);
        this.setState({ fileList: newFileList, postList: newPostList });
      },
      beforeUpload: (file, fl) => {
        this.handleUpload(file, fl);
        return false;
      },
      fileList,
      multiple,
    };
    return (
      <span>
        <Upload {...props} disabled={disabled}>
          <Button disabled={disabled}>
            <Icon type="upload" /> 选择文件
          </Button>
        </Upload>
      </span>
    );
  }
}
