import { useEffect } from "react"
import { useState } from "react"
import { getReviews } from "../apis"
import { ReviewCard } from "./ReviewCard"

export const ReviewsList = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [listOfReviews, setListOfReviews] = useState([])
    useEffect(()=>{
        setIsLoading(true)
        getReviews().then((reviews)=>{
            setListOfReviews(reviews)
            setIsLoading(false)
        })
    }, [])

    if (isLoading) {
        return (
            <p> Loading please wait...</p>
        )
    }
    return (
        <section>
           <h2> Game Reviews </h2>
           <ul>
           {
            listOfReviews.map(({review_id, title, owner, review_img_url, votes})=>{
                return (
                    <ReviewCard key={review_id} review_id={review_id} title={title} owner={owner} review_img_url={review_img_url} votes={votes}/>
                )
            })
           }
           </ul>
        </section>
    )
}