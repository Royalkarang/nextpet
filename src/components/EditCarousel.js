"use client";
import React, { useEffect, useState } from "react";

const EditCarousel = ({ previousPostImage = [], onEditImage, onDeleteImage, editPostPage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % previousPostImage.length);
  };

  // Auto play the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [previousPostImage]);

  // Inline styles
  const carouselStyle = {
    position: "relative",
    width: "100%",
    maxWidth: "345px",
    maxHeight: "250px",
    margin: "0 auto",
    overflow: "hidden",
  };

  const imageContainerStyle = {
    display: "flex",
    transition: "transform 0.5s ease-in-out",
    transform: `translateX(-${currentIndex * 100}%)`,
  };

  const imageWrapperStyle = {
    position: "relative",
    minWidth: "100%",
    maxHeight: "250px",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
  };

  const iconStyle = {
    position: "absolute",
    top: "10px",
    cursor: "pointer",
    zIndex: 10,
  };

  const editIconStyle = {
    ...iconStyle,
    right: "40px",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: "50%",
    padding: "5px",
  };

  const deleteIconStyle = {
    ...iconStyle,
    right: "10px",
    backgroundColor: "rgba(255, 0, 0, 0.7)",
    borderRadius: "50%",
    padding: "5px",
  };

  const indicatorsStyle = {
    position: "absolute",
    bottom: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
  };

  const dotStyle = (isActive) => ({
    cursor: "pointer",
    margin: "0 5px",
    width: "12px",
    height: "12px",
    backgroundColor: isActive ? "#333" : "lightgray",
    borderRadius: "50%",
    transition: "background-color 0.3s ease",
  });

  const handleFileChange = (e, image) => {
    const selectedFiles = Array.from(e.target.files);
    onEditImage(selectedFiles, image);
  };

  return (
    <div style={carouselStyle}>
      {previousPostImage.length > 0 ? (
        <>
          <div style={imageContainerStyle}>
            {previousPostImage.map((image, index) => (
              <div key={index} style={imageWrapperStyle}>
                <img src={image} alt={`Image ${index + 1}`} style={imageStyle} />
                {editPostPage && (
                  <>
                    <div
                      style={editIconStyle}
                      onClick={() => document.getElementById("fileInput").click()}
                    >
                      ✏️
                    </div>
                    <input
                      type="file"
                      id="fileInput"
                      style={{ display: "none" }}
                      multiple
                      onChange={(e) => handleFileChange(e, image)}
                    />
                    <div
                      style={deleteIconStyle}
                      onClick={() => onDeleteImage(image)}
                    >
                      ❌
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          <div style={indicatorsStyle}>
            {previousPostImage.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrentIndex(index)}
                style={dotStyle(index === currentIndex)}
              ></span>
            ))}
          </div>
        </>
      ) : (
        editPostPage && (
          <div>
            <p>Add New Image</p>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              multiple
              onChange={(e) => handleFileChange(e)}
            />
            <button onClick={() => document.getElementById("fileInput").click()} style={{ padding: "10px", marginLeft: "100px"}}>
              Upload Image
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default EditCarousel;
