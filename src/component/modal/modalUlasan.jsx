import { React, useState } from "react";
import { Box, Rating } from "@mui/material";
import { BiImageAdd } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";

function ModalUlasan({
  ratingValue,
  setRatingValue,
  reviewText,
  setReviewText,
  previewImg1,
  handleImageChange1,
  previewImg2,
  handleImageChange2,
  previewImg3,
  handleImageChange3,
  previewImg4,
  handleImageChange4,
  removeSelectedPhoto,
  handleCloseReviewPopup,
  handleSubmitReview,
  submittingReview,
}) {
  const [selectedReviewPhotos, setSelectedReviewPhotos] = useState({
    image_path: null,
    image_path_2: null,
    image_path_3: null,
    image_path_4: null,
  });
  return (
    <div className="popup-container-review">
      <div className="popup-content-review">
        <div className="rating-review-user">
          <div className="text-review">
            <p>Silahkan Berikan Ulasan Untuk produk ini</p>
          </div>
          <Box
            sx={{
              "& > legend": { mt: 4 },
            }}
          >
            <Rating
              name="simple-controlled"
              value={ratingValue}
              onChange={(event, newValue) => {
                setRatingValue(newValue);
              }}
              style={{ fontSize: "70px" }}
            />
          </Box>
          <div className="add-img-review">
            <div className="addImg">
              <label
                htmlFor="input-file"
                className={`file-label ${
                  selectedReviewPhotos.image_path ? "no-border" : ""
                }`}
              >
                {previewImg1 ? (
                  <img
                    src={previewImg1}
                    width={150}
                    height={150}
                    alt="Uploaded"
                    className="uploaded-image"
                  />
                ) : (
                  <>
                    <BiImageAdd color="#606060" size={60} />
                    <p>Foto Ulasan</p>
                  </>
                )}
              </label>
              <input
                id="input-file"
                type="file"
                accept=".jpg, .jpeg, .png"
                className="input-field"
                onChange={handleImageChange1}
                hidden
              />
              {previewImg1 && (
                <div className="upload-row">
                  <span className="upload-content">
                    <FiTrash2
                      onClick={() => removeSelectedPhoto("image_path")}
                    />
                  </span>
                </div>
              )}
            </div>
            <div className="addImg">
              <label
                htmlFor="input-file-2"
                className={`file-label ${
                  selectedReviewPhotos.image_path_2 ? "no-border" : ""
                }`}
              >
                {previewImg2 ? (
                  <img
                    src={previewImg2}
                    width={150}
                    height={150}
                    alt="Uploaded"
                    className="uploaded-image"
                  />
                ) : (
                  <>
                    <BiImageAdd color="#606060" size={60} />
                    <p>Foto Ulasan</p>
                  </>
                )}
              </label>
              <input
                id="input-file-2"
                type="file"
                accept=".jpg, .jpeg, .png"
                className="input-field"
                onChange={handleImageChange2}
                hidden
              />
              {previewImg2 && (
                <div className="upload-row">
                  <span className="upload-content">
                    <FiTrash2
                      onClick={() => removeSelectedPhoto("image_path_2")}
                    />
                  </span>
                </div>
              )}
            </div>
            <div className="addImg">
              <label
                htmlFor="input-file-3"
                className={`file-label ${
                  selectedReviewPhotos.image_path_3 ? "no-border" : ""
                }`}
              >
                {previewImg3 ? (
                  <img
                    src={previewImg3}
                    width={150}
                    height={150}
                    alt="Uploaded"
                    className="uploaded-image"
                  />
                ) : (
                  <>
                    <BiImageAdd color="#606060" size={60} />
                    <p>Foto Ulasan</p>
                  </>
                )}
              </label>
              <input
                id="input-file-3"
                type="file"
                accept=".jpg, .jpeg, .png"
                className="input-field"
                onChange={handleImageChange3}
                hidden
              />
              {previewImg3 && (
                <div className="upload-row">
                  <span className="upload-content">
                    <FiTrash2
                      onClick={() => removeSelectedPhoto("image_path_3")}
                    />
                  </span>
                </div>
              )}
            </div>
            <div className="addImg">
              <label
                htmlFor="input-file-4"
                className={`file-label ${
                  selectedReviewPhotos.image_path_4 ? "no-border" : ""
                }`}
              >
                {previewImg4 ? (
                  <img
                    src={previewImg4}
                    width={150}
                    height={150}
                    alt="Uploaded"
                    className="uploaded-image"
                  />
                ) : (
                  <>
                    <BiImageAdd color="#606060" size={60} />
                    <p>Foto Ulasan</p>
                  </>
                )}
              </label>
              <input
                id="input-file-4"
                type="file"
                accept=".jpg, .jpeg, .png"
                className="input-field"
                onChange={handleImageChange4}
                hidden
              />
              {previewImg4 && (
                <div className="upload-row">
                  <span className="upload-content">
                    <FiTrash2
                      onClick={() => removeSelectedPhoto("image_path_4")}
                    />
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="input-review-user">
            <textarea
              name="review"
              id="review"
              cols="30"
              rows="10"
              placeholder="Tulis Review Anda"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
          </div>
          <div className="label-oto-review">
            <div className="label-review">
              <h1>Luar Biasa</h1>
            </div>
            <div className="label-review">
              <h1>Kualitas Unggul</h1>
            </div>
            <div className="label-review">
              <h1>Worth it</h1>
            </div>
            <div className="label-review">
              <h1>Design Elegan</h1>
            </div>
          </div>
          <div className="btn-kirim-review">
            <button
              className="btn-batal-ulasan"
              onClick={handleCloseReviewPopup}
            >
              Batal
            </button>
            <button
              className="btn-kirim-ulasan"
              onClick={handleSubmitReview}
              disabled={submittingReview}
            >
              {submittingReview ? (
                <span className="loading-spinner-review" />
              ) : (
                "Kirim"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalUlasan;
