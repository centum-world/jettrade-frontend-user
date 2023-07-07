import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/DisplayCard.css';
import axios from 'axios';
import { FaRupeeSign } from 'react-icons/fa';
import { Button, Modal, Dropdown, Menu } from 'antd';




const DisplayCard = () => {
    const handleMenuClick = (e) => {
        console.log(e.key);
        if (e.key === 'cryptocurrency-market') {
            //openUserLoginFuction();
            navigate('/userdashboard/cryptocurrency-market');
        }
        if (e.key === 'economic-celender') {
            //console.log("hii");
            // <NavLink to="/user-registration">Sign Up</NavLink>
            navigate('/userdashboard/economic-celender');
        }
        if (e.key === 'heat-map') {
            navigate('/userdashboard/heat-map')
        }
        if (e.key === 'cross-rates') {
            navigate('/userdashboard/cross-rates');
        }
        if (e.key === 'screener') {
            navigate('/userdashboard/screener');
        }
        if (e.key === 'market-data') {
            navigate('/userdashboard/market-data');
        }
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="cryptocurrency-market">Cryptocurrency Market</Menu.Item>
            <Menu.Item key="economic-celender">Economic Celender</Menu.Item>
            <Menu.Item key="heat-map">Heat Map</Menu.Item>
            <Menu.Item key='cross-rates'>Cross rates</Menu.Item>
            <Menu.Item key='market-data'>Market data</Menu.Item>
            <Menu.Item key='screener'>Screener</Menu.Item>
        </Menu>
    );
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        userid: '',
        refferal: '',
    });
    const [subscriptionStatus, setSubscriptionStatus] = useState({
        userid: '',
        payment: false,
        expiry: '',
        doj: '',
        plan: Number,
        formattedAmount: ''
    })
    const [subscription, setSubscription] = useState('');
    const [totalWithdrawal, setTotalWithdrawal] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [refferalTeam, setRefferalTeam] = useState([]);

    useEffect(() => {
        setUserDetails({ userid: localStorage.getItem('userid'), refferal: localStorage.getItem('refferal') })
        fetchUserDataForSubscription();
        fetchTotalWithdrawal();
        callApiToMyTeam();
    }, [])
    // modal for my team
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const share = (url) => {

        // navigate('/user-registration/:inviteCode')

        localStorage.removeItem('login');
        localStorage.removeItem('token');
        localStorage.removeItem('userid');
        localStorage.removeItem('user');
        localStorage.removeItem('userfname');
        localStorage.removeItem('refferal');
        localStorage.removeItem('userType');

        navigate(url, { target: '_blank' });
    }

    // joinChat
    const joinChat = () => {
        navigate('/userdashboard/chat');
    }

    // refferalWallet
    const refferalWallet = () => {
        navigate('/userdashboard/refferal-payout')
    }

    // fetchUserDataForSubscription
    const fetchUserDataForSubscription = () => {
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
                setSubscription(res.data.result.paymentCount)
                const walletAmount = res.data.result.wallet
                const formattedAmount1 = walletAmount.toLocaleString('en-IN', {
                    style: 'currency',
                    currency: 'INR'
                });
                const formattedDate = new Date(res.data.result.doj)
                const addYear = formattedDate.setFullYear(formattedDate.getFullYear() + 1);
                const finalYear = new Date(addYear).toLocaleDateString();
                const dateOfJoining = new Date(res.data.result.doj)
                const formattedDateOfJoining = new Date(dateOfJoining).toLocaleDateString();

                setSubscriptionStatus({
                    userid: res.data.result.userid,
                    payment: res.data.result.paymentStatus,
                    expiry: finalYear,
                    doj: formattedDateOfJoining,
                    plan: res.data.result.paymentCount,
                    formattedAmount: formattedAmount1

                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // fetchTotalWithdrawal
    const fetchTotalWithdrawal = () => {
        const userid = localStorage.getItem("userid");
        const token = localStorage.getItem("token");
        const data = {
            userid: userid
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.post('/user/users/user-total-withdrawal', data, config)
            .then((res) => {
                //console.log(res.data.walletAmount)
                if (res.data.data === 0) {
                    setTotalWithdrawal(0)


                } else {
                    const totalWithdrawal = res.data.walletAmount;
                    setTotalWithdrawal(totalWithdrawal)
                }


            })
            .catch((error) => {
                console.log(error);
            })
    }
    const share1 = () => {
        navigate('/userdashboard/invite')
    }

    // viewTradingChart
    const viewTradingChart = () => {
        navigate('/userdashboard/trading-chart')
    }

    // call api to my team 
    const callApiToMyTeam = () => {
        const token = localStorage.getItem('token');
        const data = {
            refferal_id: localStorage.getItem("refferal")
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.post('/user/users/user-my-team', data, config)
            .then((res) => {
                console.log(res.data.teamMembers)
                setRefferalTeam(res.data.teamMembers);
            })
            .catch((error) => {
                console.log(error.response)
            })
    }

    return (
        <>
            <div className='card1-container'>
                <div className='card1'>
                    <div className='d-flex'>
                        <h6>User ID </h6>&nbsp; : &nbsp;<span style={{ color: 'yellow' }}>{userDetails.userid}</span>
                    </div>
                    <div className='d-flex' onClick={() => share(`/user-registration/${userDetails.refferal}`)}>
                        <h6>Refferal ID</h6> &nbsp; : &nbsp; <span style={{ cursor: 'pointer', color: 'yellow' }}>{userDetails.refferal}</span>
                    </div>

                </div>
                <div className='card1'>
                    <div className='live-chat'>
                        <h6>Live Chat</h6>
                    </div>
                    <div className='live-chat-join'>
                        <span onClick={joinChat} style={{ cursor: 'pointer', color: 'yellow' }}>Join</span>
                    </div>

                </div>
                <div className='card1 '>
                    <div className='wallet'>
                        <h6> Refferal Wallet</h6>
                    </div>
                    <div className='d-flex'>
                        <h6>Amount :</h6>&nbsp;&nbsp; <span style={{ color: 'yellow' }}>{subscriptionStatus.formattedAmount}</span>
                    </div>
                    <div className='d-flex'>
                        <h6>Withdrawal :</h6>&nbsp;&nbsp; <span style={{ color: 'yellow' }}><FaRupeeSign />{totalWithdrawal}</span>
                    </div>
                </div>
                <div className='card1'>
                    <div className='subscription-card'>
                        <h6>Subscription</h6>
                    </div>
                    <div className='d-flex'>
                        <h6>Status :</h6> &nbsp;&nbsp; <span style={{ color: subscriptionStatus.payment ? 'yellow' : 'red', fontWeight: 500, fontFamily: 'Calibri', fontSize: '16px' }}>
                            {subscriptionStatus.payment ? 'Running' : 'Expired'}</span>
                    </div>
                    <div className='d-flex'>
                        <h6>Expiry :</h6>&nbsp; &nbsp; <span style={{ color: 'yellow', fontWeight: 500, fontFamily: 'Calibri', fontSize: '16px' }}>{subscriptionStatus.expiry}</span>
                    </div>
                </div>
                <div className='card1'>
                    <div className='live-chat'>
                        <h6>Invite friends</h6>
                    </div>
                    <div className='live-chat-join'>
                        <span onClick={share1} style={{ color: 'yellow', cursor: 'pointer' }}>Share</span>
                    </div>

                </div>
                <div className='card1'>
                    <div className='my-team'>
                        <h6>My Team</h6>
                    </div>
                    <div className='my-team-view'>
                        <span style={{ color: 'yellow', cursor: 'pointer' }} onClick={showModal}>View</span>
                    </div>

                </div>
                <div className='card1'>
                    <div className='trading_chart'>
                        <h6>Trading Chart</h6>
                    </div>
                    <div className='trading_chart_view'>
                        <span style={{ color: 'yellow', cursor: 'pointer' }} onClick={viewTradingChart}>view</span>
                    </div>
                </div>
                <div className='card1'>
                    <div className='live-chat'>
                        <h6>Chart and Data</h6>
                    </div>
                    <div className='live-chat-join'>
                        <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter">
                            <span style={{ color: 'yellow', cursor: 'pointer' }}>View</span>
                        </Dropdown>
                    </div>
                </div>

                <div className='card1'>
                    <div className='create-wallet'>
                        <h6>Create wallet</h6>
                    </div>
                </div>
                <div className='card1'>
                    <div className='Withdrawal'>
                        <h6>Withdrawal</h6>
                    </div>
                    <div className='withdrawal-view'>
                        <span style={{ color: 'yellow' }}><FaRupeeSign /></span>
                    </div>
                </div>
                <div className='card1'>
                    <div className='total-trade-small-card'>
                        <h6>Total Trade</h6>
                    </div>
                    <div className='d-flex'>
                        <span style={{ color: 'yellow' }}><FaRupeeSign /></span>
                    </div>
                </div>
                <div className='card1'>
                    <div className='todays-trade-small-card'>
                        <h6>Today's trade</h6>
                    </div>
                    <div className='d-flex'>
                        <span style={{ color: 'yellow' }}><FaRupeeSign /></span>
                    </div>
                </div>

            </div>

            {/* ----------------My team modal */}
            <Modal
                title={<span style={{ color: "purple" }}>My Team</span>}
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <div style={{ textAlign: "center" ,maxHeight: "300px", overflowY: "scroll"}}>
                    {refferalTeam.map((name, index) => (
                        <p key={index}>{index+1}.&nbsp;{name}</p>
                    ))}
                </div>
            </Modal>
        </>
    )
}

export default DisplayCard