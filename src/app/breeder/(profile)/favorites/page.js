

"use client";
import React from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
import BreederProfileLeft from '../../../../components/BreederProfileLeft';
import BreederProtectedRoute from "@/src/app/context/BreederProtectedRoute";

const Favorites = () => {
    const breederData = {
        page: "favorites",
      };
    return (
        <>
        <BreederProtectedRoute>
            <div className="breedeerdasboard-profile-wrap">
                <div className="container">
                    <div className="col-lg-12">
                        <div className="breedeerdasboard-profile-inner">
                        <BreederProfileLeft data={breederData}/>
                            <div className="posts-right">
                                <div className="heading-favourite">
                                    <h1>Favorites</h1>
                                    <div className="user-breeder-toggle">
                                        <span>User</span>
                                        <label className="switch">
                                            <input type="checkbox" />
                                            <span className="slider round"></span>
                                        </label>
                                        <span>Breeder</span>
                                    </div>
                                </div>
                                <form action="">
                                    <div className="leads-inner-wrap">
                                        <div className="all-posts-cards">
                                            <div className="post-cards-wrap disable">
                                                <div className="adopted-icon">
                                                    <img src="/images/Nextpet-imgs/dashboard-imgs/adopted.svg" alt="" />
                                                </div>
                                                <div className="post-cardsimg-wrap">
                                                    <img src="/images/Nextpet-imgs/recently-posted-imgs/img2.png" alt="" />
                                                    <div className="actionpost-heart">
                                                        <div className="heart-icon-wrap">
                                                            <img src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg" alt="" />
                                                            <img src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg" alt="" className="active" />
                                                            <span>55</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="posts-content-card">
                                                    <div className="before-curve-icons">
                                                        <img src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg" alt="" />
                                                    </div>
                                                    <div className="posts-content">
                                                        <h3>Lorem ipsum dolo</h3>
                                                        <div className="mail-boxwrap">
                                                            <img src="/images/Nextpet-imgs/dashboard-imgs/yellow-mail-letter.svg" alt="" />
                                                            <div className="mail-count">
                                                                <span>105</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                                    <div className="viewmore-wrap">
                                                        <h4>$105</h4>
                                                        <div className="action-wrap">
                                                            <a href="#" onClick={(e) => e.preventDefault()}>View More&nbsp;<i className="fas fa-angle-right"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                         
                                            {/* <div className="post-cards-wrap disable">
                                                <div className="adopted-icon">
                                                    <img src="/images/Nextpet-imgs/dashboard-imgs/adopted.svg" alt="" />
                                                </div>
                                                <div className="post-cardsimg-wrap">
                                                    <img src="/images/Nextpet-imgs/recently-posted-imgs/img2.png" alt="" />
                                                    <div className="actionpost-heart">
                                                        <div className="heart-icon-wrap">
                                                            <img src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg" alt="" />
                                                            <img src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg" alt="" className="active" />
                                                            <span>55</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="posts-content-card">
                                                    <div className="before-curve-icons">
                                                        <img src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg" alt="" />
                                                    </div>
                                                    <div className="posts-content">
                                                        <h3>Lorem ipsum dolo</h3>
                                                        <div className="mail-boxwrap">
                                                            <img src="/images/Nextpet-imgs/dashboard-imgs/yellow-mail-letter.svg" alt="" />
                                                            <div className="mail-count">
                                                                <span>105</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                                    <div className="viewmore-wrap">
                                                        <h4>$105</h4>
                                                        <div className="action-wrap">
                                                            <a onClick={(e) => e.preventDefault()}>View More&nbsp;<i className="fas fa-angle-right"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="post-cards-wrap disable">
                                                <div className="adopted-icon">
                                                    <img src="/images/Nextpet-imgs/dashboard-imgs/adopted.svg" alt="" />
                                                </div>
                                                <div className="post-cardsimg-wrap">
                                                    <img src="/images/Nextpet-imgs/recently-posted-imgs/img2.png" alt="" />
                                                    <div className="actionpost-heart">
                                                        <div className="heart-icon-wrap">
                                                            <img src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg" alt="" />
                                                            <img src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg" alt="" className="active" />
                                                            <span>55</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="posts-content-card">
                                                    <div className="before-curve-icons">
                                                        <img src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg" alt="" />
                                                    </div>
                                                    <div className="posts-content">
                                                        <h3>Lorem ipsum dolo</h3>
                                                        <div className="mail-boxwrap">
                                                            <img src="/images/Nextpet-imgs/dashboard-imgs/yellow-mail-letter.svg" alt="" />
                                                            <div className="mail-count">
                                                                <span>105</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                                    <div className="viewmore-wrap">
                                                        <h4>$105</h4>
                                                        <div className="action-wrap">
                                                            <a onClick={(e) => e.preventDefault()}>View More&nbsp;<i className="fas fa-angle-right"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="post-cards-wrap disable">
                                                <div className="adopted-icon">
                                                    <img src="/images/Nextpet-imgs/dashboard-imgs/adopted.svg" alt="" />
                                                </div>
                                                <div className="post-cardsimg-wrap">
                                                    <img src="/images/Nextpet-imgs/recently-posted-imgs/img2.png" alt="" />
                                                    <div className="actionpost-heart">
                                                        <div className="heart-icon-wrap">
                                                            <img src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg" alt="" />
                                                            <img src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg" alt="" className="active" />
                                                            <span>55</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="posts-content-card">
                                                    <div className="before-curve-icons">
                                                        <img src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg" alt="" />
                                                    </div>
                                                    <div className="posts-content">
                                                        <h3>Lorem ipsum dolo</h3>
                                                        <div className="mail-boxwrap">
                                                            <img src="/images/Nextpet-imgs/dashboard-imgs/yellow-mail-letter.svg" alt="" />
                                                            <div className="mail-count">
                                                                <span>105</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                                    <div className="viewmore-wrap">
                                                        <h4>$105</h4>
                                                        <div className="action-wrap">
                                                            <a onClick={(e) => e.preventDefault()}>View More&nbsp;<i className="fas fa-angle-right"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="post-cards-wrap disable">
                                                <div className="adopted-icon">
                                                    <img src="/images/Nextpet-imgs/dashboard-imgs/adopted.svg" alt="" />
                                                </div>
                                                <div className="post-cardsimg-wrap">
                                                    <img src="/images/Nextpet-imgs/recently-posted-imgs/img2.png" alt="" />
                                                    <div className="actionpost-heart">
                                                        <div className="heart-icon-wrap">
                                                            <img src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg" alt="" />
                                                            <img src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg" alt="" className="active" />
                                                            <span>55</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="posts-content-card">
                                                    <div className="before-curve-icons">
                                                        <img src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg" alt="" />
                                                    </div>
                                                    <div className="posts-content">
                                                        <h3>Lorem ipsum dolo</h3>
                                                        <div className="mail-boxwrap">
                                                            <img src="/images/Nextpet-imgs/dashboard-imgs/yellow-mail-letter.svg" alt="" />
                                                            <div className="mail-count">
                                                                <span>105</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                                    <div className="viewmore-wrap">
                                                        <h4>$105</h4>
                                                        <div className="action-wrap">
                                                            <a onClick={(e) => e.preventDefault()}>View More&nbsp;<i className="fas fa-angle-right"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="post-cards-wrap disable">
                                                <div className="adopted-icon">
                                                    <img src="/images/Nextpet-imgs/dashboard-imgs/adopted.svg" alt="" />
                                                </div>
                                                <div className="post-cardsimg-wrap">
                                                    <img src="/images/Nextpet-imgs/recently-posted-imgs/img2.png" alt="" />
                                                    <div className="actionpost-heart">
                                                        <div className="heart-icon-wrap">
                                                            <img src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg" alt="" />
                                                            <img src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg" alt="" className="active" />
                                                            <span>55</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="posts-content-card">
                                                    <div className="before-curve-icons">
                                                        <img src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg" alt="" />
                                                    </div>
                                                    <div className="posts-content">
                                                        <h3>Lorem ipsum dolo</h3>
                                                        <div className="mail-boxwrap">
                                                            <img src="/images/Nextpet-imgs/dashboard-imgs/yellow-mail-letter.svg" alt="" />
                                                            <div className="mail-count">
                                                                <span>105</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                                    <div className="viewmore-wrap">
                                                        <h4>$105</h4>
                                                        <div className="action-wrap">
                                                            <a onClick={(e) => e.preventDefault()}>View More&nbsp;<i className="fas fa-angle-right"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="post-cards-wrap disable">
                                                <div className="adopted-icon">
                                                    <img src="/images/Nextpet-imgs/dashboard-imgs/adopted.svg" alt="" />
                                                </div>
                                                <div className="post-cardsimg-wrap">
                                                    <img src="/images/Nextpet-imgs/recently-posted-imgs/img2.png" alt="" />
                                                    <div className="actionpost-heart">
                                                        <div className="heart-icon-wrap">
                                                            <img src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg" alt="" />
                                                            <img src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg" alt="" className="active" />
                                                            <span>55</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="posts-content-card">
                                                    <div className="before-curve-icons">
                                                        <img src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg" alt="" />
                                                    </div>
                                                    <div className="posts-content">
                                                        <h3>Lorem ipsum dolo</h3>
                                                        <div className="mail-boxwrap">
                                                            <img src="/images/Nextpet-imgs/dashboard-imgs/yellow-mail-letter.svg" alt="" />
                                                            <div className="mail-count">
                                                                <span>105</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                                    <div className="viewmore-wrap">
                                                        <h4>$105</h4>
                                                        <div className="action-wrap">
                                                            <a onClick={(e) => e.preventDefault()}>View More&nbsp;<i className="fas fa-angle-right"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="post-cards-wrap disable">
                                                <div className="adopted-icon">
                                                    <img src="/images/Nextpet-imgs/dashboard-imgs/adopted.svg" alt="" />
                                                </div>
                                                <div className="post-cardsimg-wrap">
                                                    <img src="/images/Nextpet-imgs/recently-posted-imgs/img2.png" alt="" />
                                                    <div className="actionpost-heart">
                                                        <div className="heart-icon-wrap">
                                                            <img src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg" alt="" />
                                                            <img src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg" alt="" className="active" />
                                                            <span>55</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="posts-content-card">
                                                    <div className="before-curve-icons">
                                                        <img src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg" alt="" />
                                                    </div>
                                                    <div className="posts-content">
                                                        <h3>Lorem ipsum dolo</h3>
                                                        <div className="mail-boxwrap">
                                                            <img src="/images/Nextpet-imgs/dashboard-imgs/yellow-mail-letter.svg" alt="" />
                                                            <div className="mail-count">
                                                                <span>105</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                                    <div className="viewmore-wrap">
                                                        <h4>$105</h4>
                                                        <div className="action-wrap">
                                                            <a onClick={(e) => e.preventDefault()}>View More&nbsp;<i className="fas fa-angle-right"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="post-cards-wrap disable">
                                                <div className="adopted-icon">
                                                    <img src="/images/Nextpet-imgs/dashboard-imgs/adopted.svg" alt="" />
                                                </div>
                                                <div className="post-cardsimg-wrap">
                                                    <img src="/images/Nextpet-imgs/recently-posted-imgs/img2.png" alt="" />
                                                    <div className="actionpost-heart">
                                                        <div className="heart-icon-wrap">
                                                            <img src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg" alt="" />
                                                            <img src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg" alt="" className="active" />
                                                            <span>55</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="posts-content-card">
                                                    <div className="before-curve-icons">
                                                        <img src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg" alt="" />
                                                    </div>
                                                    <div className="posts-content">
                                                        <h3>Lorem ipsum dolo</h3>
                                                        <div className="mail-boxwrap">
                                                            <img src="/images/Nextpet-imgs/dashboard-imgs/yellow-mail-letter.svg" alt="" />
                                                            <div className="mail-count">
                                                                <span>105</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                                    <div className="viewmore-wrap">
                                                        <h4>$105</h4>
                                                        <div className="action-wrap">
                                                            <a onClick={(e) => e.preventDefault()}>View More&nbsp;<i className="fas fa-angle-right"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="post-cards-wrap disable">
                                                <div className="adopted-icon">
                                                    <img src="/images/Nextpet-imgs/dashboard-imgs/adopted.svg" alt="" />
                                                </div>
                                                <div className="post-cardsimg-wrap">
                                                    <img src="/images/Nextpet-imgs/recently-posted-imgs/img2.png" alt="" />
                                                    <div className="actionpost-heart">
                                                        <div className="heart-icon-wrap">
                                                            <img src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg" alt="" />
                                                            <img src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg" alt="" className="active" />
                                                            <span>55</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="posts-content-card">
                                                    <div className="before-curve-icons">
                                                        <img src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg" alt="" />
                                                    </div>
                                                    <div className="posts-content">
                                                        <h3>Lorem ipsum dolo</h3>
                                                        <div className="mail-boxwrap">
                                                            <img src="/images/Nextpet-imgs/dashboard-imgs/yellow-mail-letter.svg" alt="" />
                                                            <div className="mail-count">
                                                                <span>105</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                                    <div className="viewmore-wrap">
                                                        <h4>$105</h4>
                                                        <div className="action-wrap">
                                                            <a onClick={(e) => e.preventDefault()}>View More&nbsp;<i className="fas fa-angle-right"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="post-cards-wrap disable">
                                                <div className="adopted-icon">
                                                    <img src="/images/Nextpet-imgs/dashboard-imgs/adopted.svg" alt="" />
                                                </div>
                                                <div className="post-cardsimg-wrap">
                                                    <img src="/images/Nextpet-imgs/recently-posted-imgs/img2.png" alt="" />
                                                    <div className="actionpost-heart">
                                                        <div className="heart-icon-wrap">
                                                            <img src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg" alt="" />
                                                            <img src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg" alt="" className="active" />
                                                            <span>55</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="posts-content-card">
                                                    <div className="before-curve-icons">
                                                        <img src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg" alt="" />
                                                    </div>
                                                    <div className="posts-content">
                                                        <h3>Lorem ipsum dolo</h3>
                                                        <div className="mail-boxwrap">
                                                            <img src="/images/Nextpet-imgs/dashboard-imgs/yellow-mail-letter.svg" alt="" />
                                                            <div className="mail-count">
                                                                <span>105</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                                    <div className="viewmore-wrap">
                                                        <h4>$105</h4>
                                                        <div className="action-wrap">
                                                            <a onClick={(e) => e.preventDefault()}>View More&nbsp;<i className="fas fa-angle-right"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </BreederProtectedRoute>
        </>
    );
};

export default Favorites;
