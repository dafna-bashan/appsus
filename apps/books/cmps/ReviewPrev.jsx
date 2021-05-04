export function ReviewPrev({ review, removeReview }) {

    return <div className="review-prev">
        <div>
            <h4>{review.name}</h4><span>{review.readAt}</span><span>{review.rate}</span>
            <button onClick={() => removeReview(review.id)}>X</button>
        </div>
        <p>{review.txt}</p>
    </div>

}