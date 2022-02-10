import {
  Avatar,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { comment } from "../../utils/types";
import { removeComment } from "../../actions/movie.action";

type Props = {
  commentList: Array<comment>;
  movieId: number;
};
const Comments = ({ commentList, movieId }: Props) => {
  // user can see the max first 2 comments default
  const [limit, setLimit] = useState(2);
  
  const dispatch = useDispatch();
  const { id } = useSelector((state: RootState) => state.auth).user;
  const allComments = (isAll: boolean) => {
    let limit = isAll ? commentList.length : 2;
    setLimit(limit);
  };
  const removeCommentHandler = (commentId: number) => {
    dispatch(removeComment(commentId, movieId));
  };
 
  return (
    <>
      {commentList.slice(0, limit).map((comment: comment) => (
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
      {commentList.length > 2 ? (
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
