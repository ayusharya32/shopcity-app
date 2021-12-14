import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import CartItem from "../components/CartItem"
import Loader from "../components/Loader"

function Cart({ history }) {
    const userState = useSelector(state => state.userState)
    const { user, loading } = userState

    const cartItemsMarkup = (user && !loading) && (
        user.cartItems.map(cartItem => <CartItem key={cartItem.product._id} cartItem={cartItem}/>)
    )

    const totalItems = user ? user.cartItems.reduce((acc, cartItem) => {
        return acc + cartItem.quantity
    }, 0) : 0

    const totalPrice = user ? user.cartItems.reduce((acc, cartItem) => {
        return acc + (cartItem.quantity * cartItem.product.price)
    }, 0) : 0

    function onProceedToCheckoutButtonClicked() {
        history.push("/shipping")
    }

    return (
        <section className="mb-3">
            { user && user.cartItems.length === 0 ? 
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <h1 className="my-4">Cart is Empty</h1>
                    <Link className="btn btn-primary" to="/">Continue Shopping</Link>
                </div> :   
                <div className="container">
                <h1 className="my-3 ms-1">Shopping Cart</h1>
                <div className="row">
                    <div className="col-lg-9">
                        {loading ? <Loader /> : cartItemsMarkup}
                    </div>
                    <div className="container col-lg-3 px-4">
                        <div className="border p-3 bg-light text-center">
                            <h1 className="fs-4"><strong>Subtotal({totalItems} items): <br /> &#8377; {totalPrice.toLocaleString('en-IN')}</strong></h1>
                            <button 
                                onClick={onProceedToCheckoutButtonClicked}
                                className="btn btn-primary mt-3 text-center"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            }
        </section>
    )
}

export default Cart
