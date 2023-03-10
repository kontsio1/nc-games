import axios from "axios";

const gamesApi = axios.create({baseURL: 'https://games-selector.onrender.com/api'})

export const getReview = (review_id)=>{
    return gamesApi.get(`/reviews/${review_id}`).then((res)=>{
        return res.data.review
    })
}

export const getComments = (review_id)=>{
    return gamesApi.get(`/reviews/${review_id}/comments`).then((res)=>{
        return res.data.comments
    })
}

export const patchReview = (review_id, inc_votes)=>{
    return gamesApi.patch(`/reviews/${review_id}`, {inc_votes}).then((res)=>{
        return res.data.review
    })
}

export const postComment = (review_id, newComment)=>{
    return gamesApi.post(`/reviews/${review_id}/comments`, newComment)
}

export const getCategories = ()=>{
    return gamesApi.get('/categories').then((res)=>{
        return res.data.categories
    })
}

export const getReviews = (selectedType, sortType = 'created_at', sortOrder='desc')=>{
    return gamesApi.get('/reviews', {params: {category: selectedType, sort_by: sortType , order: sortOrder}}).then((res)=>{
        return res.data.reviews
    })
}