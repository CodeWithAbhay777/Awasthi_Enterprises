import axios from "axios";

const postLedgerAccount = async (accountBody) => {
     try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/ledger/accounts` , accountBody , { withCredentials: true });

        if (!response.data.success){
            return {success : false, res : response.data.msg};
        }

        return {success : true, res : response.data.data};
    } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.msg || "Something went wrong";
        return {success : false, res : errorMessage};
    }
} 

export default postLedgerAccount;