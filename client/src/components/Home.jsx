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
  ordeningNameAsc
} from "../actions";
import { Link } from "react-router-dom";
import CountryCard from "./Card";
import Pagin from "./Pagin";
import SearchBar from "./SearchBar"

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
    } else if ( evento === "desc") {
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
    <div>
      <Link to="/activity"> Crear Actividad</Link>
      <h1> Country App </h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Back to Countries
      </button>
      <div>
      <SearchBar/>
        <select onChange={(e) => onClickordering(e)}>
          <option defaultValue=""> OrderByName </option>
          <option key="nameAsc" value="nameAsc">
            {" "}
            A - Z{" "}
          </option>
          <option key="nameDesc" value="nameDesc">
            {" "}
            Z - A{" "}
          </option>
        </select>
        <select onChange={(e) => onClickordering(e)}>
          <option defaultValue={undefined}> OrderByPopulation </option>
          <option value="asc"> Min - Max </option>
          <option value="desc"> Max - Min </option>
        </select>
        <select onChange={ (e) => onClickActivities(e)}>
          <option defaultValue=""> Activities </option>
          {allActivities.length ? (
            allActivities.map((a) => {
              return <option value={a.name}>{a.name}</option>;
            })
          ) : (
            <option value="No activities">No hay actividades</option>
          )}
        </select>
        <select onChange={(e) => onClickContinent(e)}>
          <option defaultValue="Contient"> Continents </option>
          {allContinents ? (
            allContinents.map((c) => {
              return <option value={c}>{c}</option>;
            })
          ) : (
            <option>Cargando</option>
          )}
        </select>
        <Pagin
          countryPerPage={countryPerPage}
          allCountries={allCountries.length}
          paginado={paginado}
        />
        {currentCountries?.map((c) => {
          return (
            <div key={c.id}>
              <Link to={"/home/" + c.id}>
                <CountryCard
                  name={c.name.toUpperCase()}
                  image={c.image}
                  continent={c.continent}
                  id={c.id}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
