const router = require("express").Router();
const LeadController = require("../controllers/lead");

router.get("/", LeadController.getLeads);
router.get("/:id", LeadController.getLead);
router.post("/", LeadController.createLead);
router.put("/:id", LeadController.updateLead);
router.delete("/:id", LeadController.deleteLead);
router.get("/:id/agents", LeadController.getLeadAgents)
router.post("/:id/agents/:code", LeadController.addAgent);
router.delete("/:id/agents/:code", LeadController.removeAgent);

module.exports = router;