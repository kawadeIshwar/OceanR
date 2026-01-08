import Joi from 'joi';

export const validateProduct = (req, res, next) => {
  // Handle FormData requests (with file uploads)
  let dataToValidate;
  if (req.body.data) {
    try {
      dataToValidate = JSON.parse(req.body.data);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid JSON in product data' });
    }
  } else {
    dataToValidate = req.body;
  }

  const schema = Joi.object({
    name: Joi.string().required(),
    SKU: Joi.string().allow('', null),
    description: Joi.string().required(),
    category: Joi.string().required(),
    images: Joi.array().items(Joi.string()),
    datasheet: Joi.string().allow('', null),
    specs: Joi.object().pattern(Joi.string(), Joi.string()),
    featured: Joi.boolean(),
  });

  const { error } = schema.validate(dataToValidate);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const validateCategory = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow('', null),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const validateQuoteRequest = (req, res, next) => {
  const schema = Joi.object({
    productId: Joi.string().allow('', null),
    name: Joi.string().required(),
    company: Joi.string().allow('', null),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    message: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
