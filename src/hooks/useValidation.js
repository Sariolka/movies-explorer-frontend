import { useState } from "react";

function useValidation() {
  const [formValues, setFormValues] = useState({});
  const [showErrors, setShowErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
    console.log(formValues);
    setShowErrors({ ...showErrors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form").checkValidity());
  }

  function resetForm() {
    setShowErrors({});
    setIsValid(false);
    setFormValues({});
  }

  return {
    formValues,
    handleChange,
    showErrors,
    isValid,
    resetForm,
    setFormValues,
    setIsValid,
  };
}

export default useValidation;
