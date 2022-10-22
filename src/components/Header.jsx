import { Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material'
import { Menu } from '@mui/icons-material';
import useData from '../hooks/useData/useData';

const Header = ({setIsDrawerOpen}) => {

  const {state}=useData();
  return (
    <Box>
        <AppBar position='static' size="small" >
           <Toolbar sx={{
             justifyContent: 'space-between'
           }}>
            
             <IconButton size="small" color="inherit" onClick={()=>setIsDrawerOpen(true)}>
               <Menu/>
             </IconButton>
             
             <Typography variant='h6'
              sx={{
                fontSize:{
                  xs: 12,
                  md: 20
                },
                fontWeight:{
                  xs: 400,
                  md: 500
                }
              }}
             >
               ({state.data?.wallet?.eth_address})
             </Typography>
           </Toolbar>
        </AppBar>
    </Box>
  )
}

export default Header