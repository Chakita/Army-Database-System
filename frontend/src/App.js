import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [soldiers, setSoldiers] = useState(false)

  useEffect(() => {
    getSoldiers();
  }, []);

  function getSoldiers() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
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



  
  return (
    <div className="App">
      {soldiers ? soldiers : 'There is no soldier data available'}
      <br />
      <button onClick={createSoldier}>Add</button>
      <br />
      <button onClick={deleteSoldier}>Delete</button>
    </div>
  );
}

export default App;
