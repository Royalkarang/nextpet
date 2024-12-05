"use client";
import React, { useState, useEffect } from "react";
import BASE_URL from "../../utils/constant";
import axios from "axios";
import Image from "next/image";
import Select from "react-select";
import { MdLocationOn } from "react-icons/md";
import Pagination from "../../../components/Pagination";
import ContactModal from "../../../components/ContactModal";
import PreviouslyContacted from "../../../components/PreviouslyContacted";
import { useAuth } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

const Pets = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [activeRadio, setActiveRadio] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPreviousModal, setShowPreviousModal] = useState(false);
  const [allPets, setAllPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const [animalTypes, setAnimalTypes] = useState([]);
  const [animalBreeds, setAnimalBreeds] = useState([]);
  const [animalTypeFilter, setAnimalTypeFilter] = useState("");
  const [breedTypeFilter, setBreedTypeFilter] = useState("");
  const [userIdOrBreederId, setUserIdOrBreederId] = useState(null);
  const [filter, setFilter] = useState(null);
  const [location, setLocation] = useState(null);
  const [recentDate, setRecentDate] = useState(null);
  // const [mapLocation, setMapLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [modalData, setModalData] = useState({
    post_id: "",
    breeder_id: "",
  });
  const [searchItemParam, setSearchItem] = useState('');

  const { isAuthenticated } = useAuth();
  
  const router = useRouter();
  
  // const { searchItem } = router.query;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const queryParams = new URLSearchParams(window.location.search);
      const searchItemParam = queryParams.get('searchItem');
      setSearchItem(searchItemParam || '');  
    }
    if (!searchItemParam) return;

    

    const query = searchItemParam.toLowerCase();
    const filtered = allPets.filter((pet) => {
      return (
        pet.type?.toLowerCase().includes(query) ||
        pet.name?.toLowerCase().includes(query) ||
        pet.breed?.toLowerCase().includes(query) ||
        pet.location?.toLowerCase().includes(query)
      );
    });

    setFilteredData(filtered);
  }, [searchItemParam, allPets]);


  useEffect(() => {
    if (filter === "nearby" && navigator.geolocation) {
      setRecentDate(null);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setActiveRadio("nearby");
        },
        () => alert("Unable to retrieve your location.")
      );
    }
    if (filter === "recent") {
      setLocation(null);
      const today = new Date().toISOString().split("T")[0];
      setRecentDate(today);
      setActiveRadio("recent");
    }

    if (activeRadio == "nearby" || activeRadio == "recent") {
      getAllPets();
    }
  }, [filter, activeRadio]);

  useEffect(() => {
    // navigator.geolocation.getCurrentPosition((position) => {
    //   setMapLocation({
    //     lat: position.coords.latitude,
    //     lon: position.coords.longitude,
    //   });
    // });
    const userId = localStorage.getItem("user_user_id");
    const breaderId = localStorage.getItem("breeder_user_id");
    if (userId) {
      setUserIdOrBreederId(userId);
    } else if (breaderId) {
      setUserIdOrBreederId(breaderId);
    }
    isAuthenticated ? getAllPets() : getAllPetsWithoutLogin();
    fetchAnimalTypes();
  }, [userIdOrBreederId]);

  const getAllPets = async (filters = {}) => {
    let user = {
      user_id: userIdOrBreederId,
      type: filters.animalType || animalTypeFilter,
      breed: filters.breedType || breedTypeFilter,
      recent: recentDate,
      latitude: location?.lat,
      longitude: location?.lon,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/api/all_pets_listing`,
        user
      );
      if (response.data.code === 200) {
        setAllPets(response.data.pets_list);
      }
    } catch (err) {
      console.log("error : ", err);
    }
  };

  const getAllPetsWithoutLogin = async () => {
    
    try {
      const response = await axios.post(
        `${BASE_URL}/api/all_pets_listing_without_login`);

      if (response.data.code === 200) {
        setAllPets(response.data.pets_list_without_login);
      }
    } catch (err) {
      console.log("error : ", err);
    }
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
    }
  };

  const handleSelectedAnimalTypesChange = async (selectedOption) => {
    setAnimalTypeFilter(selectedOption);
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

  const handlePostLike = async (value) => {
    let checkLikeDislike = value?.check_like == "0" ? 1 : 111;
    let likeData = {
      user_id: userIdOrBreederId,
      post_id: value?.id || "",
      breeder_id: value?.user_breeder_id || "",
      like_post: checkLikeDislike,
    };
    try {
      const response = await axios.post(`${BASE_URL}/api/like_post`, likeData);
      if (response.data.code === 200) {
        getAllPets();
      }
    } catch (err) {
      console.log("error : ", err);
    }
  };

  function fillterPets() {
    if (recentDate || location) {
      setAnimalTypeFilter(null);
      setBreedTypeFilter(null);
      getAllPets({
        latitude: location?.lat,
        longitude: location?.lon,
        recent: recentDate,
      });
    } else if (animalTypeFilter) {
      setLocation(null);
      setRecentDate(null);
      getAllPets({
        animalType: animalTypeFilter,
        breedType: breedTypeFilter,
      });
    }
    setAnimalTypeFilter(null);
    setBreedTypeFilter(null);
  }

  // Logic for pagination
  let petsData = filteredData?.length > 0 ? filteredData : allPets;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = petsData.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // const openMapInNewTab = () => {
  //   if (mapLocation?.lat && mapLocation?.lon) {
  //     const mapUrl = `https://www.google.com/maps?q=${mapLocation.lat},${mapLocation.lon}&hl=es;z=12&output=embed`;
  //     window.open(mapUrl, "_blank");
  //   } else {
  //     alert("Location not available");
  //   }
  // };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value.length < 1) {
      setFilteredData();
    }
  };

  const handleSearch = () => {
    let filtered = allPets.filter((pet) => {
      const query = searchQuery.toLowerCase();

      return (
        pet.type?.toLowerCase().includes(query) ||
        "" ||
        pet.name?.toLowerCase().includes(query) ||
        "" ||
        pet.breed?.toLowerCase().includes(query) ||
        "" ||
        pet.location?.toLowerCase().includes(query) ||
        ""
      );
    });
    setFilteredData(filtered);
  };

  function handleModel() {
    setDropdownVisible(!isDropdownVisible);
  }

  const handleModal = (post_id, breeder_id, contacts_colour) => {
    setModalData({ post_id, breeder_id });
    if (contacts_colour == 1) {
      setShowPreviousModal(true);
    } else {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    getAllPets();
    setShowModal(false);
    setShowPreviousModal(false);
  };

  function likeHandler(item) {
    if (isAuthenticated) {
      handlePostLike(item)
    } else {
      toast.error("User must be logged in");
      setTimeout(() => {
        router.push('/user/sign-in');
      }, 1000);
    }
  }
  function handleViewMore (item) {
    if(isAuthenticated){
      router.push(`/user/posts/${item.user_breeder_id}/${item.id}/${item.check_like} `)
    } else{
      toast.error("User must be logged in");
      setTimeout(() => {
        router.push('/user/sign-in');
      }, 1000);
    }
  }

  function handleAuth() {
    router.push("/map?user=");
  }
  // function handleAuth() {
  //   if (!isAuthenticated) {
  //     toast.error("User must be logged in");
  //     setTimeout(() => {
  //       router.push("/user/sign-in");
  //     }, 1000);
  //   } else {
  //     router.push("/user/map");
  //   }

  // }
  return (
    <>
      <ToastContainer />
      <div className="pets-breeder-wrap">
        <div className="container">
          <div className="aligns-filter-pets">
            <div className="searchbar-filter-sec">
              <div className="search-wrap">
                {/* <form action=""> */}
                <div style={{ width: "90%" }}>
                  <label htmlFor="">
                    <input
                      id="search-input"
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="Search by Animal Type, Breed or Location"
                    />
                    <button onClick={handleSearch}>
                      <img
                        src="/images/Nextpet-imgs/all-icons/serch2.svg"
                        alt=""
                      />
                    </button>
                  </label>
                </div>
                {/* </form> */}
              </div>
            </div>
            <div className="search-filter-sec">
              <div className="pets-filters-wrap">
                <div className="filter-sec">
                  <div className="quotes2">
                    <div className="dropdown-filterbtn" onClick={handleModel}>
                      Sort
                      <img
                        src="/images/Nextpet-imgs/dashboard-imgs/mi_filter.svg"
                        alt=""
                      />
                    </div>
                    <div
                      className="dropdown-showfilter"
                      style={{
                        display: isDropdownVisible ? "block" : "none",
                      }}
                    >
                      <div className="quotes-list">
                        <div className="filter-data-list">
                          <input
                            type="radio"
                            name="exp_language2"
                            value="nearby"
                            checked={filter === "nearby"}
                            onChange={() => setFilter("nearby")}
                          />
                          <p>Nearby</p>
                        </div>
                        <div className="filter-data-list">
                          <input
                            type="radio"
                            name="exp_language2"
                            value="recent"
                            checked={filter === "recent"}
                            onChange={() => setFilter("recent")}
                          />
                          <p>Recent</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="filter-sec">
                  <div className="quotes2">
                    <div
                      className="dropdown-filterbtn"
                      data-bs-target="#contact-coach"
                      data-bs-toggle="modal"
                    >
                      Filter
                      <img
                        src="images/Nextpet-imgs/dashboard-imgs/mi_filter.svg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                <div className="location-filter">
                  <span style={{ borderRadius: "10px 0 0 10px", color: '#fff', border: 'none', width: '50px', fontWeight: '500', border: '1px solid #d1d1d1', height: '44px', cursor: 'pointer', background: '#fff'}}>
                    <MdLocationOn className="fas fa-map-marker-alt"
                      style={{ color: "#e49a01", margin: "12px", cursor: "pointer" }}
                      size={20} onClick={handleAuth} />
                  </span>

                  <button type="button">
                    <img
                      src="/images/Nextpet-imgs/all-icons/filter-map-icon.svg"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pets-breeder-cards">
            {currentPosts?.map((item, index) => (
              <div className="newyear-cat-dog-in" key={index}>
                <div className="newyear-catimg-wrap">
                  <Image
                    width={266}
                    height={200}
                    src={item?.image?.[0] || "/images/Nextpet-imgs/Image_not_available.webp"}
                    alt=""
                    loading="lazy" className="home-Image-height"
                  />
                  <div
                    className="heart-icon-wrap"
                    onClick={() => likeHandler(item)}
                    style={{ cursor: "pointer" }}
                  >
                    <Image
                      width={20}
                      height={20}
                      src={
                        item?.check_like == 1
                          ?"/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg" : "/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg"
                        
                      }
                      alt=""
                      className="active"
                    />
                    <span>{item?.check_like}</span>
                  </div>
                </div>

                <div className="newyear-content-card">
                  <div className="before-curve-icons">
                    <Image
                      width={45}
                      height={45}
                      src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg"
                      alt=""
                    />
                  </div>
                  <div className="heading-content">
                    <h3>{item?.name}</h3>
                    <div
                      className="mail-boxwrap"
                      onClick={() =>
                        handleModal(
                          item.id,
                          item.user_breeder_id,
                          item?.contacts_colour
                        )
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <Image
                        width={16}
                        height={16}
                        src={
                          item?.contacts_colour == 1
                            ? "/images/Nextpet-imgs/newyear-cats-imgs/mail.svg"
                            : "/images/Nextpet-imgs/dashboard-imgs/yellow-mail-letter.svg"
                        }
                        alt="mail"
                      />
                      <div className="mail-count">
                        <span>{item?.total_contact}</span>
                      </div>
                    </div>
                  </div>
                  {/* <p>{item?.description}</p> */}
                  <p>
                    {item.description
                      ? item.description.length > 50
                      ? `${item.description.slice(0, 50)}...`
                      : item.description
                      : "Description not available"}
                    </p>
                  <div className="viewmore-wrap">
                    <h4>{`$${item?.price}`}</h4>
                    <div className="action-wrap" onClick={() => handleViewMore(item)} style={{fontSize:'14px', color:'#4e4e4e', cursor:'pointer'}}>
                      View More  &gt;
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="influ-pagi pt-4">
            <Pagination
              postPerPage={postsPerPage}
              totalPosts={allPets.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
        <ContactModal
          modalIsOpen={showModal}
          closeModal={closeModal}
          modalDetails={modalData}
        />
        <PreviouslyContacted
          modalIsOpen={showPreviousModal}
          closeModal={closeModal}
          modalDetails={modalData}
        />
      </div>

      {/* Modal */}

      <div
        className="modal fade modal-common"
        id="contact-coach"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
      >
        <div
          className="modal-dialog modal-dialog-edit"
          role="document"
          data-bs-backdrop="static"
        >
          <div className="modal-content">
            <div className="modal-heading">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                X
              </button>
            </div>
            <div className="modal-body">
              <form action="">
                <div className="conatctcpach-popup-wrap">
                  <Image
                    width={71}
                    height={71}
                    src="/images/Nextpet-imgs/all-icons/filter-pop-icon.svg"
                    alt=""
                  />
                  <h1>Filter</h1>
                  <div className="coach-form-wrap">
                    <Select
                      options={animalTypes}
                      placeholder="Select an Animal Type"
                      value={animalTypeFilter}
                      styles={{
                        container: (provided) => ({
                          ...provided,
                        }),
                        control: (provided) => ({
                          ...provided,
                          backgroundColor: "transparent",
                          border: "2px solid rgb(230 158 1)",
                          borderRadius: "10px",
                        }),
                      }}
                      onChange={(selectedOption) =>
                        handleSelectedAnimalTypesChange(selectedOption)
                      }
                      label={animalTypeFilter ? animalTypeFilter.label : ""}
                    />
                    <Select
                      options={animalBreeds}
                      placeholder="Select a Breed Type"
                      value={breedTypeFilter}
                      styles={{
                        container: (provided) => ({
                          ...provided,
                        }),
                        control: (provided) => ({
                          ...provided,
                          backgroundColor: "transparent",
                          border: "2px solid rgb(230 158 1)",
                          borderRadius: "10px",
                        }),
                      }}
                      onChange={(selectedOption) =>
                        setBreedTypeFilter(selectedOption)
                      }
                      label={breedTypeFilter ? breedTypeFilter.label : ""}
                    />
                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        data-bs-dismiss="modal"
                        value="Submit"
                        onClick={fillterPets}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pets;
