import { Grid, Box, TextField, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { updateMovie } from "../actions/movie.action";

const UpdateMovie = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  var state: any = history?.location?.state;
  console.log("state", state);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const movieData = {
      name: data.get("name"),
      content: data.get("content"),
      releasedYear: data.get("releasedYear"),
      originalLanguage: data.get("originalLanguage"),
    };

    dispatch(updateMovie(movieData, state.id, "movie"));
    history.goBack();
  };
  return (
    <Grid container justifyContent="center">
      <Grid item xs={11} md={8} xl={8} mt={3}>
        <Grid item>
          <Typography variant="h3" textAlign="center" mt={2} mb={2}>
            Update Movie
          </Typography>
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
                  defaultValue={state.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="content"
                  label="Movie Content"
                  name="content"
                  defaultValue={state.content}
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
                  defaultValue={state.releasedYear}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="originalLanguage"
                  label="Original Language"
                  name="originalLanguage"
                  defaultValue={state.originalLanguage}
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
      </Grid>
    </Grid>
  );
};

export default UpdateMovie;
