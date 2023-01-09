 
 export const ReviewCard = ({title, owner, review_img_url, votes}) => {
    return (
        <div>
            <h3>{title}</h3>
            <p> Owner: {owner}</p>
            <img src={review_img_url} width="100" height="100"></img>
            <p> Votes: {votes}</p>
        </div>
    )
}