import React, { useState, useRef, useEffect } from "react";
import "./profile.scss";
import TextBox from "devextreme-react/text-box";
import SelectBox from "devextreme-react/select-box";
import { Button } from "devextreme-react/button";
import IconShow from "./IconShow";
import "devextreme/dist/css/dx.light.css";
import Popup from "devextreme-react/popup";

export default function Profile() {
  const states = ["State-1", "State-2", "State-3", "State-4"];

  //For Inputs
  const inputs = useRef([]);

  const countries = ["India", "Pakistan", "Nepal", "Japan", "Indonessia"];

  const [popupVisible, setPopupVisible] = useState(false);

  const showPopup = () => {
    setPopupVisible(true);
  };

  const hidePopup = () => {
    setPopupVisible(false);
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
    // If the entered value is a number, move to the next input
    if (/^[0-9]/.test(value)) {
      if (index < inputs.current.length - 1) {
        inputs.current[index + 1].focus();
      }
    }
  };

  //For timer
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <React.Fragment>
      <div className="profile-container">
        <div className="semi-container">
          <h2>Profile</h2>
          <div className="button-group">
            <div>
              <Button className="cancelButton" text="Cancel" />
            </div>
            <div>
              <Button className="submitButton" text="Save Details" />
            </div>
          </div>
        </div>
        <div className={"content-block dx-card responsive-paddings"}>
          <div className="personalInfo">
            <div className={"form-avatar"}>
              <IconShow />
            </div>
            <div className="addInfo">
              <h2
                className="profile-name"
                profile-text
                style={{ fontSize: "20px", width: "55px", lineHeight: "30px" }}
              >
                Name
              </h2>
              <h6 className="profile-text" style={{ fontSize: "16px" }}>
                Email Id:@gmail.com
              </h6>
              <a
                className="anchorTag"
                href="javascript:void(0);"
                onClick={showPopup}
              >
                Password Change Request
              </a>
              <Popup
                className="popUp"
                visible={popupVisible}
                onHiding={hidePopup}
                onShown={() => {
                  if (inputs.current[0]) {
                    inputs.current[0].focus();
                  }
                }}
                dragEnabled={false}
                hideOnOutsideClick={true}
                showTitle={false}
                showCloseButton={true}
                title="Verify an OTP"
                container=".dx-viewport"
                width={480}
                height={260}
              >
                <div className="popUp-content">
                  <header class="textCont">
                    <h1>Verify an OTP</h1>
                    <div className="otpDesc">
                      You need to log in again using a new password
                    </div>
                  </header>
                  <button
                    type="button"
                    className="closeBtn"
                    onClick={hidePopup}
                    style={{
                      background: "transparent",
                      fontSize: "40px",
                      cursor: "pointer",
                    }}
                    aria-label="Close"
                  >
                    &times;
                  </button>
                </div>
                <div className="lowerDiv">
                  <div className="smallContainer">
                    <div className="inputFields">
                      {Array.from({ length: 6 }, (_, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength="1"
                          className="no-spinner"
                          placeholder="X"
                          ref={(el) => (inputs.current[index] = el)} // Store reference to each input
                          onChange={(e) => handleNumberChange(e, index)} // Handle number change
                          onKeyDown={(e) => handleKeyDown(e, index)} // Handle keydown event for backspace
                        />
                      ))}
                      <div className="texts">
                        <p className="otpText">Didn't get a OTP?</p>
                        <p className="retryText">
                          &nbsp;Retry in {formatTime(timeLeft)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Popup>
            </div>
          </div>
          <div className="content-block form-section">
            <div className="row">
              <div className="input-group">
                <label htmlFor="customer-code">Customer Code *</label>
                <div className="plain-text-box">What's the Code?</div>
              </div>
              <div className="input-group">
                <label htmlFor="customer-name">Customer Name *</label>
                <div className="plain-text-box">What's the name?</div>
              </div>
              <div className="input-group">
                <label htmlFor="email-address">Email Address *</label>
                <div className="plain-text-box">What's Email Address?</div>
              </div>
              <div className="input-group">
                <label htmlFor="contact-number">Contact Number *</label>
                <div className="plain-text-box">Contact Number</div>
              </div>
              <div className="input-group">
                <label htmlFor="type">Type *</label>
                <div className="plain-text-box">Select type</div>
              </div>
              <div className="input-group">
                <label htmlFor="gst-number">GST Number</label>
                <div className="plain-text-box">GST Number</div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={"content-block dx-card responsive-paddings form-section"}
        >
          <div className="row">
            <div className="input-group">
              <label htmlFor="Regadd">Registered Address *</label>
              <TextBox
                id="Regadd"
                height={48}
                className="myBox"
                placeholder="Company Address"
              />
            </div>
            <div className="input-group">
              <label htmlFor="city">City *</label>
              <TextBox
                id="city"
                height={48}
                className="myBox"
                placeholder="Enter City"
              />
            </div>
            <div className="input-group">
              <label htmlFor="pin-code">Pin Code *</label>
              <TextBox
                id="pin-code"
                className="myBox"
                height={48}
                placeholder="Enter Pin Code"
              />
            </div>
          </div>
          <div className="row">
            <div className="input-group">
              <label htmlFor="state">State *</label>
              <SelectBox
                id="state"
                className="mySel"
                items={states}
                height={48}
                placeholder="Select State"
                showClearButton={true}
              />
            </div>
            <div className="input-group">
              <label htmlFor="country">Country *</label>
              <SelectBox
                id="country"
                className="mySel"
                height={48}
                items={countries}
                placeholder="Select Country"
                showClearButton={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="input-group">
              <label htmlFor="logo">Logo</label>
              <div className="file-upload">
                <input className="fileUploader" type="file" />
                <span className="uploadText">
                  Drag file here or <a href="/">Upload</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
