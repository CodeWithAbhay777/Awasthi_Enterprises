import axios from "axios";

const fetchLedgerAccounts = async (search) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_BASEURL}/ledger/accounts`,
      {
        params: { search },
        withCredentials: true,
      }
    );

    if (!response.data.success) {
      return { success: false, res: response.data.msg };
    }

    return { success: true, res: response.data.data };
  } catch (error) {
    console.log(error);
    const errorMessage = error.response?.data?.msg || "Something went wrong";
    return { success: false, res: errorMessage };
  }
};

export default fetchLedgerAccounts;
