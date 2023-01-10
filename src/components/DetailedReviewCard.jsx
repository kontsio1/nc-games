import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { getReview, patchReview } from "../apis"
import { CommentList } from "./CommentList"
const {arrowUrls} = require('../img_sources')

export const DetailedReviewCard = ()=> {
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
        <button onClick={()=>{voteThisReview(1)}}><img src={arrowUrls[0]} alt="Upvote" height={30} width={30}></img></button>
        <button onClick={()=>{voteThisReview(-1)}}><img src={arrowUrls[1]} alt="Downvote" height={30} width={30}></img></button>
        <p> Created at {selectedReview.created_at}</p>
        { showButton && (
        <button onClick={()=>{
            setViewComments(true)
            setShowButton(false)
            setTimeout(()=>{window.scrollBy(0,500)},500)
            }}>View Comments...</button>)}
        <section> 
            {viewComments ? <CommentList/> :null}
        </section>
    </section>
    )
}