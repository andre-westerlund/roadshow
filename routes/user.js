const router = require("express").Router();
const auth = require("../middleware/auth");
const passport = require("passport");
const UserController = require("../controllers/user");

router.get("/", UserController.getUsers);
router.get("/:id", UserController.getUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

//AUTH
router.post("/auth/login", auth.userNotLoggedIn, passport.authenticate('userLocal'), UserController.login);
router.get("/auth/logout", auth.userLoggedIn, UserController.logout);
router.post("/auth/register", auth.isAdmin, UserController.register)

module.exports = router;