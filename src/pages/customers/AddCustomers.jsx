import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button as TextBoxButton } from "devextreme-react/text-box";

import { Button, TextBox, SelectBox, Popup } from "devextreme-react";
import "./AddCustomer.scss";
const AddCustomers = () => {
  const [isPopUpVisible, setPopUpVisibility] = useState(false);
  const inputs = useRef([]);
  const [otpLength, setOtpLength] = useState([1, 2, 3, 4, 5, 6]);
  const [time, setTime] = useState(120);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return; // Stop execution if not running

    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsRunning(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup function
  }, [isRunning]); // Only depend on isRunning

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };
  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      index > 0 &&
      inputs.current[index].value === ""
    ) {
      inputs.current[index - 1].focus();
    }
  };

  const handleNumberChange = (e, index) => {
    const value = e.target.value;
    console.log("e", e);
    if (/^[0-9]/.test(value)) {
      if (index < inputs.current.length - 1) {
        inputs.current[index + 1].focus();
      }
    }
  };
  const togglePopUp = () => {
    setPopUpVisibility(!isPopUpVisible);
    if (!isPopUpVisible) {
      setTime(120); // Reset to initial time
      setIsRunning(true); // Restart timer
    }
  };
  return (
    <div className="AddCustomers">
      <div className="app-heading">
        <p>Add Customers </p>
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
        <Link className="breadcrumb" to={"/customer"}>
          Customer
        </Link>{" "}
        / Add Customer
      </div>
      <div className="popup">
        <Popup
          id="pop-up"
          visible={isPopUpVisible}
          hideOnOutsideClick={true}
          onHiding={togglePopUp}
          showCloseButton={true}
          title="Verify an OTP"
          position={"center"}
          onShown={() => (inputs.current[0] ? inputs.current[0].focus() : null)}
        >
          <div className="pop-comp">
            <div className="row1">
              <p className="desc">
                You need to log in again using the new password
              </p>
            </div>
            <div className="row2">
              {otpLength.map((_, index) => (
                <div key={index}>
                  <input
                    className="txt-bx"
                    key={index}
                    mode="text"
                    focusStateEnabled={true}
                    maxLength={1}
                    activeStateEnabled={true}
                    ref={(el) => (inputs.current[index] = el)}
                    onChange={(e) => handleNumberChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                </div>
              ))}
            </div>

            <div className="row3">
              <div className="dg-otp">Didn't get an OTP?&nbsp;</div>
              <div className="retry">Retry in {formatTime(time)}</div>
            </div>
          </div>
        </Popup>
      </div>
      <div className="sectionB">
        <div className="row1">
          <div>
            <p className="left-headings">
              Customer Code <span className="required">*</span>
            </p>
            <TextBox className="txt-bx" label="Customer Code" />
          </div>
          <div>
            <p className="left-headings">
              Customer Name <span className="required">*</span>
            </p>
            <TextBox className="txt-bx" label="Enter name of the customer" />
          </div>
          <div>
            <p className="left-headings">
              Email Address <span className="required">*</span>
            </p>
            <div className="TextBoxWrapper">
              <TextBox
                className="txt-bx arrow"
                label="What's email address?"
              ></TextBox>
              <TextBoxButton></TextBoxButton>
              <span onClick={togglePopUp} class="material-symbols-outlined">
                arrow_forward
              </span>
            </div>
          </div>
        </div>
        <div className="row2">
          <div>
            <p className="left-headings">
              Password <span className="required">*</span>
            </p>
            <TextBox
              mode="Password"
              className="txt-bx"
              label="Enter Password"
            />
          </div>
          <div>
            <p className="left-headings">
              Contact Number <span className="required">*</span>
            </p>
            <TextBox className="txt-bx" label="Contact Number" />
          </div>
          <div>
            <p className="left-headings">
              Status <span className="required">*</span>
            </p>
            <SelectBox className="txt-bx" label="Select Status" />
          </div>
        </div>
      </div>
      <div className="sectionB">
        <div className="row2">
          <div>
            <p className="left-headings">
              Type <span className="required">*</span>
            </p>
            <SelectBox className="txt-bx" label="Type" />
          </div>
          <div>
            <p className="left-headings">
              GST Number <span className="required">*</span>
            </p>
            <TextBox className="txt-bx" label="GST Number" />
          </div>
          <div>
            <p className="left-headings">
              Show total work hours? <span className="required">*</span>
            </p>
            <SelectBox className="txt-bx" label="Select Yes/No" />
          </div>
        </div>
      </div>
      <div className="sectionB">
        <div className="row1">
          <div>
            <p className="left-headings">
              Registered Address <span className="required">*</span>
            </p>
            <TextBox className="txt-bx" label="Registered Address" />
          </div>
          <div>
            <p className="left-headings">
              City <span className="required">*</span>
            </p>
            <TextBox className="txt-bx" label="City" />
          </div>
          <div>
            <p className="left-headings">
              Pin Code <span className="required">*</span>
            </p>
            <TextBox className="txt-bx" label="Pin Code?" />
          </div>
        </div>
        <div className="row2">
          <div>
            <p className="left-headings">
              State <span className="required">*</span>
            </p>
            <SelectBox className="txt-bx" label="State" />
          </div>
          <div>
            <p className="left-headings">
              Country <span className="required">*</span>
            </p>
            <TextBox className="txt-bx" label="Country" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomers;
