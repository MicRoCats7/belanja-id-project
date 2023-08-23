import React from "react";
import { MoonLoader } from "react-spinners";

function LoadingSpinner() {
  return (
    <div>
      <MoonLoader size={50} color={"#EF233C"} loading={true} />
    </div>
  );
}

export default LoadingSpinner;
