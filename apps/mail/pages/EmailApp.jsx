const { Link } = ReactRouterDOM

import { utilService } from '../../../services/util-service.js'
import { emailService } from '../services/email-service.js'
import { EmailList } from '../cmps/EmailList.jsx'
import { EmailFilter } from '../cmps/EmailFilter.jsx'
import { EmailCompose } from '../pages/EmailCompose.jsx'

export class EmailApp extends React.Component {
    state = {
        emails: null,
        isComposeMode: false,
        isToShowCompose: false,
        mailToCompose: {
            id: utilService.makeId(),
            subject: '',
            from: '',
            to: '',
            body: '',
            readAt: Date.now()
        },
        filterBy: {
            readFilter: 'All',
            searchText: null
        }
    }
    componentDidMount() {
        console.log('didMoint in EmailApp')
        if (this.state.isToShowCompose) this.setState({isComposeMode: true})
        this.loadEmails()
    }

    componentDidUpdate() {
        // this.isOpenCompose()
    }

    loadEmails() {
        emailService.query(this.state.filterBy).then((emails) => {
            this.setState({ emails })
        })
    }

    isOpenCompose = () => {
        console.log('isCompose')
        var searchParams = new URLSearchParams(this.props.location.search);
        var params = searchParams.get('compose')
        console.log('params', params)
        params && this.setState({ isToShowCompose: true })
    }

    // onCompose = () => {
    //     console.log('hello')
    //     this.setState({ isCompose: true })
    //     console.log('isCompose:', isCompose)
    // }

    onMarkMail = (mailId) => {
        console.log('to mark mail as read/unread')
        emailService.markMail(mailId)
            .then(emails => { this.setState({ emails }) })
        console.log(mailId)
    }


    onAddMail = (mailToCompose) => {
        // ev.preventDefault()
        console.log('onAddMail')
        console.log('onAddMail state mail', this.state.mailToCompose)
        emailService.composeMail(mailToCompose)
            .then(emails => { this.setState({ emails }) })
            .then(emails => { this.setState({ isComposeMode: false }) })
            .then(emails => { this.setState({ isToShowCompose: false }) })
            .then(emails => { this.props.history.push('/mail') })


    }

    onDeleteEmail = (emailId) => {
        console.log('on delete email')
        emailService.deleteEmail(emailId)
            .then(() => {
                this.props.history.push('/mail')
            })
    }


    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadEmails)
    }

    render() {
        console.log('RENDER im EmailApp!', this.state.emails);
        const { emails } = this.state
        if (!emails) return <div>Loading...</div>
        return (
            <div>                
                <section className="container">
                <EmailFilter onSetFilter={this.onSetFilter} />-
                    <h1>Your emails</h1>
                <EmailList emails={emails} onMarkMail={this.onMarkMail} onDeleteEmail={this.onDeleteEmail} />
                {/* <button onClick={() => {
                        this.setState({ isCompose: true })
                    }}>Compose new mail</button> */}
                <Link to={`/mail/?compose=new`}>
                    {!this.state.isComposeMode && <h2 onClick={this.isOpenCompose}>compose</h2>}
                    {/* {!this.state.isCompose && <h2 onClick={this.isOpenCompose}>compose</h2>} */}
                </Link>
                {this.state.isToShowCompose && <EmailCompose onAddMail={this.onAddMail} mailToCompose={this.mailToCompose} />}
                {/* {this.state.isCompose && <Link to={`/mail/compose`} onAddMail={this.onAddMail} mailToCompose={this.mailToCompose}>link</Link>} */}
            </section>
            </div>
        )
    }
}