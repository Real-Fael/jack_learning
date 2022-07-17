import { Link, Typography } from "@mui/material";

export default function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="/">
          Jack Learning
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }