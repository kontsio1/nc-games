import { useEffect } from "react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getComments } from "../apis"
import { CommentCard } from "./CommentCard"

export const CommentList = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [listOfComments, setListOfComments] = useState([])
    const {review_id} = useParams()

    useEffect(()=>{
        setIsLoading(true)
        getComments(review_id).then((comments)=>{
            setListOfComments(comments)
            setIsLoading(false)
        })
    },[])

    if (isLoading) {
        return (
            <p> Loading please wait...</p>
        )
    }
    return (
        <section>
           <h2> Review Comments </h2>
           <ul>
           {
            listOfComments.map(({comment_id, body, review_id, author, votes, created_at})=>{
                return (
                    <CommentCard key={comment_id} review_id={review_id} body={body} author={author} created_at={created_at} votes={votes}/>
                )
            })
           }
           </ul>
           <button>Add new comment</button>
           <Link to={`/reviews/${review_id}`}><button>Go back to review</button></Link>
        </section>
    )
}