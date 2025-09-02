import React from "react";
import { HtmlEditor, Button, TextBox, SelectBox } from "devextreme-react";
import { Toolbar, Item } from "devextreme-react/html-editor";
import { Link } from "react-router-dom";
import FileUploader from "devextreme-react/file-uploader";
import "devextreme/dist/css/dx.light.css";

const markup = `
    <div>
     
    </div>
`;

const CreateNewTicket = () => {
  return (
    <div className="App">
      <div className="app-heading">
        <p>Add Ticket </p>
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
          Tickets
        </Link>{" "}
        / Add New
      </div>

      <div className="card-section">
        <div className="left-section">
          <p className="left-headings">
            Subject <span className="required">*</span>
          </p>
          <TextBox className="txt-bx" label="Add the subject" />
          <p className="left-headings">
            Description <span className="required">*</span>
          </p>
          <HtmlEditor className="htmlEditor" defaultValue={markup}>
            <Toolbar multiline={true}>
              <Item name="bold" />
              <Item name="italic" />
              <Item name="link" />
              <Item name="image" />
              <Item name="codeblock" />
              <Item name="underline" />
            </Toolbar>
          </HtmlEditor>
        </div>
        <div className="right-section">
          <p>
            Priority <span className="required">*</span>
          </p>
          <SelectBox
            placeholder="Select Priority"
            dataSource={["1", "2", "3"]}
          />
          <p>
            Category <span className="required">*</span>
          </p>
          <SelectBox
            placeholder="Select Category"
            dataSource={["Category1", "Category2", "Category3"]}
          />
          <p>
            Sub - Category <span className="required">*</span>
          </p>
          <SelectBox
            placeholder="Select Sub - Category"
            dataSource={["Sub-Category1", "Sub-Category2", "Sub-Category3"]}
          />
          <div className="upload">
            <p>Upload Attachment</p>
            <FileUploader accept={"*"} uploadMode="useButtons"></FileUploader>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewTicket;
