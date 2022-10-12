import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCountries,
  getAllActivities,
  filterByContinent,
  getAllContinents,
  filterByActivity,
  ordeningPopAsc,
  ordeningPopDesc,
  ordeningNameDesc,
  ordeningNameAsc,
} from "../actions";
import { Link } from "react-router-dom";
import CountryCard from "./Card";
import Pagin from "./Pagin";
import SearchBar from "./SearchBar";
import s from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const allActivities = useSelector((state) => state.activities);
  const allContinents = useSelector((state) => state.continents);

  const [currentPage, setCurrentPage] = useState(1);
  const [countryPerPage] = useState(10);
  const indexOfLastCountry = currentPage * countryPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countryPerPage;
  const currentCountries =
    currentPage === 1
      ? allCountries.slice(0, 9)
      : allCountries.slice(indexOfFirstCountry - 1, indexOfLastCountry - 1);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getAllActivities());
    dispatch(getAllContinents());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllCountries());
    setCurrentPage(1);
  }
  function onClickContinent(e) {
    e.preventDefault();
    const evento = e.target.value;
    setCurrentPage(1);
    dispatch(filterByContinent(evento));
  }
  function onClickActivities(e) {
    e.preventDefault();
    const evento = e.target.value;
    setCurrentPage(1);
    dispatch(filterByActivity(evento));
  }
  function onClickordering(e) {
    e.preventDefault();
    const evento = e.target.value;
    if (evento === "asc") {
      setCurrentPage(1);
      dispatch(ordeningPopAsc());
    } else if (evento === "desc") {
      setCurrentPage(1);
      dispatch(ordeningPopDesc());
    } else if (evento === "nameDesc") {
      setCurrentPage(1);
      dispatch(ordeningNameDesc());
    } else {
      setCurrentPage(1);
      dispatch(ordeningNameAsc());
    }
  }
  return (
    <div style={{ backgroundColor: "#efeee6" }}>
      <div className={s.flex}>
        <div>
          <h1> Country App </h1>
        </div>
        <div>
          <Link to="/activity">
            {" "}
            <button className={s.btn}>Crear Actividad</button>
          </Link>
          <button
            className={s.btn}
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Todos los Paises
          </button>
        </div>
      </div>
      <div>
        <div className={s.flex2}>
          <SearchBar/>
          <div className={s.divNoEsc}>
            <select onChange={(e) => onClickordering(e)} className={s.select}>
              <option defaultValue=""> Ordenar por Nombre </option>
              <option key="nameAsc" value="nameAsc">
                {" "}
                A - Z{" "}
              </option>
              <option key="nameDesc" value="nameDesc">
                {" "}
                Z - A{" "}
              </option>
            </select>
            <select onChange={(e) => onClickordering(e)} className={s.select}>
              <option defaultValue={undefined}> Ordenar por Población</option>
              <option value="asc"> Min - Max </option>
              <option value="desc"> Max - Min </option>
            </select>
            <select onChange={(e) => onClickActivities(e)} className={s.select}>
              <option defaultValue=""> Actividades </option>
              {allActivities.length ? (
                allActivities.map((a) => {
                  return <option value={a.name}>{a.name}</option>;
                })
              ) : (
                <option value="No activities">No hay actividades</option>
              )}
            </select>
            <select onChange={(e) => onClickContinent(e)} className={s.select}>
              <option defaultValue="Contient"> Continentes </option>
              {allContinents ? (
                allContinents.map((c) => {
                  return <option value={c}>{c}</option>;
                })
              ) : (
                <option>Cargando</option>
              )}
            </select>
          </div>
        </div>
        <Pagin
          countryPerPage={countryPerPage}
          allCountries={allCountries.length}
          paginado={paginado}
        />
        <div className={s.cardFlex}>
          {currentCountries?.map((c) => {
            return (
              <div key={c.id} className={s.card}>
                  <CountryCard
                    name={c.name.toUpperCase()}
                    image={c.image}
                    continent={c.continent}
                    id={c.id}
                  />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
