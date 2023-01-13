import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { getReview, patchReview } from "../apis"
import { CommentList } from "./CommentList"
import { ErrorPage } from "./ErrorPage"
const {arrowUrls} = require('../img_sources')

export const DetailedReviewCard = ()=> {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [selectedReview, setSelectedReview] = useState({})
    const [hasVoted, setHasVoted] = useState(false)
    const [viewComments, setViewComments] = useState(false)
    const [showButton, setShowButton] = useState(true)

    const {review_id} = useParams()
    useEffect(()=>{
        setIsLoading(true)
        getReview(review_id).then((review)=>{
            setSelectedReview(review)
            setIsLoading(false)
        })
        .catch((err)=>{
            setError(err)
        })

    },[review_id])
    
    const voteThisReview = (incr)=>{
        if (!hasVoted) {
            setSelectedReview((currReview)=>{
                const votedReview = {...currReview}
                votedReview.votes += incr
                return votedReview
            })
            patchReview(review_id, incr).then(()=>{
                setHasVoted(true)
            }).catch((err)=>{
                if (err){
                    alert("error communicating with server try again later")
                }
            })
        }
    }
    if (error) {
        return <ErrorPage errStatus={error.response.status} errMessage={error.response.data.msg}/>
    }
    if (isLoading) {
        return (
            <p> Loading please wait...</p>
        )
    }

    if(isLoading) {
        return (
            <p> Loading please wait...</p>
        )
    }
    return(
    <div className="Detailed-Review-Card">
        <h2 className="detailed-review-title"> {selectedReview.title} </h2>
        <h3 className="detailed-review"> Category: {selectedReview.category}</h3>
        <p className="detailed-review"> Designer: {selectedReview.designer}</p>
        <p className="detailed-review"> Owner: {selectedReview.owner}</p>
        <img src={selectedReview.review_img_url} alt={`The game ${selectedReview.title}`} width="200" height="200"></img>
        <p className="detailed-review-body"> {selectedReview.review_body}</p>
        <p className="detailed-review-votes"> Votes: {selectedReview.votes}</p>
        <button onClick={()=>{voteThisReview(1)}}><img src={arrowUrls[0]} alt="Upvote" height={30} width={30}></img></button>
        <button onClick={()=>{voteThisReview(-1)}}><img src={arrowUrls[1]} alt="Downvote" height={30} width={30}></img></button>
        <p className="detailed-review"> Created at {selectedReview.created_at}</p>
        { showButton && (
        <button className="add-comment-button" onClick={()=>{
            setViewComments(true)
            setShowButton(false)
            setTimeout(()=>{window.scrollBy(0,500)},500)
            }}>View Comments...</button>)}
        <section> 
            {viewComments ? <CommentList/> :null}
        </section>
    </div>
    )
}