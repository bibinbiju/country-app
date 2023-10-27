import { useCallback, useMemo, useState } from "react";
/**
 *
 * @param {"fieldKey":{value:'',validationRules:[],name:"fieldKey"}} dataModel
 * @returns
 */
const useForm = (dataModel = {}) => {
  const [form, setForm] = useState(dataModel);
  const validateInputField = useCallback((inputField) => {
    const newInputField = { ...inputField };
    newInputField.valid = true;
    newInputField.errorMessage = "";
    if (newInputField?.disabled) {
      return newInputField;
    }
    if (Array.isArray(newInputField.validationRules)) {
      for (const rule of newInputField.validationRules) {
        if (!rule.validate(newInputField)) {
          newInputField.errorMessage = rule.message;
          newInputField.valid = false;
          break;
        }
      }
    }
    return newInputField;
  }, []);
  const updateForm = useCallback(
    (updateData, shouldValidate = true) => {
      setForm((prev) => {
        const newForm = { ...prev, ...updateData };
        if (shouldValidate) {
          for (const eachInputFeildKey in newForm) {
            newForm[eachInputFeildKey] = validateInputField(
              newForm[eachInputFeildKey]
            );
          }
        }
        return newForm;
      });
    },
    [validateInputField]
  );
  const isFormValid = useMemo(() => {
    for (const eachInputFeildKey in form) {
      if (!validateInputField(form[eachInputFeildKey])?.valid) {
        return false;
      }
    }
    return true;
  }, [form, validateInputField]);
  const onInputChange = useCallback(
    (e) => {
      const target = e.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;
      const inputField = { ...form[name], value };
      updateForm({ [name]: inputField });
    },
    [form, updateForm]
  );

  return { form, setForm, updateForm, onInputChange, isFormValid };
};
export default useForm;
