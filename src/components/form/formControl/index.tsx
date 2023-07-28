import { forwardRef } from "react";
import {
  FormHelperText,
  InputLabel,
  FormControl as MuiFormControl,
  Typography,
} from "@mui/material";

export type FormControlProps = {
  children: React.ReactNode;
  htmlFor?: string;
  label?: string;
  helperText?: React.ReactNode;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
};

export const FormControl = forwardRef<HTMLDivElement, FormControlProps>(
  (props: FormControlProps, ref) => {
    return (
      <MuiFormControl>
        {props.label && (
          <InputLabel
            error={props.error}
            disableAnimation
            shrink
            htmlFor={props.htmlFor}
            required={props.required}
            sx={{
              transform: "none",
              color: props.disabled ? "text.disabled" : "text.primary",
              ml: 2,
              mb: 0.5,
              position: "static",
              fontSize: "14px",
              lineHeight: "17px",
              fontWeight: 400,
              zIndex: 0,
            }}
          >
            {props.label}
          </InputLabel>
        )}
        {props.children}
        {props.helperText && (
          <FormHelperText
            error={props.error}
            sx={{
              mt: 0.5,
              ml: 2,
              fontSize: "13px",
              color: (theme) => theme.palette.error.main,
            }}
          >
            <Typography fontSize={14} fontWeight={400}>
              {props.helperText}
            </Typography>
          </FormHelperText>
        )}
      </MuiFormControl>
    );
  }
);
