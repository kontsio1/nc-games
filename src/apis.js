import axios from "axios";

const gamesApi = axios.create({baseURL: 'https://games-selector.onrender.com/api'})

export const getReviews = () => {
    return gamesApi.get('/reviews').then((res) => {
        console.log(res.data.reviews)
        return res.data.reviews
    })
}