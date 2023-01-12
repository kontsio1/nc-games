import { useState } from "react";
import { useEffect } from "react";
import { getCategories, getReviews, getReviewsByCategory } from "../apis";
import '../App.css';
import { ReviewsList } from "./ReviewsList";

export const NavBar = ({setCategory, setSortBy, sortBy, setOrder, order}) => {
    const [reviewCategories, setReviewCategories] = useState([])

    useEffect(()=>{
        getCategories().then((categories)=>{
            setReviewCategories(categories)
        })
    },[])

  return (
    <nav className="nav-bar">
        <div className="dropdown">
            <button className="dropbtn">Categories</button>
            <div className="dropdown-content">
            <ul>
                <li><button className="categories" onClick={()=>{
                setCategory('')
                }}>All</button></li>
                {
                reviewCategories.map(({slug, description})=>{
                return (
                <Categories key={Math.random()} slug={slug} description={description} setSortBy={setSortBy} setCategory={setCategory}/>
                )
                })
                }
            </ul>
            </div>
        </div>
        <label> Sort by: </label>
        <select className="select-container" onChange={(e)=>{
            setSortBy(e.target.value)
            }} defaultValue={ sortBy }>
            <option value={'created_at'}> Date </option>
            <option value={'owner'}> Owner </option>
            <option value={'votes'}> Votes </option>
            <option value={'title'}> Title </option>
            <option value={'designer'}> Designer </option>
        </select>
        <label> Order: </label>
        <select className="order-container" onChange={(e)=>{
            setOrder(e.target.value)
        }} defaultValue={ order }>
            <option value={'asc'}> ascending </option>
            <option value={'desc'}> descending </option>
        </select>
    </nav>
  )
};

const Categories = ({slug, description, setCategory})=>{

    return (
        <li>
            <button className="categories" onClick={()=>{
                setCategory(slug)
            }}>{slug}</button>
            <p className="hidden-description">{description}</p>
        </li>
    )
}