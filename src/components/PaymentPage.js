import React from 'react'
import '../css/Payment.css'
import { useNavigate } from 'react-router-dom';
import CurrencyInput from 'react-currency-input-field';
import axios from 'axios';
import { message } from 'antd';

function PaymentPage() {
    const navigate = useNavigate();
    function goHome() {
        navigate('/');
    }
    const handleOpenRazorpay = (data) =>{
        const options = {
            key:'rzp_test_RvU9CuKT2BsDrz',
            amount:Number(data.amount) * 100,
            currency:data.currency,
            name:'JETTRADE FX',
            description:'Software and service charge',
            order_id:data.id,

            handler: function(response){
                console.log(response, "34")
                axios.post('/user/users/verify-payment',{response:response})
                .then(res => {
                    console.log(res,"37");
                    message.success(res.data.message)
                })
                .catch(err => {
                    console.log(err);
                    message.error("Payment Failed")
                })
            }
        }
        const razorpay = new window.Razorpay(options)
        razorpay.open()
    }

    const handlePayment = (amount) => {
        console.log(amount);
        const data = {
            amount: amount,
            order_id: "0d0254888555666",
            currency: "INR",
            payment_capture: 1,
            userid:'badal123'
        }
        axios.post('/user/users/user-create-payment', data)
        .then(res=>{
            console.log(res.data, "29")
            handleOpenRazorpay(res.data.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return (
        <>
            <div className='payment_container'>

                <div className='payment-box'>
                    <h1>JETTRADE FX</h1>
                    <h4>Payment Details</h4>
                    <div className='input-box container'>
                        {/* <input type="text" value={3500}  disabled/> */}
                        <CurrencyInput value={3500} intlConfig={{ locale: 'en-IN', currency: 'INR' }} />
                    </div>

                    <div className='payment-button'>
                        <button className='btn btn-primary btn-sm btn-block' onClick={() => handlePayment(3500)}>Pay Now</button>
                    </div>
                    <div className='payment-button'>
                        <button className='btn btn-secondary btn-sm btn-block' onClick={goHome}>Cancel</button>
                    </div>
                    <div className='note-para'>
                        <p> <strong><mark>NOTE:-</mark></strong>Service/Software use charges <strong>JETTRADE FX</strong></p>
                    </div>


                </div>
            </div>
        </>
    )
}

export default PaymentPage