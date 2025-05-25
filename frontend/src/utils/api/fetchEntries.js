import axios from "axios";

const fetchEntries = async (id , pg ) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_BASEURL}/ledger/entries/${id}`,
      {
        params: { page : pg , limit : 20 },
        withCredentials: true,
      }
    );

    if (!response.data.success) {
      return { success: false, res: response.data.msg };
    }

    return { success: true, res: response.data.data , total: response.data.total };
  } catch (error) {
    console.log(error);
    const errorMessage = error.response?.data?.msg || "Something went wrong";
    return { success: false, res: errorMessage };
  }
};

export default fetchEntries;