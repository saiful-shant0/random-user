const { check, validationResult } = require("express-validator");

const addUserValidator = [
  check("gender")
    .isIn([ "male", "female", "others"])
    .withMessage("Gender is required")
    .notEmpty()
    .toLowerCase()
    .trim(),
    

  check("name")
    .isLength({ min: 1 })
    .withMessage("name is required")
    .isAlpha()
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),

  check("contact")
    .isMobilePhone()
    .withMessage("Mobile number must be a valid "),

  check("address")
    .isLength({ min: 1 })
    .withMessage("address is required")
    .isString()
    .withMessage("Address Must be String")
    .trim(),

  check("photoUrl")
    .isLength({ min: 1 })
    .withMessage("photoUrl is required")
    .isString()
    .toLowerCase()
    .withMessage("photo Url Must be string")
    .trim(),
];

const addUserValidatorHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
 
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
   //next(mappedErrors)
    //response the error
    res.status(500).json({
      error: mappedErrors,
    });
  }
};

module.exports = {
  addUserValidator,
  addUserValidatorHandler,
};
