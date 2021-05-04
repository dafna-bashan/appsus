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

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.emailId !== this.props.match.params.emailId) {
            this.loadEmail()
        }
    }

    loadEmail() {
        const id = this.props.match.params.emailId
        emailService.getEmailById(id).then(email => {
            if (!email) return this.props.history.push('/')
            this.setState({ email })
        })
    }

    // onDeleteEmail = () => {
    //     carService.deleteEmail(this.state.email.id)
    //         .then(() => {
    //             this.props.history.push('/mail')
    //         })
    // }

    render() {
        console.log('render in email details')
        const { email } = this.state
        if (!email) return <div>Loading...</div>
        return (
            <div>
                <h2>all the mail</h2>
                <p>({email.body})</p>
                {/* <button onClick={() => this.props.history.push('/mail')} > Go back</button> */}

            </div>

        )
    }

}
