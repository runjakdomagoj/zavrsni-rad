import axios from "axios";

const URL = "http://127.0.0.1:5000";

// Fetches the data from API
export const fetchData = async () => {
  try {
    const response = await axios.get(`${URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};
