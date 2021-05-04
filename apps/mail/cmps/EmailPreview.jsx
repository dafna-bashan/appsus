const { Link } = ReactRouterDOM

export function EmailPreview({ email }) {
console.log('email.id in preview' ,email.id)
  return (
    <Link to={`/mail/${email.id}`}>
      <article className={`email-preview ${email.isRead ? "read" : "unread"}`} >
        <p>{email.isRead ? "read" : "unread"}</p>
        <p>{email.subject}</p>
        <p>{email.body}</p>
      </article>
    </Link>
  )
}