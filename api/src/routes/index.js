const { Router } = require("express");
const {
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
  getAllContinents
} = require("./controllers");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/countries", showCountries);
router.get("/countries/:id", getOneCountry);
router.post("/activities", createActivities);
router.get("/filterByNameAsc",filterByNameAsc)
router.get("/filterByNameDesc",filterByNameDesc)
router.get("/filterByPopulationAsc",filterByPopulationAsc)
router.get("/filterByPopulationDesc",filterByPopulationDesc)
router.get("/filterByContinent",filterByContinent)
router.get("/filterByActivity",filteredByActivity)
router.get("/getActivities",getAllActivities)
router.get("/getContinents",getAllContinents)

module.exports = router;
