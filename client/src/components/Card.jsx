import React from "react";
import {Link} from "react-router-dom"
import s from "./Card.module.css"
export default function countryCard ({name, image, continent, id}) {
  return (
    <div key={id} className={s.Container}>
      <Link to={`/home/${id}`} >
        <h3>{name}</h3>
      </Link>
        <h5>{continent}</h5>
        <div className={s.imageContainer}>
        <img src={image} alt="Not found" className={s.image}/>

        </div>
    </div>
  )
}