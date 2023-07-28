import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { ControlledTextField } from "../../components/form/controlledTextField";
import { email, password } from "../../components/form/validations";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-folder"; 

type SignInFormFields = { email: string; password: string };
const signInFormDefaultValues: SignInFormFields = { email: "", password: "" };

export const SignIn = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { isDirty },
    // reset,
  } = useForm<SignInFormFields>({
    defaultValues: signInFormDefaultValues,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSignIn = async (form: SignInFormFields) => {
    try {
      const { email, password } = form;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // The sign-in was successful, you can now access the user information if needed
      const user = userCredential.user;
      console.log("Signed in user:", user);

      // Redirect to the profile page after successful sign-in
      navigate("/profile");
    } catch (error: any) {
      console.error("Error signing in:", error.message);
      // Handle the error, show a message, or take appropriate action.
    }
  };

  return (
    <Stack width="100%" maxWidth={400} spacing={2}>
      <Typography variant="h4" fontWeight={600} color="black" textAlign="left">
        Sign in
      </Typography>

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
      <Button
        variant="contained"
        fullWidth
        sx={{
          textTransform: "capitalize",
          color: "black",
          fontWeight: 700,
          fontSize: 18,
          bgcolor: "#ffd43b",
          boxShadow: "none",
          borderRadius: 2,
          "&:hover": {
            bgcolor: "#ffd43b",
            boxShadow: "none",
          },
        }}
        onClick={handleSubmit(handleSignIn)}
        disabled={!isDirty}
      >
        Sign in
      </Button>

      <Divider>
        <Typography variant="body2" sx={{ color: "#7c7c7c" }}>
          or
        </Typography>
      </Divider>

      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Button
          sx={{
            width: "45%",
            borderRadius: 2,
            py: 1,
            color: "rgb(33, 37, 41)",
            bgcolor: "rgb(235, 235, 235)",
            boxShadow: "none",
            textTransform: "capitalize",
            "&:hover": {
              bgcolor: "rgb(235, 235, 235)",
              boxShadow: "none",
            },
          }}
        >
          Google
        </Button>

        <Button
          sx={{
            width: "45%",
            borderRadius: 2,
            py: 1,
            color: "rgb(33, 37, 41)",
            bgcolor: "rgb(235, 235, 235)",
            boxShadow: "none",
            textTransform: "capitalize",
            "&:hover": {
              bgcolor: "rgb(235, 235, 235)",
              boxShadow: "none",
            },
          }}
        >
          Facebook
        </Button>
      </Box>

      <Typography variant="body2" textAlign="center" fontWeight={600}>
        Don&apos;t have an account?{" "}
        <Box
          display="inline"
          sx={{
            fontWeight: "600",
            ":hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => navigate("/sign-up")}
        >
          Sign up
        </Box>
      </Typography>
    </Stack>
  );
};
