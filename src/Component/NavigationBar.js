import React from 'react';
import {  Navbar, Nav, Button} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory,Link, Redirect } from 'react-router-dom';
import { signout } from '../Actions/user.action'

const NavigationBar = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = window.localStorage.getItem('token');
  const history = useHistory();
  const dispatch = useDispatch();

  const capitalizeFirstLetter = (string) =>{
  return string.charAt(0).toUpperCase() + string.slice(1);
  }

  if(!token){
    return <Redirect to={'/'}/>;
  }
  const logout = () =>{
    dispatch(signout());
   history.push('/');
}
    return (
        <Navbar bg="dark" expand="lg" style={{width:"100%"}}>
        <Navbar.Brand href="#" style={{color:"white"}}>Hello, {capitalizeFirstLetter(user.firstName)} {capitalizeFirstLetter(user.lastName)}</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            
          </Nav>
         
          <Button className="justify-content-right" variant="info" onClick={()=>logout()}>LogOut</Button>
        </Navbar.Collapse>
      </Navbar>
    )
}

export default NavigationBar
