import { useState } from "react"
import { useParams } from "react-router"
import { postComment } from "../apis"

export const NewComment = ({listOfComments, setListOfComments, showNewCommentForm, setShowNewCommentForm}) => {
    const [newComment,setNewComment] = useState({})
    const {review_id} = useParams()

    const handleSubmit = (e)=>{
        e.preventDefault()
        const newCommentObj = {
            username: e.target[0].value,
            body: e.target[1].value
        }
        setNewComment(newCommentObj)

        // setHaveSentComment(true)
        setShowNewCommentForm(false)
        setListOfComments((currComments)=>{
            const newComments = [...currComments]
            const tempCommentId = 0
            newComments.push({comment_id: tempCommentId, author: newCommentObj.username, body: newCommentObj.body})
            return newComments
        })
        postComment(review_id, newCommentObj)
        .catch((err)=>{
            if(err) alert("error communicating with server try again later")
            setListOfComments((currComments)=>{
                return currComments.slice(0,-1)
            })
        })
    }
    if (showNewCommentForm) {
        return (
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input type="text" name="username" maxLength="20" required></input><br></br>
                <label>Your comment:</label>
                <input type="text" maxLength="400" required name="body"></input><br></br>
                <input type="submit" value="Submit comment"></input>
                <input type="reset" value="Clear"></input>
            </form>
        )
    }
}