import React, { useState, useEffect, useContext } from 'react';
import '../css/UserSidebar.css';
import { motion } from "framer-motion";
import { MdDashboard, MdSend, MdNightsStay, MdSubscriptions } from 'react-icons/md';
import { FaMoneyBillWaveAlt, FaBars, FaUserPlus, FaShare } from 'react-icons/fa'
import { BsBellFill } from 'react-icons/bs'
import { RxCountdownTimer } from 'react-icons/rx'
import { TfiMenuAlt, TfiGift } from 'react-icons/tfi'
import { AiOutlineSetting, AiFillBank,AiOutlineAreaChart } from 'react-icons/ai'
import { BsFillChatTextFill } from 'react-icons/bs'
import { NavLink } from 'react-router-dom';
import UserSidebarMenu from './usersidebar/UserSidebarMenu';
import { UserModal } from '../UserModel/UserModal';
import { Modal, Row, Col, Button, message, Switch } from 'antd'
import axios from 'axios';

import { useNavigate } from 'react-router-dom';


const routes = [
    // {
    //     path:'/userdashboard/signals',
    //     name:"Signal",
    //     icon:<AiOutlineAreaChart/>,
    // },
    {
        path: '/userdashboard/dashboard',
        name: "Dashboard",
        icon: <MdDashboard />,
    },
    {
        path: '/userdashboard',
        name: "Chart and Data",
        icon: <AiOutlineAreaChart />,
        subRoutes: [
            {
                path: "/userdashboard/cryptocurrency-market",
                name: 'Cryptocurrency Market',
            },
            {
                path: "/userdashboard/economic-celender",
                name: 'Economic Celender',
            },
            {
                path: "/userdashboard/heat-map",
                name: 'Heat Map',
            },
            {
                path: "/userdashboard/cross-rates",
                name: 'Cross Rates',
            },
            // {
            //     path: "/userdashboard/helper-charts",
            //     name: 'Helper Charts',
            // },
            {
                path: "/userdashboard/market-data",
                name: 'Market Data',
            },
            {
                path: "/userdashboard/screener",
                name: 'Screener',
            },


        ],
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
    // {
    //     path: '/userdashboard/contest',
    //     name: "Contests",
    //     icon: <IoTrophy />,
    //     subRoutes: [
    //         {
    //             path: "/contests/champion-demo",
    //             name: 'Champion Demo Contest',
    //         },
    //         {
    //             path: "/contests/opne-champion-demo/account",
    //             name: ' Opne Champion Demo Contest account',
    //         },
    //     ],
    // },
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
    {
        path: '/userdashboard/chat',
        name: "Live Chat",
        icon: <BsFillChatTextFill />,
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
    {
        path: '/userdashboard/refferal-payout',
        name: "Refferal Payout",
        icon: <FaShare />,
    },

]

function UserSidebar(props) {

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [isComponentOpen, setIsComponentOpen] = useState(false);
    const [subcriptionDiv, setSubscriptionDiv] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [openNotificationModal, setOpenNotificationModal] = useState(false)
    const [allNotification, setAllNotification] = useState([]);
    const [allTraderNotification, setAllTraderNotification] = useState([]);
    const [particularTraderNotification, setParticularTraderNotification] = useState([]);
    const [isSubscriptionModal, setIsSubscriptionModal] = useState(false);
    const [paymentCountSubscription, setPaymentCountSubscripton] = useState({
        userid: '',
        payment: false,
        expiry: '',
        doj: '',
        plan: Number
    });
    const openModal = () => {
        setShowModal(true);
    };
    console.log(showModal);

    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        callApiToFetchUserData()

    }, []);

    // // renewelOnClick
    // const renewelOnClick = () => {
    //     console.log('ji')
    //     props.onPaymentButtonClick();
    // }

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
    //call api to fetch user data
    const callApiToFetchUserData = () => {
        const userid = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        const data = {
            _id: userid
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.post('/user/fetch-user-details-userside', data, config)
            .then((res) => {
                setSubscriptionDiv(res.data.result.paymentCount)
                const formattedDate = new Date(res.data.result.doj)
                const addYear = formattedDate.setFullYear(formattedDate.getFullYear() + 1);
                const finalYear = new Date(addYear).toLocaleDateString();
                const dateOfJoining = new Date(res.data.result.doj)
                const formattedDateOfJoining = new Date(dateOfJoining).toLocaleDateString();

                setPaymentCountSubscripton({
                    userid: res.data.result.userid,
                    payment: res.data.result.paymentStatus,
                    expiry: finalYear,
                    doj: formattedDateOfJoining,
                    plan: res.data.result.paymentCount

                })
            })
            .catch((error) => {
                console.log(error)
            })
    }


    //subscription 
    const showSubscriptionModal = () => {
        setIsSubscriptionModal(true)
    }
    const handleOkSubscriptionModal = () => {
        setIsSubscriptionModal(false);
    };
    // theme

    const [toggleValue, setToggleValue] = useState(false);

    const handleToggleChange = (checked) => {
        setToggleValue(checked);
    };
    // -------------------------------------------

    const renewelPayment = () => {

        const data = {
            amount: 1500,
            order_id: "0d0254888555666",
            currency: "INR",
            payment_capture: 1,
        }
        axios.post('/user/users/user-create-payment', data)
            .then(res => {
                console.log(res.data, "29")
                handleOpenRazorpay(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleOpenRazorpay = (data) => {
        const options = {
            key: 'rzp_test_RvU9CuKT2BsDrz',
            amount: Number(data.amount) * 100,
            currency: data.currency,
            name: 'JETTRADE FX',
            description: 'Software and service charge',
            order_id: data.id,

            handler: function (response) {
                console.log(response, "26")
                axios.post('/user/users/verify-payment', { response: response })
                    .then(res => {
                        // console.log(res, "37");
                        // message.success(res.data.message)
                        userPaymetSuccessStatus();
                    })
                    .catch(err => {
                        console.log(err);
                        message.warning("Payment Failed")
                    })
            }
        }
        const razorpay = new window.Razorpay(options)
        razorpay.open()
    }


    // user payment success status
    const userPaymetSuccessStatus = () => {
        const data = {
            userid: localStorage.getItem('userid')
        }
        axios.post('/user/users/change-user-payment-status', data)
            .then((res) => {
                message.success(res.data.message)
                navigate('/userdashboard/dashboard')
            })
            .catch((error) => {
                message.error(error.response.data.message)
            })
    }
    // ---------------------------------------


    return (
        <>
            <div className='user-subscription-modal'>
                <Modal
                    title="Subscription plan"
                    className='subscription-plan-title'
                    open={isSubscriptionModal}
                    onOk={handleOkSubscriptionModal}
                    onCancel={handleOkSubscriptionModal}
                    footer={null}

                >

                    {subcriptionDiv > 0 ?
                        <>
                            <Row style={{ marginBottom: '5px' }}>
                                <Col span={12} style={{ fontWeight: 600, fontFamily: 'Calibri', fontSize: '16px' }} >
                                    User ID :
                                </Col>
                                <Col span={12} style={{ color: '#5e72e4', fontWeight: 500, fontFamily: 'Calibri', fontSize: '16px' }}>
                                    {paymentCountSubscription.userid}
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '5px' }}>
                                <Col span={12} style={{ fontWeight: 600, fontFamily: 'Calibri', fontSize: '16px' }}>
                                    Subscription Plan :
                                </Col>
                                <Col span={12} style={{ color: '#5e72e4', fontWeight: 500, fontFamily: 'Calibri', fontSize: '16px' }}>
                                    {paymentCountSubscription.plan === 1 ? 'INR 3500.00' : ''}
                                    {paymentCountSubscription.plan > 1 ? 'INR 1500.00' : ''}
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '5px' }}>
                                <Col span={12} style={{ fontWeight: 600, fontFamily: 'Calibri', fontSize: '16px' }}>
                                    Subscription :
                                </Col>
                                <Col span={12} style={{ color: paymentCountSubscription.payment ? 'green' : 'red', fontWeight: 500, fontFamily: 'Calibri', fontSize: '16px' }}>
                                    {paymentCountSubscription.payment ? 'Running' : 'Expired'}
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '5px' }}>
                                <Col span={12} style={{ fontWeight: 600, fontFamily: 'Calibri', fontSize: '16px' }}>
                                    Date of Joining :
                                </Col>
                                <Col span={12} style={{ color: '#5e72e4', fontWeight: 500, fontFamily: 'Calibri', fontSize: '16px' }}>
                                    {paymentCountSubscription.doj}(mm/dd/yy)
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '5px' }}>
                                <Col span={12} style={{ fontWeight: 600, fontFamily: 'Calibri', fontSize: '16px' }}>
                                    Expity Date :
                                </Col>
                                <Col span={12} style={{ color: '#5e72e4', fontWeight: 500, fontFamily: 'Calibri', fontSize: '16px' }}>
                                    {paymentCountSubscription.expiry}(mm/dd/yy)
                                </Col>
                            </Row>

                            <div>
                                <Button type='primary' onClick={renewelPayment} disabled={paymentCountSubscription.payment}>Renewal</Button>

                            </div>
                        </>
                        : <div style={{color:'red', textAlign:'center'}}>NO PLAN </div>}


                </Modal>
            </div>
            <div className='user-notification'>
                <Modal
                    title="Notification"
                    className='user-notification-title'
                    open={openNotificationModal}
                    onOk={handleOk}
                    onCancel={handleOk}
                    footer={null}
                    style={{ cursor: 'pointer' }}
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


                    <div className='d-flex' onClick={showSubscriptionModal} style={{ cursor: 'pointer' }} >
                        <MdSubscriptions style={{ fontSize: '25px', marginLeft: '15px', marginTop: '10px' }} />
                        {isOpen && <p style={{ marginLeft: '3px', fontWeight: '600', marginRight: '10px', marginTop: '10px' }}>Subscription</p>}
                    </div>

                    <div className='d-flex' style={{ cursor: 'pointer' }}>
                        <MdNightsStay style={{ fontSize: '25px', marginLeft: '15px' }} />
                        {isOpen && <p style={{ marginLeft: '3px', fontWeight: '600', marginRight: '10px' }}>Theme</p>}
                        {isOpen && <Switch checked={toggleValue} onChange={handleToggleChange} />}

                    </div>
                </motion.div>


            </div>
        </>
    )
}

export default UserSidebar