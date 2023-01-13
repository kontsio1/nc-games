import { Link } from "react-router-dom"

 
 export const ReviewCard = ({review_id, title, owner, review_img_url, votes}) => {
    return (
        <li className="review-card">
            <Link to={`/reviews/${review_id}`}>
            <h3>{title}</h3>
            </Link>
            <p> Owner: {owner}</p>
            <img src={review_img_url} alt="Picture of the game" width="100" height="100"></img>
            <p> Votes: {votes}</p>
        </li>
    )
}