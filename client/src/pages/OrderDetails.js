import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import OrderItem from '../components/OrderItem'
import { getOrderById } from '../redux/actions/orderActions'

function OrderDetails({ match }) {
    const { orderId } = match.params

    const dispatch = useDispatch()

    const orderState = useSelector(state => state.orderState)
    const { order, loading } = orderState

    const grandTotal = order && order.totalPrice + order.shippingPrice + order.taxPrice

    const formattedPaymentDate = order && order.paymentDetails 
        && dayjs(order.paymentDetails.paymentTime).format('MMM DD, YYYY hh:mm:ss A')

    const orderItemsMarkup = order && 
        order.orderItems.map(item => <OrderItem key={item.product._id} orderItem={item} />)

    useEffect(() => {
        dispatch(getOrderById(orderId))

        // eslint-disable-next-line
    }, [])

    return (
        <section className="order-details">
            { loading ? <Loader /> :
                order &&
                <div className="container">
                    <h1>Order Details</h1>
                    <div className="order-content">
                        <div className="details">
                            <table className="shipping">
                                <thead>
                                    <tr><th><h3 className="table-title">Shipping</h3></th></tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="title">Name:</td>
                                        <td className="name">{order.user.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="title">Email:</td>
                                        <td className="email">{order.user.email}</td>
                                    </tr>
                                    <tr>
                                        <td className="title">Address:</td>
                                        <td className="address">{order.shippingAddress}</td>
                                    </tr>
                                    <tr>
                                        <td className="title">Delivery Status:</td>
                                        <td 
                                            style={{color: order.isDelivered ? "green" : "red"}}
                                            className="delivery">
                                            {order.isDelivered ? "Delivered" : "Not Delivered"}
                                        </td>
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
                                        <td className="method">{order.paymentMethod}</td>
                                    </tr>
                                    <tr>
                                        <td className="title">Status:</td>
                                        <td 
                                            style={{color: order.isPaid ? "green" : "blue"}}
                                            className="status">
                                            {order.isPaid ? "Paid" : "Not Paid"}
                                        </td>
                                    </tr>
                                    {order.isPaid &&
                                        <tr>
                                            <td className="title">Paid On:</td>
                                            <td className="paid-on">{formattedPaymentDate}</td>
                                        </tr>
                                    }
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
                                        <td className="order-subtotal">
                                            &#8377; {order.totalPrice.toLocaleString('en-IN')}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="title">Shipping</td>
                                        <td className="order-shipping">
                                            &#8377; {order.shippingPrice.toLocaleString('en-IN')}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="title">Tax</td>
                                        <td className="order-tax">
                                            &#8377; {order.taxPrice.toLocaleString('en-IN')}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="title">Grand Total</td>
                                        <td className="order-total">
                                            &#8377; {grandTotal.toLocaleString('en-IN')}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> 
            }
        </section>
    )
}

export default OrderDetails
