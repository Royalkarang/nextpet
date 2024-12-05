"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import Select from "react-select";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import BASE_URL from "../../../../utils/constant";
import { toast } from "react-toastify";

const CreatePost = () => {
  // const breederUserId = localStorage.getItem("breeder_user_id");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animalTypes, setAnimalTypes] = useState([]);
  const [animalBreeds, setAnimalBreeds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [healthGuarantee, setHealthGuarantee] = useState(false);
  const [deliveryAvailability, setDeliveryAvailability] = useState(0);
  const [boardingAvailability, setBoardingAvailability] = useState(false);
  const [flyingAvailability, setFlyingAvailability] = useState(false);
  const [images, setImages] = useState([]);
  const [imageError, setImageError] = useState("");
  const [errorAdditionalRequest, setErrorsAdditionalRequest] = useState(null);
  const [breederUserId, setBreederUserId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBreederUserId(localStorage.getItem("breeder_user_id"));
    }
  }, []);

  // console.log("deliveryAvailability", deliveryAvailability);
  const initialValues = {
    petname: "",
    description: "",
    price: "",
    size: "",
    animalGender: "",
    weight: "",
    birthdate: "",
    date_available: "",
    animalType: "",
    type: "",
    breed: "",
    crtifications: "",
    deliveryAvailability: "",
  };
  const validationSchema = Yup.object({
    petname: Yup.string().required("Pet name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive"),
    size: Yup.string().required("Size is required"),
    animalGender: Yup.string().required("Gender is required"),
    weight: Yup.number()
      .required("Weight is required")
      .positive("Weight must be positive"),
    birthdate: Yup.date().required("Birthdate is required"),
    date_available: Yup.date().required("Date Available is required"),
    animalType: Yup.string().required("Animal type is required"),
    crtifications: Yup.string().required("Crtifications is required"),
    breed: Yup.string().required("Breed type is required"),
    // deliveryAvailability: Yup.number().required(
    //   "Delivery availability is required"
    // ),
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        setLocation({ latitude: coords.latitude, longitude: coords.longitude });
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handlePostImage = (e) => {
    const files = e.target.files;
    if (files.length === 0) return;
    if (files.length > 10) {
      setImageError("Error: You can only add up to 10 images.");
      return;
    }
    setImageError("");
    const imagesArray = Array.from(files).map((file) => file);
    setImages((prevImages) => [...prevImages, ...imagesArray]);
  };

  const fetchAnimalTypes = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/additional_request_web`
      );
      const animalData = response.data.data.map((item) => item.animal);
      const formattedAnimalTypes = animalData.map((animal) => ({
        value: animal.toLowerCase().replace(/\s+/g, "_"),
        label: animal,
      }));
      formattedAnimalTypes.push({ value: "other", label: "Other" });
      setAnimalTypes(formattedAnimalTypes);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimalTypes();
  }, []);

  const handleSelectedAnimalTypesChange = async (
    selectedOption,
    setFieldValue
  ) => {
    setFieldValue("animalType", selectedOption.value);
    if (selectedOption.value === "other") {
      setShowModal(true);
    } else {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/additional_request_web`
        );
        const formattedBreedTypes = response.data.data
          .find((item) => item.animal === selectedOption.label)
          .sub[0].breed_type.map((item) => ({
            value: item,
            label: item,
          }));
        setAnimalBreeds(formattedBreedTypes);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const submitPostForm = async (values) => {
    const formData = new FormData();
    formData.append("health_guarantee", healthGuarantee ? 1 : 0);
    formData.append("delivery_availability", deliveryAvailability ? 1 : 0);
    formData.append("boarding_availability", boardingAvailability ? 1 : 0);
    formData.append("flying_availability", flyingAvailability ? 1 : 0);
    formData.append("petname", values.petname);
    formData.append("description", values.description);
    formData.append("animal_type_id", values.animalType);
    formData.append("type", values.type);
    formData.append("breed", values.breed);
    formData.append("price", values.price);
    formData.append("animal_gender", values.animalGender);
    formData.append("size", values.size);
    formData.append("weight", values.weight);
    formData.append("birthdate", values.birthdate);
    formData.append("date_available", values.date_available);
    formData.append("latitude", location.latitude);
    formData.append("longitude", location.longitude);
    formData.append("user_id", breederUserId);
    formData.append("crtifications", values.crtifications);

    images.forEach((img) => {
      formData.append("image[]", img);
    });

    try {
      await axios.post(
        `${BASE_URL}/api/post_breed`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success('Post Created Successfully');
    } catch (error) {
      console.error("Error submitting post:", error);
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
      await axios.post(
        `${BASE_URL}/api/additional_breeder_add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log("Response: ", response);
      toast.success("Your request has been submitted");
      closeModal();
    } catch (error) {
      console.error("Error submitting request: ", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="breedeerdasboard-createpost-wrap">
      <div className="container">
        <div className="col-lg-12">
          <div className="breedeerdasboard-createpost-inner">
            <div className="breedeerdasboard-createpost-left">
              <div className="create-uploadpost-wrap">
                <div className="edit-post-icon">
                  <a href="#">
                    <Image
                      src="/images/Nextpet-imgs/dashboard-imgs/edit-post-icon.svg"
                      alt=""
                      width={22}
                      height={20}
                    />
                  </a>
                </div>
                <label className="add-icon-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePostImage}
                    multiple
                  />
                  <Image
                    src="/images/Nextpet-imgs/dashboard-imgs/createpost-upload-icon.png"
                    alt=""
                    width={44}
                    height={44}
                  />
                  <p>
                    Add pet images here
                    <br />
                    (Size Up to 5Mb)
                  </p>
                </label>
              </div>
              {imageError && <p style={{ color: "red" }}>{imageError}</p>}
            </div>
            <div className="breedeerdasboard-createpost-right">
              <div className="postcreate-heading">
                <h3>Pet name</h3>
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submitPostForm}
              >
                {({ setFieldValue }) => (
                  <Form>
                    <label>
                      <Field
                        as="textarea"
                        name="description"
                        placeholder="Enter pet description here..."
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
                        <Field type="text" name="petname" />
                        <ErrorMessage
                          name="petname"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>

                      <div className="formdata-wrap">
                        <p>Type</p>
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
                            onChange={(selectedOption) =>
                              handleSelectedAnimalTypesChange(
                                selectedOption,
                                setFieldValue
                              )
                            }
                          />
                          <ErrorMessage
                            name="animalType"
                            component="div"
                            style={{ color: "red" }}
                          />
                        
                      </div>

                      <div className="formdata-wrap">
                        <p>Breed</p>
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
                              backgroundColor: "transparent",
                              border: "none",
                            }),
                          }}
                          onChange={(selectedOption) =>
                            setFieldValue("breed", selectedOption.value)
                          }
                        />
                        <ErrorMessage
                          name="breed"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>

                      <div className="formdata-wrap">
                        <p>Price ($)</p>
                        <Field type="text" name="price" />
                        <ErrorMessage
                          name="price"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>

                      <div className="formdata-wrap">
                        <p>General Size</p>
                        <Field as="select" name="size">
                          <option value="">Select size</option>
                          <option value="small">Small</option>
                          <option value="medium">Medium</option>
                          <option value="large">Large</option>
                        </Field>
                        <ErrorMessage
                          name="size"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>

                      <div className="formdata-wrap">
                        <p>Animal Gender</p>
                        <Field as="select" name="animalGender">
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </Field>
                        <ErrorMessage
                          name="animalGender"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>

                      <div className="formdata-wrap">
                        <p>Anticipated Weight (lbs)</p>
                        <Field type="text" name="weight" />
                        <ErrorMessage
                          name="weight"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>

                      <div className="formdata-wrap">
                        <p>Birthdate</p>
                        <Field type="date" name="birthdate" />

                        <ErrorMessage
                          name="birthdate"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>

                      <div className="formdata-wrap">
                        <p>Date Available</p>
                        <Field type="date" name="date_available" />
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
                            id="health-guarantee-yes"
                            type="radio"
                            checked={healthGuarantee}
                            onChange={() => setHealthGuarantee(true)}
                          />
                          <label htmlFor="health-guarantee-yes">YES</label>
                          <input
                            id="health-guarantee-no"
                            type="radio"
                            checked={!healthGuarantee}
                            onChange={() => setHealthGuarantee(false)}
                          />
                          <label htmlFor="health-guarantee-no">NO</label>
                        </div>
                      </div>
                      <div className="formdata-wrap">
                        <p>Certifications</p>
                        <Field type="text" name="crtifications" />
                        <ErrorMessage
                          name="crtifications"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>
                      <div className="formdata-wrap">
                        <p>Delivery availability</p>
                        <div className="switch-toggle switch-3 switch-candy">
                          <input
                            id="delivery-yes"
                            type="radio"
                            checked={deliveryAvailability}
                            onChange={() => setDeliveryAvailability(1)}
                          />
                          <label htmlFor="delivery-yes">YES</label>
                          <input
                            id="delivery-no"
                            type="radio"
                            checked={!deliveryAvailability}
                            onChange={() => setDeliveryAvailability(0)}
                          />
                          <label htmlFor="delivery-no">NO</label>
                        </div>
                        <ErrorMessage
                          name="deliveryAvailability"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>

                      <div className="formdata-wrap">
                        <p>Boarding availability</p>
                        <div className="switch-toggle switch-3 switch-candy">
                          <input
                            id="boarding-yes"
                            type="radio"
                            checked={boardingAvailability}
                            onChange={() => setBoardingAvailability(true)}
                          />
                          <label htmlFor="boarding-yes">YES</label>
                          <input
                            id="boarding-no"
                            type="radio"
                            checked={!boardingAvailability}
                            onChange={() => setBoardingAvailability(false)}
                          />
                          <label htmlFor="boarding-no">NO</label>
                        </div>
                      </div>

                      <div className="formdata-wrap">
                        <p>Flying availability</p>
                        <div className="switch-toggle switch-3 switch-candy">
                          <input
                            id="flying-yes"
                            type="radio"
                            checked={flyingAvailability}
                            onChange={() => setFlyingAvailability(true)}
                          />
                          <label htmlFor="flying-yes">YES</label>
                          <input
                            id="flying-no"
                            type="radio"
                            checked={!flyingAvailability}
                            onChange={() => setFlyingAvailability(false)}
                          />
                          <label htmlFor="flying-no">NO</label>
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
            </div>
          </div>
        </div>
      </div>

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
            transition: "top 0.5s ease-in-out, opacity 0.5s ease-in-out",
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
                  <spam style={{ color: "red" }}>{errorAdditionalRequest}</spam>
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
                  <button type="submit" value="Submit" data-bs-dismiss="close">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default CreatePost;
