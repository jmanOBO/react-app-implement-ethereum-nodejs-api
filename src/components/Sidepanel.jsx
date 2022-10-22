import { Home, Logout, Person, RequestQuote, Send } from "@mui/icons-material";
import {Drawer,List,ListItem, ListItemButton, ListItemIcon, ListItemText,Toolbar} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout/useLogout";

const Sidepanel = ({isDrawerOpen,setIsDrawerOpen}) => {
  const navigate=useNavigate();
  const logOut=useLogout();
  return (

    
    <Drawer
    anchor="left" open={isDrawerOpen} onClose={()=>setIsDrawerOpen(false)} >


      <Toolbar>
      <List >
        <ListItem>
          <ListItemButton onClick={()=>navigate("/")}>
            <ListItemIcon>
              <Home/>
            </ListItemIcon>
            <ListItemText primary="Home"/>

          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton onClick={()=>navigate("/request")}>
            <ListItemIcon>
              <RequestQuote/>
            </ListItemIcon>
            <ListItemText primary="Request"/>

          </ListItemButton>
        </ListItem>


        <ListItem>
          <ListItemButton onClick={()=>navigate("/send")}>
            <ListItemIcon>
              <Send/>
            </ListItemIcon>
            <ListItemText primary="Send"/>

          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton onClick={()=>navigate("/profile")}>
            <ListItemIcon>
              <Person/>
            </ListItemIcon>
            <ListItemText primary="Profile"/>

          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton onClick={()=>logOut()}>
            <ListItemIcon>
              <Logout/>
            </ListItemIcon>
            <ListItemText primary="Log Out"/>

          </ListItemButton>
        </ListItem>
      </List>

      </Toolbar>
    </Drawer>
    
  )
}

export default Sidepanel