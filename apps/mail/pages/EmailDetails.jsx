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

 

    render() {
        console.log('render in email details')
        const { email } = this.state
        if (!email) return <div>Loading...</div>
        return (
            <div className="email-details">
                <h2>all the mail</h2>
                <p>{email.sentAt}</p>
                <p>{email.body}</p>
                <button onClick={this.onDeleteEmail}>Delete Email</button>
                {/* <button onClick={this.onTest}>test</button> */}
                {/* <button onClick={() => this.props.history.push('/mail')} > Go back</button> */}

            </div>

        )
    }

}
