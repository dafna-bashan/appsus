import { EmailPreview } from './EmailPreview.jsx'

export function EmailList({ emails }) {
  console.log('render in email list')
  return (
    <React.Fragment>
      <table className="email-list" >
        <tbody>
          {/* {emails.map(email => <EmailPreview email={email} key={email.id} />)} */}
          {emails.map(email => <EmailPreview email={email} key={email.id} />)}
        </tbody>
      </table>
    </React.Fragment>
  )
}

{/* <div className="email-list">
{ emails.map(email => <EmailPreview email={email} key={email.id} />)}
</div> */}