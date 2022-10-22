import { useNavigate } from "react-router-dom";
import { Box, FormControl, TextField, Snackbar } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState, useEffect, useRef } from "react";
import axios from "../api/axios";

const Register = () => {
  const isMounted=useRef(false);
  const [message, setMessage] = useState({});
  const [open, setOpen] = useState(false);
  const [controlsState, setControlsState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    loading: false,
  });
  const navigate = useNavigate();
  const canSave =
    Boolean(controlsState.email) &&
    Boolean(controlsState.password) &&
    Boolean(controlsState.confirmPassword);

  const handleInputsChange = (e) => {
    setControlsState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleButtonClick = async () => {
    try {
      if (controlsState.password !== controlsState.confirmPassword)
        return setMessage({ message: "Password missmatched...", error: true });
        setControlsState((prev) => ({ ...prev, loading: true }));
        const response = await axios.post("/users", {
        email: controlsState.email,
        password: controlsState.password,
      });
      setMessage(response.data);
      if (!message?.error) navigate("/login");
    } catch (err) {
      setMessage(err.response.data);
    } finally {
      setControlsState((prev) => ({ ...prev, loading: false }));
      setOpen(true);
    }
  };
  
  useEffect(() => {
    
    if(!isMounted.current){
      document.title="Register...";

      
      return ()=>isMounted.current = true;
    } 
    
 }, []);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        pt: 10,
        height: "100vh",
      }}
    >
      <Box>
        {JSON.stringify(message)}
        <form
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FormControl
            fullWidth
            size="small"
            sx={{
              my: 2,
            }}
          >
            <TextField
              label="Email"
              type="email"
              required
              variant="filled"
              name="email"
              onChange={handleInputsChange}
              value={controlsState.email}
            />
          </FormControl>
          <FormControl
            fullWidth
            size="small"
            sx={{
              mb: 2,
            }}
          >
            <TextField
              label="Password"
              type="password"
              required
              variant="filled"
              name="password"
              onChange={handleInputsChange}
              value={controlsState.password}
            />
          </FormControl>
          <FormControl fullWidth size="small">
            <TextField
              label="Confirm Password"
              type="password"
              required
              variant="filled"
              name="confirmPassword"
              onChange={handleInputsChange}
              value={controlsState.confirmPassword}
            />
          </FormControl>
          <LoadingButton
            disabled={!canSave}
            loading={controlsState.loading}
            variant="contained"
            sx={{
              mt: 5,
            }}
            onClick={handleButtonClick}
          >
            Submit
          </LoadingButton>
        </form>
        <Snackbar
          message={message.message}
          autoHideDuration={4000}
          open={open}
          onClose={() => setOpen(false)}
        />
      </Box>
    </Box>
  );
};

export default Register;
