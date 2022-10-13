import { Box, CircularProgress } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

export function CircularProgressWithIcon(props) {
    return (
      <Box sx={{ position: "absolute", display: "inline-flex", right:1, }}>
        <CircularProgress sx={{ color: "rgb(230,201,100)" }}  variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <EmojiEventsIcon sx={{ color: "rgb(240,201,100)" }} fontSize="large" ></EmojiEventsIcon>
          {/* <Typography variant="caption" component="div" color="text.secondary">
            {`${Math.round(props.value)}%`}
          </Typography> */}
        </Box>
      </Box>
    );
  }