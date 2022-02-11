import {
  Avatar,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { comment } from "../../utils/types";
import { removeCommentForMovie } from "../../actions/movie.action";
import { removeCommentForActor } from "../../actions/actor.action";

type Props = {
  list: Array<comment>;
  postId: number;
  commentsFor: string;
};
const Comments = ({ list, postId, commentsFor }: Props) => {
  // user can see the max first 2 comments default
  const [limit, setLimit] = useState(2);
  
  const dispatch = useDispatch();
  const { id } = useSelector((state: RootState) => state.auth).user;
  const allComments = (isAll: boolean) => {
    let limit = isAll ? list.length : 2;
    setLimit(limit);
  };
  const removeCommentHandler = (commentId: number) => {
    if(commentsFor === "movie")
    dispatch(removeCommentForMovie(commentId, postId, "movie"));
    else
    dispatch(removeCommentForActor(commentId, postId, "actor"));
  };

  return (
    <>
      {list.slice(0, limit).map((comment: comment) => (
        <>
          <Grid container spacing={2}>
            <Grid item>
              <Avatar
                alt={comment.user.name + " " + comment.user.surname}
                src={
                  comment.user.picture
                    ? comment.user.picture
                    : "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                }
              />
            </Grid>
                
            <Grid justifyContent="left" item xs zeroMinWidth>
              <h4 style={{ margin: 0, textAlign: "left" }}>
                {comment.user.name + " " + comment.user.surname}
              </h4>
                <p style={{ textAlign: "left" }}>{comment.comment}</p>
            </Grid>

            {/* remove option exist if it is user own comment (DO IT!! if post is user own post can remove all comments!!) */}
            {id === comment.user.id ? (
              <IconButton
                onClick={() => removeCommentHandler(comment.id)}
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                  "&:onclick": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                <ClearIcon />
              </IconButton>
            ) : null}

           
          </Grid>
          <hr />
        </>
      ))}

      {/*Show All comments or just first two */}
      {list.length > 2 ? (
        limit === 2 ? (
          <Typography
            variant="subtitle2"
            sx={{ float: "right", color: "#1976d2", cursor: "pointer" }}
            onClick={() => allComments(true)}
          >
            <strong>...All comments</strong>
          </Typography>
        ) : (
          <Typography
            variant="subtitle2"
            sx={{ float: "right", color: "#1976d2", cursor: "pointer" }}
            onClick={() => allComments(false)}
          >
            <strong>Hide comments</strong>
          </Typography>
        )
      ) : null}
    </>
  );
};

export default Comments;
