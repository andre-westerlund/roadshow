const router = require("express").Router();
const auth = require("../middleware/auth");

const VillageController = require("../controllers/village");

router.get("/", auth.userLoggedIn, VillageController.getVillages);
router.get("/:code", auth.userLoggedIn, VillageController.getVillage);
router.post("/", auth.userLoggedIn, VillageController.createVillage);
router.put("/:code", auth.userLoggedIn, VillageController.updateVillage);
router.delete("/:code", auth.userLoggedIn, VillageController.deleteVillage);

module.exports = router;