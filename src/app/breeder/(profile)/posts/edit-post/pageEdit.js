"use client";
import React, { useState } from "react";
import Image from "next/image";

const Post = () => {

    // State to track whether the health guarantee is YES or NO
    const [isHealthGuaranteed, setIsHealthGuaranteed] = useState(true); // true for YES, false for NO
    const [isDeliveryAvailability, setDeliveryAvailability] = useState(true); // true for YES, false for NO
    const [isBoardingAvailability, setBoardingAvailability] = useState(true); // true for YES, false for NO
    const [isFlyingAvailability, setFlyingAvailability] = useState(true); // true for YES, false for NO
    
    // Function to handle the radio button change
    const handleHealthChange = (event) => {
        setIsHealthGuaranteed(event.target.id === 'on'); // Set state based on the selected radio button
    };
    const handleDeliveryChange = (event) => {
        setDeliveryAvailability(event.target.id === 'on1'); // Set state based on the selected radio button
    };
    const handleBoardingChange = (event) => {
        setBoardingAvailability(event.target.id === 'on2'); // Set state based on the selected radio button
    };
    const handleFlyingChange = (event) => {
        setFlyingAvailability(event.target.id === 'on3'); // Set state based on the selected radio button
    };




    // isHealthGuaranteed isDeliveryAvailability isBoardingAvailability isFlyingAvailability
    return (
        <>
            <div class="breedeerdasboard-createpost-wrap">
                <div class="container">
                    <div class="col-lg-12">
                    <div class="breedeerdasboard-createpost-inner">
                        
                        <div class="breedeerdasboard-createpost-left">
                        
                        <div class="edit-uploadpost-wrap">
                            <div class="edit-post-icon">
                            <a href="#"><Image width={15} height={15} src="/images/Nextpet-imgs/dashboard-imgs/edit-post-icon.svg" alt=""
                                loading="lazy"/></a>
                            </div>
                            <div id="uploaded-post-imgs" className="owl-carousel">
                            
                            <div class="uploded-post-wrap">
                                <Image width={15} height={15} src="/images/Nextpet-imgs/dashboard-imgs/post-img1.png" alt="" loading="lazy"/>
                            </div>
                            
                            
                            <div class="uploded-post-wrap">
                                <Image width={15} height={15} src="/images/Nextpet-imgs/dashboard-imgs/post-img1.png" alt="" loading="lazy"/>
                            </div>
                            
                            
                            <div class="uploded-post-wrap">
                                <Image width={15} height={15} src="/images/Nextpet-imgs/dashboard-imgs/post-img1.png" alt="" loading="lazy"/>
                            </div>
                            
                            
                            <div class="uploded-post-wrap">
                                <Image width={15} height={15} src="/images/Nextpet-imgs/dashboard-imgs/post-img1.png" alt="" loading="lazy"/>
                            </div>
                            
                            </div>
                        </div>
                        
                        <div class="error-message">
                            <p>Error: You can only add up to 10 images.</p>
                        </div>
                        </div>
                        
                        
                        <div class="breedeerdasboard-createpost-right">
                        <div class="postcreate-heading">
                            <h3>Pet name </h3>
                            <div class="edit-heartpost">
                            <div class="inner-heartt">
                                <a href="#"><Image width={15} height={15} src="/images/Nextpet-imgs/dashboard-imgs/heart-post.png" alt=""
                                    loading="lazy"/></a>
                                <span>55</span>
                            </div>
                            <div class="inner-heartt">
                                <a href="#"><Image width={15} height={15} src="/images/Nextpet-imgs/dashboard-imgs/message-post.png" alt=""
                                    loading="lazy"/></a>
                                <span>55</span>
                            </div>
                            </div>
                        </div>
                        <form action="">
                            <label>
                            <textarea name="" id=""
                                placeholder="There are  of Lorem Ipsum available, but the majority have su alteration in some form, by injected oir  which don't look even slightly believable. There are  of Lorem Ipsum available, but the majority have su alteration in some form, by injected oir  which don't look even slightly believable. "></textarea>
                            </label>
                            <h4>About Pet-name</h4>
                            <div class="list-post-form">
                            
                            <div class="formdata-wrap">
                                <p>Type</p>
                                <select name="" id="">
                                <option value="0">Type of animal</option>
                                <option value="0">Cat</option>
                                <option value="0">Dog</option>
                                </select>
                            </div>
                            
                            
                            <div class="formdata-wrap">
                                <p>Breed</p>
                                <select name="" id="">
                                <option value="0"></option>
                                </select>
                            </div>
                            
                            
                            <div class="formdata-wrap">
                                <p>Price</p>
                                <input type="text" placeholder=""/>
                            </div>
                            
                            
                            <div class="formdata-wrap">
                                <p>General Size</p>
                                <select name="" id="">
                                <option value="0">N/A</option>
                                <option value="0">Standard</option>
                                <option value="0">Mini</option>
                                <option value="0">Micro</option>
                                </select>
                            </div>
                            
                            
                            <div class="formdata-wrap">
                                <p>Anticipated Weight</p>
                                <input type="text" placeholder=""/>
                            </div>
                            
                            
                            <div class="formdata-wrap">
                                <p>Birthdate</p>
                                <input type="text" id="datepicker" placeholder=""/>
                            </div>
                            
                            
                            <div class="formdata-wrap">
                                <p>Date Available</p>
                                <input type="text" id="datepicker2" placeholder=""/>
                            </div>

                            <div className="formdata-wrap">
                                <p>Health guarantee</p>
                                <div className="switch-toggle switch-3 switch-candy">
                                    {/* Radio button for YES */}
                                    <input
                                    id="on"
                                    name="state-d"
                                    type="radio"
                                    checked={isHealthGuaranteed}
                                    onChange={handleHealthChange}
                                    />
                                    <label htmlFor="on">YES</label>

                                    {/* Radio button for NO */}
                                    <input
                                    id="off"
                                    name="state-d"
                                    type="radio"
                                    checked={!isHealthGuaranteed}
                                    onChange={handleHealthChange}
                                    />
                                    <label htmlFor="off">NO</label>
                                </div>
                            </div>

                            <div class="formdata-wrap">
                                <p>Certifications</p>
                                <input type="text" placeholder=""/>
                            </div>

                            <div className="formdata-wrap">
                                <p>Delivery availability</p>
                                <div className="switch-toggle switch-3 switch-candy">
                                    {/* Radio button for YES */}
                                    <input
                                    id="on1"
                                    name="states-d"
                                    type="radio"
                                    checked={isDeliveryAvailability}
                                    onChange={handleDeliveryChange}
                                    />
                                    <label htmlFor="on1">YES</label>

                                    {/* Radio button for NO */}
                
                                    <input
                                    id="off1"
                                    name="states-d"
                                    type="radio"
                                    checked={!isDeliveryAvailability}  
                                    onChange={handleDeliveryChange}
                                    />
                                    <label htmlFor="off1">NO</label>
                                </div>
                            </div>

                            <div className="formdata-wrap">
                                <p>Boarding availability</p>
                                <div className="switch-toggle switch-3 switch-candy">
                                    {/* Radio button for YES */}
                                    <input
                                    id="on2"
                                    name="states-dd"
                                    type="radio"
                                    checked={isBoardingAvailability}
                                    onChange={handleBoardingChange}
                                    />
                                    <label htmlFor="on2">YES</label>

                                    {/* Radio button for NO */}
                                    <input
                                    id="off2"
                                    name="states-dd"
                                    type="radio"
                                    checked={!isBoardingAvailability}
                                    onChange={handleBoardingChange}
                                    />
                                    <label htmlFor="off2">NO</label>
                                </div>
                            </div>

                            <div className="formdata-wrap">
                                <p>Flying availability</p>
                                <div className="switch-toggle switch-3 switch-candy">
                                    {/* Radio button for YES */}
                                    <input
                                    id="on3"
                                    name="states-ddd"
                                    type="radio"
                                    checked={isFlyingAvailability}
                                    onChange={handleFlyingChange}
                                    />
                                    <label htmlFor="on3">YES</label>

                                    {/* Radio button for NO */}
                                    <input
                                    id="off3"
                                    name="states-ddd"
                                    type="radio"
                                    checked={!isFlyingAvailability}
                                    onChange={handleFlyingChange}
                                    />
                                    <label htmlFor="off3">NO</label>
                                </div>
                            </div>
                            
                            <div class="posts-btn-wrap">
                                <button type="button" value="Submit" data-bs-target="#contact-coach" data-bs-toggle="modal">Post
                                a Pet</button>
                                <p>4 out of 6 post remaining</p>
                            </div>
                            </div>
                        </form>
                        </div>
                        
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Post;