import {useState, useEffect} from 'react';
import axios from 'axios';
import './Login.css';

const Login = (props) => {

  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');


  const handleNewUsernameChange = (event) =>{
      setNewUsername (event.target.value);
  };

  const handleNewPasswordChange = (event) =>{
      setNewPassword (event.target.value);
  };


  const handleNewUsernameSubmit = (event) =>{
      event.preventDefault();
      axios.post(
          'https://group-project-jeff-dwayne.herokuapp.com/users/login',
          {
              username: newUsername,
              password: newPassword,
          }
      ).then((response)=>{

        props.setAuth (true);
        props.setToken (response.data.token);
      })
        .catch(err=>console.log(err))
  };

return (
  <div className="login">
    <form onSubmit={handleNewUsernameSubmit}>
      <span class="login-username">Username:</span>
      <input type="text" onChange={handleNewUsernameChange}/><br/>
        <span class="login-password">Password:</span>
        <input type="text" onChange={handleNewPasswordChange}/><br/>
      <input type="submit" value="Sign In"/>
  </form>
  </div>
)







}

export default Login;
