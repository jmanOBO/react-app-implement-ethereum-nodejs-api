import { Outlet} from "react-router-dom";
import Header from "./Header";
import Sidepanel from "./Sidepanel";
import { Stack } from "@mui/material";

const Layout = ({isDrawerOpen,setIsDrawerOpen}) => {
  return (
    <>
      <Header setIsDrawerOpen={setIsDrawerOpen}/>
      <Sidepanel isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}/>
     <Stack>
     <Outlet/>
     </Stack>
     
    </>
  )
}

export default Layout