import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../components/Loader"
import OrderItem from "../components/OrderItem"
import { CREATE_ORDER_SUCCESS, KEY_PAYMENT_METHOD } from "../utils/Constants"
import { PayPalButton } from "react-paypal-button-v2";
import { createOrder, resetOrderState } from "../redux/actions/orderActions"
import { clearCart } from "../redux/actions/userActions"
import { toast } from "react-toastify"

function PlaceOrder({ history }) {
    const dispatch = useDispatch()

    const userState = useSelector(state => state.userState)
    const { user, loading } = userState

    const orderState = useSelector(state => state.orderState)
    const { order, loading: orderLoading, error: orderError, success: orderSuccess } = orderState

    const [showPaypalButton, setShowPaypalButton] = useState(false)

    const shippingAddress = (!loading && user) && user.shippingAddress

    const formattedAddress = shippingAddress ? `${shippingAddress.address}, ${shippingAddress.city}, 
        ${shippingAddress.state}, ${shippingAddress.pincode}` : ""

    const paymentMethod = localStorage.getItem(KEY_PAYMENT_METHOD)

    const orderItemsMarkup = user && 
        user.cartItems.map(item => <OrderItem key={item.product._id} orderItem={item} />)

    const totalPrice = user ? user.cartItems.reduce((acc, cartItem) => {
        return acc + (cartItem.quantity * cartItem.product.price)
    }, 0) : 0

    const totalTaxPrice = user ? user.cartItems.reduce((acc, cartItem) => {
        return acc + (cartItem.quantity * cartItem.product.taxPrice)
    }, 0) : 0

    const shippingPrice = totalPrice < 5000 ? 0 : totalPrice > 10000 ? 200 : 100

    const grandTotal = totalPrice + totalTaxPrice + shippingPrice

    useEffect(() => {
        if(user && user.cartItems.length === 0) {
            history.push("/cart")
        }

        if(user && user.shippingAddress == null) {
            history.push("/shipping")
        }

        if(localStorage.getItem(KEY_PAYMENT_METHOD) == null) {
            history.pushState("/payment")
        }

        if(orderSuccess === CREATE_ORDER_SUCCESS) {
            history.push(`/orders/${order._id}`)
            dispatch(resetOrderState())
            dispatch(clearCart())
        }

        if(orderError) {
            toast.error(orderError.message)
            dispatch(resetOrderState())
        }

        // eslint-disable-next-line
    }, [dispatch, user, history, orderSuccess, orderError])

    function onProceedToPayButtonClicked() {
        if(paymentMethod === "PayPal") {
            setShowPaypalButton(true)
            return
        }
    }

    function onPaymentSuccess(details, data) {
        const payerName = details.payer.name.given_name
        const paymentTime = details.update_time
        const paymentId = details.id

        const orderItems = user && user.cartItems.map(item => {
            return { 
                product: item.product._id, 
                quantity: item.quantity 
            }
        })

        const requestBody = {
            orderItems,
            shippingPrice, 
            taxPrice: totalTaxPrice,
            totalPrice,
            paymentMethod,
            isPaid: true,
            shippingAddress: formattedAddress,
            paymentDetails: {
                id: paymentId,
                payerName,
                paymentTime
            }
        }

        dispatch(createOrder(requestBody))
    }

    return (
        <section className="place-order">
            { loading || orderLoading ? <Loader /> : user &&
                <div className="container">
                    <h1>Place Order</h1>
                    <div className="order-content">
                        <div className="details">
                            <table className="shipping">
                                <thead>
                                    <tr><th><h3 className="table-title">Shipping</h3></th></tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="title">Name:</td>
                                        <td className="name">{user.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="title">Email:</td>
                                        <td className="email">{user.email}</td>
                                    </tr>
                                    <tr>
                                        <td className="title">Address:</td>
                                        <td className="address">{formattedAddress}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="payment">
                                <thead>
                                    <tr><th><h3 className="table-title">Payment</h3></th></tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="title">Method:</td>
                                        <td className="method">{paymentMethod}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="order-items">
                                <h3 className="table-title">Order Items</h3>
                                {orderItemsMarkup}
                            </div>
                        </div>
                        <div className="summary-container">
                            <h3>Order Summary</h3>
                            <table className="summary">
                                <tbody>
                                    <tr>
                                        <td className="title">Item(s) Subtotal</td>
                                        <td className="order-subtotal">&#8377; {totalPrice.toLocaleString('en-IN')}</td>
                                    </tr>
                                    <tr>
                                        <td className="title">Shipping</td>
                                        <td className="order-shipping">&#8377; {shippingPrice}</td>
                                    </tr>
                                    <tr>
                                        <td className="title">Tax</td>
                                        <td className="order-tax">&#8377; {totalTaxPrice.toLocaleString('en-IN')}</td>
                                    </tr>
                                    <tr>
                                        <td className="title">Grand Total</td>
                                        <td className="order-total">&#8377; {grandTotal.toLocaleString('en-IN')}</td>
                                    </tr>
                                </tbody>
                            </table>
                            { !showPaypalButton ? 
                                <button 
                                    onClick={onProceedToPayButtonClicked}
                                    className="btn-proceed-to-pay btn-primary"
                                >
                                    Proceed to Pay
                                </button> :
                                <PayPalButton 
                                    amount={(grandTotal * 0.0136).toFixed(2)} 
                                    onSuccess={onPaymentSuccess}
                                />
                            }
                        </div>
                    </div>
                </div>
            } 
        </section>
    )
}

export default PlaceOrder
