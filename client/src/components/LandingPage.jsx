import React from 'react';
import {Link} from 'react-router-dom';
import s from "./LandingPage.module.css"



export default function LandingPage () {
  return(
    <div className={s.container}>
      <h1 className={s.title}>Welcome to my page</h1>
      <Link to='/home'>
        <button className={s.button2}>ENTER</button>
      </Link>
    </div>
  )
}