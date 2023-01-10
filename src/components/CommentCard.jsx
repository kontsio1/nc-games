
export const CommentCard = ({comment_id, review_id, body, author, created_at, votes})=>{
        return (
            <li>
                <h3>{author}:</h3>
                <p> {body}</p>
                <p> Created at: {created_at}</p>
                <p> Votes: {votes}</p>
                <button>Vote this comment</button>
            </li>
        )
}