import { Button, Popup } from "devextreme-react";
import { SerialNoBarcode } from "../../pages/Barcode/generateBarcode";
import QrCode from "../../pages/QrCodeGeneration/QrCode";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "./PopupHelpQR.scss";
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

  const targetRef = useRef();
  // const reactToPrintFn = useReactToPrint({
  //   content: () => targetRef.current,
  //   contentRef: targetRef,
  //   copyStyles: true,
  // });

  const handlePrint = () => {
    const printContent = targetRef.current.innerHTML;
    const printWindow = window.open("", "", "width=900,height=800");
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Barcode</title>
          <style>

          * {
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
  @page {
  size: 4in 6in;
  margin: 0;
}

                        .desktop-view {
    display: none !important; // Hide canvas on print
  }
           body {
              font-family: "Arial Narrow", Arial, sans-serif !important;
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100%;
              width: 100%;
            }
           @page {
            size: auto;
            margin: 10mm;
          }

          .print-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            width: 100%;
          }

          .serialLable {
            text-align: center;
            font-size: 16px;
          }

          .serial-barcode {
    display: flex
;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    width: 100%;
          }

          .left-barcode,
          .right-barcode {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            flex: 1;
            .serialNoMain{
            .barcode-serialNo{
            .barcode{
              .desktop-view {
    display: none !important; // Hide canvas on print
  }
            }
            }
            }
          }

          .center-QR {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 10px;
            gap: 15px;

                      .center-line {
            width: 2px;
            height: 47px;
            background-color: #000 !important;
            visibility: visible !important;
            display: block !important;
          }
          }

          .center-QR .qr-image img,
          .center-QR .qr-image canvas {
            border-radius: 0 !important; /* keep rectangle */
            // max-width: 200px;
            height: auto;
          }

          .center-line {
            width: 2px;
            height: 47px;
            background-color: #000;
            visibility: visible !important;
            display: block !important;
          }

          </style>
        </head>
        <body>
          <div class="print-section">
            ${printContent}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    };
  };

  return (
    <div className="PopupHelp">
      <Popup
        visible={popupVisible}
        showTitle={false}
        height={700}
        width={700}
        shading={false}
        container=".PopupHelp"
      >
        <div className="popup-header">
          <span style={{ fontSize: "20px" }}>Qr Preview</span>
          <Button icon="close" stylingMode="text" onClick={onClose} />
        </div>

        <div className="QRMainContainer">
          <div ref={targetRef}>
            <div className="QRTitle">MODEL: Tapo C201(IN)</div>

            {/* PCS SN label */}
            <div className="serialLable">
              <div>{serialCount || serialsArray.length}PCS</div>
              <div style={{ marginTop: "5px" }}>SN</div>
            </div>

            <div className="serial-barcode">
              {/* Left barcodes */}
              <div className="left-barcode">
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
              <div className="center-QR">
                <div className="center-line"></div>

                <div className="qr-image">
                  <QrCode qrCodeImage={qrCodeImage} />
                </div>

                <div className="center-line"></div>
              </div>

              {/* Right barcodes */}
              <div className="right-barcode">
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
          </div>
        </div>

        <div
          className="print-btn"
          // style={{
          //   display: "flex",
          //   justifyContent: "flex-end",
          //   paddingTop: "20px",
          // }}
        >
          <Button
            stylingMode="outlined"
            text="Print"
            onClick={handlePrint}
            // useSubmitBehavior={true}
          />
        </div>
      </Popup>
    </div>
  );
};

export default PopupHelpQR;
