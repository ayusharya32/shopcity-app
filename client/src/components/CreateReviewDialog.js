import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addReviewToProduct } from "../redux/actions/productActions"
import Loader from "./Loader"

function CreateReviewDialog({ productId }) {
    const [showDialog, setShowDialog] = useState(false)

    const dispatch = useDispatch()
    const productState = useSelector(state => state.productState)

    const { loading } = productState

    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(1)

    function onReviewFormSubmitted(e) {
        e.preventDefault()

        dispatch(addReviewToProduct(productId, comment, rating))
    }

    function getRatingOptionsMarkup() {
        const optionsArray = Array.from({ length: 5 }, (_, index) => index + 1)

        return optionsArray.map(item => {
            return (
                <label key={item}>
                    <input 
                        type="radio" 
                        value={item} 
                        onChange={(e) => setRating(e.target.value)}
                        name="rating-count" />

                    {/* eslint-disable-next-line */}
                    <span style={{backgroundColor: item == rating ? "#DF711B" : "#0A81AB"}}>
                        {item} <i className="fas fa-star"></i>    
                    </span>
                </label>
            )
        })
    } 

    function handleModalClose(e) {
        if(e.target.className === "modal-overlay") {
            setShowDialog(false)
        }
    }

    return (
        <>
            <button onClick={() => setShowDialog(true)} className="btn-review btn-primary">Write a Review</button>
            { showDialog && 
                <div className="modal-overlay" onClick={handleModalClose}>
                    <div className="create-review-dialog">
                        { loading ? <Loader /> : 
                            <form onSubmit={onReviewFormSubmitted}>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Comment..">
                                </textarea>
                                <div className="rating-scale-container">
                                    <div className="rating-scale">
                                        { getRatingOptionsMarkup() }
                                    </div>
                                </div>
                                <button className="btn-primary">Post Review</button>
                            </form>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default CreateReviewDialog
