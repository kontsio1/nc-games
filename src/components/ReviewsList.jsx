import { useEffect } from "react"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { getReviews } from "../apis"
import { ErrorPage } from "./ErrorPage"
import { Header } from "./Header"
import { NavBar } from "./NavBar"
import { ReviewCard } from "./ReviewCard"

export const ReviewsList = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [listOfReviews, setListOfReviews] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [category, setCategory] = useState(searchParams.get('category')|| '')
    const [sortBy, setSortBy] = useState(searchParams.get('sort_by')|| 'created_at')
    const [order, setOrder]= useState(searchParams.get('order')||'desc')

    useEffect(()=>{
        setIsLoading(true)
        getReviews(category, sortBy, order).then((reviews)=>{
            setListOfReviews(reviews)
            setIsLoading(false)
        })
        .catch((err)=>{
            setError(err)
        })
        setSearchParams({category, sort_by: sortBy, order})
    },[category, sortBy, order])
    if (error) {
        return <ErrorPage errStatus={error.response.status} errMessage={error.response.data.msg}/>
    }
    if (isLoading) {
        return (
            <p> Loading please wait...</p>
        )
    }
    return (
        <div>
        <NavBar setCategory={setCategory} setSortBy={setSortBy} setOrder={setOrder} sortBy={sortBy} order={order}/>
        <section>
           <h2> Game Reviews </h2>
           <h3> {searchParams.get('category')} </h3>
           <div className="review-cards-ul">
           <ul className="cards-ul">
           {
            listOfReviews.map(({review_id, title, owner, review_img_url, votes})=>{
                return (
                    <ReviewCard key={review_id} review_id={review_id} title={title} owner={owner} review_img_url={review_img_url} votes={votes}/>
                )
            })
           }
           </ul>
           </div>
        </section>
        </div>
    )
}