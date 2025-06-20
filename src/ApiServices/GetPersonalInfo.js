import axios from "axios";
const live = sessionStorage.getItem("live")
export const GetPersonalInfo = async () => {
  try {
    const response = await axios({
      url: `https://${live}/api/admin/profile`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Accept-Language": "en",
        Authorization: `Bearer ${sessionStorage.getItem("admin token")}`,
      },
    });
    if (response.status === 200) {
      console.log(response.data.data);
      sessionStorage.setItem("admin-Name", response.data.data.name);
      sessionStorage.setItem("admin-email", response.data.data.email);
      sessionStorage.setItem("admin-Phone", response.data.data.phone);
      sessionStorage.setItem("admin pic", response.data.data.image);
      return response.data.data;
    } else {
      console.error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
};
