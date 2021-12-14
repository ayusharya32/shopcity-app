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
        <section>
            { loading ? <Loader /> :
                order &&
                <div className="container my-2">
                    <h1 className="my-2">Order Details</h1>
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
                                            <td>{order.user.name}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Email:</th>
                                            <td>{order.user.email}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Address:</th>
                                            <td>{order.shippingAddress}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Delivery Status:</th>
                                            <td 
                                                style={{color: order.isDelivered ? "green" : "red"}}
                                                >
                                                <strong>{order.isDelivered ? "Delivered" : "Not Delivered"}</strong>
                                            </td>
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
                                            <td>{order.paymentMethod}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Status:</th>
                                            <td 
                                                style={{color: order.isPaid ? "green" : "blue"}}>
                                                <strong>{order.isPaid ? "Paid" : "Not Paid"}</strong>
                                            </td>
                                        </tr>
                                        {order.isPaid &&
                                            <tr>
                                                <th scope="row">Paid On:</th>
                                                <td>{formattedPaymentDate}</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="order-items col-lg-10">
                                <h3 className="mt-3 mb-2">Order Items</h3>
                                {orderItemsMarkup}
                            </div>
                        </div>
                        <div className="summary-container col-lg-4">
                            <table className="table table-striped">
                                <thead>
                                        <tr><th className="px-0"><h3>Order Summary</h3></th></tr>
                                    </thead>
                                <tbody>
                                    <tr>
                                        <td>Item(s) Subtotal</td>
                                        <td>
                                            &#8377; {order.totalPrice.toLocaleString('en-IN')}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Shipping</td>
                                        <td>
                                            &#8377; {order.shippingPrice.toLocaleString('en-IN')}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Tax</td>
                                        <td>
                                            &#8377; {order.taxPrice.toLocaleString('en-IN')}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>Grand Total</strong></td>
                                        <td>
                                            <strong>&#8377; {grandTotal.toLocaleString('en-IN')}</strong>
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
