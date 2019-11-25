/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { Row, Col, Form, Button } from "antd";
import { connect } from "dva";
import uuidV4 from "uuid/v4";
import FormItemFactory from "./formItemFactory";
import styles from "./index.less";

@connect(() => ({}))
class ConfigForm extends Component {
  render() {
    const { form, formBasicConfig, renderForm, btnList, dispatch } = this.props;
    const { getFieldDecorator, setFieldsValue, getFieldValue } = form;
    const { grid, formItemWidth, formName } = formBasicConfig;
    const formItemLayout = formItemWidth;
    const revBtnList = Array.isArray(btnList) ? [...btnList] : [];
    return (
      <Form {...formItemLayout} className={styles.form}>
        <Row className={styles.formRow}>
          {Array.isArray(renderForm) &&
            renderForm.map(item => {
              if (item.type === "H1") {
                return (
                  <Col
                    span={24}
                    className={styles.myH1}
                    key={`${formName}_${item.key}`}
                  >
                    {item.label}
                  </Col>
                );
              }
              if (item.type === "H2") {
                return (
                  <Col
                    span={24}
                    className={styles.myH2}
                    key={`${formName}_${item.key}`}
                  >
                    <span style={{ borderBottom: "2px solid #91d5ff" }}>
                      {item.label}
                    </span>
                  </Col>
                );
              }

              const newGrid = item.layout ? item.layout.grid : grid;
              return (
                <Col {...newGrid} key={`${formName}_${item.key}`}>
                  <FormItemFactory
                    dispatch={dispatch}
                    getFieldDecorator={getFieldDecorator}
                    config={item}
                    setFieldsValue={setFieldsValue}
                    getFieldValue={getFieldValue}
                  />
                </Col>
              );
            })}
          {revBtnList && Array.isArray(revBtnList) && revBtnList.length > 0 && (
            <Col
              xs={8}
              sm={8}
              md={8}
              lg={8}
              xl={6}
              xxl={6}
              className={styles.fucBtn}
            >
              {revBtnList.map(btn => (
                <Button
                  className={styles.fucBtnItem}
                  type={btn.type}
                  onClick={() => btn.bindFuction(form)}
                  key={uuidV4()}
                >
                  {btn.label}
                </Button>
              ))}
            </Col>
          )}
        </Row>
      </Form>
    );
  }
}

export default Form.create({ name: "form_factory" })(ConfigForm);
