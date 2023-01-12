import { useEffect } from "react"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { getReviews } from "../apis"
import { NavBar } from "./NavBar"
import { ReviewCard } from "./ReviewCard"

export const ReviewsList = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [listOfReviews, setListOfReviews] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()

    const queryArr = searchParams.toString().split('=')
    
    useEffect(()=>{
        setIsLoading(true)
        getReviews(queryArr[1]).then((reviews)=>{
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
        <div>
        <NavBar setListOfReviews={setListOfReviews} searchParams={searchParams} setSearchParams={setSearchParams}/>
        <section>
           <h2> Game Reviews </h2>
           <h3> {queryArr[1]} </h3>
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
        </div>
    )
}