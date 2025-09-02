import React, { useEffect, useState } from "react";
import { Button, SelectBox, TabPanel } from "devextreme-react";
import { Link } from "react-router-dom";
import "devextreme/dist/css/dx.light.css";
import { Item } from "devextreme-react/tab-panel";
import Drawer from "./Drawer";
const TicketDetail = () => {
  const data = ["All Time", "All Notes", "1", "2"];
  const [isOpen, setIsOpen] = useState(false);
  const toggleAddDoc = () => setIsOpen((prev) => !prev);
  useEffect(() => {
    console.log("Open", isOpen);
  });
  return (
    <div className="App">
      {isOpen && (
        <Drawer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          toggleAddDoc={toggleAddDoc}
        />
      )}
      <div className="app-heading">
        <p>Ticket Details</p>
        <div className="header-btn">
          <Button className="create-new" type="danger">
            Save Details
          </Button>
          <Button className="cancel" type="normal">
            Cancel
          </Button>
        </div>
      </div>
      <div className="sub-heading">
        <Link className="breadcrumb" to={"/addTicket"}>
          Tickets&nbsp;
        </Link>
        /&nbsp;Ticket Details
      </div>
      <div className="details">
        <div className="all-details">
          <p className="detail-heading">All Details</p>
          <p className="heading">
            Status <span className="required">*</span>
          </p>
          <p className="info">Solved</p>
          <p className="heading">
            Priority <span className="required">*</span>
          </p>
          <p className="info">High</p>
          <p className="heading">
            Category <span className="required">*</span>
          </p>
          <p className="info">Category - A</p>
          <p className="heading">
            Sub - Category <span className="required">*</span>
          </p>
          <p className="info">Sub Category - A</p>
        </div>
        <div className="tab-panel">
          <TabPanel animationEnabled={true} swipeEnabled={true}>
            <Item className="panel-item" title={"Activities"}>
              <div className="pi">
                <p className="acti">Today</p>
                <p className="heading">
                  1. Rani Patel changed the status to Work in Progress
                </p>
                <p className="info act">Created on 22nd July 2024, By Mittal</p>
                <p className="acti">Yesterday</p>
                <p className="heading">2. Added some notes</p>
                <p className="info act">Created on 22nd July 2024, By Mittal</p>
                <p className="acti">From 22nd July to 28th July 2024</p>
                <p className="heading">
                  3. Rani Patel changed the status to Work in Progress
                </p>
                <p className="info act">Created on 22nd July 2024, By Mittal</p>
                <p className="edited">Edited on 30th July, By Mushka</p>
              </div>
            </Item>
            <Item title={"Query"}>
              <div className="pi">
                <p className="heading">Subject</p>
                <p className="info">Add the subject</p>
                <p className="heading">Description</p>
                <p className="info">Add the subject</p>
              </div>
            </Item>
            <Item title={"Notes"}>
              <div className="pi">
                <div className="notes">
                  <div className="ns">
                    <span className="select">
                      <SelectBox
                        className="SelectBox"
                        dataSource={data}
                        defaultValue={data[0]}
                      ></SelectBox>
                    </span>
                    <span className="select">
                      <SelectBox
                        className="SelectBox"
                        dataSource={data}
                        defaultValue={data[1]}
                      ></SelectBox>
                    </span>
                    <span className="attach">
                      <span class="material-symbols-outlined">attach_file</span>
                    </span>
                  </div>
                  <div className="add-doc-i" onClick={toggleAddDoc}>
                    <span class="material-symbols-outlined addFile">
                      add_box
                    </span>
                    Add Notes
                  </div>
                </div>
                <p className="acti">Today</p>
                <p className="heading">
                  1. Rani Patel changed the status to Work in Progress
                </p>
                <p className="info act">Created on 22nd July 2024, By Mittal</p>
                <p className="acti">Yesterday</p>
                <p className="heading">2. Added some notes</p>
                <p className="info act">Created on 22nd July 2024, By Mittal</p>
              </div>
            </Item>
            <Item title={"Documents"}>
              <div className="pi">
                <div className="add-doc">
                  <p>Uploaded Documents (30)</p>
                  <div className="add-doc-i">
                    <span class="material-symbols-outlined addFile">
                      add_box
                    </span>
                    Add Document
                  </div>
                </div>
                <div className="doc">
                  <div className="s">
                    <span class="material-symbols-outlined">description</span>
                    <div className="doc-a">
                      <p className="doc-b">File_Name.pdf</p>
                      <p className="doc-c">3.5 MB</p>
                    </div>
                  </div>
                  <div>
                    <p className="doc-p">By Customer Name</p>
                  </div>
                </div>
                <div className="doc">
                  <div className="s">
                    <span class="material-symbols-outlined">description</span>
                    <div className="doc-a">
                      <p className="doc-b">File_Name.pdf</p>
                      <p className="doc-c">3.5 MB</p>
                    </div>
                  </div>
                  <div>
                    <p className="doc-p">By Customer Name</p>
                  </div>
                </div>
                <div className="doc">
                  <div className="s">
                    <span class="material-symbols-outlined">description</span>
                    <div className="doc-a">
                      <p className="doc-b">File_Name.pdf</p>
                      <p className="doc-c">3.5 MB</p>
                    </div>
                  </div>
                  <div>
                    <p className="doc-p">By Customer Name</p>
                  </div>
                </div>
              </div>
            </Item>
            <Item title={"Time Spent"}>
              <div className="pi">
                <SelectBox className="sb" placeholder="All Time"></SelectBox>
                <p className="acti">Today</p>
                <p className="heading">
                  1. Rani Patel changed the status to Work in Progress
                </p>
                <p className="info act">Created on 22nd July 2024, By Mittal</p>
                <p className="acti">Yesterday</p>
                <p className="heading">1. Added some notes</p>
                <p className="info act">Created on 22nd July 2024, By Mittal</p>
                <p className="heading">
                  2. Rani Patel changed the status to Work in Progress
                </p>
                <p className="info act">Created on 22nd July 2024, By Mittal</p>
                <p className="edited">Edited on 30th July, By Mushka</p>
              </div>
            </Item>
          </TabPanel>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
