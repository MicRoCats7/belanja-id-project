import React, { useState } from "react";
import Cropper from "react-easy-crop";
import "../../style/modall.css";

function ImageCropper({ image, onCropDone, onCropCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(1 / 1);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onAspectRatioChange = (event) => {
    // setAspectRatio(event.target.value);
  };

  return (
    <div className="bg__modal__cropper">
      <div className="modal__cropper">
        <h1>Crop Photo</h1>
        <Cropper
          image={image}
          aspect={aspectRatio}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />

        <div className="wrapper__btn">
          <button onClick={onCropCancel}>Kembali</button>
          <button
            onClick={() => {
              onCropDone(croppedArea);
            }}
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageCropper;
