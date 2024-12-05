"use client";
import React, { useEffect, useState } from "react";

const Carousel = ({previousPostImage = []}) => {
  // const images = [
  //   "/images/Nextpet-imgs/all-icons/user.svg", // replace with your image paths
  //   "/images/Nextpet-imgs/dashboard-imgs/brreder-info-img.png",
  //   "/images/Nextpet-imgs/dashboard-imgs/dog-slide.png",
  //   "/images/Nextpet-imgs/dashboard-imgs/brreder-info-img.png",
  // ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % previousPostImage.length);
  };

  // Auto play the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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

  const imageStyle = {
    minWidth: "100%", 
    maxHeight: "250px",
    height: "100%",
    objectFit: "cover",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
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

  return (
    <div style={carouselStyle}>
      <div style={imageContainerStyle}>
        {previousPostImage.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            style={imageStyle}
          />
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
    </div>
  );
};

export default Carousel;



// "use client";
// import React, { useEffect, useState } from "react";

// const Carousel = ({ previousPostImage = [] }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Function to go to the next image
//   const nextImage = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % previousPostImage.length);
//   };

//   // Auto play the carousel
//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextImage();
//     }, 3000); // Change image every 3 seconds
//     return () => clearInterval(interval);
//   }, [previousPostImage]); // Dependency array includes previousPostImage to reset interval if images change

//   // Inline styles
//   const carouselStyle = {
//     position: "relative",
//     width: "100%", // Full width of the container
//     maxWidth: "345px", // Set a maximum width for the carousel
//     maxHeight: "250px", // Set a maximum height for the carousel
//     margin: "0 auto", // Center the carousel
//     overflow: "hidden", // Hide overflow
//   };

//   const imageContainerStyle = {
//     display: "flex",
//     transition: "transform 0.5s ease-in-out", // Smooth transition effect
//     transform: `translateX(-${currentIndex * 100}%)`, // Move left based on current index
//   };

//   const imageStyle = {
//     minWidth: "100%", // Ensure each image takes full width
//     maxHeight: "250px", // Maintain the maximum height
//     height: "100%", // Fill the container height
//     objectFit: "cover", // Maintain aspect ratio, crop if necessary
//     borderRadius: "10px", // Rounded corners for images
//     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", // Subtle shadow for depth
//   };

//   const indicatorsStyle = {
//     position: "absolute",
//     bottom: "10px",
//     left: "50%",
//     transform: "translateX(-50%)",
//     display: "flex",
//   };

//   const dotStyle = (isActive) => ({
//     cursor: "pointer",
//     margin: "0 5px",
//     width: "12px",
//     height: "12px",
//     backgroundColor: isActive ? "#333" : "lightgray",
//     borderRadius: "50%",
//     transition: "background-color 0.3s ease", // Smooth color transition
//   });




//   return (
//     <div style={carouselStyle}>
//       <div style={imageContainerStyle}>
//         {previousPostImage.map((image, index) => (
//           <img
//             key={index}
//             src={image}
//             alt={`Image ${index + 1}`}
//             style={imageStyle}
//           />
//         ))}
//       </div>
//       <div style={indicatorsStyle}>
//         {previousPostImage.map((_, index) => (
//           <span
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             style={dotStyle(index === currentIndex)}
//           ></span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Carousel;


