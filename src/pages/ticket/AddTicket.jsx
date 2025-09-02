import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid, Button } from "devextreme-react";
import SelectBox from "devextreme-react/select-box";
import "./AddTicket.scss";
import "devextreme/dist/css/dx.light.css";

import { tickets } from "./data";
import {
  Toolbar,
  Selection,
  Item,
  ColumnFixing,
  Column,
} from "devextreme-react/data-grid";

const AddTicket = () => {
  const [filterData, setFilterData] = useState(tickets);
  const navigate = useNavigate();

  const handleNavigate = () => navigate("/createNewTicketPage");
  const handleTicketDetail = () => navigate("/ticketDetail");

  const allStatus = [
    "Pending",
    "Solved",
    "External",
    "Open",
    "Escalated",
    "Work In Progress",
  ];

  const total = () => `In total, you have ${tickets.length}`;

  return (
    <div className="App">
      <div className="app-heading">
        <p>Add Ticket</p>
        <Button onClick={handleNavigate} className="create-new" type="danger">
          <span className="material-symbols-outlined">add</span> Create New
        </Button>
      </div>
      <div className="sub-heading">Tickets</div>

      <DataGrid
        id="dataGrid"
        dataSource={filterData}
        columnAutoWidth={true}
        keyExpr={"TICKET_ID"}
        showBorders={true}
      >
        <Column
          dataField={"TICKET_ID"}
          caption={"TICKET ID"}
          cellRender={(e) => (
            <>
              {e.data.TICKET_ID}{" "}
              <span
                onClick={handleTicketDetail}
                className="material-symbols-outlined"
              >
                north_east
              </span>
            </>
          )}
        />
        <Column
          dataField={"STATUS"}
          caption={"STATUS"}
          cellRender={(e) => (
            <span className="statusColor" data-type={e.value}>
              <span data-type={e.value}>{e.value ?? "-"}</span>
            </span>
          )}
        />
        <Column dataField={"SUBJECT"} />
        <Column dataField={"REQUESTED_ON"} />
        <Column dataField={"PRIORITY"} />
        <Selection mode="multiple" />
        <ColumnFixing enabled={true} />
        <Toolbar className="toolbar">
          <Item location="before" render={total} />
          <Item location="after" name="searchPanel" />
          <Item location="after">
            <SelectBox
              dataSource={allStatus}
              label="All Status"
              labelMode="floating"
              grouped={false}
              onSelectionChanged={(e) => {
                const selectedStatus = e.selectedItem || "";
                setFilterData(
                  selectedStatus
                    ? tickets.filter((ticket) =>
                        ticket.STATUS.includes(selectedStatus)
                      )
                    : tickets
                );
              }}
            />
          </Item>
        </Toolbar>
      </DataGrid>
    </div>
  );
};

export default AddTicket;
