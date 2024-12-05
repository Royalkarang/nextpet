import axios from "axios";
import BASE_URL from "../../utils/constant";

export const PostLike = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/like_post`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Post Like Error");
  }
};

//Home page View More
export const PostDetail = async (payload) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/favourites_list_details`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Post Like Error");
  }
};

//Trending Pets :: user_show_notes
export const UserShowNotes = async (payload) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/user_show_notes`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "user_show_notes Error");
  }
};

//Trending Pets :: user_add_notes
export const UserAddNotes = async (payload) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/user_add_notes`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "user_add_notes Error");
  }
};

//Trending Pets :: user_status__notes_leads_update
export const UserStatusNotesLeadsUpdate = async (payload) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/user_status__notes_leads_update`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "user_add_notes Error");
  }
};

//Trending Pets :: user_status__notes_leads_update
export const DeleteBreederPost = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/delete_post`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "user_add_notes Error");
  }
};

//Trending Pets :: Get Ratting
export const GetRattingTrendingPost = async (payload) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/rating_breeder_get`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Ratting Error");
  }
};

//Trending Pets :: Set and Update Ratting
export const SetRattingTrendingPost = async (payload) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/rating_breeder`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "user_add_notes Error");
  }
};
