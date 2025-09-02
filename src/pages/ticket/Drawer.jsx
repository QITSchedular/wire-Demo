import React from "react";
import "./AddTicket.scss";
import { FileUploader, TextArea, Button } from "devextreme-react";

const Drawer = ({ isOpen, setIsOpen }) => {
  return (
    <div className={`Add_notes ${isOpen ? "open" : "close"}`}>
      <div className="d-attach">
        <div className="drawer">
          <p className="ad-dc-heading">Add Notes</p>
          <span
            className="material-symbols-outlined"
            onClick={() => setIsOpen(false)}
          >
            close
          </span>
        </div>
        <div>
          <p className="heading">All Details</p>
          <TextArea label="Add Description" minHeight={150} maxHeight={50} />
          <p>Attachment</p>
          <FileUploader />
        </div>
      </div>
      <div className="header-btn">
        <Button className="create-new">Save Details</Button>&nbsp;&nbsp;
        <Button
          className="cancel"
          type="normal"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Drawer;
