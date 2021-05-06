const { Link } = ReactRouterDOM

import { utilService } from '../../../services/util-service.js'
import { emailService } from '../services/email-service.js'
import { EmailList } from '../cmps/EmailList.jsx'
import { EmailFilter } from '../cmps/EmailFilter.jsx'
import { EmailCompose } from '../pages/EmailCompose.jsx'

export class EmailApp extends React.Component {
    state = {
        emails: null,
        isCompose: false,
        mailToCompose: {
            id: utilService.makeId(),
            subject: '',
            from: '',
            to: '',
            body: '',
            readAt: Date.now()
        },
        filterBy: {
            read: null,
            unRead: null
        }
    }
    componentDidMount() {
        console.log('didMoint in EmailApp')
        this.loadEmails()
    }
    // componentDidUpdate() {
    //     this.loadEmails()
    // }

    loadEmails() {
        emailService.query(this.state.filterBy).then((emails) => {
            this.setState({ emails })
        })
    }

    onCompose = () => {
        console.log('hello')
        this.setState({ isCompose: true })
        console.log('isCompose:', isCompose)
    }

    onAddMail = (mailToCompose) => {
        // ev.preventDefault()
        console.log('onAddMail')
        console.log('onAddMail state mail', this.state.mailToCompose)
        emailService.composeMail(mailToCompose)
                .then(emails => {this.setState({ emails })} )
                .then(emails => {this.setState({ isCompose: false })} )
                
        //     this.props.history.push('/mail')
        // })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadEmails)
    }

    // setSelectedEmails = (email) => {
    //     this.setState({ selectedBook: email })
    // }
    render() {
        console.log('RENDER im EmailApp!', this.state.emails);
        const { emails } = this.state
        if (!emails) return <div>Loading...</div>
        return (
            <div>
                <section className="container">
                <EmailFilter onSetFilter={this.onSetFilter} />
                    <h1>Your emails</h1>
                    <EmailList emails={emails} />
                    <button onClick={() => {
                        this.setState({ isCompose: true })
                    }}>Compose new mail</button>
                    {this.state.isCompose && <Link to="/mail/:compose"><EmailCompose onAddMail={this.onAddMail} mailToCompose={this.mailToCompose}/></Link> }
                    {/* {this.state.isCompose && <Link to={`/mail/compose`} onAddMail={this.onAddMail} mailToCompose={this.mailToCompose}>link</Link>} */}

                </section>
            </div>
        )
    }
}