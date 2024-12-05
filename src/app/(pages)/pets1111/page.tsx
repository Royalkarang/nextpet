import React from "react";
import Link from "next/link";

interface Pet {
  image: string;
  name: string;
  price: string;
}

const PetCard = ({ image, name, price }: Pet) => {
  return (
    <div className="newyear-cat-dog-in">
      <div className="newyear-catimg-wrap">
        <img src={image} alt="" loading="lazy" />
        <div className="heart-icon-wrap">
          <img
            src="images/Nextpet-imgs/dashboard-imgs/heart-border2.svg"
            alt=""
            className="active"
          />
          <img src="images/Nextpet-imgs/dashboard-imgs/heart-fill.svg" alt="" />
          <span>55</span>
        </div>
      </div>
      <div className="newyear-content-card">
        <div className="before-curve-icons">
          <img
            src="images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg"
            alt=""
          />
        </div>
        <div className="heading-content">
          <h3>{name}</h3>
          <div className="mail-boxwrap">
            <img
              src="images/Nextpet-imgs/dashboard-imgs/yellow-mail-letter.svg"
              alt=""
            />
            <div
              className="mail-count"
              data-bs-target="#breeder-guide2"
              data-bs-toggle="modal"
            >
              <span>105</span>
            </div>
          </div>
        </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        <div className="viewmore-wrap">
          <h4>{price}</h4>
          <div className="action-wrap">
            <Link href="pets/2">
              View More&nbsp;<i className="fas fa-angle-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const pets = [
    {
      image: "images/Nextpet-imgs/recently-posted-imgs/img1.png",
      name: "Lorem ipsum dolo",
      price: "$105",
    },
    {
      image: "images/Nextpet-imgs/recently-posted-imgs/img2.png",
      name: "Lorem ipsum dolo",
      price: "$105",
    },
    {
      image: "images/Nextpet-imgs/recently-posted-imgs/img3.png",
      name: "Lorem ipsum dolo",
      price: "$105",
    },
    {
      image: "images/Nextpet-imgs/recently-posted-imgs/img4.png",
      name: "Lorem ipsum dolo",
      price: "$105",
    },
    {
      image: "images/Nextpet-imgs/recently-posted-imgs/img2.png",
      name: "Lorem ipsum dolo",
      price: "$105",
    },
    {
      image: "images/Nextpet-imgs/recently-posted-imgs/img3.png",
      name: "Lorem ipsum dolo",
      price: "$105",
    },
    {
      image: "images/Nextpet-imgs/recently-posted-imgs/img4.png",
      name: "Lorem ipsum dolo",
      price: "$105",
    },
    {
      image: "images/Nextpet-imgs/recently-posted-imgs/img2.png",
      name: "Lorem ipsum dolo",
      price: "$105",
    },
    {
      image: "images/Nextpet-imgs/recently-posted-imgs/img3.png",
      name: "Lorem ipsum dolo",
      price: "$105",
    },
    {
      image: "images/Nextpet-imgs/recently-posted-imgs/img4.png",
      name: "Lorem ipsum dolo",
      price: "$105",
    },
    {
      image: "images/Nextpet-imgs/recently-posted-imgs/img2.png",
      name: "Lorem ipsum dolo",
      price: "$105",
    },
    {
      image: "images/Nextpet-imgs/recently-posted-imgs/img3.png",
      name: "Lorem ipsum dolo",
      price: "$105",
    },
    {
      image: "images/Nextpet-imgs/recently-posted-imgs/img4.png",
      name: "Lorem ipsum dolo",
      price: "$105",
    },
    {
      image: "images/Nextpet-imgs/recently-posted-imgs/img2.png",
      name: "Lorem ipsum dolo",
      price: "$105",
    },
    {
      image: "images/Nextpet-imgs/recently-posted-imgs/img3.png",
      name: "Lorem ipsum dolo",
      price: "$105",
    },
    {
      image: "images/Nextpet-imgs/recently-posted-imgs/img4.png",
      name: "Lorem ipsum dolo",
      price: "$105",
    },
    {
      image: "images/Nextpet-imgs/recently-posted-imgs/img2.png",
      name: "Lorem ipsum dolo",
      price: "$105",
    },
    {
      image: "images/Nextpet-imgs/recently-posted-imgs/img3.png",
      name: "Lorem ipsum dolo",
      price: "$105",
    },
    {
      image: "images/Nextpet-imgs/recently-posted-imgs/img4.png",
      name: "Lorem ipsum dolo",
      price: "$105",
    },
    {
      image: "images/Nextpet-imgs/recently-posted-imgs/img2.png",
      name: "Lorem ipsum dolo",
      price: "$105",
    },
    {
      image: "images/Nextpet-imgs/recently-posted-imgs/img3.png",
      name: "Lorem ipsum dolo",
      price: "$105",
    },
    {
      image: "images/Nextpet-imgs/recently-posted-imgs/img4.png",
      name: "Lorem ipsum dolo",
      price: "$105",
    },
    {
      image: "images/Nextpet-imgs/recently-posted-imgs/img2.png",
      name: "Lorem ipsum dolo",
      price: "$105",
    },
    {
      image: "images/Nextpet-imgs/recently-posted-imgs/img3.png",
      name: "Lorem ipsum dolo",
      price: "$105",
    },
    {
      image: "images/Nextpet-imgs/recently-posted-imgs/img4.png",
      name: "Lorem ipsum dolo",
      price: "$105",
    },
    // add more pets here
  ];

  return (
    <div className="pets-breeder-wrap">
      <div className="container">
        <div className="aligns-filter-pets">
          <div className="searchbar-filter-sec">
            <div className="search-wrap">
              <form action="">
                <label htmlFor="">
                  <input
                    type="text"
                    placeholder="Search by Animal Type, Breed or Location"
                  />
                  <button>
                    <img
                      src="images/Nextpet-imgs/all-icons/serch2.svg"
                      alt=""
                    />
                  </button>
                </label>
              </form>
            </div>
          </div>
          <div className="search-filter-sec">
            <div className="pets-filters-wrap">
              <div className="filter-sec">
                <div className="quotes2">
                  <div className="dropdown-filterbtn">
                    Sort
                    <img
                      src="images/Nextpet-imgs/dashboard-imgs/mi_filter.svg"
                      alt=""
                    />
                  </div>
                  <div className="dropdown-showfilter">
                    <div className="quotes-list">
                      <div className="filter-data-list">
                        <input type="radio" name="exp_language2" value="2" />
                        <p>Nearby</p>
                      </div>
                      <div className="filter-data-list">
                        <input type="radio" name="exp_language2" value="2" />
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
                <a href="map.html">
                  <i className="fas fa-map-marker-alt"></i>
                </a>
                <button type="button">
                  <img
                    src="images/Nextpet-imgs/all-icons/filter-map-icon.svg"
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="pets-breeder-cards">
          {pets.map((pet, index) => (
            <PetCard key={index} {...pet} />
          ))}
        </div>
        <div className="influ-pagi pt-4">
          <ul>
            <li>
              <Link href="#">
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
              </Link>
            </li>
            <li className="active">
              <Link href="#">1</Link>
            </li>
            <li>
              <Link href="#">2</Link>
            </li>
            <li>
              <Link href="#">3</Link>
            </li>
            <li>
              <Link href="#">
                <i className="fa fa-arrow-right" aria-hidden="true"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
