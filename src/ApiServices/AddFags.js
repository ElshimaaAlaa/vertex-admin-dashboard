import axios from "axios";
export const addFaqs = async (question, answer) => {
  try {
    const response = await axios({
      url: `https://demo.vrtex.duckdns.org/api/ask-question`,
      method: "POST",
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
