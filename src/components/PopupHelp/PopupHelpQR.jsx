import { Button, Popup } from "devextreme-react";
import { SerialNoBarcode } from "../../pages/Barcode/generateBarcode";
import QrCode from "../../pages/QrCodeGeneration/QrCode";
import { useEffect } from "react";

const PopupHelpQR = ({ popupVisible, onClose, qrCodeImage, allSerials }) => {
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // height: "calc(100% - 50px)", // take remaining popup height
            gap: "7px",
          }}
        >
          {/* Left barcodes */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {serialsArray.slice(0, midIndex).map((serial) => (
              <SerialNoBarcode
                key={serial}
                value={serial}
                scale={2}
                barcodeType="code128"
              />
            ))}
          </div>

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

          {/* Right barcodes */}
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {serialsArray.slice(midIndex).map((serial) => (
              <SerialNoBarcode
                key={serial}
                value={serial}
                scale={2}
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
