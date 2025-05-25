import axios from 'axios';

const meUser = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/user/me` , { withCredentials: true });

        if (!response.data.success){
            return {success : false, res : response.data.msg};
        }

        return {success : true, res : response.data.user};
    } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.msg || "Something went wrong";
        return {success : false, res : errorMessage};
    }
}

export default meUser;