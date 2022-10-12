import React from "react";
import s from "./Pagin.module.css"

export default function Pagin ({countryPerPage, allCountries, paginado }) {
  const pageNumbers = [];

  for (let i = 0;i<= Math.ceil((allCountries - 9)/countryPerPage);  i++) {
    pageNumbers.push(i + 1)
    
  }

  return(
    <nav className={s.nav}>
      <ul className={s.list}>
        {
          pageNumbers && pageNumbers.map(n => {
            return (
              <li key={n}>
                 {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a onClick={() =>  paginado(n)} >{n}</a>
              </li>
            )
          })
        }
      </ul>
    </nav>
  );
}