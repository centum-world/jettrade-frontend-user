import React, { useContext, useState } from 'react'
import '../css/Navbar.css'
import { NavLink,useNavigate} from 'react-router-dom';
import { UserContext } from '../App';
import {UseParamContext} from './UserRegistration'
//import UserRegistration from './UserRegistration';
//import AdminLogin from './AdminLogin';
import UserLogin from './UserLogin';
import UserForgetPassword from './UserForgetPassword';
import Button from 'react-bootstrap/Button';
import { Dropdown, Menu } from 'antd';




function Navbar() {
    const inviteCode = useContext(UseParamContext);
    
    const { state, dispatch } = useContext(UserContext);
    const login = localStorage.getItem('login');


    const [userShow, setUserShow] = useState(false);
    const [adminShow, setAdminShow] = useState(false);
    const [passwordModal, setPasswordModel] = useState(false);

    const openUserLoginFuction = () => setUserShow(true);
    const pull_data = (data) => setUserShow(data);

    const openForgetPasswordFunction = () =>setPasswordModel(true);
    const forgetdata =(data) => setPasswordModel(data);

    const openAdminLoginFuction = () => setAdminShow(true);
    const pull_addmin = (data) => setAdminShow(data);

    
    //react metarial drop down
    const navigate = useNavigate();
    const handleMenuClick = (e) => {
        console.log(e.key);
        if (e.key === 'login') {
            //openUserLoginFuction();
            navigate('/user-login');
        }
        if (e.key === 'signup') {
            //console.log("hii");
            // <NavLink to="/user-registration">Sign Up</NavLink>
            navigate('/user-registration');
        }
        if (e.key === 'forget') {
            openForgetPasswordFunction();
        }
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="login">Login</Menu.Item>
            <Menu.Item key="signup">Sign Up</Menu.Item>
            <Menu.Item key="forget">Forget Password</Menu.Item>
        </Menu>
    );
    // -------------------------------------------

    const RenderMenu = () => {
        if (login && !inviteCode) {
            return (

                <>

                    <li className="nav-item">
                        <NavLink className="btn btn-outline-dark rounded-pill " to="/logout" aria-current="page" >Logout</NavLink>
                    </li>
                </>
            )
        } else {
            return (
                <>
                    {/* <li className="nav-item">
                       
                        <Button variant=" btn rounded btn-outline-primary rounded-pill" onClick={openAdminLoginFuction}>
                            Admin
                        </Button>
                    </li>&nbsp;&nbsp; */}
                    <li className="nav-item">

                        {/* <Button variant=" btn rounded btn-outline-primary rounded-pill" onClick={openUserLoginFuction}>
                            User
                        </Button> */}
                        <Dropdown overlay={menu} trigger={['click']}>
                            <Button variant=" btn rounded btn-outline-primary rounded-pill">
                                User
                            </Button>
                        </Dropdown>


                    </li>



                </>
            )
        }
    }

    return (
        <>
            <nav className="navbar navbar-box navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="navbar-brand"><h3>JETTRADE FX</h3></div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <RenderMenu />


                        </ul>

                    </div>
                </div>
                {/* {userShow ?
                    <UserLogin func={pull_data} /> : ''

                } */}

                {
                    passwordModal?
                    <UserForgetPassword forgfunc={forgetdata} />:''
                }
                

            </nav>
           




        </>
    )
}

export default Navbar