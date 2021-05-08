export function ReviewPrev({ review, removeReview }) {

    return <div className="review-prev">
        <div>
            <h4>{review.name}</h4><span>{`${review.readAt} | rate: ${review.rate}`}</span>
            <button className="remove" onClick={() => removeReview(review.id)}>X</button>
        </div>
        <p>{review.txt}</p>
        <hr/>
    </div>

}