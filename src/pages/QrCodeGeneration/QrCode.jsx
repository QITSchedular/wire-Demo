import React, { useEffect } from "react";

const QrCode = ({ qrCodeImage }) => {
  useEffect(() => {
    console.log("qrCodeImage>>>>>>>>>>>>", qrCodeImage);
  });

  return (
    <div>
      <div className="qr-image">
        {qrCodeImage && (
          <div>
            <img
              src={qrCodeImage}
              alt="QR Code"
              style={{
                width: "250px",
                height: "250px",
                border: "none",
                borderRadius: "unset",
                marginBottom: "10px",
              }}
            />
            {/* <div className="info">{selectGrpo?.qR_Code}</div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default QrCode;
