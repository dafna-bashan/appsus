const { Link } = ReactRouterDOM

import { emailService } from '../services/email-service.js'
import { EmailList } from '../cmps/EmailList.jsx'

export class EmailApp extends React.Component {
    state = {
        emails: null,
        filterBy: null,
        // selectedEmail: null
    }
    componentDidMount() {
        // this.loadEmails()
    }

    loadEmails() {
        emailService.query(this.state.filterBy).then((emails) => {
            console.log(emails);
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
                <BookList emails={emails}></BookList>
                    {/* {!selectedEmail && <React.Fragment>
                        <BookFilter onSetFilter={this.onSetFilter} />
                        <BookList emails={emails} setSelectedEmails={this.setSelectedEmail} />
                    </React.Fragment>} */}
                    {/* {selectedEmail &&
                        <BookDetails className="email-details" book={selectedEmail} goBack={() => this.setSelectedEmail(null)} />} */}
                </section>
            </div>
        )
    }
}