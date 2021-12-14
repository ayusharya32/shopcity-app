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
                <div className="container px-5">
                    <div className="flex-container row">
                        <div className="img-container col-12 col-lg-6">
                            <img class="img-fluid" src={product.imageUrl} alt={product.name} />
                        </div>
                        <div className="purchase-table col-12 col-lg-6 py-2 container">
                            <table className="table table-striped table-bordered">
                                <tbody>
                                    <tr>
                                        <th scope="row">Price:</th>
                                        <td>
                                            <strong>&#8377; {product.price.toLocaleString('en-IN')}</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Status:</th>
                                        <td 
                                            style={isProductInStock ? {color: "green"} : {color: "red"}}
                                        >
                                            <strong>{productInStockMarkup}</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Quantity:</th>
                                        <td>
                                            <select
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}    
                                            >
                                                {quantityOptionsMarkup}
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" className="text-center">
                                            {userLoading ? <Loader /> : 
                                                <button 
                                                onClick={onAddToCartButtonClicked}
                                                className="btn btn-primary"
                                                disabled={!isProductInStock || isProductInCart}
                                            >
                                                {isProductInCart ? "Product In Cart" : "Add To Cart"}
                                            </button>
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <h1 className="mt-3 fs-3 fw-bold pb-1">{product.name}</h1>
                        <h3 className="fs-3 fw-bold text-black-50">{product.brand}</h3>
                        <p className="py-3">{product.description}</p>
                        <p className="mb-2 py-1 px-2 d-inline-block text-white" style={ratingStyles}>
                            {product.rating} <i className="fas fa-star"></i>
                        </p>
                        <hr />
                    </div>
                    <div>
                        <h1 className="fw-bold mt-1 mb-2 text-primary">Reviews ({product.reviews.length})</h1>
                        { reviewsMarkup }
                        { !isProductReviewed && <CreateReviewDialog productId={productId} />}
                    </div>
                </div>
            }
        </section>
    )
}

export default ProductDetails
