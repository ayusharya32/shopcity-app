import dayjs from 'dayjs'

function Review({ review }) {
    const formattedDate = dayjs(review.createdAt).format('MMM DD, YYYY hh:mm:ss A')

    const ratingStyles = {
        backgroundColor: (review.rating >= 4) ? "green" : (review.rating >= 2) ? "orange" : "red"
    }

    return (
        <div className="mb-2">
            <div className="border bg-light p-2">
                <div>
                    <h3 className="fs-5 mb-2">{review.user.name}</h3> 
                    <p className="d-inline-block text-white fs-6 px-2 py-1" style={ratingStyles}>{review.rating} <i className="fas fa-star"></i></p>
                </div>
                <p className="mt-2 text-break">{review.comment}</p>
                <p className="text-black-50 font-monospace fs-6">Reviewed on {formattedDate}</p>
            </div>
        </div>
    )
}

export default Review
