import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../../../components/copyright';
import UsersController from '../../../controller/userController';


const theme = createTheme();

class Login extends React.Component{

  constructor(props){
    super(props);
    this.refForm= React.createRef();
    const data= UsersController.getSession(); 
    this.state={
      session:{
        ...data
      }
    }
    console.log(data)
    this.alertControll = props.alertControll;
  }

    handleSubmit = (event) => {
      event.preventDefault();


      let userData = {
        email: this.refForm.current.email.value,
        password: this.refForm.current.password.value,
      }
      console.log( userData)

      try{
        UsersController.loginCheck(userData);
        alert("Logado com sucesso")
        this.setState({
          redirect:"/lead"
        })
  
     }catch(e){
         alert(e);
         return;
     } 
     window.location.href = "/"
      return;


    };
    render() {
    if (this.state.session.id !==-1){
      window.location.href = "/"
      return <></>
    }
    
    return (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Entrar
            </Typography>
            <Box ref={this.refForm} component="form" onSubmit={this.handleSubmit}  sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                />
                <FormControlLabel
                control={<Checkbox name="remember" color="primary" />}
                label="Lembrar"
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Entrar
                </Button>
                <Grid container>
                <Grid item xs>
                    <Link href="#" variant="body2">
                    Esqueceu sua senha?
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="/register" variant="body2">
                    {"Criar nova conta"}
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
        </ThemeProvider>
    );
 }
}

export default Login;
