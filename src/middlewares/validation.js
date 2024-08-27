import { body, validationResult } from "express-validator";

const validateRequest = async (req, res, next) => {
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("price").isFloat({ gt: 0 }).withMessage("Price should be positive"),
    body("imageUrl").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image is required");
      }
      return true
    }),
  ];
  await Promise.all(rules.map((rule) => rule.run(req)));

  // console.log(await validateRequest(req))
  var validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.render("new-product", {
      errorMessage: validationErrors.array(),
    });
  }
  next();
};

export default validateRequest;
