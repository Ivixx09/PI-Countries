const axios = require("axios");
const { Activity, Country } = require("../db");
const { Op } = require("sequelize");

const getAllCountries = async () => {
  try {
    const info = await axios.get("https://restcountries.com/v3/all");
    const db = await Country.findAll();
    if (!db.length) {
      info.data.forEach(async (c) => {
        naamee = c.name.common.toLowerCase();
        const country = await Country.findOrCreate({
          where: {
            name: naamee,
            id: c.cca3,
            image: c.flags[0],
            continent: c.continents[0],
            capital: Array.isArray(c.capital)
              ? c.capital[0]
                ? c.capital[0]
                : "Unknow"
              : "Unknow",
            subregion: c.subregion ? c.subregion : "Unknow",
            area: c.area,
            population: c.population,
          },
        });
      });
    }
  } catch (e) {
    console.log(e.message);
  }
};

const showCountries = async (req, res) => {
  const { name } = req.query;
  if (name) {
    const country = await Country.findAll({
      where: {
        name: {
          [Op.startsWith]: name.toLowerCase(),
        },
      },
    });
    country.length
      ? res.status(200).send(country)
      : res.status(400).send("Country not found");
  } else {
    const countries = await Country.findAll();
    countries
      ? res.status(200).send(countries)
      : res.status(400).send("Country not found");
  }
};

const getOneCountry = async (req, res) => {
  const { id } = req.params;
  const country = await Country.findOne({
    where: {
      id: {
        [Op.like]: id,
      },
    },
    include: {
      model: Activity,
      attributes: ["name", "difficulty", "duration", "season"],
      throught: {
        attributes: [],
      },
    },
  });
  country
    ? res.status(200).send(country)
    : res.status(400).send("Country not found");
};

const createActivities = async (req, res) => {
  const { name1, difficulty, duration, season, country} = req.body;
  if (!name1 || !difficulty || !duration || !country) {
    res.status(400).send("Faltan datos");
  } else {
    console.log(country)
    const activity = await Activity.create({
      name: name1.toLowerCase(),
      difficulty,
      duration,
      season: season?season:"No especificado",
    });
    const countries = [];
    country.forEach(c => countries.push(c.toLowerCase()))
    let countryDb = await Country.findAll({
      where: { name: countries },
    });
    const countryId = countryDb.map(c => c.id)
    console.log(countryId)
    activity.addCountry(countryDb);
    res.status(200).send("actividad creada correctamente");
  }
};
const getAllActivities = async (req, res) => {
  const activities = await Activity.findAll();
  activities.length
    ? res.status(200).send(activities)
    : res.status(400).send("No se encuentran actividades aún");
};
const getAllContinents = async (req, res) => {
  const continents = await Country.findAll({
    attributes: ["continent"],
  });
  const continentsFiltered = [];
  continents.map((c) => {
    if (!continentsFiltered.includes(c.continent)) {
      continentsFiltered.push(c.continent);
    }
  });
  continentsFiltered.length
    ? res.status(200).send(continentsFiltered)
    : res.status(400).send("No se encuentran continentes aún");
};
//**********************FILTERS

const filterByNameAsc = async (req, res) => {
  const aToZ = await Country.findAll({
    order: [["name", "ASC"]],
    include: {
      model: Activity,
      attributes: ["name"],
      through: {
        atributes: [],
      },
    },
  });
  aToZ
    ? res.status(200).send(aToZ)
    : res.status(400).send("No se encontraron países");
};
const filterByNameDesc = async (req, res) => {
  const aToZ = await Country.findAll({
    order: [["name", "DESC"]],
    include: {
      model: Activity,
      attributes: ["name"],
      through: {
        atributes: [],
      },
    },
  });
  aToZ
    ? res.status(200).send(aToZ)
    : res.status(400).send("No se encontraron juegos creados.");
};
const filterByPopulationAsc = async (req, res) => {
  const aToZ = await Country.findAll({
    order: [["population", "ASC"]],
    include: {
      model: Activity,
      attributes: ["name"],
      through: {
        atributes: [],
      },
    },
  });
  aToZ
    ? res.status(200).send(aToZ)
    : res.status(400).send("No se encontraron países");
};
const filterByPopulationDesc = async (req, res) => {
  const aToZ = await Country.findAll({
    order: [["population", "DESC"]],
    include: {
      model: Activity,
      attributes: ["name"],
      through: {
        atributes: [],
      },
    },
  });
  aToZ
    ? res.status(200).send(aToZ)
    : res.status(400).send("No se encontraron juegos creados.");
};
const filterByContinent = async (req, res) => {
  const { continentName } = req.query;
  const countries = await Country.findAll({
    where: {
      continent: { [Op.eq]: continentName },
    },
  });
  console.log(countries);
  countries
    ? res.status(200).send(countries)
    : res.status(400).send("No se encontraron juegos creados.");
};
const filteredByActivity = async (req, res) => {
  try {
    const { act } = req.query;
    const c = await Country.findAll({
      include: {
        model: Activity,
        as: "activities",
        where: {
          name: { [Op.eq]: act.toLowerCase() },
        },
      },
    });
    c
      ? res.status(200).send(c)
      : res.status(400).send("No se encontraron juegos creados.");
  } catch (e) {
    console.log(e.message);
  }
};
module.exports = {
  getAllCountries,
  showCountries,
  getOneCountry,
  createActivities,
  filterByNameAsc,
  filterByNameDesc,
  filterByPopulationAsc,
  filterByPopulationDesc,
  filterByContinent,
  filteredByActivity,
  getAllActivities,
  getAllContinents,
};
