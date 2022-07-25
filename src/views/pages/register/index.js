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
import {ErrorAlert, SuccessAlert} from '../../../components/alerts';
import UsersController from '../../../controller/userController';


const theme = createTheme();


class Register extends React.Component{

    constructor(props){
        super(props);
        this.refForm= React.createRef();
        const data= UsersController.getSession(); 
        this.state={
            session:{
                ...data
            }
        }
        console.log(props)
        this.alertControll = props.alertControll;
    }
  

    handleSubmit = (event) => {
        event.preventDefault();
        /*
        const data = new FormData(event.currentTarget);
        console.log({
            firsName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
            isteacher:data.get('isTeacher')
        });
        */

        let userData = {
            firstName: this.refForm.current.firstName.value,
            lastName: this.refForm.current.lastName.value,
            email: this.refForm.current.email.value,
            password: this.refForm.current.password.value,
            confirmPassword: this.refForm.current.confirmPassword.value,
            isteacher:this.refForm.current.isTeacher.checked
        }

        console.log(userData);
        try{
            UsersController.registerCheck(userData)

            this.alertControll.changeAlert(<SuccessAlert closeAlert= {this.alertControll.closeAlert} message="usuário criado com sucesso" ></SuccessAlert>)

        }catch(e){
            console.log(e)
            this.alertControll.changeAlert(<ErrorAlert closeAlert= {this.alertControll.closeAlert} message= {e}></ErrorAlert>)
            return
        }

        window.location.href = "/login"
        

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
                    Cadastro
                  </Typography>
                  <Box component="form" ref={this.refForm}  onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete="given-name"
                          name="firstName"
                          required
                          fullWidth
                          id="firstName"
                          label="Nome"
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="lastName"
                          label="Sobrenome"
                          name="lastName"
                          autoComplete="family-name"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          type="email"
                          label="Email"
                          name="email"
                          autoComplete="email"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="password"
                          label="Senha"
                          type="password"
                          id="password"
                          autoComplete="new-password"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="confirmPassword"
                          label="Confirme sua Senha"
                          type="password"
                          id="confirmPassword"
                          autoComplete="new-password"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={<Checkbox name='isTeacher'  color="primary" />}
                          label="É um Professor?"
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Link href="/login" variant="body2">
                          Ja tem uma conta? faça login
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
              </Container>
            </ThemeProvider>
          );
    }
}

export default Register;
