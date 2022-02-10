import { Grid, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { addNewCommentForMovie } from "../../actions/movie.action";
import { useDispatch } from "react-redux";
import { user } from "../../utils/types";
interface Props {
  movieId: number;
  user: user
}

const LeaveComment = ({ movieId, user }: Props) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const sendComment = () => {
    console.log("comment", comment);
    dispatch(addNewCommentForMovie(movieId, comment, user, true));
    setComment("");

  };
  return (
    <Grid container>
      <Grid item xs={11} md={11}>
        <TextField
          required
          id="comment"
          fullWidth
          name="comment"
          variant="standard"
          type="text"
          placeholder="Leave a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Grid>
      <Grid item xs={1} md={1}>
        <IconButton aria-label="add to favorites" onClick={sendComment}>
          <SendIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default LeaveComment;
