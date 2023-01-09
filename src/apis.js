import axios from "axios";

const gamesApi = axios.create({baseURL: 'https://games-selector.onrender.com/api'})

export const getReviews = () => {
    return gamesApi.get('/reviews').then((res) => {
        return res.data.reviews
    })
}

export const getReview = (review_id)=>{
    return gamesApi.get(`/reviews/${review_id}`).then((res)=>{
        return res.data.review
    })
}

export const getComments = (review_id)=>{
    return gamesApi.get(`/reviews/${review_id}/comments`).then((res)=>{
        console.log(res.data.comments)
        return res.data.comments
    })
}