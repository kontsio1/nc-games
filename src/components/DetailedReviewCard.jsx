// import { useEffect } from "react"
// import { useState } from "react"
// import { useParams } from "react-router-dom"
// import { getReview } from "../apis"

// export const DetailedReviewCard = ()=> {
//     const [selectedReview, setSelectedReview] = useState({})
//     const {review_id} = useParams()
//     useEffect(()=>{
//         getReview(review_id).then((review)=>{
//             setSelectedReview(review)
//         })
//     },[])
//     return(
//         <section>
//             <h2> {selectedReview.title} </h2>
//             <h3> Category: {selectedReview.category}</h3>
//             <p> Designer: {selectedReview.designer}</p>
//             <p> Owner: {selectedReview.owner}</p>
//             <img src={selectedReview.review_img_url} width="100" height="100"></img>
//             <p> {selectedReview.review_body}</p>
//             <p> Votes: {selectedReview.votes}</p><button>Vote</button>
//             <p> Cretated at {selectedReview.created_at}</p>
//             <button>View Comments</button>
//         </section>
//     )
// }