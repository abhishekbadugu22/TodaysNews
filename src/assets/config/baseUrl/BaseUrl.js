
import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL:'https://newsapi.org/v2/'
})