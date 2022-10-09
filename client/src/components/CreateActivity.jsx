import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createActivity, getAllCountries } from "../actions";
import s from "./CreateActivity.module.css";

function validate(input) {
  let errors = {};
  if (!input.name1 || input.name1 === "")
    errors.name1 = "El nombre es requerido.";
  if (input.difficulty === "" || input.difficulty < 1 || input.difficulty > 5)
    errors.difficulty = "La dificultad debe ser mayor a 1 y menor a 5.";
  if (input.duration === "" || input.duration < 1 || input.duration > 24)
    errors.duration = "La duración debe ser mayor a 1 y menor a 24.";
  if (input.country.length === 0) errors.country = "Country is required.";

  const btn = document.getElementById("btn");
  btn.setAttribute("disabled", true);
  if (!Object.keys(errors).length) btn.removeAttribute("disabled");
  return errors;
}

export default function CreateActivity() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);

  const [input, setInput] = useState({
    name1: "",
    difficulty: "",
    duration: "",
    season: "",
    country: [],
  });
  const [errors, setErrors] = useState({});

  function handleDelet(e) {
    e.preventDefault();
    const aux = input.country.filter((n) => n !== e.target.value);
    setInput({
      ...input,
      country: aux,
    });
  }

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelect = (e) => {
    setInput({
      ...input,
      country: [...input.country, e.target.value],
    });
  };

  const handleSelectSeason = (e) => {
    const value = e.target.value;
    if (value !== "None") {
      setInput({
        ...input,
        season: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Consologueo desde la actividad", input);
    dispatch(createActivity(input));
    alert("Actividad creada");
    setInput({
      name1: "",
      difficulty: "",
      duration: "",
      season: "",
      country: [],
    });
    document.getElementById("form").reset();
  };

  useEffect(() => {
    dispatch(getAllCountries());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    validate(input);
  }, [input]);

  return (
    <div>
      <div>
        <h1>PROGRAMA UNA ACTIVIDAD!</h1>
        <img
          src="https://www.grandespymes.com.ar/wp-content/uploads/2020/07/agenda.jpg"
          alt="programar fecha"
        />
      </div>
      <div>
        <form onSubmit={(e) => handleSubmit(e)} id="form">
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              value={input.name1}
              placeholder="Visitar los Ándes"
              name="name1"
              onChange={(e) => handleChange(e)}
            />
            {errors.name1 && <p>{errors.name1}</p>}
          </div>
          <div>
            <label>Dificultad:</label>
            <input
              type="number"
              value={input.difficulty}
              placeholder="Dificultad entre 1 y 5"
              min="1"
              max="5"
              name="difficulty"
              onChange={(e) => handleChange(e)}
            />
            {errors.difficulty && <p>{errors.difficulty}</p>}
          </div>
          <div>
            <label>Duración:</label>
            <input
              type="number"
              value={input.duration}
              placeholder="Duración de la actividad"
              min="1"
              max="24"
              name="duration"
              onChange={(e) => handleChange(e)}
            />
            {errors.duration && <p>{errors.duration}</p>}
          </div>
          <div>
            <label>Temporada:</label>
            <select onChange={(e) => handleSelectSeason(e)}>
              <option value="None">Seleccionar temporada</option>
              <option value="Invierno">Invierno</option>
              <option value="Otoño">Otoño</option>
              <option value="Primavera">Primavera</option>
              <option value="Verano">Verano</option>
            </select>
            {/* <input
            type="text"
            value={input.season}
            placeholder="Primavera"
            name="season"
            onChange={(e) => handleChange(e)}
          /> */}
          </div>
          <div>
            <label>Países </label>
            <select onChange={(e) => handleSelect(e)}>
              <option value="none"> País </option>
              {countries.length > 0 &&
                countries.map((c) => {
                  return (
                    <option value={c.name} key={c.id}>
                      {c.name.toUpperCase()}
                    </option>
                  );
                })}
            </select>
            {errors.country && <p>{errors.country}</p>}
          </div>
          <ul>
            {input.country.map((c) => {
              return (
                <div>
                  <button value={c} onClick={(e) => handleDelet(e)}>
                    X
                  </button>
                  <li key={c}>{c.toUpperCase() + ", "}</li>
                </div>
              );
            })}
          </ul>
          <div>
            <button type="submit" id="btn" className={s.button2}>
              Crear actividad
            </button>
            <Link to="/home">
              <button className={s.button2}>VOLVER</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
