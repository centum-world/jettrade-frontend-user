import React, {Component, createContext, useReducer } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes  } from 'react-router-dom';
import { Protected } from './components/Protected';
import Home from './components/Home';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Logout from './components/Logout';
import { initialState, reducer } from './components/reducer/UseReducer';
import PaymentPage from './components/PaymentPage';
import UserHomePage from './userpages/UserHomePage';
import InternalTransfer from '../src/UserSidebarPages/InternalTransfer';
import UserDetails from './UserModel/pages/UserDetails';
import ProfileVerification from './UserModel/pages/ProfileVerification';
import ChangePassword from './UserModel/pages/ChangePassword';
import ResetPassword from './UserModel/pages/ResetPassword';
import NewsLetter from './UserModel/pages/NewsLetter';
import BonusSetting from './UserModel/pages/BonusSetting';
import DepositeHistory from './UserSidebarPages/Operation history/DepositeHistory';
import WithdrawalHistory from './UserSidebarPages/Operation history/WithdrawalHistory';
import TransferHistory from './UserSidebarPages/Operation history/TransferHistory';
import AccountList from './UserSidebarPages/Trading accounts/AccountList';
import ManageBonuses from './UserSidebarPages/Trading accounts/ManageBonuses';
import Monitoring from './UserSidebarPages/Trading accounts/Monitoring';
import RealAccount from './UserSidebarPages/Trading accounts/RealAccount';
import DemoAccount from './UserSidebarPages/Trading accounts/DemoAccount';
import PageNotFound from './components/PageNotFound';
import NewDeposite from './UserSidebarPages/NewDeposite';
import Withdrawal from './UserSidebarPages/Withdrawal';
import UserRegistration from './components/UserRegistration';
import FullForexTicker from './components/FullForexTicker';
import InviteFriend from './UserSidebarPages/InviteFriend';
import UserLogin from './components/UserLogin';
import Userlogin1 from './components/Userlogin1';





export const UserContext = createContext();


function App() {
  const islogin = localStorage.getItem('login');
  
  
  const [state, dispatch ] = useReducer(reducer, initialState);


  return (
    <>
      <UserContext.Provider value={{state, dispatch}}>
      
        <Navbar />
        
          <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/chart" element={<FullForexTicker/>}/>
            {/* <Route  path='/admindashboard' element={islogin === 'true'?<AdminDashboard/>:<Route path='/' element={<Home/>}/>}/> */}
            
            <Route path='/paymentpage' element={<PaymentPage/>}/>
            {/* <Route path='/admindashboard' element={<Protected Component = {AdminDashboard}/>}></Route> */}
            <Route path='/user-registration' element={<UserRegistration/>}></Route>
            
            <Route path="/user-registration/:inviteCode" element={<UserRegistration/>} />
            <Route path='/user-login' element={<Userlogin1/>}></Route>

            {/* <Route  path='/userdashboard' element={isloginUser === 'true'?<UserDashboard/>:<Home />}/> */}
            <Route path='/userdashboard' element={<Protected Component = {UserDashboard}/>}>

              <Route path='dashboard' element={<UserHomePage/>} />
              <Route path='new-deposit' element={<NewDeposite/>}/>
              <Route path='withdraw' element={<Withdrawal/>} />
              <Route path='transfer' element={<InternalTransfer/>}/>
              <Route path='invite' element={<InviteFriend/>}/>

              {/* Opertaion Hostory */}

              <Route path ='deposite' element={<DepositeHistory/>}/>
              <Route path='withdrawlhistory' element={<WithdrawalHistory/>}/>
              <Route path='transferhistory' element={<TransferHistory/>}/>

              {/* Trading accounts */}

              <Route path='accountlist' element={<AccountList/>}/>
              <Route path='managebonuses' element={<ManageBonuses/>}/>
              <Route path='monitoring' element={<Monitoring/>}/>
              <Route path='real-account' element={<RealAccount/>}/>
              <Route path='demo-account' element={<DemoAccount/>}/>
              {/* user setting */}
              <Route path='setting/userdetails' element={<UserDetails/>}/>
              <Route path='setting/verify' element={<ProfileVerification/>}/>
              <Route path='setting/changepassword' element={<ChangePassword/>}/>
              <Route path='setting/resetpassword' element={<ResetPassword/>}/>
              <Route path='setting/newsletter' element={<NewsLetter/>}/>
              <Route path='setting/bonus' element={<BonusSetting/>}/>
            </Route>
            <Route path='/logout' element={<Logout/>}/>
            
            <Route path='*' element={<PageNotFound/>}/>
          </Routes>
         
      </UserContext.Provider>      
    </>
  );
}

export default App;
