import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Product from "../components/Product";
import { getProductList } from "../redux/actions/productActions";

function Home({ match }) {
    const { keyword } = match.params
    const dispatch = useDispatch()
    const productListState = useSelector(state => state.productListState)

    const { productList, loading, error } = productListState

    useEffect(() => {
        dispatch(getProductList(keyword))
    }, [dispatch, keyword])

    useEffect(() => {
        if(error) {
            toast.error(error.message)
        }

    }, [error])

    const productListMarkup = productList && productList.map(product => {
        return <Product key={product._id} product={product} />
    })

    return (
        <section className="product-list">
            <div className="container" style={loading ? {display: "flex", placeItems: "center"} : {}}>
                { loading ? <Loader /> : match.url.includes("search") && productList.length === 0 
                ? <h1>No Results</h1> : productListMarkup }
            </div>
        </section>
    )
}

export default Home
