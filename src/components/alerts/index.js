import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export function SuccessAlert(props) {
    
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert onClose={props.closeAlert} variant="filled" severity="success">{props.message|| "Sucesso" }</Alert>
    </Stack>
  );
}

export function ErrorAlert(props) {
    
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert onClose={props.closeAlert} variant="filled" severity="error">{props.message|| "Ops! Ocorreu um erro" }</Alert>
    </Stack>
  );
}

export function InfoAlert(props) {
    
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert onClose={props.closeAlert} variant="filled" severity="info">{props.message|| " " }</Alert>
    </Stack>
  );
}