import { Grid, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const LeaveComment = () => {
   
  return (
    <Grid container>
      <Grid item xs={11} md={11}>
        <TextField
          required
          id="comment"
          fullWidth
          name="releasedYear"
          variant="standard"
          type="text"
        />
      </Grid>
      <Grid item xs={1} md={1}>
        <IconButton aria-label="add to favorites">
          <SendIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default LeaveComment;
