import dayjs from 'dayjs'

function Review({ review }) {
    const formattedDate = dayjs(review.createdAt).format('MMM DD, YYYY hh:mm:ss A')

    const ratingStyles = {
        backgroundColor: (review.rating >= 4) ? "green" : (review.rating >= 2) ? "orange" : "red"
    }

    return (
        <div className="review">
            <div className="review-header">
                <h3 className="name">{review.user.name}</h3> 
                <p className="rating" style={ratingStyles}>{review.rating} <i className="fas fa-star"></i></p>
            </div>
            <p className="comment">{review.comment}</p>
            <p className="createdAt">Reviewed on {formattedDate}</p>
        </div>
    )
}

export default Review
