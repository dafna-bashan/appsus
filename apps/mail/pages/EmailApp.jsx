const { Link } = ReactRouterDOM

import { emailService } from '../services/email-service.js'
import { EmailList } from '../cmps/EmailList.jsx'
import { EmailCompose } from '../cmps/EmailCompose.jsx'

export class EmailApp extends React.Component {
    state = {
        emails: null
    }
    componentDidMount() {
        this.loadEmails()
    }
    // componentDidUpdate() {
    //     this.loadEmails()
    // }

    loadEmails() {
        emailService.query().then((emails) => {
            this.setState({ emails })
        })
    }

    // onSetFilter = (filterBy) => {
    //     this.setState({ filterBy }, this.loadEmails)
    // }

    // setSelectedEmails = (email) => {
    //     this.setState({ selectedBook: email })
    // }
    render() {
        console.log('RENDER im EmailApp!', this.state.emails);
        const { emails, selectedEmailmail } = this.state
        if (!emails) return <div>Loading...</div>
        return (
            <div>
                <section className="container">
                    <h1>Your emails</h1>
                    <EmailList emails={emails} />
                    <EmailCompose />
                    {/* {!selectedEmail && <React.Fragment>
                        <BookFilter onSetFilter={this.onSetFilter} /> //

                        {<BookList emails={emails} setSelectedEmails={this.setSelectedEmail} />}

                    </React.Fragment>} */}
                    {/* {selectedEmail &&
                        <BookDetails className="email-details" book={selectedEmail} goBack={() => this.setSelectedEmail(null)} />} */}
                </section>
            </div>
        )
    }
}