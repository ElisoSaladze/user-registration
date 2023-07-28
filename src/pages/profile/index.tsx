import { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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

  return (
    <Box>
      {user ? (
        <div>
          <Typography variant="h4">Profile Information</Typography>
          <Typography variant="body1">Email: {user.email}</Typography>
        </div>
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
    </Box>
  );
};

export default Profile
