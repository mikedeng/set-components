import React from "react";
import { Icon, Menu } from "antd";
import stylesCheckItem from "../CheckItem/index.less";
import Checkbox from "../Checkbox";
import { isUrl, omitStr } from "../utils";

const { SubMenu } = Menu;

const MyMenu = ({
  onChange,
  onToggleOpen,
  data,
  value,
  checked,
  indeterminate,
  open,
  onTitleClick
}) => {
  if (Object.keys(data).length === 0) {
    return null;
  }

  const newValues = value.map(e => e.toString());
  return (
    <Menu
      key={data.code.toString()}
      mode="inline"
      theme="dark"
      className={
        checked && indeterminate
          ? stylesCheckItem.menuSelected
          : stylesCheckItem.menu
      }
      onClick={onChange}
      selectedKeys={newValues}
      openKeys={open ? [data.code.toString()] : []}
      multiple
      subMenuCloseDelay={2}
    >
      <SubMenu
        key={data.code.toString()}
        popupClassName="rh-menu-popup"
        // style={{ height: "100%", lineHeight: "auto" }}
        title={
          <span title={data.name}>
            {do {
              if (data.icon) {
                if (isUrl(data.icon)) {
                  return (
                    <img
                      src={data.icon}
                      alt="icon"
                      style={{ display: "inline-block", width: 20, height: 20 }}
                    />
                  );
                }

                return <Icon type={data.icon} />;
              }

              return null;
            }}
            {omitStr(data.name, 4)}
          </span>
        }
        onMouseEnter={() => {
          onToggleOpen(true);
        }}
        onMouseLeave={() => {
          onToggleOpen(false);
        }}
        onTitleClick={onTitleClick}
      >
        {data.children?.map(subItem => {
          return (
            <Menu.Item key={subItem.code.toString()} title={subItem.name}>
              <Checkbox
                checked={newValues.indexOf(subItem.code.toString()) !== -1}
              />
              <span>{subItem.name}</span>
            </Menu.Item>
          );
        })}
      </SubMenu>
    </Menu>
  );
};

export default MyMenu;
