"use client";

import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

const Favorites = () => {
  return (
    <>
      <div className="pets-breeder-wrap">
        <div className="container">
          <div className="aligns-filter-pets">
            <div className="searchbar-filter-sec">
              <div className="search-wrap">
                <form action="">
                  <label for="">
                    <input
                      type="text"
                      placeholder="Search by Animal Type, Breed or Location"
                    />
                    <button>
                      <Image
                        width={20}
                        height={20}
                        src="/images/Nextpet-imgs/all-icons/serch2.svg"
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
                      <Image
                        width={25}
                        height={25}
                        src="/images/Nextpet-imgs/dashboard-imgs/mi_filter.svg"
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
                      <Image
                        width={25}
                        height={25}
                        src="/images/Nextpet-imgs/dashboard-imgs/mi_filter.svg"
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
                    <Image
                      width={25}
                      height={25}
                      src="/images/Nextpet-imgs/all-icons/filter-map-icon.svg"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pets-breeder-cards">
            <div className="newyear-cat-dog-in">
              <div className="newyear-catimg-wrap">
                <Image
                  width={266}
                  height={200}
                  src="/images/Nextpet-imgs/recently-posted-imgs/img1.png"
                  alt=""
                  loading="lazy"
                />
                <div className="heart-icon-wrap">
                  <Image
                    width={20}
                    height={20}
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg"
                    alt=""
                    className="active"
                  />
                  <Image
                    width={20}
                    height={20}
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg"
                    alt=""
                  />
                  <span>55</span>
                </div>
              </div>

              <div className="newyear-content-card">
                <div className="before-curve-icons">
                  <Image
                    width={16}
                    height={16}
                    src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg"
                    alt=""
                  />
                </div>
                <div className="heading-content">
                  <h3>Lorem ipsum dolo</h3>
                  <div className="mail-boxwrap">
                    <Image
                      width={16}
                      height={16}
                      src="/images/Nextpet-imgs/dashboard-imgs/yellow-mail-letter.svg"
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
                  <h4>$105</h4>
                  <div className="action-wrap">
                    <a href="contact-pet-details.html">
                      View More&nbsp;<i className="fas fa-angle-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="newyear-cat-dog-in">
              <div className="newyear-catimg-wrap">
                <Image
                  width={266}
                  height={200}
                  src="/images/Nextpet-imgs/recently-posted-imgs/img2.png"
                  alt=""
                  loading="lazy"
                />
                <div className="heart-icon-wrap">
                  <Image
                    width={20}
                    height={20}
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg"
                    alt=""
                    className="active"
                  />
                  <Image
                    width={20}
                    height={20}
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg"
                    alt=""
                  />
                  <span>55</span>
                </div>
              </div>

              <div className="newyear-content-card">
                <div className="before-curve-icons">
                  <Image
                    width={16}
                    height={16}
                    src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg"
                    alt=""
                  />
                </div>
                <div className="heading-content">
                  <h3>Lorem ipsum dolo</h3>
                  <div className="mail-boxwrap">
                    <Image
                      width={16}
                      height={16}
                      src="/images/Nextpet-imgs/dashboard-imgs/yellow-mail-letter.svg"
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
                  <h4>$105</h4>
                  <div className="action-wrap">
                    <a href="contact-pet-details.html">
                      View More&nbsp;<i className="fas fa-angle-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="newyear-cat-dog-in">
              <div className="newyear-catimg-wrap">
                <Image
                  width={266}
                  height={200}
                  src="/images/Nextpet-imgs/recently-posted-imgs/img3.png"
                  alt=""
                  loading="lazy"
                />
                <div className="heart-icon-wrap">
                  <Image
                    width={20}
                    height={20}
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg"
                    alt=""
                    className="active"
                  />
                  <Image
                    width={20}
                    height={20}
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg"
                    alt=""
                  />
                  <span>55</span>
                </div>
              </div>

              <div className="newyear-content-card">
                <div className="before-curve-icons">
                  <Image
                    width={16}
                    height={16}
                    src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg"
                    alt=""
                  />
                </div>
                <div className="heading-content">
                  <h3>Lorem ipsum dolo</h3>
                  <div className="mail-boxwrap">
                    <Image
                      width={16}
                      height={16}
                      src="/images/Nextpet-imgs/dashboard-imgs/yellow-mail-letter.svg"
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
                  <h4>$105</h4>
                  <div className="action-wrap">
                    <a href="contact-pet-details.html">
                      View More&nbsp;<i className="fas fa-angle-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="newyear-cat-dog-in">
              <div className="newyear-catimg-wrap">
                <Image
                  width={266}
                  height={200}
                  src="/images/Nextpet-imgs/recently-posted-imgs/img4.png"
                  alt=""
                  loading="lazy"
                />
                <div className="heart-icon-wrap">
                  <Image
                    width={20}
                    height={20}
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg"
                    alt=""
                    className="active"
                  />
                  <Image
                    width={20}
                    height={20}
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg"
                    alt=""
                  />
                  <span>55</span>
                </div>
              </div>

              <div className="newyear-content-card">
                <div className="before-curve-icons">
                  <Image
                    width={16}
                    height={16}
                    src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg"
                    alt=""
                  />
                </div>
                <div className="heading-content">
                  <h3>Lorem ipsum dolo</h3>
                  <div className="mail-boxwrap">
                    <Image
                      width={16}
                      height={16}
                      src="/images/Nextpet-imgs/dashboard-imgs/yellow-mail-letter.svg"
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
                  <h4>$105</h4>
                  <div className="action-wrap">
                    <a href="contact-pet-details.html">
                      View More&nbsp;<i className="fas fa-angle-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="newyear-cat-dog-in">
              <div className="newyear-catimg-wrap">
                <Image
                  width={266}
                  height={200}
                  src="/images/Nextpet-imgs/recently-posted-imgs/img1.png"
                  alt=""
                  loading="lazy"
                />
                <div className="heart-icon-wrap">
                  <Image
                    width={20}
                    height={20}
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg"
                    alt=""
                    className="active"
                  />
                  <Image
                    width={20}
                    height={20}
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg"
                    alt=""
                  />
                  <span>55</span>
                </div>
              </div>

              <div className="newyear-content-card">
                <div className="before-curve-icons">
                  <Image
                    width={16}
                    height={16}
                    src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg"
                    alt=""
                  />
                </div>
                <div className="heading-content">
                  <h3>Lorem ipsum dolo</h3>
                  <div className="mail-boxwrap">
                    <Image
                      width={16}
                      height={16}
                      src="/images/Nextpet-imgs/dashboard-imgs/yellow-mail-letter.svg"
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
                  <h4>$105</h4>
                  <div className="action-wrap">
                    <a href="contact-pet-details.html">
                      View More&nbsp;<i className="fas fa-angle-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="newyear-cat-dog-in">
              <div className="newyear-catimg-wrap">
                <Image
                  width={266}
                  height={200}
                  src="/images/Nextpet-imgs/recently-posted-imgs/img2.png"
                  alt=""
                  loading="lazy"
                />
                <div className="heart-icon-wrap">
                  <Image
                    width={20}
                    height={20}
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg"
                    alt=""
                    className="active"
                  />
                  <Image
                    width={20}
                    height={20}
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg"
                    alt=""
                  />
                  <span>55</span>
                </div>
              </div>

              <div className="newyear-content-card">
                <div className="before-curve-icons">
                  <Image
                    width={16}
                    height={16}
                    src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg"
                    alt=""
                  />
                </div>
                <div className="heading-content">
                  <h3>Lorem ipsum dolo</h3>
                  <div className="mail-boxwrap">
                    <Image
                      width={16}
                      height={16}
                      src="/images/Nextpet-imgs/dashboard-imgs/yellow-mail-letter.svg"
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
                  <h4>$105</h4>
                  <div className="action-wrap">
                    <a href="contact-pet-details.html">
                      View More&nbsp;<i className="fas fa-angle-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="newyear-cat-dog-in">
              <div className="newyear-catimg-wrap">
                <Image
                  width={266}
                  height={200}
                  src="/images/Nextpet-imgs/recently-posted-imgs/img3.png"
                  alt=""
                  loading="lazy"
                />
                <div className="heart-icon-wrap">
                  <Image
                    width={20}
                    height={20}
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg"
                    alt=""
                    className="active"
                  />
                  <Image
                    width={20}
                    height={20}
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg"
                    alt=""
                  />
                  <span>55</span>
                </div>
              </div>

              <div className="newyear-content-card">
                <div className="before-curve-icons">
                  <Image
                    width={16}
                    height={16}
                    src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg"
                    alt=""
                  />
                </div>
                <div className="heading-content">
                  <h3>Lorem ipsum dolo</h3>
                  <div className="mail-boxwrap">
                    <Image
                      width={16}
                      height={16}
                      src="/images/Nextpet-imgs/dashboard-imgs/yellow-mail-letter.svg"
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
                  <h4>$105</h4>
                  <div className="action-wrap">
                    <a href="contact-pet-details.html">
                      View More&nbsp;<i className="fas fa-angle-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="newyear-cat-dog-in">
              <div className="newyear-catimg-wrap">
                <Image
                  width={266}
                  height={200}
                  src="/images/Nextpet-imgs/recently-posted-imgs/img4.png"
                  alt=""
                  loading="lazy"
                />
                <div className="heart-icon-wrap">
                  <Image
                    width={20}
                    height={20}
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg"
                    alt=""
                    className="active"
                  />
                  <Image
                    width={20}
                    height={20}
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg"
                    alt=""
                  />
                  <span>55</span>
                </div>
              </div>

              <div className="newyear-content-card">
                <div className="before-curve-icons">
                  <Image
                    width={16}
                    height={16}
                    src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg"
                    alt=""
                  />
                </div>
                <div className="heading-content">
                  <h3>Lorem ipsum dolo</h3>
                  <div className="mail-boxwrap">
                    <Image
                      width={16}
                      height={16}
                      src="/images/Nextpet-imgs/dashboard-imgs/yellow-mail-letter.svg"
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
                  <h4>$105</h4>
                  <div className="action-wrap">
                    <a href="contact-pet-details.html">
                      View More&nbsp;<i className="fas fa-angle-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="newyear-cat-dog-in">
              <div className="newyear-catimg-wrap">
                <Image
                  width={266}
                  height={200}
                  src="/images/Nextpet-imgs/recently-posted-imgs/img1.png"
                  alt=""
                  loading="lazy"
                />
                <div className="heart-icon-wrap">
                  <Image
                    width={20}
                    height={20}
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg"
                    alt=""
                    className="active"
                  />
                  <Image
                    width={20}
                    height={20}
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg"
                    alt=""
                  />
                  <span>55</span>
                </div>
              </div>

              <div className="newyear-content-card">
                <div className="before-curve-icons">
                  <Image
                    width={16}
                    height={16}
                    src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg"
                    alt=""
                  />
                </div>
                <div className="heading-content">
                  <h3>Lorem ipsum dolo</h3>
                  <div className="mail-boxwrap">
                    <Image
                      width={16}
                      height={16}
                      src="/images/Nextpet-imgs/dashboard-imgs/yellow-mail-letter.svg"
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
                  <h4>$105</h4>
                  <div className="action-wrap">
                    <a href="contact-pet-details.html">
                      View More&nbsp;<i className="fas fa-angle-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="newyear-cat-dog-in">
              <div className="newyear-catimg-wrap">
                <Image
                  width={266}
                  height={200}
                  src="/images/Nextpet-imgs/recently-posted-imgs/img2.png"
                  alt=""
                  loading="lazy"
                />
                <div className="heart-icon-wrap">
                  <Image
                    width={20}
                    height={20}
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg"
                    alt=""
                    className="active"
                  />
                  <Image
                    width={20}
                    height={20}
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg"
                    alt=""
                  />
                  <span>55</span>
                </div>
              </div>

              <div className="newyear-content-card">
                <div className="before-curve-icons">
                  <Image
                    width={16}
                    height={16}
                    src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg"
                    alt=""
                  />
                </div>
                <div className="heading-content">
                  <h3>Lorem ipsum dolo</h3>
                  <div className="mail-boxwrap">
                    <Image
                      width={16}
                      height={16}
                      src="/images/Nextpet-imgs/dashboard-imgs/yellow-mail-letter.svg"
                      alt=""
                    />
                    <div className="mail-count">
                      <span>105</span>
                    </div>
                  </div>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>

                <div className="viewmore-wrap">
                  <h4>$105</h4>
                  <div className="action-wrap">
                    <a href="contact-pet-details.html">
                      View More&nbsp;<i className="fas fa-angle-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="newyear-cat-dog-in">
              <div className="newyear-catimg-wrap">
                <Image
                  width={266}
                  height={200}
                  src="/images/Nextpet-imgs/recently-posted-imgs/img3.png"
                  alt=""
                  loading="lazy"
                />
                <div className="heart-icon-wrap">
                  <Image
                    width={20}
                    height={20}
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg"
                    alt=""
                    className="active"
                  />
                  <Image
                    width={20}
                    height={20}
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg"
                    alt=""
                  />
                  <span>55</span>
                </div>
              </div>

              <div className="newyear-content-card">
                <div className="before-curve-icons">
                  <Image
                    width={16}
                    height={16}
                    src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg"
                    alt=""
                  />
                </div>
                <div className="heading-content">
                  <h3>Lorem ipsum dolo</h3>
                  <div className="mail-boxwrap">
                    <Image
                      width={16}
                      height={16}
                      src="/images/Nextpet-imgs/dashboard-imgs/yellow-mail-letter.svg"
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
                  <h4>$105</h4>
                  <div className="action-wrap">
                    <a href="contact-pet-details.html">
                      View More&nbsp;<i className="fas fa-angle-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="newyear-cat-dog-in">
              <div className="newyear-catimg-wrap">
                <Image
                  width={266}
                  height={200}
                  src="/images/Nextpet-imgs/recently-posted-imgs/img4.png"
                  alt=""
                  loading="lazy"
                />
                <div className="heart-icon-wrap">
                  <Image
                    width={20}
                    height={20}
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg"
                    alt=""
                    className="active"
                  />
                  <Image
                    width={20}
                    height={20}
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg"
                    alt=""
                  />
                  <span>55</span>
                </div>
              </div>

              <div className="newyear-content-card">
                <div className="before-curve-icons">
                  <Image
                    width={16}
                    height={16}
                    src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg"
                    alt=""
                  />
                </div>
                <div className="heading-content">
                  <h3>Lorem ipsum dolo</h3>
                  <div className="mail-boxwrap">
                    <Image
                      width={16}
                      height={16}
                      src="/images/Nextpet-imgs/dashboard-imgs/yellow-mail-letter.svg"
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
                  <h4>$105</h4>
                  <div className="action-wrap">
                    <a href="contact-pet-details.html">
                      View More&nbsp;<i className="fas fa-angle-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="influ-pagi pt-4">
            <ul>
              <li>
                <a href="#">
                  <i className="fa fa-arrow-left" aria-hidden="true" />
                </a>
              </li>

              <li className="active">
                <a href="#">1</a>
              </li>
              <li>
                <a href="#">2</a>
              </li>
              <li>
                <a href="#">3</a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-arrow-right" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade modal-common"
        id="contact-coach"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
      >
        <div className="modal-dialog modal-dialog-edit" role="document">
          <div className="modal-content">
            <div className="modal-heading">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
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
                    <select name="" id="">
                      <option value="0">Select animal type</option>
                      <option value="0">Cat</option>
                    </select>
                    <select name="" id="">
                      <option value="0">Select breed type</option>
                      <option value="0">Cat</option>
                    </select>
                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        value="Submit"
                        data-bs-toggle="modal"
                        data-bs-dismiss="close"
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

export default Favorites;
