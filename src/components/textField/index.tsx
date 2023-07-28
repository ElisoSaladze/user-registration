import { forwardRef } from "react";
import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material";
import { FormControl, FormControlProps } from "../form/formControl";

export type TextFieldProps = Omit<FormControlProps, "children"> &
  MuiTextFieldProps & {
    disableAutofill?: boolean;
  };

export const TextField = forwardRef<HTMLDivElement, TextFieldProps>(
  (
    {
      htmlFor,
      label,
      error,
      helperText,
      required,
      disableAutofill,
      ...textFieldProps
    },
    ref
  ) => {
    return (
      <FormControl
        htmlFor={htmlFor}
        label={label}
        error={error}
        helperText={helperText}
        required={required}
        disabled={textFieldProps.disabled}
      >
        <MuiTextField
          ref={ref}
          {...textFieldProps}
          error={error}
          type={textFieldProps.type}
          inputProps={{ maxLength: 150 }}
          {...(disableAutofill
            ? {
                inputProps: textFieldProps.inputProps,
              }
            : undefined)}
        />
      </FormControl>
    );
  }
);
