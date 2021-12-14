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
        <section className="place-order my-4">
            { loading || orderLoading ? <Loader /> : user &&
                <div className="container">
                    <h1 className="mb-2">Place Order</h1>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="shipping col-lg-10">
                                <table className="table table-striped">
                                    <thead>
                                        <tr><th className="px-0"><h3>Shipping</h3></th></tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">Name:</th>
                                            <td>{user.name}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Email:</th>
                                            <td>{user.email}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Address:</th>
                                            <td>{formattedAddress}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="payment col-lg-10">
                                <table className="table table-striped">
                                    <thead>
                                        <tr><th className="px-0"><h3>Payment</h3></th></tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">Method:</th>
                                            <td>{paymentMethod}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-lg-10">
                                <h3 className="mb-2 mt-4">Order Items</h3>
                                {orderItemsMarkup}
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <table className="summary table table-striped">
                                <thead>
                                        <tr><th className="px-0"><h3 className="table-title">Order Summary</h3></th></tr>
                                    </thead>
                                <tbody>
                                    <tr>
                                        <td>Item(s) Subtotal</td>
                                        <td>&#8377; {totalPrice.toLocaleString('en-IN')}</td>
                                    </tr>
                                    <tr>
                                        <td>Shipping</td>
                                        <td>&#8377; {shippingPrice}</td>
                                    </tr>
                                    <tr>
                                        <td>Tax</td>
                                        <td>&#8377; {totalTaxPrice.toLocaleString('en-IN')}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Grand Total</strong></td>
                                        <td><strong>&#8377; {grandTotal.toLocaleString('en-IN')}</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                            { !showPaypalButton ? 
                                <div className="d-grid gap-2">
                                    <button 
                                    onClick={onProceedToPayButtonClicked}
                                    className="btn btn-primary"
                                    >
                                        Proceed to Pay
                                    </button>
                                </div> :
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
