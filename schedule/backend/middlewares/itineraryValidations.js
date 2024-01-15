const { body } = require("express-validator");

const itineraryInsertValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("O Endereço é obrigatório")
      .isString()
      .withMessage("O endereço é obrigatório")
      .isLength({ min: 3 })
      .withMessage("O endereço precisa ter no mínimo 3 caracteres."),
    body("description")
      .not()
      .equals("undefined")
      .withMessage("A descrição é obrigatório")
      .isString()
      .withMessage("A descrição é obrigatório")
      .isLength({ min: 3 })
      .withMessage("A descrição precisa ter no mínimo 3 caracteres."),
  ];
};

const itineraryUpdateValidation = () => {
  return [
    body("title")
      .optional()
      .isString()
      .withMessage("O endereço é obrigatório")
      .isLength({ min: 3 })
      .withMessage("O endereço precisa ter no mínimo 3 caracteres."),
    body("description")
      .optional()
      .isString()
      .withMessage("A descrição é obrigatório")
      .isLength({ min: 3 })
      .withMessage("A descrição precisa ter no mínimo 3 caracteres."),
  ];
};

const commentValidation = () => {
    return [body("comment").isString().withMessage("O comentário é obrigatório")];
  };

module.exports = {
    itineraryInsertValidation,
    itineraryUpdateValidation,
    commentValidation
};
