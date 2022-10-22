import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, FormControl, Snackbar, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth/useAuth";

const Login = () => {
  const location=useLocation();
  const from=location.state?.from || "/";
  const isMounted=useRef(false);
  const {auth,dispatch}=useAuth();
  const [controlsState, setControlsState] = useState({
    email: "",
    password: "",
    loading: false,
  });
  const [message, setMessage] = useState({});
  const [open, setOpen] = useState(false);
  const handleInputsChange = (e) => {
    setControlsState((prev) => ({
      ...prev,
      [e.target.type]: e.target.value,
    }));
  };
  const navigate = useNavigate();
  const canSave =
    Boolean(controlsState.email) && Boolean(controlsState.password);
  const handleButtonClick = async () => {
    try {
      setControlsState((prev) => ({ ...prev, loading: true }));
      const response = await axios.post("/sign-in", {
        email: controlsState.email,
        password: controlsState.password,
      });
      setMessage(response.data);
      dispatch({type:"auth",accessToken: response.data.accessToken});
      
      if (!message?.error) navigate(from);
    } catch (err) {
      setMessage(err.response.data);
      
    } finally {
      setControlsState((prev) => ({ ...prev, loading: false }));
      setOpen(true);
    }
  };
  
  useEffect(() => {
    if (!isMounted.current){
      document.title = "Login...";
      console.log(auth);
      return ()=>isMounted.current = true;
    }
  }, [auth]);
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
              value={controlsState.email}
              onChange={handleInputsChange}
              autoComplete="on"

              
            />
          </FormControl>
          <FormControl fullWidth size="small">
            <TextField
              label="Password"
              type="password"
              required
              variant="filled"
              onChange={handleInputsChange}
              value={controlsState.password}
              autoComplete="on"
            />
          </FormControl>
          <LoadingButton
            variant="contained"
            loading={controlsState.loading}
            sx={{
              mt: 5,
            }}
            onClick={handleButtonClick}
            disabled={!canSave}
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

export default Login;
