const router = require("express").Router();
const VillageController = require("../controllers/village");

router.get("/", VillageController.getVillages);
router.get("/:code", VillageController.getVillage);
router.post("/", VillageController.createVillage);
router.put("/:code", VillageController.updateVillage);
router.delete("/:code", VillageController.deleteVillage);

module.exports = router;