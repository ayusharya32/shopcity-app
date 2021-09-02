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
        <section className="cart">
            { user && user.cartItems.length === 0 ? 
                <div className="cart-empty">
                    <h1>Cart is Empty</h1>
                    <Link to="/">Continue Shopping</Link>
                </div> :   
                <div className="container">
                <h1>Shopping Cart</h1>
                <div className="cart-content">
                    <div className="cart-products-list">
                        {loading ? <Loader /> : cartItemsMarkup}
                    </div>
                    <div className="subtotal">
                        <h1>Subtotal({totalItems} items): <br /> &#8377; {totalPrice.toLocaleString('en-IN')}</h1>
                        <button 
                            onClick={onProceedToCheckoutButtonClicked}
                            className="btn-proceed-to-checkout btn-primary"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
            }
        </section>
    )
}

export default Cart
