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
import imaged from "../../../assets/img/images.png";
import Comments from "../Comments";
import LeaveComment from "../LeaveComment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import {publishMovie} from "../../../actions/movie.action"

const MovieItem = () => {
  const { ownList } = useSelector((state: RootState) => state.movie);
  const dispatch = useDispatch()
  const changePublishMovieHandler = (movieId:number, publishValue:boolean) => {
    dispatch(publishMovie(movieId, publishValue))
  }
  return (
    <>
      {ownList.map((movie) => (
        <Card
          key={movie.id}
          sx={{ width: "85%", padding: "10px 20px", marginBottom: "50px" }}
        >
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
            {movie.isPublished  ? (
              <>
                <Button size="small" onClick={() => changePublishMovieHandler(movie.id, false)}>
                  <strong>Hide This Post</strong>
                </Button>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                {movie.likes.length > 0 ? `(${movie.likes.length})`: null}
              </>
            ) : (
              <Button size="small" onClick={() => changePublishMovieHandler(movie.id, true)}>
                <strong>Share</strong>
              </Button>
            )}
          </CardActions>
          {movie.isPublished ? (
            <>
              <Box>
                <Comments commentList={movie.comments} />
              </Box>
              <Box>
                <LeaveComment />
              </Box>
            </>
          ) : null}
        </Card>
      ))}
    </>
  );
};

export default MovieItem;
