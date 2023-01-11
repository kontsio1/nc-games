import { useState } from "react";
import { useEffect } from "react";
import { getCategories, getReviews, getReviewsByCategory } from "../apis";
import '../App.css';

export const NavBar = ({setListOfReviews, setSearchParams, searchParams}) => {
    const [reviewCategories, setReviewCategories] = useState([])

    useEffect(()=>{
        getCategories().then((categories)=>{
            setReviewCategories(categories)
        })
    },[])

    const filteredReviews = (slug='') => {
        setSearchParams({category: slug})
        getReviews(slug).then((reviews)=>{
        setListOfReviews(reviews)
        })
    }

  return (
    <nav className="dropdown">
  <button className="dropbtn">Categories</button>
  <div className="dropdown-content">
    <ul>
    <li><button className="categories" onClick={()=>{filteredReviews()}}>All</button></li>
    {
    reviewCategories.map(({slug, description})=>{
        return (
            <Categories key={Math.random()} slug={slug} description={description} filteredReviews={filteredReviews}/>
        )
    })
    }
    </ul>
    </div>
    </nav>
  )
};

const Categories = ({slug, description, filteredReviews})=>{

    return (
        <li>
            <button className="categories" onClick={()=>{filteredReviews(slug)}}>{slug}</button>
            <p className="hidden-description">{description}</p>
        </li>
    )
}