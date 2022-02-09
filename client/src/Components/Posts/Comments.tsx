import { Avatar, Button, Grid } from "@mui/material";
import { useState } from "react";
import { comment } from "../../reducers/movie.reducer";

type Props = {
  commentList: Array<comment>;
};
const Comments = ({ commentList }:Props) => {
  // user can see the max first 2 comments default
  const [limit, setLimit] = useState(2);
  
  const allComments = (isAll:string ) => {
      let limit = isAll ? commentList.length : 2;
      setLimit(limit);
  }
  return (
    <>
      {commentList.slice(0,limit).map((comment:comment) => (
        <>
          <Grid container spacing={2} sx={{ backgroundColor: "white" }}>
            <Grid item>
              <Avatar
                alt={comment.user.name + " " + comment.user.surname}
                src={ comment.user.picture ? comment.user.picture :
                  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                }
              />
            </Grid>

            <Grid justifyContent="left" item xs zeroMinWidth>
              <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
              <p style={{ textAlign: "left" }}>
                {comment.comment}
              </p>
              {/* <p style={{ textAlign: "left", color: "gray" }}>
                posted 1 minute ago
              </p> */}
            </Grid>
          </Grid>
          <hr />
        </>
      ))}
    </>
  );
};

export default Comments;
