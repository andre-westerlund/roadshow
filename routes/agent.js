const router = require("express").Router();
const auth = require("../middleware/auth");
const AgentController = require("../controllers/agent");


router.get("/", auth.userLoggedIn, AgentController.getAgents);
router.get("/:code", auth.isAuthenticated, AgentController.getAgent);
router.post("/",auth.userLoggedIn, AgentController.createAgent);
router.put("/:code", auth.userLoggedIn, AgentController.updateAgent);
router.delete("/:code", auth.userLoggedIn, AgentController.deleteAgent);

//auth
router.post("/auth/login",auth.agentNotLoggedIn, AgentController.login);
router.get("/auth/logout",auth.agentLoggedIn, AgentController.logout);

router.post("/village/:villageId", auth.agentLoggedIn, AgentController.setVillage)
router.get("/village/current", auth.agentLoggedIn, AgentController.getVillage)


module.exports = router;