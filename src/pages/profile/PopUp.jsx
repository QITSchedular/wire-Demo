import React, { useState, useEffect, useRef } from "react";
import "./popUp.scss";
import { TextBox } from "devextreme-react";

const PopUp = ({ otpLength }) => {
  const [time, setTime] = useState(120);
  const [isRunning, setIsRunning] = useState(true);
  const input = useRef([]);

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

  const handleBackSpace = (e, i) => {
    if (e.key == "Backspace" && i > 0 && input.current[i].value === "") {
      input.current[i - 1].focus();
    }
  };

  const handleInput = (e, i) => {
    // const value = e.target.value;
    // console.log("value: " + value);
    console.log("e: ", e);

    // if (/^[0-9]/.test(value)) {
    //   if (i < input.current.length - 1) {
    //     input.current[i + 1].focus();
    //   }
    // }
  };

  return (
    <div className="pop-comp">
      <div className="row1">
        <p className="desc">You need to log in again using the new password</p>
      </div>

      <div className="row2">
        {otpLength.map((_, i) => (
          <div key={i}>
            <TextBox
              className="txt-bx"
              mode="text"
              focusStateEnabled={true}
              maxLength={1}
              activeStateEnabled={true}
              ref={(e) => (input.current[i] = e)}
              onChange={(e) => handleInput(e)}
              onKeyDown={(e) => handleBackSpace(e)}
            />
          </div>
        ))}
      </div>

      <div className="row3">
        <div className="dg-otp">Didn't get an OTP?&nbsp;</div>
        <div className="retry">Retry in {formatTime(time)}</div>
      </div>
    </div>
  );
};

export default PopUp;
