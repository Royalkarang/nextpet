import axios from "axios";
import BASE_URL from "../utils/constant";

//contacted  :: user_show_notes
export const ShowNotes = async (payload) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/breeder_show_notes`,
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

//contacted  :: user_add_notes
export const AddNotes = async (payload) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/breeder_add_notes`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "breeder_add_notes Error");
  }
};

///ShowNotes
//contacted  :: user_status__notes_leads_update
export const StatusNotesLeadsUpdate = async (payload) => {
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

////
// Pets ::
export const GetRatting = async (payload) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/rating_user_get`,
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

// Pets :: Set and Update Ratting
export const SetRatting = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/rating_user`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "user_add_notes Error");
  }
};
//status_leads_breeder_details

export const StatusLeadsBreederDetails = async (payload) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/status_leads_breeder_details`,
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
