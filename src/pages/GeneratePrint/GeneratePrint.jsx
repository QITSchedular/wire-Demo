import React, { useState, useRef, useEffect } from "react";
import { Button, SelectBox, TextBox } from "devextreme-react";
import { DataGrid, Column } from "devextreme-react/data-grid";
import LoadPanel from "devextreme-react/load-panel";
import "./GeneratePrint.scss";
import "remixicon/fonts/remixicon.css";
import PopupHelpComponent from "../../components/PopupHelp/PopupHelp";
import QRCode from "qrcode";
import PopupHelpQR from "../../components/PopupHelp/PopupHelpQR";
import QrCode from "../QrCodeGeneration/QrCode";

// Mock data for SelectBox
const productCode = [{ id: 1, Product: "FGW0034ACS001" }];

// ✅ Mock serials (instead of GRPOs)
const batchCode = [{ id: 1, batchNo: "BTCH001" }];

// ✅ MockDetails (wire company format, includes UOM + serialNo)
const mockDetails = [
  {
    unikNo: 1,
    serialNo: "10001",
    docEntry: "D-001",
    productCode: "FGW0034ACS001",
    batchCode: "BTCH001",
    expiryDate: "2026-01-15",
    productName: "Copper Wire Roll",
    eanCase: "EAN-111111",
    material: "Copper",
    materialDesc: "High grade copper wire",
    shipperPerPallet: 50,
    sscc: "SSCC-10001",
    palletQty: 20,
    unitOfMeasure: "ROLL",
  },
  {
    unikNo: 2,
    serialNo: "10002",
    docEntry: "D-002",
    productCode: "FGW0034ACS001",
    batchCode: "BTCH001",
    expiryDate: "2026-06-20",
    productName: "Aluminum Wire Coil",
    eanCase: "EAN-222222",
    material: "Aluminum",
    materialDesc: "Durable aluminum wire",
    shipperPerPallet: 40,
    sscc: "SSCC-10002",
    palletQty: 15,
    unitOfMeasure: "COIL",
  },
  {
    unikNo: 3,
    serialNo: "10003",
    docEntry: "D-003",
    productCode: "FGW0034ACS001",
    batchCode: "BTCH001",
    expiryDate: "2027-02-01",
    productName: "Fiber Optic Cable",
    eanCase: "EAN-333333",
    material: "Fiber",
    materialDesc: "Single mode fiber optic cable",
    shipperPerPallet: 30,
    sscc: "SSCC-10003",
    palletQty: 10,
    unitOfMeasure: "MTR",
  },
  {
    unikNo: 4,
    serialNo: "10004",
    docEntry: "D-004",
    productCode: "FGW0034ACS001",
    batchCode: "BTCH001",
    expiryDate: "2027-02-01",
    productName: "Fiber Optic Cable",
    eanCase: "EAN-333333",
    material: "Fiber",
    materialDesc: "Single mode fiber optic cable",
    shipperPerPallet: 30,
    sscc: "SSCC-10003",
    palletQty: 10,
    unitOfMeasure: "MTR",
  },
  {
    unikNo: 4,
    serialNo: "10004",
    docEntry: "D-004",
    productCode: "FGW0034ACS001",
    batchCode: "BTCH001",
    expiryDate: "2027-02-01",
    productName: "Fiber Optic Cable",
    eanCase: "EAN-333333",
    material: "Fiber",
    materialDesc: "Single mode fiber optic cable",
    shipperPerPallet: 30,
    sscc: "SSCC-10003",
    palletQty: 10,
    unitOfMeasure: "MTR",
  },
  {
    unikNo: 5,
    serialNo: "10005",
    docEntry: "D-005",
    productCode: "FGW0034ACS001",
    batchCode: "BTCH001",
    expiryDate: "2027-02-01",
    productName: "Fiber Optic Cable",
    eanCase: "EAN-333333",
    material: "Fiber",
    materialDesc: "Single mode fiber optic cable",
    shipperPerPallet: 30,
    sscc: "SSCC-10003",
    palletQty: 10,
    unitOfMeasure: "MTR",
  },
  {
    unikNo: 6,
    serialNo: "10006",
    docEntry: "D-006",
    productCode: "FGW0034ACS001",
    batchCode: "BTCH001",
    expiryDate: "2027-02-01",
    productName: "Fiber Optic Cable",
    eanCase: "EAN-333333",
    material: "Fiber",
    materialDesc: "Single mode fiber optic cable",
    shipperPerPallet: 30,
    sscc: "SSCC-10003",
    palletQty: 10,
    unitOfMeasure: "MTR",
  },
  {
    unikNo: 7,
    serialNo: "10007",
    docEntry: "D-007",
    productCode: "FGW0034ACS001",
    batchCode: "BTCH001",
    expiryDate: "2027-02-01",
    productName: "Fiber Optic Cable",
    eanCase: "EAN-333333",
    material: "Fiber",
    materialDesc: "Single mode fiber optic cable",
    shipperPerPallet: 30,
    sscc: "SSCC-10003",
    palletQty: 10,
    unitOfMeasure: "MTR",
  },
  {
    unikNo: 8,
    serialNo: "10008",
    docEntry: "D-008",
    productCode: "FGW0034ACS001",
    batchCode: "BTCH001",
    expiryDate: "2027-02-01",
    productName: "Fiber Optic Cable",
    eanCase: "EAN-333333",
    material: "Fiber",
    materialDesc: "Single mode fiber optic cable",
    shipperPerPallet: 30,
    sscc: "SSCC-10003",
    palletQty: 10,
    unitOfMeasure: "MTR",
  },
  {
    unikNo: 9,
    serialNo: "10009",
    docEntry: "D-009",
    productCode: "FGW0034ACS001",
    batchCode: "BTCH001",
    expiryDate: "2027-02-01",
    productName: "Fiber Optic Cable",
    eanCase: "EAN-333333",
    material: "Fiber",
    materialDesc: "Single mode fiber optic cable",
    shipperPerPallet: 30,
    sscc: "SSCC-10003",
    palletQty: 10,
    unitOfMeasure: "MTR",
  },
  {
    unikNo: 10,
    serialNo: "10010",
    docEntry: "D-010",
    productCode: "FGW0034ACS001",
    batchCode: "BTCH001",
    expiryDate: "2027-02-01",
    productName: "Fiber Optic Cable",
    eanCase: "EAN-333333",
    material: "Fiber",
    materialDesc: "Single mode fiber optic cable",
    shipperPerPallet: 30,
    sscc: "SSCC-10003",
    palletQty: 10,
    unitOfMeasure: "MTR",
  },
];

const GeneratePrint = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [grpoDetails, setGrpoDetails] = useState([]);
  const [isDetailedLocked, setIsDetailedLocked] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedSerial, setSelectedSerial] = useState(null);
  const [qrCodeImage, setQrCodeImage] = useState(null);
  const [allSerials, setAllSerials] = useState(null);
  // const [popupMode, setPopupMode] = useState(null); // "barcode" | "qrcode"
  const [qrPopupVisible, setQrPopupVisible] = useState(false);

  const scanInputRef = useRef(null);

  const generateQrImage = async (text) => {
    try {
      const qrDataUrl = await QRCode.toDataURL(text);
      setQrCodeImage(qrDataUrl);
    } catch (error) {
      console.error("Error generating QR Code: ", error);
    }
  };
  // useEffect(() => {
  //   // simulate API load
  //   setTimeout(() => setPeriodIndicatorsData(Product), 500);
  // }, []);

  // ✅ Quick Scan Handler (now works with serials)
  const handleQuickScan = (code) => {
    if (!code || code.trim() === "") return;

    // 1. Match against serials
    const matchedSerial = mockDetails.find((b) => b.serialNo === code.trim());
    if (!matchedSerial) {
      alert("Invalid Serial Number scanned!");
      scanInputRef.current?.instance?.reset();
      return;
    }

    // 2. Find detail for that serial
    const matchedDetail = mockDetails.find(
      (d) => d.serialNo === matchedSerial.serialNo
    );
    if (!matchedDetail) {
      alert("No details found for this serial!");
      scanInputRef.current?.instance?.reset();
      return;
    }

    // 3. Append (not overwrite)
    setIsLoading(true);
    setTimeout(() => {
      setGrpoDetails((prev) => {
        if (prev.some((d) => d.serialNo === matchedDetail.serialNo)) {
          alert("This serial is already scanned!");
          return prev;
        }
        return [...prev, matchedDetail];
      });
      setIsDetailedLocked(true);
      setIsLoading(false);

      // Reset scan field
      scanInputRef.current?.instance?.reset();
      scanInputRef.current?.instance?.focus();
    }, 500);
  };

  const handleSearchClick = () => {
    setShowScanner(true);
  };

  const ActionCell = ({ data }) => {
    return (
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <Button type="default" onClick={() => handlePrint(data)}>
          <i class="ri-printer-line add-icon"></i>
        </Button>
      </div>
    );
  };

  const handlePrint = (rowData) => {
    setSelectedSerial(rowData.serialNo); // ✅ set serial
    setPopupVisible(true);
    // setPopupMode("barcode");
    console.log("Printing row:", rowData.serialNo);
  };

  // const generateCombinedQr = async () => {
  //   if (allSerials.length === 0) return;

  //   const combinedText = allSerials.join(" ");
  //   console.log("allSerials", combinedText);

  //   try {
  //     const qrDataUrl = await QRCode.toDataURL(combinedText);
  //     setQrCodeImage(qrDataUrl); // ✅ save QR image
  //     setSelectedSerial(null);
  //   } catch (error) {
  //     console.error("Error generating QR Code:", error);
  //   }
  // };
  // const handleGenerateCombinedQR = () => {
  //   if (grpoDetails.length === 0) return alert("No serials scanned!");
  //   const combinedText = grpoDetails.map((d) => d.serialNo).join(" ");
  //   console.log("combinedText", combinedText);
  //   generateQrImage(combinedText);
  //   setPopupVisible(true);
  // };

  const handleGenerateCombinedQR = () => {
    if (grpoDetails.length === 0) return alert("No serials scanned!");

    const combinedText = grpoDetails.map((d) => d.serialNo).join("\n");
    generateQrImage(combinedText);
    setAllSerials(combinedText);
    setSelectedSerial(null);
    setQrPopupVisible(true);
    // setPopupMode("qrcode");
  };

  console.log("allSerials", allSerials);

  return (
    <div className="GeneratePrint main-container">
      <div className="dx-card responsive-paddings content-section">
        <h2 className="page-heading">Generate & Print</h2>
        <p className="page-subtitle">You are generating item QR</p>

        <div className="input-section">
          {/* ✅ Preserve SelectBox */}
          <SelectBox
            dataSource={productCode}
            displayExpr="Product"
            valueExpr="id"
            placeholder="Select Product"
            // onValueChange={(val) => {
            //   setSelectedPeriod(val);
            //   setGrpoDetails([]);
            //   setIsDetailedLocked(false);
            // }}
            stylingMode="outlined"
          />

          {/* ✅ Preserve TextBox, but for Serial Scan */}
          <SelectBox
            dataSource={batchCode}
            displayExpr="batchNo"
            valueExpr="id"
            placeholder="Select batch"
            // onValueChange={(val) => {
            //   setSelectedPeriod(val);
            //   setGrpoDetails([]);
            //   setIsDetailedLocked(false);
            // }}
            stylingMode="outlined"
          />
          <Button
            stylingMode="outlined"
            height={48}
            width={48}
            icon="search"
            onClick={handleSearchClick}
            useSubmitBehavior={true}
          />
        </div>
        {showScanner && (
          <div className="flex gap-2">
            <label>Scan barcode</label>
            <TextBox
              ref={scanInputRef}
              width={220}
              placeholder="Scan Serial Number"
              stylingMode="outlined"
              valueChangeEvent="change"
              onValueChanged={(e) => handleQuickScan(e.value)}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                stylingMode="outlined"
                text="Generate Combine QR"
                onClick={handleGenerateCombinedQR}
                // useSubmitBehavior={true}
              />
            </div>
          </div>
        )}
        <LoadPanel shadingColor="rgba(0,0,0,0.4)" visible={isLoading} />

        {isDetailedLocked && (
          <div className="grid-section">
            <DataGrid
              dataSource={grpoDetails}
              showBorders={true}
              columnAutoWidth={true}
              height={400}
              keyExpr="unikNo"
            >
              {/* ✅ Preserve original columns but mapped to new wire data */}
              {/* <Column dataField="unikNo" caption="Unik No" alignment="center" /> */}
              <Column
                dataField="serialNo"
                caption="Serial Number"
                alignment="center"
              />
              <Column
                dataField="productCode"
                caption="Product Code"
                alignment="center"
              />
              <Column
                dataField="batchCode"
                caption="Batch Code"
                alignment="center"
              />
              <Column
                dataField="expiryDate"
                caption="Expiry Date"
                alignment="center"
              />
              <Column
                dataField="productName"
                caption="Product Name"
                alignment="center"
              />
              <Column
                dataField="eanCase"
                caption="EAN Case"
                alignment="center"
              />
              <Column
                caption="Actions"
                cellRender={ActionCell}
                width={120}
                alignment="center"
              />
            </DataGrid>
          </div>
        )}
        {/* {popupMode === "barcode" && (
          <PopupHelpComponent
            popupVisible={popupVisible}
            serialNo={selectedSerial}
            onClose={() => setPopupVisible(false)}
          />
        )}

        {popupMode === "qrcode" && (
          <PopupHelpQR
            popupVisible={popupVisible}
            qrCodeImage={qrCodeImage}
            onClose={() => setPopupVisible(false)}
          />
        )} */}

        <PopupHelpQR
          popupVisible={qrPopupVisible}
          qrCodeImage={qrCodeImage}
          onClose={() => setQrPopupVisible(false)}
          allSerials={allSerials}
        />
        <PopupHelpComponent
          popupVisible={popupVisible}
          onHiding={() => setPopupVisible(false)}
          serialNo={selectedSerial}
          onClose={() => setPopupVisible(false)}
        />
      </div>
    </div>
  );
};

export default GeneratePrint;
