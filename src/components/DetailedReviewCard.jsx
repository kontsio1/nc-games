import { useCallback, useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { getReview, patchReview } from "../apis"

const upArrowUrl = 'data:image/png;base64,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'
const downArrowUrl = 'data:image/png;base64,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'

export const DetailedReviewCard = ()=> {
    const [isLoading, setIsLoading] = useState(true)
    const [selectedReview, setSelectedReview] = useState({})
    const [hasVoted, setHasVoted] = useState(false)
    const {review_id} = useParams()
    useEffect(()=>{
        setIsLoading(true)
        getReview(review_id).then((review)=>{
            setSelectedReview(review)
            setIsLoading(false)
        })
    },[])
    const voteThisReview = (incr)=>{
        if (!hasVoted) {
            setSelectedReview((currReview)=>{
                const votedReview = {...currReview}
                votedReview.votes += incr
                return votedReview
            })
            patchReview(review_id, incr).then(()=>{
                setHasVoted(true)
            })
        }
    }
        

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
            <p> Votes: {selectedReview.votes}</p>
            <button onClick={()=>{voteThisReview(1)}}><img src={upArrowUrl} alt="Upvote" height={20}></img></button>
            <button onClick={()=>{voteThisReview(-1)}}><img src={downArrowUrl} alt="Downvote" height={20}></img></button>
            <p> Created at {selectedReview.created_at}</p>
            <a href={`/reviews/${selectedReview.review_id}/comments`}><button>View Comments</button></a>
        </section>
    )
}