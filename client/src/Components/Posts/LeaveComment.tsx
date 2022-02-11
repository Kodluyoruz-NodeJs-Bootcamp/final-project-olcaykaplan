import { Grid, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { addNewCommentForMovie } from "../../actions/movie.action";
import { addNewCommentForActor } from "../../actions/actor.action";
import { useDispatch } from "react-redux";
import { user } from "../../utils/types";
interface Props {
  id: number;
  user: user;
  leaveCommentFor: string
}

const LeaveComment = ({ id, user, leaveCommentFor }: Props) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const sendComment = () => {
    if(leaveCommentFor === "movie")
    dispatch(addNewCommentForMovie(id, comment, user, true));
    else 
    dispatch(addNewCommentForActor(id, comment, user, true));
    
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
