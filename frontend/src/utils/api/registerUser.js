import axios from "axios";

const registerUser = async (registerBody) => {
     try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/user/register` , registerBody , { withCredentials: true });

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

export default registerUser;