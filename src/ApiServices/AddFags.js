import axios from "axios";
const API_BASE_URL = "https://";
const live = localStorage.getItem("live");
const role = localStorage.getItem("role");
export const addFaqs = async (question, answer) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}${live}/api/${role}/faqs/add-question`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: { question, answer },
    });
    if (response.status === 200) {
      console.log("FAQ added successfully");
    }
  } catch (error) {
    console.error("Failed to add FAQ", error);
    throw error;
  }
};
