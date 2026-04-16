const { body } = require("express-validator");

const agendaInsertValidation = () => {
  return [
    body("date")
      .not()
      .equals("undefined")
      .withMessage("A data é obrigatório")
      .isString()
      .withMessage("A data é obrigatório"),
    body("description")
      .not()
      .equals("undefined")
      .withMessage("A programação é obrigatório")
      .isString()
      .withMessage("A programação é obrigatório")
      .isLength({ min: 3 })
      .withMessage("A programação precisa ter no mínimo 3 caracteres."),
  ];
};

const agendaUpdateValidation = () => {
  return [
    body("date")
      .optional()
      .isString()
      .withMessage("A data é obrigatório"),
    body("description")
      .optional()
      .isString()
      .withMessage("A programação é obrigatório")
      .isLength({ min: 3 })
      .withMessage("A programação precisa ter no mínimo 3 caracteres."),
  ];
};

const commentValidation = () => {
    return [body("comment").isString().withMessage("O comentário é obrigatório")];
  };

module.exports = {
    agendaInsertValidation,
    agendaUpdateValidation,
    commentValidation
};