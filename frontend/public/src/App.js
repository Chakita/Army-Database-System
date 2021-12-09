import './App.css';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

function App() {
  const [soldiers, setSoldiers] = useState([])
  useEffect(() => {
    getSoldiers();
  }, []);

  console.log(typeof(soldiers))
  soldiers.map((dummy) => {console.log(dummy)})

  function getSoldiers() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.json();
      })
      .then(data => {
        setSoldiers(data);
      });
  }

  function createSoldier() {
    let msn = prompt('Enter soldier msn');
    let name = prompt('Enter soldier name');
    let dob = prompt('Enter soldier dob');
    let height = prompt('Enter soldier height');
    let weight = prompt('Enter soldier weight');
    let gender = prompt('Enter soldier gender');
    let rank = prompt('Enter soldier rank');
    let speciality = prompt('Enter soldier speciality')

    //const body = {msn, name, dob, height,weight,gender,rank,speciality};

    fetch('http://localhost:3001/soldiers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({msn, name, dob, height,weight,gender,rank,speciality}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getSoldiers();
      });
  }


  function deleteSoldier() {
    let msn = prompt('Enter soldier msn');

    fetch(`http://localhost:3001/soldiers/${msn}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getSoldiers();
      });
  }

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));


  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Welcome to THE INDIAN ARMY DATABASE
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
      <table className="center">
      <thead>
      <tr>
        <th>MSN</th>
        <th>Name</th>
        <th>Date Of Birth</th>
        <th>Height</th>
        <th>Weight</th>
        <th>Gender</th>
        <th>Rank</th>
        <th>Speciality</th>
      </tr>
      </thead>
      <tbody>
      {soldiers.length && soldiers.slice().map((dummy) => {
        return (<tr>
                <th>{dummy["msn"]}</th>
                <th>{dummy["name"]}</th>
                <th>{dummy["dob"]}</th>
                <th>{dummy["height"]}</th>
                <th>{dummy["weight"]}</th>
                <th>{dummy["gender"]}</th>
                <th>{dummy["rank"]}</th>
                <th>{dummy["speciality"]}</th>
                </tr>)})}
                </tbody>
        </table>

      <br />
      <Container>
      <Button className='button1' onClick={createSoldier} variant="contained" size="large">Add Soldier to Database</Button>
      <br />
      <br />
      <Button className='button2' onClick={deleteSoldier} variant="contained" size="large">Delete Soldier from Database</Button>
      </Container>
    </div>
  );
}

export default App;
