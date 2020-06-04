const router = require("express").Router();
const auth = require("../middleware/auth");

const ActivityController = require("../controllers/activity");

router.get("/",auth.userLoggedIn, ActivityController.getActivities);
router.get("/:id",auth.isAuthenticated, ActivityController.getActivity);
router.post("/", auth.agentLoggedIn ,ActivityController.createActivity);
router.put("/:id",auth.isAuthenticated, ActivityController.updateActivity);
router.delete("/:id",auth.userLoggedIn, ActivityController.deleteActivity);


module.exports = router;