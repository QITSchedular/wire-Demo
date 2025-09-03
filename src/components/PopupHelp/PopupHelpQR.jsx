import { Button, Popup } from "devextreme-react";
import { SerialNoBarcode } from "../../pages/Barcode/generateBarcode";
import QrCode from "../../pages/QrCodeGeneration/QrCode";
import { useEffect } from "react";

const PopupHelpQR = ({
  popupVisible,
  onClose,
  qrCodeImage,
  allSerials,
  serialCount,
}) => {
  const serialsArray = allSerials
    ? allSerials.toString().trim().split(/\s+/) // splits by spaces
    : [];

  const midIndex = Math.ceil(serialsArray.length / 2);

  return (
    <div className="PopupHelp">
      <Popup
        visible={popupVisible}
        showTitle={false}
        height={700}
        width={700}
        shading={false}
      >
        <div
          className="popup-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
            borderBottom: "1px solid",
          }}
        >
          <span style={{ fontSize: "20px" }}>Qr Preview</span>
          <Button icon="close" stylingMode="text" onClick={onClose} />
        </div>

        <div
          style={{
            // border: "1px solid #ddd",
            // borderRadius: "4px",
            padding: "10px",
            paddingBottom: "10px",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              color: "#090909ff",
              marginTop: "5px",
              fontWeight: "bolder",
            }}
          >
            MODEL: Tapo C201(IN)
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // height: "calc(100% - 50px)", // take remaining popup height
            gap: "7px",
          }}
        >
          {/* Left barcodes */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              flex: "1",
            }}
          >
            {serialsArray.slice(0, midIndex).map((serial) => (
              <SerialNoBarcode
                key={serial}
                value={serial}
                scale={1}
                barcodeType="code128"
              />
            ))}
          </div>

          {/* Center - QR Code and PCS SN */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "15px",
              padding: "10px",
            }}
          >
            {/* PCS SN label */}
            <div
              style={{
                textAlign: "center",
                fontSize: "16px",
                fontWeight: "bold",
                color: "#000",
              }}
            >
              <div>{serialCount || serialsArray.length}PCS</div>
              <div style={{ marginTop: "5px" }}>SN</div>
            </div>

            <div
              style={{
                width: "2px",
                height: "47px",
                backgroundColor: "#000",
                // margin: "10px 0",
              }}
            ></div>

            <div
              className="qr-image"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "none",
              }}
            >
              <QrCode qrCodeImage={qrCodeImage} />
            </div>

            <div
              style={{
                width: "2px",
                height: "47px",
                backgroundColor: "#000",
                // margin: "10px 0",
              }}
            ></div>
          </div>

          {/* Right barcodes */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              flex: "1",
            }}
          >
            {serialsArray.slice(midIndex).map((serial) => (
              <SerialNoBarcode
                key={serial}
                value={serial}
                scale={1}
                barcodeType="code128"
              />
            ))}
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default PopupHelpQR;
