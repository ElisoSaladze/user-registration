import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { ControlledTextField } from "../../components/form/controlledTextField";
import { email, name, password } from "../../components/form/validations";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-folder";

type SignUpFormFields = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const signUpFormDefaultValues: SignUpFormFields = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  repeatPassword: "",
};

export const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { isDirty },
    getValues,
  } = useForm<SignUpFormFields>({
    defaultValues: signUpFormDefaultValues,
  });
  const validatePasswordMatch = (repeatPassword: string) => {
    const { password } = getValues();
    return password === repeatPassword || "Passwords do not match";
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSignUp = async (form: SignUpFormFields) => {
    try {
      const { email, password } = form;
      console.log(auth);
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/profile");
    } catch (error: any) {
      console.error("Error creating user:", error.message);
    }
  };

  return (
    <Stack
      spacing={2}
      p={4}
      width={"75%"}
      maxWidth={"600px"}
      minWidth={"200px"}
    >
      <Typography
        variant="h4"
        sx={{
          color: "#212529",
          fontWeight: "600",
          width: "100%",
        }}
      >
        Sign Up
      </Typography>
      <Stack
        spacing={2}
        component={"form"}
        action="/home"
        sx={{
          width: "100%",
        }}
      >
        <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
          <ControlledTextField
            name="firstName"
            control={control}
            placeholder="First Name"
            rules={name}
            required
          />
          <ControlledTextField
            name="lastName"
            control={control}
            placeholder="First Name"
            rules={name}
            required
          />
        </Box>
        <ControlledTextField
          name="email"
          control={control}
          placeholder="Enter email"
          rules={email}
          required
        />
        <ControlledTextField
          name="password"
          control={control}
          placeholder="Enter password"
          type={showPassword ? "text" : "password"}
          rules={password}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <ControlledTextField
          name="repeatPassword"
          control={control}
          placeholder="Repeat Password"
          type="showPassword ? 'text' : 'password'"
          rules={{
            ...password,
            validate: (value: string) => validatePasswordMatch(value),
          }}
          required
        />
        <Button
          variant="contained"
          fullWidth
          type="submit"
          sx={{
            py: 1.5,
            textTransform: "capitalize",
            maxWidth: "600",
            color: "#212529",
            bgcolor: "#ffd43b",
            boxShadow: "none",
            borderRadius: "1",
            ":hover": {
              bgcolor: "#ffd43b",
              boxShadow: "none",
            },
          }}
          onClick={handleSubmit(handleSignUp)}
          disabled={!isDirty}
        >
          Register
        </Button>
      </Stack>

      <Typography variant={"body2"} fontWeight={500} textAlign={"center"}>
        Already have an account?{" "}
        <Box
          display="inline"
          sx={{
            fontWeight: "600",
            ":hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => navigate("/sign-in")}
        >
          Sign in
        </Box>
      </Typography>
    </Stack>
  );
};
