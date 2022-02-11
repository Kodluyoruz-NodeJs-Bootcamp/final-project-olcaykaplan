
import { useDispatch } from "react-redux";
import {
  Box,
  Grid,
  FormControl,
  TextField,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Button,
} from "@mui/material";
import moment from "moment";
import {addNewMovie} from "../../actions/movie.action";
import { useHistory } from "react-router";
const MovieForm = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const movieData = {
      name: data.get("name"),
      content: data.get("content"),
      releasedYear: data.get("releasedYear"),
      originalLanguage: data.get("originalLanguage"),
    };
    dispatch((addNewMovie(movieData)))
    history.push({
      pathname:"/user/own-posts"
    })
  };
  return (
    <Grid item>
      <Box onSubmit={handleSubmit} component="form" textAlign="center">
        <Grid container spacing={2} mt={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <TextField
              name="name"
              required
              fullWidth
              id="name"
              label="Movie Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="content"
              label="Movie Content"
              name="content"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="releasedYear"
              label="Released Year"
              name="releasedYear"
              type="number"
              defaultValue={moment().year()}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="originalLanguage"
              label="Original Language"
              name="originalLanguage"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              <strong>Save</strong>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default MovieForm;
