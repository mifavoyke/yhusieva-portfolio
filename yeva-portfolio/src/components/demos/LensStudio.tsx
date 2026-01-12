import React from "react";

interface LensProps {
  lensUrl: string;
}

const Lens: React.FC<LensProps> = ({ lensUrl }) => {
  return (
    <div
      style={{
        width: "360px",
        height: "480px",
        borderRadius: "16px",
        overflow: "hidden",
        background: "#000",
      }}
    >
      <iframe
        src={lensUrl}
        allow="camera; microphone; gyroscope; accelerometer; xr-spatial-tracking"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: "block",
        }}
      />
    </div>
  );
};

export default Lens;
