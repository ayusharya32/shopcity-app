import { useHistory } from "react-router-dom"

function Product({ product }) {
    const history = useHistory()

    const ratingStyles = {
        backgroundColor: product && 
            ((product.rating >= 4) ? "green" : 
            (product.rating >= 2) ? "orange" : 
            (product.rating >= 2) ? "red" : "#64C9CF")
    }

    function onProductClicked(e) {
        history.push(`/products/${product._id}`)
    }

    return (
        <div className="col-md-6 col-xl-4 p-2" onClick={onProductClicked}>
            <div className="product h-100" onClick={onProductClicked}>
                <div className="img-container">
                    <img src={product.imageUrl} alt={product.name} />
                </div>
                <div className="content">
                    <h3 className="title">{product.name}</h3>
                    <p className="price">&#8377; {product.price.toLocaleString('en-IN')}</p>
                    <div className="feedback">
                        <p className="rating" style={ratingStyles}>{product.rating} <i className="fas fa-star"></i></p>
                        <p className="reviews">({product.reviews.length})</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
