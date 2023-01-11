import { useState } from "react"
import { useParams } from "react-router"
import { postComment } from "../apis"

export const NewComment = ({listOfComments, setListOfComments, showNewCommentForm, setShowNewCommentForm}) => {
    const [newComment,setNewComment] = useState({})
    const {review_id} = useParams()

    const handleSubmit = (e)=>{
        e.preventDefault()
        const newCommentObj = {
            username: 'grumpy19',
            body: e.target[0].value
        }
        setNewComment(newCommentObj)

        setShowNewCommentForm(false)
        setListOfComments((currComments)=>{
            const newComments = [...currComments]
            const tempCommentId = 0
            newComments.push({comment_id: tempCommentId, author: newCommentObj.username, body: newCommentObj.body})
            return newComments
        })
        // postComment(review_id, newCommentObj)
        // .catch((err)=>{
        //     if(err) alert("error communicating with server try again later")
        //     setListOfComments((currComments)=>{
        //         return currComments.slice(0,-1)
        //     })
        // })
    }
    if (showNewCommentForm) {
        return (
            <form onSubmit={handleSubmit}>
                <textarea required type="text" maxLength="400" name="body" rows="5" cols="33" placeholder="Write your comment here..."></textarea><br></br>
                <input type="submit" value="Submit comment"></input>
                <input type="reset" value="Clear"></input>
            </form>
        )
    }
}