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
import {addNewActor} from "../../actions/actor.action";
import { useHistory } from "react-router";
const ActorForm = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const actorData = {
      name: data.get("name"),
      surname: data.get("surname"),
      dateOfBirth: data.get("dateOfBirth"),
      gender: data.get("gender"),
    };
    dispatch((addNewActor(actorData)))
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
              label="Actor First Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="surname"
              label="Actor Last Name"
              name="surname"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="dateOfBirth"
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              defaultValue={moment().format("YYYY-MM-DD")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="gender"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio required={true} />}
                  label="Female"                  
                />
                <FormControlLabel
                  value="male"
                  control={<Radio required={true}/>}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio required={true}/>}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
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

export default ActorForm;
