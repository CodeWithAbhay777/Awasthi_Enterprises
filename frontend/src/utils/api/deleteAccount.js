import axios from 'axios';

const deleteAccount = async (id) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_BASEURL}/ledger/accounts/${id}` , { withCredentials: true });

        if (!response.data.success){
            return {success : false, res : response.data.msg};
        }

        return {success : true, res : response.data.msg};
    } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.msg || "Something went wrong";
        return {success : false, res : errorMessage};
    }
}

export default deleteAccount;