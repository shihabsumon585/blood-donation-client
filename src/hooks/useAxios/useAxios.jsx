import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://blood-donation-iota-lake.vercel.app"
})

const useAxios = () => {
    return axiosInstance;
}

export default useAxios;