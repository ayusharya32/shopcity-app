import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, resetProductState } from "../redux/actions/productActions";
import Loader from '../components/Loader'
import Review from '../components/Review'
import { toast } from "react-toastify";
import CreateReviewDialog from "../components/CreateReviewDialog";
import { addProductToCart } from "../redux/actions/userActions";

function ProductDetails({ match }) {
    const { productId } = match.params

    const [quantity, setQuantity] = useState(1)

    const dispatch = useDispatch()
    const productState = useSelector(state => state.productState)
    const { product, loading, error } = productState

    const userState = useSelector(state => state.userState)
    const { user, error: userError, loading: userLoading } = userState

    const isProductInStock = product && product.stockCount > 0 

    const reviewsMarkup = (!loading && product) 
        && product.reviews.map(review => <Review key={review._id} review={review} />)

    const productInStockMarkup = isProductInStock ? "In Stock" : "Out Of Stock"

    const quantityOptionsMarkup = product && getQuantityOptionsMarkup(product.stockCount)

    const isProductReviewed = ((product && user) && product.reviews.find(review => review.user._id === user._id)) 
        ? true : false

    const isProductInCart = (user && user.cartItems.find(cartItem => cartItem.product._id === productId))
        ? true: false
    
    const ratingStyles = {
        backgroundColor: product && 
            ((product.rating >= 4) ? "green" : 
            (product.rating >= 2) ? "orange" : 
            (product.rating >= 2) ? "red" : "#64C9CF")
    }

    useEffect(() => {
        dispatch(getProductById(productId))

        return () => {
            dispatch(resetProductState())
        }
    }, [dispatch, productId])

    useEffect(() => {
        if(error) {
            toast.error(error.message)
        }

        if(userError) {
            toast.error(userError.message)
        }
        
    }, [error, userError])

    function getQuantityOptionsMarkup(qty) {
        const totalOptions = qty < 10 ? qty : 10
        const totalOptionsArray = Array.from({ length: totalOptions }, (_, index) => index + 1)

        return totalOptionsArray.map(item => <option key={item} value={item}>{item}</option>)
    }

    function onAddToCartButtonClicked(e) {
        dispatch(addProductToCart(productId, quantity))
    }

    return (
        <section className="product-details">
            { loading ? <Loader /> :
                product && 
                <div className="container">
                    <div className="flex-container">
                        <div className="img-container">
                            <img src={product.imageUrl} alt={product.name} />
                        </div>
                        <div className="purchase-table">
                            <table className="purchase">
                                <tbody>
                                    <tr>
                                        <td className="title">Price:</td>
                                        <td className="price">&#8377; {product.price.toLocaleString('en-IN')}</td>
                                    </tr>
                                    <tr>
                                        <td className="title">Status:</td>
                                        <td 
                                            className="status"
                                            style={isProductInStock ? {color: "green"} : {color: "red"}}
                                        >
                                            {productInStockMarkup}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="title">Quantity:</td>
                                        <td className="quantity">
                                            <select
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}    
                                            >
                                                {quantityOptionsMarkup}
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="add-to-cart" colSpan="2">
                                            {userLoading ? <Loader /> : 
                                                <button 
                                                onClick={onAddToCartButtonClicked}
                                                className="btn-add-to-cart btn-primary"
                                                disabled={!isProductInStock || isProductInCart}
                                            >
                                                {isProductInCart ? "Product Already In Cart" : "Add To Cart"}
                                            </button>
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="content">
                        <h1 className="title">{product.name}</h1>
                        <h3 className="brand">{product.brand}</h3>
                        <p className="description">{product.description}</p>
                        <p className="rating" style={ratingStyles}>
                            {product.rating} <i className="fas fa-star"></i>
                        </p>
                    </div>
                    <div className="reviews">
                        <h1 className="heading">Reviews ({product.reviews.length})</h1>
                        { reviewsMarkup }
                        { !isProductReviewed && <CreateReviewDialog productId={productId} />}
                    </div>
                </div>
            }
        </section>
    )
}

export default ProductDetails
