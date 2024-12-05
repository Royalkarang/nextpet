"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from 'next/link';
import BreederProfileLeft from '../../../../../components/BreederProfileLeft'
import BASE_URL from '../../../../utils/constant'

const Post = () => {
    const router = useRouter();

    let breederUserId="";

    useEffect(() => {
      breederUserId = localStorage.getItem("breeder_user_id");
      console.log("breederUserId : ",breederUserId);
    }, []);

    const [noPost, setNoPost] = useState(true);
    const [loding, setLoading] = useState(true);
   
    
    const breederData = {
        page: "posts",
      };

      useEffect(()=>{
       const LoadPageData = async () =>{
        const formData = new FormData();
        formData.append("user_breeder_id", breederUserId); // You can dynamically assign the user ID if needed
        try {
            // Any Post Present or not
            const response = await axios.post(`${BASE_URL}/api/post_count`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            setLoading(false);
            console.log("responseresponse",response.data.data.breeder_post)
            // 
            if(response.data.data.breeder_post!=0){
              setNoPost(false);
            }
          } catch (error) {
            setLoading(false);
            console.log("Error fetching breeder posts:", error);
          }
       }
       LoadPageData();
      },[])

      if(loding){
            return(
                <>
                <p>Loading...</p>

                </>
            );
      }

      else if(noPost){
        return (
            <>
                {<div className="breedeerdasboard-profile-wrap">
                    <div className="container">
                    <div className="col-lg-12">
                        <div className="breedeerdasboard-profile-inner">
                       
                        
                        <BreederProfileLeft data={breederData}/>
    
                        
                        <div className="leads-right">
                            <h1>You have no Posts Created.</h1>
                            <form>
                                <div className="profile-btn-wrap">
                                    <button type="submit" value="Submit"><Link href="create-post">Post a Pet</Link> </button>
                                </div>
                            </form>
                        </div>
                       
                      
                        </div>
                    </div>
                    </div>
                </div>}
                {/* <h1>Aryan Chaurasia</h1> */}
              
            </>
        );
      }
      else{
        router.push('/breeder/posts');
      }

      console.log("noPostnoPostnoPost: ",noPost);
    
};
export default Post;