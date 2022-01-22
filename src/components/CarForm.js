import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { FormHelperText } from '@mui/material';


export default function CarForm({cars, onSubmit}) {
  const [carID, setCarID] = React.useState("");
  const [duration, setDuration] = React.useState(new Date(2013, 2, 1, 0, 0,30));
  const [availCars, setAvailCars] = React.useState([]);
  const [errMsg, setErrMsg] = React.useState("");

  const handleChange = (event) => {
    setCarID(event.target.value);
    if (carID && carID.length > 0) {
      setErrMsg("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!carID || carID.length===0) {
      setErrMsg("You must choose a car!");
      return;
    }
    let minute = duration.getMinutes();
    let second = duration.getSeconds();
    let req_time = 60*minute+second;
    await onSubmit(carID, req_time);
    return;

  }

  React.useEffect(()=> {
    setAvailCars(cars.filter((e)=>e.status==='a'));
  },[cars]);

  if (availCars.length <= 0 ) {
    return( 
      <React.Fragment>
        <Title>No Available Cars Here</Title>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          All cars are reserved right now. It may take a few minutes to wait.
        </Typography>
      </React.Fragment>);
  }

  return (
    <React.Fragment>
      <Title>Reserve Now</Title>
    <Box component="form" onSubmit={handleSubmit} noValidate 
      sx={{
        mt:1,
        // marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      
      
      <FormControl sx={{ mt:2, mb: 2, minWidth: 240 }}>
        <InputLabel id="demo-simple-select-helper-label">Your car</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={carID}
          defaultValue={""}
          label="car"
          onChange={handleChange}
          error={errMsg? true: false}
        >
          {availCars.map((car) => 
              <MenuItem 
                key={car.carID}
                value={car.carID}>{car.carType+car.carID}</MenuItem>
          )}

        </Select>
        <FormHelperText error id="component-error-text">{errMsg}</FormHelperText>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <TimePicker
          // ampmInClock
          views={['minutes', 'seconds']}
          inputFormat="mm:ss"
          mask="__:__"
          label="Duration"
          value={duration}
          onChange={(newValue) => {
            setDuration(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      reserve
    </Button>
    </Box>
    </React.Fragment>
  );
}
