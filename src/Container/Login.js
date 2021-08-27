import React,{ useEffect, useState } from 'react';
import './style.css';
import { Redirect,Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Actions/user.action';
import { Alert, Spinner } from 'react-bootstrap';



const Login = (props) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    useEffect(()=>{
        if(!user.loading){
            setEmail('');
            setPassword('');
        }
    },[user.loading])

    const userLogin = (e) => {

        e.preventDefault();

        const user = {
            email, password
        }

        dispatch(login(user));
    }

    if (user.loading) {
        return  <Spinner animation="grow" variant="info" />;
    }

    if(user.authenticate){
        return <Redirect to={`/home`} />;
    }

    const renderError = () => {
        if (user) {
            return (user.error) ? <Alert variant="danger" style={{backgroundColor:"#1A2226", border:"none"}}>{user.error}</Alert> : <Alert variant="success" style={{backgroundColor:"#1A2226", border:"none"}}>{user.message}</Alert>;
        }
        else {
            return null;
        }
    }
   
    return (
         <div className="container">
            <div className="row">
               
                    <div className="col-lg-3 col-md-2"></div>
                    <div className="col-lg-6 col-md-8 login-box"> 
                        <div className="col-lg-12 logo">
                        <div className="col-lg-12 login-key">
                            <i className="fa fa-key" aria-hidden="true"></i>
                        </div>
                        </div>
                        <div className="col-lg-12 login-title">
                            Login
                        </div>
                         {renderError()}
                        <div className="col-lg-12 login-form">
                            <div className="col-lg-12 login-form">
                                <form onSubmit={userLogin}>
                                    <div className="form-group">
                                    <input type="text" className="form-control"
                                        placeholder="Email..." value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                    <input type="password" className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    />
                                  </div>

                                    <div className="col-lg-12 loginbttm">
                                        <div className="col-lg-12 login-btm login-text"></div>
                                        <div className="col-lg-12 login-btm login-button">
                                            <button type="submit" className="btn btn-outline-primary">LOGIN</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                    </div>
                    
               </div>
               <div className="col-lg-12">
                    <h4 style={{color:"white", margin:"10px"}}>Don't have an account?
                    <span> <Link to='/signup' style={{color:"#0DB8DE"}}>Register Here</Link></span></h4>
                </div>  
            </div>
        </div>
       
    )
}

export default Login;
