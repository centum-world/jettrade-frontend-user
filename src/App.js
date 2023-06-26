import React, { Component, createContext, useReducer, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
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
import styled, { ThemeProvider } from 'styled-components';
import {lightTheme, darkTheme}from "./components/Theme/Themes"
import {GlobalStyles} from "./components/Theme/Themes"
import RefferalPayout from './UserSidebarPages/RefferalPayout';
import SignalTradingChart from './UserSidebarPages/SignalTradingChart';
import HeatMap from './UserSidebarPages/HeatMap';
import CrossRate from './UserSidebarPages/CrossRate';
import MarketData from './UserSidebarPages/MarketData';
import EconomicCelender from './UserSidebarPages/EconomicCelender';
import Screener from './UserSidebarPages/Screener';
import LiveChat from './UserSidebarPages/LiveChat';
import UserFirstChartPage from './userpages/UserFirstChartPage';




export const UserContext = createContext();
const StyledApp = styled.div``;

function App() {
  const islogin = localStorage.getItem('login');

  const [theme, setTheme] = useState("dark")
  const [state, dispatch] = useReducer(reducer, initialState);

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("dark")
  };

  return (
    <>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles/>
        <StyledApp>
          <UserContext.Provider value={{ state, dispatch }}>

          <Navbar />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/chart" element={<FullForexTicker />} />
            {/* <Route  path='/admindashboard' element={islogin === 'true'?<AdminDashboard/>:<Route path='/' element={<Home/>}/>}/> */}

            <Route path='/paymentpage' element={<PaymentPage />} />
            {/* <Route path='/admindashboard' element={<Protected Component = {AdminDashboard}/>}></Route> */}
            <Route path='/user-registration' element={<UserRegistration />}></Route>

            <Route path="/user-registration/:inviteCode" element={<UserRegistration />} />
            <Route path='/user-login' element={<Userlogin1 />}></Route>

            {/* <Route  path='/userdashboard' element={isloginUser === 'true'?<UserDashboard/>:<Home />}/> */}
            <Route path='/userdashboard' element={<Protected Component={UserDashboard} />}>
              <Route path='cryptocurrency-market' element={<SignalTradingChart/>}/>
              <Route path='heat-map' element={<HeatMap/>} />
              <Route path='economic-celender' element={<EconomicCelender/>} />
              <Route path='screener' element={<Screener/>} />
              <Route path='cross-rates' element={<CrossRate/>} />
              <Route path='market-data' element={<MarketData/>} />
              <Route path='dashboard' element={<UserHomePage />} />
              {/* <Route path='dashboard' element={<UserFirstChartPage/>} /> */}
              <Route path='new-deposit' element={<NewDeposite />} />
              <Route path='withdraw' element={<Withdrawal />} />
              <Route path='transfer' element={<InternalTransfer />} />
              <Route path='invite' element={<InviteFriend />} />
              <Route path='chat' element={<LiveChat />} />
              <Route path='refferal-payout' element={<RefferalPayout/>}/>

              {/* Opertaion Hostory */}

              <Route path='deposite' element={<DepositeHistory />} />
              <Route path='withdrawlhistory' element={<WithdrawalHistory />} />
              <Route path='transferhistory' element={<TransferHistory />} />

              {/* Trading accounts */}

              <Route path='accountlist' element={<AccountList />} />
              <Route path='managebonuses' element={<ManageBonuses />} />
              <Route path='monitoring' element={<Monitoring />} />
              <Route path='real-account' element={<RealAccount />} />
              <Route path='demo-account' element={<DemoAccount />} />
              {/* user setting */}
              <Route path='setting/userdetails' element={<UserDetails />} />
              <Route path='setting/verify' element={<ProfileVerification />} />
              <Route path='setting/changepassword' element={<ChangePassword />} />
              <Route path='setting/resetpassword' element={<ResetPassword />} />
              <Route path='setting/newsletter' element={<NewsLetter />} />
              <Route path='setting/bonus' element={<BonusSetting />} />
            </Route>
            <Route path='/logout' element={<Logout />} />

            <Route path='*' element={<PageNotFound />} />
          </Routes>

        </UserContext.Provider>
        </StyledApp>
      </ThemeProvider>
    </>
  );
}

export default App;
