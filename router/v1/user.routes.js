const express = require("express");
const usersController=require("../../controller/user.controller");
const limiter = require("../../middleware/limiter");
const { addUserValidator, addUserValidatorHandler } = require("../../models/users");

const router=express.Router();

router.route("/save").post(addUserValidator,addUserValidatorHandler, usersController.addAUser)
router.route("/all").get(limiter,usersController.getAllUsers)
router.route("/random").get(usersController.getRandomUsers)
router.route("/update/:id").patch(usersController.updateUser)
router.route("/bulk-update").patch(usersController.updateManyUser)
router.route("/delete/:id").delete(usersController.deleteAUser)


module.exports = router;