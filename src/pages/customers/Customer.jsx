import React, { useState } from "react";
import "./AddCustomer.scss";
import { Button } from "devextreme-react";
import { customers } from "./data";
import SelectBox from "devextreme-react/select-box";

import {
  DataGrid,
  Toolbar,
  Selection,
  Item,
  Column,
  SearchPanel,
} from "devextreme-react/data-grid";
import { useNavigate } from "react-router-dom";
const Customer = () => {
  const [customerData, setCustomerData] = useState(customers);
  const [filterData, setFilterData] = useState(customerData);
  const nav = useNavigate();
  const total = () => `In total, you have ${customerData.length} customers.`;
  const statusArr = ["Active", "Inactive", "All Status"];
  const passwordStatusArr = ["All Password Status", "Pending", "Changed"];
  return (
    <div className="add-customers">
      <div className="app-heading">
        <p>Customers</p>
        <div className="header-btn">
          <Button
            className="create-new"
            type="danger"
            onClick={() => nav("/add-customer")}
          >
            Add Customer
          </Button>
        </div>
      </div>
      <p className="sub-heading">Customers</p>
      <div className="dataGrid">
        <DataGrid
          dataSource={filterData}
          columnAutoWidth={true}
          keyExpr={"ID"}
          showBorders={false}
        >
          <Column dataField={"CUSTOMER_NAME"} />
          <Column
            dataField={"STATUS"}
            caption={"STATUS"}
            cellRender={(e) => (
              <span className="status-text" data-type={e.value}>
                <p className="dot">.</p> &nbsp;
                <span data-type={e.value}>{e.value ?? "-"}</span>
              </span>
            )}
          />
          <Column dataField={"CODE"} />
          <Column dataField={"EMAIL_ID"} />
          <Column dataField={"OTP_VERIFICATION"} />
          <SearchPanel visible={true} width={140} placeholder="Search..." />
          <Selection mode={"multiple"} />

          <Toolbar>
            <Item location="before" render={total} />
            <Item location="after" name="searchPanel" />
            <Item location="after" name="selectBox">
              <SelectBox
                dataSource={statusArr}
                label="All Status"
                labelMode="floating"
                grouped={false}
                onSelectionChanged={(e) => {
                  const selectedStatus = e.selectedItem || "";
                  console.log("E", e);

                  setFilterData(
                    selectedStatus
                      ? selectedStatus === "All Status"
                        ? customerData
                        : customerData.filter((customer) =>
                            customer.STATUS.includes(selectedStatus)
                          )
                      : customerData
                  );
                }}
              />
            </Item>
            <Item location="after" name="selectBox">
              <SelectBox
                dataSource={passwordStatusArr}
                label="All Password Status"
                labelMode="floating"
                grouped={false}
              />
            </Item>
          </Toolbar>
        </DataGrid>
      </div>
    </div>
  );
};

export default Customer;
