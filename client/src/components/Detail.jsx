import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountryDetail, cleanDetail } from "../actions";
import { useEffect } from "react";
import s from "./Detail.module.css";

export default function Detail(propiedades) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountryDetail(propiedades.match.params.id));
    return () => {
      dispatch(cleanDetail());
    };
  }, []);

  const country = useSelector((state) => state.detail);
  // useEffect(() => {
  //   boleano = !boleano;
  // }, [country])
  return (
    <div className={s.container}>
      {country.image ? (
        <div>

          <div className={s.flexContainer}>

            <div className={s.detailsContainer}>

              <div className={s.container_title}>
                <h1 className={s.title}>
                  Nombre: {country.name?.toUpperCase()}{" "}
                </h1>
              </div>
              <div className={s.details}>
                <p className={s.paraph}>Código: {country.id} </p>
                <p className={s.paraph}>Capital: {country.capital} </p>
                <p className={s.paraph}>Subregión: {country.subregion}</p>
                <p className={s.paraph}>Área: {country.area}</p>
              </div>

            </div>

            <div className={s.imageContainer}>
                <img
                  src={country.image}
                  alt="Countryg"
                  className={s.image}
                  width="600"
                  heigth="600"
                />
            </div>

          </div>

          <div>
              <div className={s.Act}>Actividades: </div>
              <div className={s.activities}>
              <ul>
                {country.activities.length? country.activities.map((a) => {
                  return (
                    <li key={a.name}>
                      <h1 className={s.act}>Actividad: {a.name}</h1>
                      <h3 className={s.act}>Duración: {a.duration}</h3>
                      {a.season !== "No especificado" ? (
                        <h3 className={s.act}>Estación: {a.season}</h3>
                      ) : (
                        <p className={s.act}>No se ha aclarado una temporada</p>
                      )}
                      <h3 className={s.act}>Dificultad: {a.difficulty}</h3>
                    </li>
                  );
                }) : <div>
                <p> Aún no hay actividades asociadas a este país :C. ¿Deseas crear una? </p> 
                <Link to="/activity"><button>Crear Actividad</button></Link>
                </div>
                    
                }
              </ul>
              </div>
          </div>

        </div>
      ) : (
        <p>Cargando...</p>
      )}
      <div>
        <Link to="/home">
          <button className={s.button2}>Volver</button>
        </Link>       
      </div>
    </div>
  );
}
