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
            sentAt: Date.now()
        },
        filterBy: {
            readFilter: 'All',
            searchText: null
        },
        SortBy: 'Date'
    }
    componentDidMount() {
        console.log('didMoint in EmailApp')
        // if (this.state.isToShowCompose) this.setState({ isComposeMode: true })
        // else this.props.history.push('/mail')
        this.loadEmails()
    }

    componentDidUpdate() {
        // this.isOpenCompose()
    }

    loadEmails() {
        emailService.query(this.state.filterBy, this.state.SortBy).then((emails) => {
            this.setState({ emails })
        })
    }

    isOpenCompose = () => {
        this.setState({ isToShowCompose: true })
    }


    onMarkMail = (mailId) => {
        // console.log('to mark mail as read/unread')
        emailService.markMail(mailId)
            .then(emails => { this.setState({ emails }) })
        // console.log(mailId)
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
                this.loadEmails()
            })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadEmails)
    }

    handleSortChange = (ev) => {
        const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value
        this.setState({ SortBy: value }, () => {
            this.onSetSort(this.state.SortBy)
        })
    }


    onSort = () => {
        this.onSetSort(this.state.SortBy)
    }


    onSetSort = (SortBy) => {
        this.setState({ SortBy }, this.loadEmails)
        Cconsole.log(SortBy)
    }


    render() {
        console.log('RENDER im EmailApp!', this.state.emails);
        const { emails } = this.state
        if (!emails) return <div>Loading...</div>
        return (
            <div>
                <section className="email-app container">
                    <Link to={`/mail/?compose=new`}>
                        {!this.state.isComposeMode && <button className="compose-btn" onClick={this.isOpenCompose}>compose</button>}
                    </Link>
                    {this.state.isToShowCompose && <EmailCompose onAddMail={this.onAddMail} mailToCompose={this.mailToCompose} />}
                   <EmailFilter onSetFilter={this.onSetFilter} />
                    <form className="email-sort-form" onSubmit={() => onSort()}>
                        <select  className="email-sort" id="sortBy" name="sortBy" onChange={this.handleSortChange}>
                            <option> Date </option>
                            <option> Subject </option>
                        </select>
                    </form>
                    <EmailList emails={emails} onMarkMail={this.onMarkMail} onDeleteEmail={this.onDeleteEmail} />
                </section>
            </div>
        )
    }
}




