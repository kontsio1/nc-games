import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { getReview } from "../apis"
import { CommentList } from "./CommentList"

export const DetailedReviewCard = ()=> {
    const [isLoading, setIsLoading] = useState(true)
    const [selectedReview, setSelectedReview] = useState({})
    const [viewComments, setViewComments] = useState(false)
    const {review_id} = useParams()
    useEffect(()=>{
        setIsLoading(true)
        getReview(review_id).then((review)=>{
            setSelectedReview(review)
            setIsLoading(false)
        })
    },[])
    if(isLoading) {
        return (
            <p> Loading please wait...</p>
        )
    }
    return(
        <section>
            <h2> {selectedReview.title} </h2>
            <h3> Category: {selectedReview.category}</h3>
            <p> Designer: {selectedReview.designer}</p>
            <p> Owner: {selectedReview.owner}</p>
            <img src={selectedReview.review_img_url} alt={`The game ${selectedReview.title}`} width="200" height="200"></img>
            <p> {selectedReview.review_body}</p>
            <p> Votes: {selectedReview.votes}</p><button>Vote</button>
            <p> Created at {selectedReview.created_at}</p>
            <button onClick={()=>{
                setViewComments(true)
                setTimeout(()=>{window.scrollBy(0,500)},500)
                }}>View Comments...</button>
            <section> 
                {viewComments ?
                 <CommentList/>
                :null}
            </section>
        </section>
    )
}