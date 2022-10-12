import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { findCountry } from "../actions";
import s from "./Search.module.css"

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    dispatch(findCountry(name));
    setName("");
  }

  return (
    <div className={s.search}>
      <input type="text" placeholder="Buscar..." onChange={(e) => handleInputChange(e)} className={s.barra}/>
      <button type="submit" onClick={(e) => onSubmit(e)} className={s.btn}>Buscar</button>
    </div>
  );
}
