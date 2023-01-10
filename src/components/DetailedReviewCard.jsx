import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { getReview, patchReview } from "../apis"
import { CommentList } from "./CommentList"

const upArrowUrl = 'data:image/png;base64,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'
const downArrowUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsPTzwF9WoppxkaP0_SFJlZbh9gw-Qw7ADEQ&usqp=CAU'
// I still don't like how these look..will find some better images or improve on css stage
export const DetailedReviewCard = ()=> {
    const [isLoading, setIsLoading] = useState(true)
    const [selectedReview, setSelectedReview] = useState({})
    const [hasVoted, setHasVoted] = useState(false)
    const [viewComments, setViewComments] = useState(false)
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
        <button onClick={()=>{voteThisReview(1)}}><img src={upArrowUrl} alt="Upvote" height={30} width={30}></img></button>
        <button onClick={()=>{voteThisReview(-1)}}><img src={downArrowUrl} alt="Downvote" height={30} width={30}></img></button>
        <p> Created at {selectedReview.created_at}</p>
        <button onClick={()=>{
            setViewComments(true)
            setTimeout(()=>{window.scrollBy(0,500)},500)
            }}>View Comments...</button>
        <section> 
            {viewComments ? <CommentList/> :null}
        </section>
    </section>
    )
}