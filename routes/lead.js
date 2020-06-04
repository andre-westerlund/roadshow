const router = require("express").Router();
const auth = require("../middleware/auth");

const LeadController = require("../controllers/lead");

router.get("/",auth.userLoggedIn, LeadController.getLeads);
router.get("/:id",auth.userLoggedIn, LeadController.getLead);
router.post("/",auth.userLoggedIn, LeadController.createLead);
router.put("/:id",auth.userLoggedIn, LeadController.updateLead);
router.delete("/:id",auth.userLoggedIn, LeadController.deleteLead);
router.get("/:id/agents",auth.userLoggedIn, LeadController.getLeadAgents)
router.post("/:id/agents/:code",auth.userLoggedIn, LeadController.addAgent);
router.delete("/:id/agents/:code",auth.userLoggedIn, LeadController.removeAgent);

module.exports = router;