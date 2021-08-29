import React, { useEffect, useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Spinner } from 'react-bootstrap'
import './style.css';
import { signup } from '../Actions/user.action';

const SignUp = () => {
    const dispatch = useDispatch();
    const user = useSelector(state=> state.user);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShow, setPasswordShow] = useState(false);

    const togglePasswordVisiblity = () => {
        setPasswordShow(passwordShow ? false : true);
      };

    useEffect(()=>{
        if(!user.loading){
            setFirstName('');
            setLastName('');
            setPassword('');
            setEmail('');
        }
    },[user.loading])

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

    const userSignup = e =>{
        e.preventDefault();
        const data ={
            firstName,
            lastName,
            email,
            password,
        }
        dispatch(signup(data));
    }

    return (
        
        <div className="container">
        <div className="row">
           
                <div className="col-lg-3 col-md-2"></div>
                <div className="col-lg-6 col-md-8 login-box"> 
                    <div className="col-lg-12 logo">
                    <div className="col-lg-12 login-key">
                        <i className="fa fa-user-plus" aria-hidden="true"></i>
                    </div>
                    </div>
                    <div className="col-lg-12 login-title">
                        SignUp
                    </div>
                     {renderError()}
                    <div className="col-lg-12 login-form">
                        <div className="col-lg-12 login-form">
                            <form onSubmit={userSignup}>
                                <div className="form-group">
                                <input type="text" className="form-control"
                                    placeholder="Firstname..." value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                <input type="text" className="form-control"
                                    placeholder="Lastname..." value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                <input type="text" className="form-control"
                                    placeholder="Email..." value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                <input type={passwordShow?"text":"password"} className="form-control"
                                placeholder="Password..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                /><i style={{color:"white"}} id="eye" onClick={togglePasswordVisiblity} className="fa fa-eye"/>
                              </div>

                                <div className="col-lg-12 loginbttm">
                                    <div className="col-lg-12 login-btm login-text"></div>
                                    <div className="col-lg-12 login-btm login-button">
                                        <button type="submit" className="btn btn-outline-primary">SIGNUP</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                </div>
                
           </div>
           <div className="col-lg-12">
                <h4 style={{color:"white", margin:"10px"}}>Already have an account?
                <span> <Link to='/' style={{color:"#0DB8DE"}}>Login Here</Link></span></h4>
            </div>  
        </div>
    </div>
    )
}

export default SignUp
