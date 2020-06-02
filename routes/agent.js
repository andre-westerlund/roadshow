const router = require("express").Router();
const AgentController = require("../controllers/agent");

router.get("/", AgentController.getAgents);
router.get("/:code", AgentController.getAgent);
router.post("/", AgentController.createAgent);
router.put("/:code", AgentController.updateAgent);
router.delete("/:code", AgentController.deleteAgent);

module.exports = router;