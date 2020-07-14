const MAX_FILE_SIZE = 5000000;

const router = require("express").Router();
const auth = require("../middleware/auth");
const multer  = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'm-tala/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
  })

const upload = multer({storage:storage, limits:{fileSize: MAX_FILE_SIZE}})
                .fields([
                    {name: 'photoId', maxCount: 1},
                    {name: 'signature', maxCount: 1}
                ]);

const MtalaActivityController = require("../controllers/mtala-activity");

router.get("/",auth.userLoggedIn, MtalaActivityController.getActivities);
router.get("/:id",auth.isAuthenticated, MtalaActivityController.getActivity);
router.post("/", auth.agentLoggedIn , upload, MtalaActivityController.createActivity);
router.put("/:id",auth.isAuthenticated, MtalaActivityController.updateActivity);
router.delete("/:id",auth.userLoggedIn, MtalaActivityController.deleteActivity);


module.exports = router;