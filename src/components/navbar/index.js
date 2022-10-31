import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Icon } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import UsersController from '../../controller/userController';
import { stringAvatar } from '../../controller/utilsController';


const pagesRedirect = {'Home':'/', 'Trilhas':'/Exercisetrail', 'Documentação':'/documentation'};
const teacherPagesRedirect = {'Home':'/', 'Trilhas':'/ExerciseTrail', 'exercicios':'/Exercise', 'Documentação':'/documentation'};
const settingsRedirect = {'Profile':'/Profile', 'Account':'/Account', 'Logout':'/Logout'};
const nonLogedRedirect = {'Acessar':'/login','Cadastrar':'/register'}
const pages = Object.keys(pagesRedirect)//['Products', 'Pricing', 'Blog'];
const teacherPages = Object.keys(teacherPagesRedirect)//['Products', 'Pricing', 'Blog'];
const settings = Object.keys(settingsRedirect);// ['Profile', 'Account', 'Dashboard', 'Logout'];
const nonLoged = Object.keys(nonLogedRedirect);




class Navbar extends React.Component{

// const Navbar = () => {
  constructor(props){
    super(props);
    const data= UsersController.getSession(); 
  
    this.state ={
      anchorElNav:null,
      anchorElUser:null,
      session:{
        ...data
      }
            // redirect:''
    }
  }

  
  handleOpenNavMenu = (event) => {
    this.setState({anchorElNav:event.currentTarget})
    // setAnchorElNav(event.currentTarget);
  };
  handleOpenUserMenu = (event) => {
    // alert();
    this.setState({anchorElUser:event.currentTarget})
    // setAnchorElUser(event.currentTarget);
  };

  redirect = (page)=>{
    if (page) window.location.href = page
  }

  handleCloseNavMenu = (event) => {

    this.setState({anchorElNav:null})
    // setRedirect(pagesRedirect[event.currentTarget.id]);

    this.redirect(event.currentTarget.getAttribute('href'))
    // setAnchorElNav(null);
    // console.log(event.currentTarget.id)
  };
  
  handleCloseUserMenu = (event) => {
    // console.log(event.currentTarget.getAttribute('href'))
    this.setState({anchorElUser:null})
    // setAnchorElUser(null);
    // setRedirect(settingsRedirect[event.currentTarget.id]);
    this.redirect(event.currentTarget.getAttribute('href'))
  };
  

  UserMenu = () =>{
    // console.log(this.state.session)
    if (this.state.session.id !==-1) return <>
    <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Abrir configurações da conta">
              <IconButton onClick={this.handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar {...stringAvatar(this.state.session.firstName +' '+ this.state.session.lastName)} src="/static/images/avatar/5.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={this.state.anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(this.state.anchorElUser)}
              onClose={this.handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem id={setting} key={setting} onClick={this.handleCloseUserMenu} href={settingsRedirect[setting]}>
                  <Typography   textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
    </>

    return <>
    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            {   
            nonLoged.map((page) => (
              <Button
                id={page}
                key={page}
                onClick={this.handleCloseNavMenu}
                href={nonLogedRedirect[page]}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))
            }
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' }}}>
            <Tooltip title="Abrir menu de acesso">
              <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={this.handleOpenUserMenu}
              color="inherit"
            >
              <LockOutlinedIcon />
            </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={this.state.anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(this.state.anchorElUser)}
              onClose={this.handleCloseUserMenu}
            >
              {nonLoged.map((page) => (
                <MenuItem id={page} key={page} onClick={this.handleCloseUserMenu} href={nonLogedRedirect[page]}>
                  <Typography   textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
    </>
  }
  
  render(){
    // if (this.state.redirect){
    //     let page = redirect
    //   //   return <Navigate to={page} replace />
    //   } 
    
      return (
          <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <img alt='head Jack' src={require("./..\\..\\data\\jackHead.png")} height={30} width={50}/> */}
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img alt='head Jack' src={require("./../../data/jackHeadRight.png")} height={30} width={50}/>
             Jack Learning
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={this.handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={this.state.anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(this.state.anchorElNav)}
              onClose={this.handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {(this.state.session.isteacher?teacherPages:pages).map((page) => (
                <MenuItem id={page} key={page} href={(this.state.session.isteacher?teacherPagesRedirect:pagesRedirect)[page]} onClick={this.handleCloseNavMenu} >
                  <Typography textAlign="center" >{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img alt='head Jack' src={require("./../../data/jackHeadRight.png")} height={30} width={50}/>
            Jack  Learning
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {   
            (this.state.session.isteacher?teacherPages:pages).map((page) => (
              <Button
                id={page}
                key={page}
                onClick={this.handleCloseNavMenu}
                href={(this.state.session.isteacher?teacherPagesRedirect:pagesRedirect)[page]}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))
            }
          </Box>
          {this.UserMenu()}




        </Toolbar>
      </Container>
    </AppBar>
  );
};
}  
export default Navbar;
