import dayjs from "dayjs"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../components/Loader"
import { getUserOrders } from "../redux/actions/orderActions"

function MyOrders({ history }) {
    const dispatch = useDispatch()

    const orderListState = useSelector(state => state.orderListState)
    const { orders, loading } = orderListState

    useEffect(() => {
        dispatch(getUserOrders())
    }, [dispatch])

    function onOrderClicked(orderId) {
        history.push(`/orders/${orderId}`)
    }

    const orderListMarkup = orders && (orders.length === 0 ? 
        <tr>
            <td style={{textAlign: "center", fontWeight: "bold"}} colSpan="5">No Orders</td>
        </tr> :
        orders.map(order => {
            const grandTotal = order && order.totalPrice + order.shippingPrice + order.taxPrice

            return (
                <tr key={order._id} onClick={() => onOrderClicked(order._id)}>
                    <td>{order.orderNumber}</td>
                    <td>{dayjs(order.createdAt).format("MMM DD, YYYY")}</td>
                    <td>&#8377; {grandTotal.toLocaleString('en-IN')}</td>
                    <td>{dayjs(order.paymentDetails.paymentTime).format("MMM DD, YYYY")}</td>
                    <td 
                        style={{color: order.isDelivered ? "green": "red"}}
                        className="delivery-icon">
                        {order.isDelivered ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>}
                    </td>
                </tr>
            )
        }))

    return (
        <section className="order-list">
            {loading ? <Loader /> :
                <div className="container">
                    <h1 className="section-title">My Orders</h1>
                    <table className="orders">
                        <thead>
                            <tr>
                                <th>Order #</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderListMarkup}
                        </tbody>
                    </table>
                </div>
            }
        </section>
    )
}

export default MyOrders
