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
            <div className="container col-md-8 col-lg-4">
                <h1 className="my-3 fs-2">Payment Method</h1>
                <form className="border p-3" onSubmit={onPaymentMethodFormSubmitted}>
                    <h3 className="form-title mb-3">Select Method</h3>
                    <div class="form-check mb-2" onChange={(e) => setPaymentMethod(e.target.value)}>
                        <input 
                            class="form-check-input" 
                            type="radio" 
                            name="method" 
                            id="paypal" 
                            checked 
                        />
                        <label class="form-check-label" for="paypal">
                            PayPal or Credit Card
                        </label>
                    </div>
                    <div class="form-check mb-2">
                        <input class="form-check-input" type="radio" name="method" id="debitcard" disabled />
                        <label class="form-check-label" for="debitcard">
                            Debit Card
                        </label>
                    </div>
                    <button className="btn btn-primary mt-2" type="submit">Continue</button>
                </form>
            </div>
        </section>
    )
}

export default PaymentMethod
