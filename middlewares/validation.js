import { celebrate, Joi, Segments } from "celebrate";

export const validateItemCreation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    weather: Joi.string().valid("hot", "warm", "cold").required(),
    imageUrl: Joi.string().uri().required(),
  }),
});

export const validateItemId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required(),
  }),
});

export const validateUserUpdate = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    avatar: Joi.string().uri().required(),
  }),
});
