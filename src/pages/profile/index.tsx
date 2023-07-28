import { useEffect, useState } from "react";
import { Typography, Box, Button, Stack } from "@mui/material";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase-folder";
const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    console.log("currentUser:", currentUser);
    if (currentUser) {
      setUser(currentUser);
    } else {
      navigate("/sign-in");
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/sign-in");
    } catch (error: any) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <Box>
      {user ? (
        <Stack>
          <Typography variant="h4">Profile Information</Typography>
          <Typography variant="body1">Email: {user.email}</Typography>
        </Stack>
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default Profile
