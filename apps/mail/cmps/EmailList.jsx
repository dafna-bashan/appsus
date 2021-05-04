import { EmailPreview } from './EmailPreview.jsx'

export function EmailList({ emails, onSelectEmail }) {
  return (
    <div className="email-list">
      { emails.map(email => <BookPreview email={email} key={email.id} onSelectEmail={onSelectEmail} />)}
    </div>
  )
}