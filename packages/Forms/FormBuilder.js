import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Col, Form, Icon, Input, Row, Tooltip } from 'antd';
import pick from 'lodash/pick';
import { TweenOneGroup } from 'rc-tween-one';

const FormItem = Form.Item;

export function RenderFormItem(props) {
  const { formItem, form } = props;
  const { key, label, tooltip } = formItem;

  const formItemProps = {
    key,
    ...formItem.formItemLayout,
    ...pick(formItem, [
      'label',
      'help',
      'extra',
      'labelCol',
      'wrapperCol',
      'colon',
      'hasFeedback',
      'validateStatus',
      'hasFeedback',
    ]),
    ...formItem.formItemProps,
  };

  const rules = Array.isArray(formItem.rules) ? formItem.rules.slice() : [];
  if (formItem.required) {
    // Handle rules
    rules.push({ required: true, message: `请输入 ${label || key}` });
  }
  // getFieldDecorator(id, options) 参数
  const options = {
    ...pick(formItem, [
      'getValueFromEvent',
      'initialValue',
      'normalize',
      'trigger',
      'validateFirst',
      'validateTrigger',
      'valuePropName',
    ]),
    rules,
    ...formItem.options,
  };

  const componentProps = {
    ...props?.componentProps,
    ...formItem.componentProps,
  };

  componentProps.disabled = componentProps.disabled || formItem.disabled || props?.disabled;

  if (formItem.component === undefined) formItem.component = Input;
  // 渲染label
  const displayLabel = tooltip ? (
    <span>
      {label}
      &nbsp;
      <Tooltip title={tooltip}>
        <Icon type="question-circle-o" />
      </Tooltip>
    </span>
  ) : (
      label
    );

  return (
    <FormItem {...formItemProps} label={displayLabel}>
      {form.getFieldDecorator(key, options)(
        <formItem.component {...componentProps}>{formItem.children}</formItem.component>,
      )}
      {formItem.suffix}
    </FormItem>
  );
}

class SimpleFormBuilder extends PureComponent {
  constructor(props) {
    super(props);
    this.renderLayout = this.renderLayout.bind(this);
  }

  renderLayout(formItem, index) {
    const { span, visible } = formItem;
    const colSpan = span ? { span } : { ...formItem.colLayout, ...this.props?.colLayout };

    if (visible === false) {
      if (colSpan.style) {
        colSpan.style.display = 'none';
      } else {
        colSpan.style = { display: 'none' };
      }
    }

    if ('render' in formItem) {
      if (typeof formItem.render === 'function') {
        return (
          formItem.render(this.props?.form) && (
            <Col key={formItem.key || index} {...colSpan}>
              <RenderFormItem formItem={formItem} {...this.props} />
            </Col>
          )
        );
      }
      return (
        formItem.render && (
          <Col key={formItem.key || index} {...colSpan}>
            <RenderFormItem formItem={formItem} {...this.props} />
          </Col>
        )
      );
    }

    return (
      <Col key={formItem.key || index} {...colSpan}>
        <RenderFormItem formItem={formItem} {...this.props} />
      </Col>
    );
  }

  render() {
    return (
      <Row gutter={this.props?.gutter}>
        <TweenOneGroup appear={false}>{this.props?.items.map(this.renderLayout)}</TweenOneGroup>
      </Row>
    );
  }
}

SimpleFormBuilder.propTypes = {
  form: PropTypes.object.isRequired,
  gutter: PropTypes.number,
  colLayout: PropTypes.object,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string,
      tooltip: PropTypes.string,
      required: PropTypes.bool,
      disabled: PropTypes.bool,
      visible: PropTypes.bool,
      component: PropTypes.func,
      componentProps: PropTypes.object,
      span: PropTypes.number,
      colLayout: PropTypes.object,
      formItemLayout: PropTypes.object,
      formItemProps: PropTypes.object,
      render: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    }),
  ).isRequired,
};

SimpleFormBuilder.defaultProps = {
  gutter: 0,
  colLayout: { span: 24 },
};

export default SimpleFormBuilder;
