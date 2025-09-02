import React, { useState } from "react";
import TabPanel, { Item } from "devextreme-react/tab-panel";
import { TextBox } from "devextreme-react/text-box";
import { Button } from "devextreme-react/button";
import { DataGrid, Editing } from "devextreme-react/data-grid";
import { sub_category_data, categories } from "./data";
import { Link } from "react-router-dom";

import "devextreme/dist/css/dx.light.css";
import "./settings.scss";
const Settings = () => {
  const [isOpen, setIsOpen] = useState({
    categories: false,
    sub_categories: false,
    configuration: false,
  });

  const toggleOpen = (id) => {
    setIsOpen((item) => ({
      ...item,
      [id]: !item[id],
    }));
  };
  return (
    <div className="App">
      <div className="app-heading">
        <p>Settings </p>
      </div>
      <div className="sub-heading">Settings</div>
      <TabPanel id="tab-panel">
        <Item title={"General"}>
          <div className="Configuration">
            <div className="Configuration-heading">
              <p className="setting-heading">Configuration</p> &nbsp; &nbsp;
              <span
                className="material-symbols-outlined"
                onClick={() => toggleOpen("categories")}
              >
                {isOpen.categories ? "expand_circle_up" : "expand_circle_down"}
              </span>
            </div>
            <div>
              {isOpen.categories && (
                <div className="textBox">
                  <div className="label">
                    Category Name <span className="required">*</span>
                  </div>

                  <div className="config">
                    <TextBox
                      className="text-box"
                      labelMode="floating"
                      label="Enter Category Name"
                    ></TextBox>
                    <Button className="add-button" text="Add category"></Button>
                  </div>
                  <div className="dataGrid">
                    <DataGrid
                      id="dataGrid_sub_categories"
                      dataSource={categories}
                    >
                      <Editing allowDeleting={true} allowUpdating={true} />
                    </DataGrid>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="Configuration">
            <div className="heading">
              <div className="Configuration-heading">
                <p className="setting-heading">Sub-Configuration</p> &nbsp;
                &nbsp;
                <span
                  className="material-symbols-outlined"
                  onClick={() => toggleOpen("sub_categories")}
                >
                  {isOpen.sub_categories
                    ? "expand_circle_up"
                    : "expand_circle_down"}
                </span>
              </div>
              <div className="link">
                <Link to={""}>Add Sub-Category</Link>{" "}
              </div>
            </div>
            <div>
              {isOpen.sub_categories && (
                <div className="dataGrid">
                  <DataGrid
                    id="dataGrid_sub_categories"
                    dataSource={sub_category_data}
                  ></DataGrid>
                </div>
              )}
            </div>
          </div>
        </Item>
        <Item title={"Configuration"}>
          <div className="Configuration">
            <div className="Configuration-heading">
              <p className="setting-heading">Assign Email for Ticket Updates</p>{" "}
              &nbsp; &nbsp;
              <span
                className="material-symbols-outlined"
                onClick={() => toggleOpen("configuration")}
              >
                {isOpen.configuration
                  ? "expand_circle_up"
                  : "expand_circle_down"}
              </span>
            </div>
            <div>
              {isOpen.configuration && (
                <div className="textBox">
                  <div className="label">Primary Email Address</div>

                  <TextBox
                    className="text-box"
                    label="xyz@example.com"
                    labelMode="floating"
                  />
                  <div className="label">Secondary Email Address</div>

                  <TextBox
                    className="text-box"
                    label="abc@example.com"
                    labelMode="floating"
                  />
                  <Button text="SAVE"></Button>
                </div>
              )}
            </div>
          </div>
        </Item>
      </TabPanel>
    </div>
  );
};

export default Settings;
