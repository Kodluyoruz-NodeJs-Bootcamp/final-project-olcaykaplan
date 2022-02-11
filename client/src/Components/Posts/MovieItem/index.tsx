import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";

import imaged from "../../../assets/img/images.png";
import Comments from "../Comments";
import LeaveComment from "../LeaveComment";
import { useDispatch, useSelector } from "react-redux";
import {
  publishMovie,
  likeMovie,
  removeLikeMovie,
  deleteMovie,
} from "../../../actions/movie.action";
import { like, movie } from "../../../utils/types";
import { RootState } from "../../../reducers";
import { useHistory } from "react-router";

interface Props {
  movieList: Array<movie>;
}
const MovieItem = ({ movieList }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useSelector((state: RootState) => state.auth).user;
  const changePublishMovieHandler = (
    movieId: number,
    publishValue: boolean
  ) => {
    dispatch(publishMovie(movieId, publishValue));
  };
  const likeMovieHandler = (movieId: number) => {
    dispatch(likeMovie(movieId));
  };
  const removeLikeMovieHandler = (movieId: number, likes: Array<like>) => {
    const likeId: number = likes?.find((like) => like.user.id === id)?.id || 0;
    dispatch(removeLikeMovie(movieId, likeId));
  };
  const updateMovieHandler = (movie: movie) => {
    history.push({
      pathname: "/update-post",
      state: movie,
    });
  };
  const deleteMovieHandler = (movieId:number) => {
    let confirmAction = window.confirm("Are you sure to delete the movie?");
    if(confirmAction) {
        dispatch(deleteMovie(movieId))
    }
    
  }
  return (
    <>
      {movieList.map((movie) => (
        <Card
          key={movie.id}
          sx={{ width: "85%", padding: "10px 20px", marginBottom: "50px" }}
        >
           <IconButton
            aria-label="add to favorites"
            onClick={() => deleteMovieHandler(movie.id)}
            sx={{ float: "right" }}
          >
            <CancelIcon />
          </IconButton>
          <IconButton
            aria-label="add to favorites"
            onClick={() => updateMovieHandler(movie)}
            sx={{ float: "right" }}
          >
            <EditIcon sx={{ color: "#1976d2" }} />
          </IconButton>
         
          <CardMedia
            component="img"
            height="140"
            image={imaged}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {movie.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {movie.content}
            </Typography>
            <Box style={{ float: "left" }}>
              <Typography variant="subtitle1" color="text.secondary">
                <strong>Original Language :</strong> {movie.originalLanguage}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                <strong>Released Year :</strong> {movie.releasedYear}
              </Typography>
            </Box>
          </CardContent>
          <CardActions style={{ float: "right" }}>
            {movie.isPublished ? (
              <>
                <Button
                  size="small"
                  onClick={() => changePublishMovieHandler(movie.id, false)}
                >
                  <strong>Hide This Post</strong>
                </Button>
                {movie?.likes?.filter((m) => m.user.id === id).length > 0 ? (
                  <IconButton
                    aria-label="add to favorites"
                    onClick={() =>
                      removeLikeMovieHandler(movie.id, movie.likes)
                    }
                  >
                    <FavoriteIcon sx={{ color: "red" }} />
                  </IconButton>
                ) : (
                  <IconButton
                    aria-label="add to favorites"
                    onClick={() => likeMovieHandler(movie.id)}
                  >
                    <FavoriteIcon />
                  </IconButton>
                )}
                {movie.likes.length > 0 ? `(${movie.likes.length})` : null}
              </>
            ) : (
              <Button
                size="small"
                onClick={() => changePublishMovieHandler(movie.id, true)}
              >
                <strong>Share</strong>
              </Button>
            )}
          </CardActions>
          {movie.isPublished ? (
            <>
              <Box>
                <Comments movieId={movie.id} commentList={movie.comments} />
              </Box>
              <Box>
                <LeaveComment movieId={movie.id} user={movie.user} />
              </Box>
            </>
          ) : null}
        </Card>
      ))}
    </>
  );
};

export default MovieItem;
