import { Button, Popup } from "devextreme-react";
import { SerialNoBarcode } from "../../pages/Barcode/generateBarcode";
import { useEffect } from "react";

const PopupHelpComponent = ({ popupVisible, onHiding, serialNo, onClose }) => {
  return (
    <div className="PopupHelp">
      <Popup
        visible={popupVisible}
        onHiding={onHiding}
        showTitle={false}
        height={300}
        width={500}
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
          <span style={{ fontSize: "20px" }}>Barcode Preview</span>
          <Button icon="close" stylingMode="text" onClick={onClose} />
        </div>

        <div className="qr-image">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <SerialNoBarcode value={serialNo} barcodeType="code128" />
            <span style={{ paddingTop: "14px", fontSize: "20px" }}>
              {serialNo}
            </span>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default PopupHelpComponent;
