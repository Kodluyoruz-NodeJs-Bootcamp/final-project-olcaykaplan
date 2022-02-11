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
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import moment from "moment";
import { updateActor } from "../actions/actor.action";

const UpdateActor = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  var state: any = history?.location?.state;
  console.log("state", state);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const actorData = {
      name: data.get("name"),
      surname: data.get("surname"),
      dateOfBirth: data.get("dateOfBirth"),
      gender: data.get("gender"),
    };

    dispatch(updateActor(actorData, state.id, "actor"));
    history.goBack();
  };
  return (
    <Grid container justifyContent="center">
      <Grid item xs={11} md={8} xl={8} mt={3}>
        <Grid item>
          <Typography variant="h3" textAlign="center" mt={2} mb={2}>
            Update Actor
          </Typography>
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
                  defaultValue={state.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="surname"
                  label="Actor Last Name"
                  name="surname"
                  defaultValue={state.surname}
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
                  defaultValue={state.dateOfBirth}
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
                    defaultValue={state.gender}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio required={true} />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio required={true} />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio required={true} />}
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
      </Grid>
    </Grid>
  );
};

export default UpdateActor;
