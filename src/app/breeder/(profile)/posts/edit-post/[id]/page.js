"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import Select from "react-select";
import BASE_URL from "../../../../../utils/constant";
import EditCarousel from "../../../../../../components/EditCarousel";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";

const EditPost = () => {
  const { id } = useParams();
  const breederUserId = localStorage.getItem("breeder_user_id");
  // console.log("breederUserId : ", breederUserId);
  // console.log("Post Id", id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animalTypes, setAnimalTypes] = useState([]);
  const [animalBreeds, setAnimalBreeds] = useState([]);
  const [delivery_availability, setIsDeliveryAvailable] = useState(1);
  const [health_guarantee, setIsHealthGuarantee] = useState(1);
  const [boarding_availability, setIsBoardingAvailability] = useState(1);
  const [flying_availability, setIsFlyingAvailability] = useState(1);
  const [postDetails, setPostDetails] = useState(null);
  const [animal_type_id, setAnimalTypeId] = useState(null);
  const [type, setType] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  // const [imageError, setPostImageError] = useState(null);
  // const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [additionalRequestAnimalType, setAdditionalRequestAnimalType] =
    useState(null);
  const [additionalRequestBreedType, setAdditionalRequestBreedType] =
    useState(null);
  const [errorAdditionalRequest, setErrorsAdditionalRequest] = useState(null);
  const [previousPostImage, setPreviousPostImage] = useState([]);
  const [editPostImageLength, setPostImageLength] = useState(null);
  const [editPostPage, setEditPostPage] = useState(false);

  // console.log("postDetailsss", health_guarantee);

  const initialValues = {
    description: postDetails?.description || "",
    petname: postDetails?.name || "",
    type: postDetails?.type || "",
    breed: postDetails?.breed || "",
    price: postDetails?.price || "",
    size: postDetails?.size || "",
    animal_gender: postDetails?.animal_gender || "",
    weight: postDetails?.weight || "",
    birthdate: postDetails?.birthdate || "",
    date_available: postDetails?.avialable || "",
    certification: postDetails?.certification || "",
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        // console.log("Latitude ::", latitude, "Longitude ::", longitude);
        setLatitude(latitude);
        setLongitude(longitude);
      });
    } else {
      console.log("Not Allow location");
    }
  }, []);

  useEffect(() => {
    const oldBreedrData = async () => {
      const formData = new FormData();
      formData.append("user_id", breederUserId);
      formData.append("post_id", id);

      try {
        const response = await axios.post(
          `${BASE_URL}/api/get_post_details_breeder`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // console.log("Post Form Details :", response.data);

        if (response.data.status) {
          setPostDetails(response.data.data[0]);
          setIsDeliveryAvailable(response.data.data[0].delivery);
          setIsHealthGuarantee(response.data.data[0].health);
          setIsBoardingAvailability(response.data.data[0].boarding);
          setIsFlyingAvailability(response.data.data[0].flying);
          setPreviousPostImage(response.data.data[0].image);
        }
      } catch (error) {
        console.error("Error registering user:", error);
      }
    };
    oldBreedrData();
  }, [breederUserId]);

  useEffect(() => {
    // console.log("previousPostImage.length ", previousPostImage.length);
    setPostImageLength(previousPostImage.length);
  }, [previousPostImage, animal_type_id, type]);

  const handleSubmit = async (value) => {
    // e.preventDefault();
    // console.log("value1111", value);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        // console.log("Lat ::", latitude, "Long ::", longitude);
        setLatitude(latitude);
        setLongitude(longitude);
      });
    } else {
      console.log("Not Allow location");
      setLatitude(35.1258);
      setLongitude(117.9859);
    }
    if (latitude == null || longitude == null) {
      setLatitude(35.1258);
      setLongitude(117.9859);
    }

    const formData = new FormData();
    formData.append("post_id", id);
    formData.append("flying_availability", flying_availability);
    formData.append("boarding_availability", boarding_availability);
    formData.append("health_guarantee", health_guarantee);
    formData.append("delivery_availability", delivery_availability);
    formData.append("petname", value?.petname);
    formData.append("description", value?.description);
    formData.append("animal_type_id", value?.animal_type_id);
    formData.append("type", value?.type);
    formData.append("breed", value?.breed);
    formData.append("price", value?.price);
    formData.append("animal_gender", value?.animal_gender);
    formData.append("size", value?.size);
    formData.append("certification", value?.certification);
    formData.append("weight", value?.weight);
    formData.append("birthdate", value?.birthdate);
    formData.append("date_avialable", value?.date_available);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("user_id", breederUserId);

    try {
      await axios.post(
        `${BASE_URL}/api/post_update_breeder`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setEditPostPage(false);
      // toast.success(response.data.msg);
      toast.success("Breeder’s post updated successfully");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      handleSelectedAnimalTypesChange();
      try {
        const response = await axios.get(
          `${BASE_URL}/api/additional_request_web`
        );
        setLoading(false);
        const animalData = response.data.data.map((item) => item.animal);
        const formattedAnimalTypes = animalData.map((animal) => ({
          value: animal.toLowerCase().replace(/\s+/g, "_"),
          label: animal,
        }));
        formattedAnimalTypes.push({ value: "other", label: "Other" });
        setAnimalTypes(formattedAnimalTypes);
        if (type != null) {
          const selectedAnimalId = type;
          formattedAnimalTypes.find(
            (type) =>
              type.value == selectedAnimalId.toLowerCase().replace(/\s+/g, "_")
          );
          // setSelectedAnimal(initialSelectedAnimal?.value || "");
        }
        setLoading(false);
      } catch (err) {
        setError("Network Error");
        setLoading(false);
      }
    };

    fetchData();
  }, [animal_type_id, type]);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSelectedAnimalTypesChange = async (selectedOption) => {
    if (selectedOption === "other") {
      setShowModal(true);
    } else {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/additional_request_web`
        );

        let formattedBreedTypes = [];
        formattedBreedTypes = response.data.data.filter((item) =>
          item.animal === selectedOption?.label
            ? selectedOption?.labels
            : postDetails?.type
        );
        setAnimalTypeId(formattedBreedTypes[0]?.id);
        setType(formattedBreedTypes[0]?.animal);

        formattedBreedTypes = formattedBreedTypes[0]?.sub[0]?.breed_type.map(
          (item) => {
            return { value: item, label: item };
          }
        );
        // console.log("formattedAnimalTypes", formattedBreedTypes);
        setAnimalBreeds(formattedBreedTypes);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
  };

  const submitAdditionalRequest = async (e) => {
    e.preventDefault();

    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
    if (!additionalRequestAnimalType || !additionalRequestBreedType) {
      setErrorsAdditionalRequest("Both fields are required.");
      return;
    }
    if (
      specialCharPattern.test(additionalRequestAnimalType) ||
      specialCharPattern.test(additionalRequestBreedType)
    ) {
      setErrorsAdditionalRequest("Special characters are not allowed.");
      return;
    }

    setErrorsAdditionalRequest("");
    const formData = new FormData();
    formData.append("breeders_id", breederUserId);
    formData.append("animal", additionalRequestAnimalType);
    formData.append("breed_type[]", additionalRequestBreedType);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/additional_breeder_add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response: ", response);
      toast.success("Your request has been submitted");
      closeModal();
    } catch (error) {
      console.error("Error submitting request: ", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleEditImage = async (e) => {
    if (e.length + editPostImageLength > 10) {
      toast.error("Error: You can only add up to 10 images.");
      return;
    }
    const formData = new FormData();
    formData.append("id", id);
    e.forEach((file) => {
      formData.append(`image[]`, file);
    });

    try {
      const response = await axios.post(
        `${BASE_URL}/api/edit_post_image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data.status);
      if (response.data.status == true) {
        console.log("Apicallnew");

        const formData2 = new FormData();
        formData2.append("user_id", breederUserId);
        formData2.append("post_id", id);
        try {
          const response = await axios.post(
            `${BASE_URL}/api/get_post_details_breeder`,
            formData2,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          setPreviousPostImage(response.data.data[0].image);
        } catch (error) {
          console.error("Error uploading files:", error);
        }
      }
      toast.success("Image Added!");
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };
  const handleDeleteImage = async (imgUrl) => {
    console.log(imgUrl);
    const formData = new FormData();
    formData.append("id", id);
    formData.append("img", imgUrl);

    try {
      await axios.post(
        `${BASE_URL}/api/delete_post_image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Image Deleted!");
      setPreviousPostImage((prevImages) =>
        prevImages.filter((image) => image !== imgUrl)
      );
    } catch (error) {
      console.error(" Post Image Deleted Error :", error);
    }
  };

  const setEditPostPageHandle = (e) => {
    e.preventDefault();
    setEditPostPage(true);
  };

  return (
    <div className="breedeerdasboard-createpost-wrap">
      <div className="container">
        <div className="col-lg-12">
          <div className="breedeerdasboard-createpost-inner">
            <div className="breedeerdasboard-createpost-left">
              <EditCarousel
                previousPostImage={previousPostImage}
                editPostPage={editPostPage}
                onEditImage={handleEditImage}
                onDeleteImage={handleDeleteImage}
              />
              {/* {imageError && <p style={{ color: "red" }}>{imageError}</p>} */}

              <div class="error-message">
                <p>Error: You can only add up to 10 images.</p>
              </div>
            </div>
            <div className="breedeerdasboard-createpost-right">
              <div className="postcreate-heading">
                <h3>Pet Name </h3>
                <div className="edit-heartpost">
                  <div className="inner-heartt">
                    <a href="#">
                      <img
                        src="/images/Nextpet-imgs/dashboard-imgs/heart-post.png"
                        alt=""
                        loading="lazy"
                      />
                    </a>
                    <span>55</span>
                  </div>
                  <div className="inner-heartt">
                    <a href="#">
                      <img
                        src="/images/Nextpet-imgs/dashboard-imgs/message-post.png"
                        alt=""
                        loading="lazy"
                      />
                    </a>
                    <span>55</span>
                  </div>
                  {!editPostPage && (
                    <div className="inner-heartt">
                      <a href="#" onClick={setEditPostPageHandle}>
                        <img
                          src="/images/Nextpet-imgs/profile-page-imgs/edit-profile.svg"
                          alt=""
                          loading="lazy"
                        />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <Formik
                initialValues={initialValues}
                // validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ setFieldValue, values }) => (
                  <Form>
                    <label>
                      <Field
                        as="textarea"
                        name="description"
                        placeholder="Enter pet description here..."
                        disabled={!editPostPage}
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </label>
                    <h4>About Pet-name </h4>
                    <div className="list-post-form">
                      <div className="formdata-wrap">
                        <p>Name </p>
                        <Field
                          type="text"
                          name="petname"
                          disabled={!editPostPage}
                        />
                        <ErrorMessage
                          name="petname"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>

                      <div className="formdata-wrap">
                        <p>Types</p>
                        <Select
                          options={animalTypes}
                          styles={{
                            container: (provided) => ({
                              ...provided,
                              width: 250,
                            }),
                            control: (provided) => ({
                              ...provided,
                              width: 250,
                              backgroundColor: "transparent",
                              border: "none",
                            }),
                          }}
                          onChange={(selectedOption) => {
                            if (selectedOption) {
                              setFieldValue("type", selectedOption.value);
                            }
                            handleSelectedAnimalTypesChange(selectedOption);
                          }}
                          value={animalTypes.find(
                            (option) =>
                              option.value === values.type.toLowerCase()
                          )}
                          isDisabled={!editPostPage}
                        />
                        <ErrorMessage
                          name="animalType"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>

                      <div className="formdata-wrap">
                        <p>Breeds</p>
                        <Select
                          options={animalBreeds}
                          styles={{
                            container: (provided) => ({
                              ...provided,
                              width: 250,
                            }),
                            control: (provided) => ({
                              ...provided,
                              width: 250,
                              backgroundColor: "transpertant",
                              border: "none",
                            }),
                          }}
                          onChange={(selectedOption) => {
                            if (selectedOption) {
                              setFieldValue("breed", selectedOption.value);
                            }
                          }}
                          value={animalBreeds?.find(
                            (option) => option.value === values.breed
                          )}
                          isDisabled={!editPostPage}
                        />
                        <ErrorMessage
                          name="breed"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>

                      <div className="formdata-wrap">
                        <p>Price ($)</p>
                        <Field
                          type="text"
                          name="price"
                          disabled={!editPostPage}
                        />
                        <ErrorMessage
                          name="price"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>

                      <div className="formdata-wrap">
                        <p>General Size</p>
                        <Field as="select" name="size" disabled={!editPostPage}>
                          <option value="">Select size</option>
                          <option value="Standard">Standard</option>
                          <option value="Mini">Mini</option>
                          <option value="Micro">Micro</option>
                        </Field>
                        <ErrorMessage
                          name="size"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>

                      <div className="formdata-wrap">
                        <p>Animal Gender</p>
                        <Field
                          as="select"
                          name="animal_gender"
                          disabled={!editPostPage}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </Field>
                        <ErrorMessage
                          name="animal_gender"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>

                      <div className="formdata-wrap">
                        <p>Anticipated Weight (lbs)</p>
                        <Field
                          type="text"
                          name="weight"
                          disabled={!editPostPage}
                        />
                        <ErrorMessage
                          name="weight"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>

                      <div className="formdata-wrap">
                        <p>Birthdate</p>
                        <Field
                          type="date"
                          name="birthdate"
                          disabled={!editPostPage}
                        />
                        <ErrorMessage
                          name="birthdate"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>

                      <div className="formdata-wrap">
                        <p>Date Available</p>
                        <Field
                          type="date"
                          name="date_available"
                          disabled={!editPostPage}
                        />
                        <ErrorMessage
                          name="date_available"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>

                      <div className="formdata-wrap">
                        <p>Health guarantee</p>
                        <div className="switch-toggle switch-3 switch-candy">
                          <input
                            id="on"
                            name="state-d"
                            type="radio"
                            checked={health_guarantee}
                            onChange={() => setIsHealthGuarantee(1)}
                            disabled={!editPostPage}
                          />
                          <label htmlFor="on">YES</label>
                          <input
                            id="off"
                            name="state-d"
                            type="radio"
                            checked={!health_guarantee}
                            onChange={() => setIsHealthGuarantee(0)}
                            disabled={!editPostPage}
                          />
                          <label htmlFor="off">NO</label>
                        </div>
                      </div>
                      <div className="formdata-wrap">
                        <p>Certifications</p>
                        <Field
                          type="text"
                          name="certification"
                          disabled={!editPostPage}
                        />
                        <ErrorMessage
                          name="certification"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>
                      <div className="formdata-wrap">
                        <p>Delivery availability</p>
                        <div className="switch-toggle switch-3 switch-candy">
                          <input
                            id="on1"
                            name="states-d"
                            type="radio"
                            checked={delivery_availability}
                            onChange={() => setIsDeliveryAvailable(1)}
                            disabled={!editPostPage}
                          />
                          <label htmlFor="on1">YES</label>
                          <input
                            id="off1"
                            name="states-d"
                            type="radio"
                            checked={!delivery_availability}
                            onChange={() => setIsDeliveryAvailable(0)}
                            disabled={!editPostPage}
                          />
                          <label htmlFor="off1">NO</label>
                        </div>
                      </div>

                      <div className="formdata-wrap">
                        <p>Boarding availability</p>
                        <div className="switch-toggle switch-3 switch-candy">
                          <input
                            id="on2"
                            name="states-dd"
                            type="radio"
                            checked={boarding_availability}
                            onChange={() => setIsBoardingAvailability(1)}
                            disabled={!editPostPage}
                          />
                          <label htmlFor="on2">YES</label>
                          <input
                            id="off2"
                            name="states-dd"
                            type="radio"
                            checked={!boarding_availability}
                            onChange={() => setIsBoardingAvailability(0)}
                            disabled={!editPostPage}
                          />
                          <label htmlFor="off2">NO</label>
                        </div>
                      </div>

                      <div className="formdata-wrap">
                        <p>Flying availability</p>
                        <div className="switch-toggle switch-3 switch-candy">
                          <input
                            id="on3"
                            name="states-ddd"
                            type="radio"
                            checked={flying_availability}
                            onChange={() => setIsFlyingAvailability(1)}
                            disabled={!editPostPage}
                          />
                          <label htmlFor="on3">YES</label>
                          <input
                            id="off3"
                            name="states-ddd"
                            type="radio"
                            checked={!flying_availability}
                            onChange={() => setIsFlyingAvailability(0)}
                            disabled={!editPostPage}
                          />
                          <label htmlFor="off3">NO</label>
                        </div>
                      </div>

                      <div className="posts-btn-wrap">
                        <button type="submit">Post a Pet</button>
                        <p>4 out of 6 posts remaining</p>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>

              <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                style={{
                  content: {
                    width: "400px",
                    height: "300px",
                    margin: "auto",
                    borderRadius: "30px",
                    position: "relative",
                    top: showModal ? "50px" : "0",
                    transition:
                      "top 0.5s ease-in-out, opacity 0.5s ease-in-out",
                    opacity: showModal ? "1" : "0",
                  },
                  overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    overflow: "hidden",
                    position: "fixed",
                    top: "0",
                    left: "0",
                    right: "0",
                    bottom: "0",
                  },
                }}
                onAfterOpen={() => {
                  document.body.style.overflow = "hidden";
                }}
                onAfterClose={() => {
                  document.body.style.overflow = "auto";
                }}
              >
                <div class="modal-body">
                  <form onSubmit={submitAdditionalRequest}>
                    <div class="conatctcpach-popup-wrap">
                      <h1>Additional Request</h1>
                      <div class="coach-form-wrap">
                        {errorAdditionalRequest && (
                          <spam style={{ color: "red" }}>
                            {errorAdditionalRequest}
                          </spam>
                        )}
                        <input
                          type="text"
                          placeholder="Animal type"
                          onChange={(e) =>
                            setAdditionalRequestAnimalType(e.target.value)
                          }
                        />
                        <input
                          type="text"
                          placeholder="Breed type"
                          onChange={(e) =>
                            setAdditionalRequestBreedType(e.target.value)
                          }
                        />
                        <div class="d-flex justify-content-center">
                          <button
                            type="submit"
                            value="Submit"
                            data-bs-dismiss="close"
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
