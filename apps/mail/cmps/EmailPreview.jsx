const { Link } = ReactRouterDOM

export function EmailPreview({ email }) {
  return (
    <Link to={`/email/${email.id}`}>
    <article className="email-preview" >
      <p>{email.title}</p>
      <p>{email.body}</p>
    </article>
    </Link>
  )
}