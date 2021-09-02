import { useDispatch } from "react-redux";
import { addProductToCart, removeProductFromCart } from "../redux/actions/userActions";

function CartItem({ cartItem }) {
    const { product, quantity } = cartItem

    const dispatch = useDispatch()

    const quantityOptionsMarkup = getQuantityOptionsMarkup(product.stockCount)

    function getQuantityOptionsMarkup(qty) {
        const totalOptions = qty < 10 ? qty : 10
        const totalOptionsArray = Array.from({ length: totalOptions }, (_, index) => index + 1)

        return totalOptionsArray.map(item => <option key={item} value={item}>{item}</option>)
    }

    function handleQuantityChange(e) {
        dispatch(addProductToCart(product._id, e.target.value))
    }

    function onDeleteButtonClicked() {
        dispatch(removeProductFromCart(product._id))
    }

    return (
        <div className="cart-product">
            <div className="img-container">
                <img src={product.imageUrl} alt={product.name} />
            </div>
            <h3 className="title">{product.name}</h3>
            <p className="price">&#8377; {product.price.toLocaleString('en-IN')}</p>
            <div className="quantity">
                <select
                    value={quantity}
                    onChange={handleQuantityChange}
                >
                    {quantityOptionsMarkup}
                </select>
            </div>
            <button 
                onClick={onDeleteButtonClicked}
                className="btn-delete"
            >
                <i className="fas fa-trash"></i>
            </button>
        </div>
    )
}

export default CartItem
