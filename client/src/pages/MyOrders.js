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
        <div>
            <p className="border fs-4 text-info text-center my-4 py-3">You don't have any orders yet</p>
        </div> :
        orders.map(order => {
            const grandTotal = order && order.totalPrice + order.shippingPrice + order.taxPrice

            return (
                <div className="order bg-light mb-2 border p-2" key={order._id} onClick={() => onOrderClicked(order._id)}>
                    <div className="row">
                        <p className="col-md-6 fw-bold">{order.orderNumber}</p>
                        <p className="col-md-6 text-secondary text-md-end">Ordered On: {dayjs(order.createdAt).format("MMM DD, YYYY")}</p>
                    </div>
                    <p>Order Total: <strong>&#8377; {grandTotal.toLocaleString('en-IN')}</strong></p>
                    <div className="row">
                        <p className="text-success fw-bold col-md-6">Paid On: {dayjs(order.paymentDetails.paymentTime).format("MMM DD, YYYY")}</p>
                        <p className="col-md-6 text-md-end" 
                            style={{color: order.isDelivered ? "green": "red"}}>
                            <strong>{order.isDelivered ? "Delivered" : "Not Delivered"}</strong>
                        </p>
                    </div>
                </div>
            )
        }))

    return (
        <section className="order-list">
            {loading ? <Loader /> :
                <div className="container col-md-9 col-lg-6 my-3">
                    <h1 className="mt-3 mb-2">My Orders</h1>
                    {orderListMarkup}
                </div>
            }
        </section>
    )
}

export default MyOrders
