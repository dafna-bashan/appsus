const { Link } = ReactRouterDOM

import { LongTxt } from '../../../cmps/LongTxt.jsx'

export function EmailPreview({ email, onMarkMail, onDeleteEmail }) {

  function timeToShow() {
    var today = new Date().setHours(0, 0, 0, 0);
    var thatDay = new Date(email.sentAt).setHours(0, 0, 0, 0);
    if (today === thatDay) {
      return new Date(email.sentAt).toLocaleTimeString()
    } else {
      return new Date(email.sentAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }).split(' ').join('-')
    }
  }

  return (
    < React.Fragment >
      <tr className={`email-preview ${email.isRead ? "read" : "unread"}`} >
        <td className="inbox-td">
          <Link to={`/mail/det/${email.id}`}>
            {email.subject}
          </Link>
        </td>
        <td className="inbox-td">
          <Link to={`/mail/det/${email.id}`}>
            <LongTxt text={email.body} isLongTxtShown={false} />
            {/* {email.body} */}
          </Link>
        </td >
        <td className="inbox-td"> {timeToShow()}</td>
        <td className="inbox-td"><img className="delete-mail" onClick={() => onDeleteEmail(email.id)}></img></td>
        <td className="inbox-td"><img className={`img-${email.isRead ? "read" : "unread"}`} onClick={() => onMarkMail(email.id)}></img></td>
      </tr>
    </React.Fragment >
  )
}


