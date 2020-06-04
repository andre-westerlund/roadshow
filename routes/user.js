const router = require("express").Router();
const auth = require("../middleware/auth");
const passport = require("passport");
const UserController = require("../controllers/user");

router.get("/",auth.isAdmin, UserController.getUsers);
router.get("/:id",auth.isAdmin, UserController.getUser);
router.put("/:id",auth.isAdmin, UserController.updateUser);
router.delete("/:id",auth.isAdmin, UserController.deleteUser);

//AUTH
router.post("/auth/login", auth.userNotLoggedIn, passport.authenticate('userLocal'), UserController.login);
router.get("/auth/logout", auth.userLoggedIn, UserController.logout);
router.post("/auth/register", auth.isAdmin, UserController.register)

module.exports = router;