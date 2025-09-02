import "./profile.scss";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "devextreme-react/button";
import { Link } from "react-router-dom";
import { FileUploader, SelectBox, TextBox, Popup } from "devextreme-react";
// import PopUp from "./PopUp";

const Profile = () => {
  const inputs = useRef([]);

  const [isPopUpVisible, setPopUpVisibility] = useState(false);
  const [otpLength, setOtpLength] = useState([1, 2, 3, 4, 5, 6]);
  const [photo, setPhoto] = useState(
    "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png"
  );
  const [time, setTime] = useState(120);
  const [isRunning, setIsRunning] = useState(true);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [isRunning, time]);

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
    // console.log("value", value);

    // If the entered value is a number, move to the next input
    if (/^[0-9]/.test(value)) {
      if (index < inputs.current.length - 1) {
        inputs.current[index + 1].focus();
      }
    }
  };
  const togglePopUp = () => {
    setPopUpVisibility(!isPopUpVisible);
  };

  // Function to handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="App">
      <div className="app-heading">
        <p>Profile</p>
        <div className="header-btn">
          <Button className="create-new" type="danger">
            Save Details
          </Button>
          <Button className="cancel" type="normal">
            Cancel
          </Button>
        </div>
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
                <div>
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

      <div className="sectionA">
        <div className="profile-details">
          <div className="photo">
            <img src={photo} alt="Profile" className="profile-img" />
            <span
              id="add-photo"
              className="material-symbols-outlined"
              onClick={() => document.getElementById("file-input").click()}
              style={{ cursor: "pointer" }}
            >
              add_a_photo
            </span>
            <input
              type="file"
              id="file-input"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            ></input>
          </div>
          <div className="info">
            <p className="name">Jhon Doe</p>
            <p>Jhon.Doe@gmail.com</p>
            <Link className="breadcrumb" onClick={togglePopUp}>
              Password Change Request
            </Link>
          </div>
        </div>
        <div className="customer-code">
          <div className="row">
            <p className="heading">
              Customer Code <span className="required">*</span>
            </p>
            <p className="info">What's the code?</p>

            <p className="heading">
              Contact Number <span className="required">*</span>
            </p>
            <p className="info">Contact Number</p>
          </div>
          <div className="row">
            <p className="heading">
              Customer Name <span className="required">*</span>
            </p>
            <p className="info">What's the name?</p>

            <p className="heading">
              Type <span className="required">*</span>
            </p>
            <p className="info">Select Type</p>
          </div>
          <div className="row">
            <p className="heading">
              Email Address <span className="required">*</span>
            </p>
            <p className="info">What’s email address?</p>

            <p className="heading">
              GST Number <span className="required">*</span>
            </p>
            <p className="info">GST Number</p>
          </div>
        </div>
      </div>
      <div className="sectionB">
        <div className="row1">
          <div>
            <p className="left-headings">
              Registered Address <span className="required">*</span>
            </p>
            <TextBox className="txt-bx" label="Company Address" />
          </div>
          <div>
            <p className="left-headings">
              City <span className="required">*</span>
            </p>
            <TextBox className="txt-bx" label="Enter City" />
          </div>
          <div>
            <p className="left-headings">
              Pin Code <span className="required">*</span>
            </p>
            <TextBox className="txt-bx" label="Enter Pincode" />
          </div>
        </div>
        <div className="row2">
          <div>
            <p className="left-headings">
              State <span className="required">*</span>
            </p>
            <SelectBox className="txt-bx" label="Select State" />
          </div>
          <div>
            <p className="left-headings">
              Country <span className="required">*</span>
            </p>
            <SelectBox className="txt-bx" label="Select Country" />
          </div>
        </div>
        <div className="row2">
          <div>
            <p className="left-headings">Logo</p>
            <FileUploader uploadMode="useButtons" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
