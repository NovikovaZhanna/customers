import { HTMLInputTypeAttribute } from "react";

type TValidateError = {
  inputType: HTMLInputTypeAttribute;
  inputValue: string;
  isSubmitted: boolean;
};

export const validateError = ({
  inputType,
  inputValue,
  isSubmitted,
}: TValidateError): boolean => {
  if (!isSubmitted) {
    return false;
  }

  switch (inputType) {
    case "text": {
      return !/^[a-zA-Z ]+$/.test(inputValue);
    }
    case "number": {
      if (inputValue === "") {
        return true;
      }

      return !Number.isInteger(+inputValue);
    }
    case "email": {
      return !/\S+@\S+\.\S+/.test(inputValue);
    }
    default: {
      return false;
    }
  }
};
