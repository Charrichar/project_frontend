import {useState, useEffect} from 'react';
import axios from 'axios';
import './Signup.css';

const Signup = (props) => {

  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleNewTokenChange = (event) =>{
      // setToken(event.target.value);
  };

  const handleNewAuthenticatedChange = (event) =>{
      // setAuthenticated(event.target.value);
  };

  const handleNewUsernameChange = (event) =>{
      setNewUsername(event.target.value);
  };

  const handleNewPasswordChange = (event) =>{
      setNewPassword(event.target.value);
  };


  const handleNewUsernameSubmit = (event) =>{
      event.preventDefault();
      axios.post(
          'http://localhost:3003/users/register',
          {
              username: newUsername,
              password: newPassword,
          }
      )
      .then((response)=>{
          props.setAuth (true);
          props.setToken (response.data.token);
      })
      .catch(err=>console.log(err))
  };

  return (
    <form onSubmit={handleNewUsernameSubmit}>
          Username: <input type="text" onChange={handleNewUsernameChange}/><br/>
          Password: <input type="text" onChange={handleNewPasswordChange}/><br/>
        <input type="submit" value="Sign Up"/>
    </form>
  );

}

export default Signup;
