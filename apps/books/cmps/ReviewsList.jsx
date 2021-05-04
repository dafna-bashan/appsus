import { ReviewPrev } from './ReviewPrev.jsx'

export function ReviewsList({ reviews, removeReview }) {

    if (!reviews || !reviews.length) return <p className="reviews-list"> No reviews yet</p>

    return <section className="reviews-list">
        {reviews.map(review => <ReviewPrev review={review} key={review.id} removeReview={removeReview} />)}
    </section>

}