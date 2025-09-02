import React, { useEffect, useState, useRef } from "react";
import bwipjs from "bwip-js";
import "./generateBarcode.scss";

const Barcode = ({ value, barcodeType, height, scale }) => {
  const canvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    if (value && canvasRef.current) {
      try {
        bwipjs.toCanvas(canvasRef.current, {
          bcid: barcodeType,
          text: value,
          scale: scale,
          height: height,
          includetext: false,
          textxalign: "center",
          textsize: 10,
          textyoffset: 6,
        });
        setImgSrc(canvasRef.current.toDataURL("image/png"));
      } catch (err) {
        console.error("Barcode generation failed:", err);
      }
    }
  }, [value, barcodeType, height, scale]);

  return (
    <div className="barcode">
      <canvas width={100} ref={canvasRef} className="desktop-view"></canvas>
      {imgSrc && <img src={imgSrc} alt="barcode" className="print-view" />}
    </div>
  );
};

export default Barcode;
export const SerialNoBarcode = ({ value, barcodeType, scale }) => (
  <div className="serialNoMain">
    <div className="barcode-serialNo">
      <Barcode
        value={value}
        barcodeType={barcodeType}
        height={10}
        scale={scale || 5}
      />
    </div>
  </div>
);
