import React, { useEffect } from "react";
import { useState } from "react";
import "../css/home.css";

const Home = () => {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiurl = `https://restcountries.com/v3.1/name/${search}?lang=fr`;
        const response = await fetch(apiurl);

        if (!response.ok) {
          throw new Error(
            "Erreur lors de la requête, status :" + response.status
          );
        }

        const data = await response.json();
        console.log(data);
        setCountry(data);
      } catch (error) {
        console.error("Erreur fetch :", error);
      }
    };

    if (search.trim() !== "") {
      fetchData();
    } else {
      setCountry([]);
    }
  }, [search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flexContainer">
      <div className="section1">
        <form className="form" action="">
          <input
            className="userInput"
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Rechercher un pays..."
          />
        </form>
        <div className="responseContainer">
          {country.map((country, index) => (
            <div className="responseRow" key={index}>
              {country.name.common}
              <img
                className="flags"
                height={35}
                width={35}
                src={country.flags.png}
                alt=""
              />{" "}
            </div>
          ))}
        </div>
      </div>
      <div className="infosContainer">
        <h1>Informations</h1>
        <div>Devises :</div>
        <ul>
          {country.length > 0 &&
            country[0].currencies &&
            Object.entries(country[0].currencies).map(([code, currency]) => (
              <li key={code}>
                {currency.name} ({currency.symbol})
              </li>
            ))}
        </ul>

        <div>Langages :</div>
        <ul>
          {country.length > 0 &&
            country[0].languages &&
            Object.entries(country[0].languages).map(([code, language]) => (
              <li key={code}>{language}</li>
            ))}
        </ul>

        <div>Pays frontaliers :</div>
        <ul>
          {country.length > 0 &&
            country[0].borders &&
            Object.entries(country[0].borders).map(([code, border]) => (
              <li key={code}>{border}</li>
            ))}
        </ul>

        {country.length > 0 && country[0].maps && (
          <a
            className="gmapA"
            href={country[0].maps.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
          >
            Voir sur Google Maps
          </a>
        )}
      </div>
    </div>
  );
};

export default Home;
