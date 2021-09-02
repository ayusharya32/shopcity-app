import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { KEY_PAYMENT_METHOD } from "../utils/Constants"

function PaymentMethod({ history }) {
    const userState = useSelector(state => state.userState)
    const { user } = userState

    const [paymentMethod, setPaymentMethod] = useState("PayPal")

    useEffect(() => {
        if(user && user.cartItems.length === 0) {
            history.push("/cart")
        }
        
        if(user && user.shippingAddress == null) {
            history.push("/shipping")
        }
    }, [user, history])

    function onPaymentMethodFormSubmitted(e) {
        e.preventDefault()
        
        localStorage.setItem(KEY_PAYMENT_METHOD, paymentMethod)
        history.push("/placeorder")
    }

    return (
        <section className="payment-method">
            <div className="container">
                <h1 className="section-title">Payment Method</h1>
                <form onSubmit={onPaymentMethodFormSubmitted}>
                    <h3 className="form-title">Select Method</h3>
                    <div className="paypal" onChange={(e) => setPaymentMethod(e.target.value)}>
                        <input 
                            type="radio" 
                            name="method" 
                            value="PayPal" 
                            defaultChecked     
                        />
                        <label>Paypal or Credit Card</label>
                    </div>
                    <button className="btn-payment-continue btn-primary" type="submit">Continue</button>
                </form>
            </div>
        </section>
    )
}

export default PaymentMethod
