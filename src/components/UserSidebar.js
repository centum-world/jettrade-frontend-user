import React, { useState, useEffect, useContext } from 'react';
import '../css/UserSidebar.css';
import { motion } from "framer-motion";
import { MdDashboard, MdSend, MdNightsStay } from 'react-icons/md';
import { FaMoneyBillWaveAlt, FaBars, FaUserPlus } from 'react-icons/fa'
import { BsBellFill } from 'react-icons/bs'
import { RxCountdownTimer } from 'react-icons/rx'
import { TfiMenuAlt, TfiGift } from 'react-icons/tfi'
import { IoTrophy } from 'react-icons/io5'
import { BiStar } from 'react-icons/bi'
import { AiOutlineSetting, AiFillBank } from 'react-icons/ai'
import { NavLink } from 'react-router-dom';
import UserSidebarMenu from './usersidebar/UserSidebarMenu';
import { UserModal } from '../UserModel/UserModal';
import { Modal } from 'antd'
import axios from 'axios';
import { Switch } from 'antd';
import { ThemeContext } from './Theme/ThemeProvider';


const routes = [
    {
        path: '/userdashboard/dashboard',
        name: "Dashboard",
        icon: <MdDashboard />,
    },
    {
        path: '/userdashboard/withdraw',
        name: "Withdrawal",
        icon: <FaMoneyBillWaveAlt />,
    },
    {
        path: '/userdashboard/transfer',
        name: "Internal transfer",
        icon: <MdSend />,
    },
    // {
    //     path: '/userdashboard/promotion',
    //     name: "Promotions",
    //     icon: <FaCarrot />,
    // },
    {
        path: '/userdashboard',
        name: "Operation history",
        icon: <RxCountdownTimer />,
        subRoutes: [
            {
                path: "/userdashboard/deposite",
                name: 'Deposite history',
            },
            {
                path: "/userdashboard/withdrawlhistory",
                name: 'Withdrawal history',
            },
            {
                path: "/userdashboard/transferhistory",
                name: 'Transfer history',
            },


        ],
    },
    {
        path: '/userdashboard',
        name: "Trading accounts",
        icon: <TfiMenuAlt />,
        subRoutes: [
            {
                path: "/userdashboard/accountlist",
                name: 'Account list',
            },
            {
                path: "/userdashboard/managebonuses",
                name: 'Manage Bonuses',
            },
            {
                path: "/userdashboard/monitoring",
                name: 'Monitoring',
            },
            {
                path: "/userdashboard/real-account",
                name: 'Open real account',
            },
            {
                path: "/userdashboard/demo-account",
                name: 'Open demo account',
            },


        ],
    },
    {
        path: '/userdashboard/contest',
        name: "Contests",
        icon: <IoTrophy />,
        subRoutes: [
            {
                path: "/contests/champion-demo",
                name: 'Champion Demo Contest',
            },
            {
                path: "/contests/opne-champion-demo/account",
                name: ' Opne Champion Demo Contest account',
            },
        ],
    },
    // {
    //     path: '/userdashboard/statuses',
    //     name: "User Statuses",
    //     icon: <BiStar />,
    // },
    {
        path: '/userdashboard/invite',
        name: "Invite a friend",
        icon: <FaUserPlus />,
    },
    // {
    //     path: '/copytrading',
    //     name: "Copytrading",
    //     icon: <FaBullseye />,
    // },
    {
        path: '/promocode',
        name: "Promocode",
        icon: <TfiGift />,
    },

]

function UserSidebar() {
    
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [openNotificationModal, setOpenNotificationModal] = useState(false)
    const [allNotification, setAllNotification] = useState([]);
    const [allTraderNotification, setAllTraderNotification] = useState([]);
    const [particularTraderNotification, setParticularTraderNotification] = useState([]);
    const openModal = () => {
        setShowModal(true);
    };
    console.log(showModal);

    const toggle = () => setIsOpen(!isOpen);
    const clickOnBell = () => {
        setOpenNotificationModal(true)
        callApiToFetchAllNotification();

    }



    //handle all notification
    const handleOk = () => {
        setOpenNotificationModal(false);
    };

    // callApiToFetchAllNotification
    const callApiToFetchAllNotification = () => {
        const token = localStorage.getItem("token");
        const userid = localStorage.getItem('userid')
        const data = { userid }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }

        axios.post('/user/users/fetch-user-notification', data, config)
            .then((result) => {
                console.log(result.data.allNotitfication)
                setAllNotification(result.data.allNotitfication)
                setAllTraderNotification(result.data.allTraderNotification)
                setParticularTraderNotification(result.data.particularTrader)
                console.log(result.data.allTraderNotification)
                console.log(result.data.particularTrader)
            })
            .catch(err => {
                console.log(err)
            })
    }
    // theme
    const [toggleValue, setToggleValue] = useState(false);

    const handleToggleChange = (checked) => {
        setToggleValue(checked);
    };

    return (
        <>
            <div className='user-notification'>
                <Modal
                    title="Notification"
                    className='user-notification-title'
                    open={openNotificationModal}
                    onOk={handleOk}
                    onCancel={handleOk}
                    footer={null}
                >
                    <p className='user-general-notification'>General Notification</p>
                    <div className='user-general-notification-section'>
                        {allNotification.map((object) => (
                            <li key={object.id}><BsBellFill />&nbsp; {object.message}</li>
                        ))}
                    </div>
                    <br />
                    <p className='for-traders-notification'>For Traders</p>
                    <div className='for-traders-notification-section'>
                        {allTraderNotification.map((object) => (
                            <li key={object.id}><BsBellFill />&nbsp; {object.message}</li>
                        ))}
                    </div>
                    <br />
                    <p className='for-trader-only-notification'>For You Only</p>
                    <div className='for-trader-only-notification-section'>
                        {particularTraderNotification.map((object) => (
                            <li key={object.id}><BsBellFill />&nbsp; {object.message}</li>
                        ))}
                    </div>
                </Modal>
            </div>

            <div className='main-container'>
                <motion.div animate={{ width: isOpen ? '300px' : '50px' }} className='userSidebar'>
                    <div className='top_section'>
                        {isOpen && <h1 className='logo'>Badal</h1>}

                        {isOpen &&
                            <div className='setting'>
                                <AiOutlineSetting onClick={openModal} />
                                {showModal ? <UserModal setShowModal={setShowModal} /> : null}

                            </div>
                        }
                        <div className='notification'>
                            {isOpen && <BsBellFill onClick={clickOnBell} style={{ cursor: 'pointer' }} />}
                        </div>
                        <div className='bars'>
                            <FaBars onClick={toggle} />
                        </div>
                    </div>
                    {isOpen ?
                        <div>
                            <NavLink to='/userdashboard/new-deposit' className='deposit_button btn btn-primary'>START WITH A DEPOSIT</NavLink>
                        </div> :
                        <NavLink to='/userdashboard/new-deposit' className='deposit_logo'><AiFillBank /></NavLink>
                    }



                    <section className='routes'>
                        {routes.map((route) => {
                            if (route.subRoutes) {
                                return (
                                    <UserSidebarMenu isOpen={isOpen} route={route} />
                                );
                            }
                            return (
                                <>
                                    <NavLink to={route.path} key={route.name} className={isOpen ? 'user_sidebar_link' : 'user_sidebar_link_small'}>
                                        <div className='icon'>{route.icon}</div>
                                        {isOpen && <motion.div className='link_text'>{route.name}</motion.div>}
                                    </NavLink>
                                </>
                            )
                        })}

                    </section>

                    <div>

                        <div className='d-flex'>
                            <MdNightsStay style={{ fontSize: '25px', marginLeft: '15px' }} />
                            {isOpen && <p style={{ marginLeft: '3px', fontWeight: '600', marginRight: '10px' }}>Theme</p>}
                            {isOpen && <Switch checked={toggleValue} onChange={handleToggleChange} />}
                           
                        </div>
                    </div>

                </motion.div>


            </div>
        </>
    )
}

export default UserSidebar