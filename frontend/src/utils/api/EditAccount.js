import axios from 'axios';

const editAccount = async (editedData , id) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_BASEURL}/ledger/accounts/${id}` ,editedData ,{ withCredentials: true });

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

export default editAccount;