import React from "react";
import {Link} from "react-router-dom"
import s from "./Card.module.css"
export default function countryCard ({name, image, continent, id}) {
  return (
    <div key={id} className={s.Container}>
        <h3>{name}</h3>
        <h5>{continent}</h5>
        <div className={s.imageContainer}>
        <img src={image} alt="Not found" className={s.image}/>
        </div>
        <div>
          <Link to={`/home/${id}`}>
            <button className={s.btn}>Ir a detalles</button>
          </Link>
        </div>
    </div>
  )
}