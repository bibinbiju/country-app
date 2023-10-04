const createValidationRule = (
  ruleName,
  errorMessage,
  validateFunc = (field, from) => true
) => {
  return {
    name: ruleName,
    message: errorMessage,
    validate: validateFunc,
  };
};
export const requiredRule = (fieldName = "This field") =>
  createValidationRule(
    "required",
    `${fieldName} required`,
    (field) => !!("value" in field && field.value.trim()?.length > 0)
  );
export const validateEmail = (fieldName) => {
  return createValidationRule(
    "validateEmail",
    `${fieldName} is not a valid email address`,
    (field) =>
      !!String(field?.value)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
  );
};
