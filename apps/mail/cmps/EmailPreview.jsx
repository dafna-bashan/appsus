const { Link } = ReactRouterDOM


export function EmailPreview({ email , onMarkMail}) {


  return (
    

    <React.Fragment >
      <tr className={`email-preview ${email.isRead ? "read" : "unread"}`} >
        <td>{email.isRead ? "read" : "unread"}</td>
        <td>
          <Link to={`/mail/det/${email.id}`}>
            {email.subject}
          </Link>
        </td>
        <td>
          <Link to={`/mail/det/${email.id}`}>
            {email.body}
          </Link>
        </td>
        <td><img className="delete-mail"></img></td>
        <td><img className={`img-${email.isRead ? "read" : "unread"}`} onClick={() => onMarkMail(email.id)}></img></td>
        {/* <td><button>button</button></td> */}
      </tr>
    </React.Fragment>
  )
}


{/* <article className={`email-preview ${email.isRead ? "read" : "unread"}`} >
<p>{email.isRead ? "read" : "unread"}</p>
<p>{email.subject}</p>
<p>{email.body}</p>
</article> */}

