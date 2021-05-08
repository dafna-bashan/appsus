const { Link } = ReactRouterDOM

import { emailService } from '../services/email-service.js'

export class EmailDetails extends React.Component {

    state = {
        email: null
    }

    componentDidMount() {
        console.log('didMount in email details')
        this.loadEmail()
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevProps.match.params.mailId !== this.props.match.params.mailId) {
    //         this.loadEmail()
    //     }
    // }

    loadEmail() {
        const id = this.props.match.params.mailId
        console.log(id);
        emailService.getEmailById(id).then(email => {
            if (!email) {
                console.log('no email found');
                return this.props.history.push('/')
            }
            this.setState({ email })
        })
        console.log(this.state.email)
    }

    onDeleteEmail = () => {
        console.log('on delete email')
        emailService.deleteEmail(this.state.email.id)
            .then(() => {
                this.props.history.push('/mail')
            })
    }

    timeToShow = (email) => {
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


    render() {
        console.log('render in email details')
        const { email } = this.state
        if (!email) return <div>Loading...</div>
        return (
            < React.Fragment >
                <div className="email-details">
                    <div className="email-content">
                    <h2>{email.subject}</h2>
                    <p>{this.timeToShow(email)}</p>
                    <p>{email.body}</p>
                    <img className="delete-mail" onClick={this.onDeleteEmail}></img>
                    </div>
                </div>
            </ React.Fragment >

        )
    }

}
