import { useEffect } from "react"
import { useState } from "react"
import { getReviews } from "../apis"
import { ReviewCard } from "./ReviewCard"

export const ReviewsList = () => {
    const [listOfReviews, setListOfReviews] = useState([])
    useEffect(()=>{
        getReviews().then((reviews)=>{
            setListOfReviews(reviews)
        })
    }, [])
    return (
        <section>
           <h2> Game Reviews </h2>
           {
            listOfReviews.map(({review_id, title, owner, review_img_url, votes})=>{
                return (
                    <ReviewCard key={review_id} title={title} owner={owner} review_img_url={review_img_url} votes={votes}/>
                )
            })
           }
        </section>
    )
}