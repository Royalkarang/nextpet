"use client";
import Link from 'next/link';
import {React} from 'react'
// import Image from 'next/image';

const ContactPetDetails = () => {
  return (
    <>
      <div className="breedeerdasboard-createpost-wrap">
        <div className="container">
          <div className="col-lg-12">
            <div className="breedeerdasboard-createpost-inner">
              <div className="breedeerdasboard-createpost-left">
                <div className="breeder-profileinner-wrap">
                  <img
                    src="/images/Nextpet-imgs/dashboard-imgs/breeder-profile.png"
                    alt=""
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="breedeerdasboard-createpost-right">
                <div className="postcreate-heading">
                  <h3>Anna B....</h3>
                  <div className="edit-heartpost">
                    <div className="heart-icon-wrap">
                      <img
                        src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg"
                        alt=""
                        className="active"
                      />
                      <img
                        src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg"
                        alt=""
                      />
                    </div>
                    <div className="inner-heartt">
                        <a href="#" style={{ padding: '7px 4px' }}>
                            <img
                            src="/images/Nextpet-imgs/dashboard-imgs/share.svg"
                            alt=""
                            />
                        </a>
                    </div>
                  </div>
                </div>
                <form action="">
                  <p>
                    There are of Lorem Ipsum available, but the majority have su
                    alteration in some form, by injected oir which don&apos;t look
                    even slightly believable. There are of Lorem Ipsum
                    available, but the majority have su alteration in some form,
                    by injected oir which don&apos;t look even slightly
                    believable.There are of Lorem Ipsum available, but the
                    majority have su alteration in some form, by injected oir
                    which don&apos;t look even slightly believable.
                  </p>
                  <span>
                    <img
                      src="/images/Nextpet-imgs/dashboard-imgs/yellow-location-icon.svg"
                      alt=""
                    />
                    &nbsp;Colorado Springs, CO(state), USA
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="recent-posted-innerwrap">
        <div className="container">
          <h1>Recently Posted</h1>

          <div className="pets-breeder-cards">
            <div className="newyear-cat-dog-in">
              <div className="newyear-catimg-wrap">
                <img
                  src="/images/Nextpet-imgs/recently-posted-imgs/img1.png"
                  alt=""
                  loading="lazy"
                />
                <div className="heart-icon-wrap">
                  <img
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg"
                    alt=""
                    className="active"
                  />
                  <img
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg"
                    alt=""
                  />
                  <span>55</span>
                </div>
              </div>

              <div className="newyear-content-card">
                <div className="before-curve-icons">
                  <img
                    src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg"
                    alt=""
                  />
                </div>
                <div className="heading-content">
                  <h3>Lorem ipsum dolo</h3>
                  <div className="mail-boxwrap">
                    <img
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
                    <Link href="/user/contact-pet-details">
                      View More&nbsp;<i className="fas fa-angle-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="newyear-cat-dog-in">
              <div className="newyear-catimg-wrap">
                <img
                  src="/images/Nextpet-imgs/recently-posted-imgs/img2.png"
                  alt=""
                  loading="lazy"
                />
                <div className="heart-icon-wrap">
                  <img
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg"
                    alt=""
                    className="active"
                  />
                  <img
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg"
                    alt=""
                  />
                  <span>55</span>
                </div>
              </div>

              <div className="newyear-content-card">
                <div className="before-curve-icons">
                  <img
                    src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg"
                    alt=""
                  />
                </div>
                <div className="heading-content">
                  <h3>Lorem ipsum dolo</h3>
                  <div className="mail-boxwrap">
                    <img
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
                    <Link href="/user/contact-pet-details">
                      View More&nbsp;<i className="fas fa-angle-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="newyear-cat-dog-in">
              <div className="newyear-catimg-wrap">
                <img
                  src="/images/Nextpet-imgs/recently-posted-imgs/img3.png"
                  alt=""
                  loading="lazy"
                />
                <div className="heart-icon-wrap">
                  <img
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg"
                    alt=""
                    className=""
                  />
                  <img
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg"
                    alt=""
                    className="active"
                  />
                  <span>55</span>
                </div>
              </div>

              <div className="newyear-content-card">
                <div className="before-curve-icons">
                  <img
                    src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg"
                    alt=""
                  />
                </div>
                <div className="heading-content">
                  <h3>Lorem ipsum dolo</h3>
                  <div className="mail-boxwrap">
                    <img
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
                    <Link href="/user/contact-pet-details">
                      View More&nbsp;<i className="fas fa-angle-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="newyear-cat-dog-in">
              <div className="newyear-catimg-wrap">
                <img
                  src="/images/Nextpet-imgs/recently-posted-imgs/img4.png"
                  alt=""
                  loading="lazy"
                />
                <div className="heart-icon-wrap">
                  <img
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg"
                    alt=""
                    className=""
                  />
                  <img
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg"
                    alt=""
                    className="active"
                  />
                  <span>55</span>
                </div>
              </div>

              <div className="newyear-content-card">
                <div className="before-curve-icons">
                  <img
                    src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg"
                    alt=""
                  />
                </div>
                <div className="heading-content">
                  <h3>Lorem ipsum dolo</h3>
                  <div className="mail-boxwrap">
                    <img
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
                    <Link href="/user/contact-pet-details">
                      View More&nbsp;<i className="fas fa-angle-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="newyear-cat-dog-in">
              <div className="newyear-catimg-wrap">
                <img
                  src="/images/Nextpet-imgs/recently-posted-imgs/img1.png"
                  alt=""
                  loading="lazy"
                />
                <div className="heart-icon-wrap">
                  <img
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg"
                    alt=""
                    className="active"
                  />
                  <img
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg"
                    alt=""
                  />
                  <span>55</span>
                </div>
              </div>

              <div className="newyear-content-card">
                <div className="before-curve-icons">
                  <img
                    src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg"
                    alt=""
                  />
                </div>
                <div className="heading-content">
                  <h3>Lorem ipsum dolo</h3>
                  <div className="mail-boxwrap">
                    <img
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
                    <Link href="/user/contact-pet-details">
                      View More&nbsp;<i className="fas fa-angle-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="newyear-cat-dog-in">
              <div className="newyear-catimg-wrap">
                <img
                  src="/images/Nextpet-imgs/recently-posted-imgs/img2.png"
                  alt=""
                  loading="lazy"
                />
                <div className="heart-icon-wrap">
                  <img
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg"
                    alt=""
                    className="active"
                  />
                  <img
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg"
                    alt=""
                  />
                  <span>55</span>
                </div>
              </div>

              <div className="newyear-content-card">
                <div className="before-curve-icons">
                  <img
                    src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg"
                    alt=""
                  />
                </div>
                <div className="heading-content">
                  <h3>Lorem ipsum dolo</h3>
                  <div className="mail-boxwrap">
                    <img
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
                    <Link href="/user/contact-pet-details">
                      View More&nbsp;<i className="fas fa-angle-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="newyear-cat-dog-in">
              <div className="newyear-catimg-wrap">
                <img
                  src="/images/Nextpet-imgs/recently-posted-imgs/img3.png"
                  alt=""
                  loading="lazy"
                />
                <div className="heart-icon-wrap">
                  <img
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg"
                    alt=""
                    className="active"
                  />
                  <img
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg"
                    alt=""
                  />
                  <span>55</span>
                </div>
              </div>

              <div className="newyear-content-card">
                <div className="before-curve-icons">
                  <img
                    src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg"
                    alt=""
                  />
                </div>
                <div className="heading-content">
                  <h3>Lorem ipsum dolo</h3>
                  <div className="mail-boxwrap">
                    <img
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
                    <Link href="/user/contact-pet-details">
                      View More&nbsp;<i className="fas fa-angle-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="newyear-cat-dog-in">
              <div className="newyear-catimg-wrap">
                <img
                  src="/images/Nextpet-imgs/recently-posted-imgs/img4.png"
                  alt=""
                  loading="lazy"
                />
                <div className="heart-icon-wrap">
                  <img
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg"
                    alt=""
                    className="active"
                  />
                  <img
                    src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg"
                    alt=""
                  />
                  <span>55</span>
                </div>
              </div>

              <div className="newyear-content-card">
                <div className="before-curve-icons">
                  <img
                    src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg"
                    alt=""
                  />
                </div>
                <div className="heading-content">
                  <h3>Lorem ipsum dolo</h3>
                  <div className="mail-boxwrap">
                    <img
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
                    <Link href="/user/contact-pet-details">
                      View More&nbsp;<i className="fas fa-angle-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="influ-pagi pt-4">
            <ul>
              <li>
                <a href="#">
                  <i className="fa fa-arrow-left" aria-hidden="true"></i>
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

      {/* <!-- RECENT POSTED --> */}
    </>
  );
};

export default ContactPetDetails;
