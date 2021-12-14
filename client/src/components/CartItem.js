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
        <div className="border row mx-2 mb-2 py-2 bg-light">
            <div className="img-container col-sm-3">
                <img className="img-fluid" src={product.imageUrl} alt={product.name} />
            </div>
            <div className="row col-sm-9">
                <div className="col-12">
                    <h3 className="fs-5 mt-1 mb-2"><strong>{product.name}</strong></h3>
                </div>
                <div className="col-4 m-auto">
                    <p className="text-primary">
                        <strong>&#8377; {product.price.toLocaleString('en-IN')}</strong>
                    </p>
                </div>
                <div className="col-4 m-auto">
                    <div className="quantity">
                        <select
                            value={quantity}
                            onChange={handleQuantityChange}
                        >
                            {quantityOptionsMarkup}
                        </select>
                    </div>
                </div>
                <div className="col-4 m-auto">
                    <button 
                        onClick={onDeleteButtonClicked}
                        className="btn btn-danger"
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartItem
