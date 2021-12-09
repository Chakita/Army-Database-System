import { useState, Fragment } from "react";

const CreateSoldier = () => {
    /*let msn = prompt('Enter soldier msn');
    let name = prompt('Enter soldier name');
    let dob = prompt('Enter soldier dob');
    let height = prompt('Enter soldier height');
    let weight = prompt('Enter soldier weight');
    let gender = prompt('Enter soldier gender');
    let rank = prompt('Enter soldier rank');
    let speciality = prompt('Enter soldier speciality')*/

    const [msn, setMsn] = useState("");
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [rank, setRank] = useState("");
    const [speciality, setSpeciality] = useState("");
      

    const body = {msn, name, dob, height,weight,gender,rank,speciality};

    const onSubmitForm = async(e) => {
        // preventing to refresh
        e.preventDefault();
        try {
            const body = {first_name, last_name, birth_date, phone_number, address_info, notes };
            // fetch request data
            // await for guess what? wait :)
            const response = await fetch('http://localhost:3001/soldiers', {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify(body),
            });

            // Once onSubmit form is completed, refresh to the previous screen / -> home
            window.location = "/";
        } catch (err) {
            console.error(err.message)
        }
    }

    const response = await fetch('http://localhost:3001/soldiers', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify(body),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getSoldiers();
      });
    
      return (<Fragment>
      <h1 className="text-center mt-5">Add Soldier Data.</h1>
      {/* onSubmit constant on form */}
      <form className="mt-5" onSubmit={onSubmitForm}>
          {/* d-flex for elements being together & margin top 5 */}
          {/* I set the const in value. It shows the default value of state, which is "" empty string */}
          <input type="text" className="form-control" placeholder="First Name:" value={first_name} onChange={e => 
              setFirstName(e.target.value)}/>
          <input type="text" className="form-control" placeholder="Last Name:" value={last_name} onChange={e => 
              setLastName(e.target.value)}/>
          <input type="text" className="form-control" placeholder="Birth Date:" value={birth_date} onChange={e => 
              setBirthDate(e.target.value)}/>

          <input type="text" className="form-control" placeholder="Phone Number:" value={phone_number} onChange={e => 
              setPhoneNumber(e.target.value)}/>

          <input type="text" className="form-control" placeholder="Address:" value={address_info} onChange={e => 
              setAddressInfo(e.target.value)}/>

          <input type="text" className="form-control" placeholder="Notes:" value={notes} onChange={e => 
              setNotes(e.target.value)}/>
              {/* onChange gets the new input value and set on setDescription, changing the default value "" to the new value inserted on input field */}
          <button className="btn btn-success">Add</button>
      </form>
            </Fragment>
            )
  
    };

export default CreateSoldier;