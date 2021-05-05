import { emailService } from '../services/email-service.js'
import { utilService } from '../../../services/util-service.js'


export class EmailCompose extends React.Component {

    state = {
        mail: {
            id: utilService.makeId(),
            subject: '',
            from: '',
            to: '',
            body: '',
            readAt: new Date()
        }
    }

    handleChange = (ev) => {
        ev.preventDefault()
        const field = ev.target.name
        const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value
        this.setState(prevState => ({
            mail: {
                ...prevState.mail,
                [field]: value
            }
        }))
    }
    onAddMail = (ev) => {
        ev.preventDefault()
        console.log('onAddMail')
        // const mailId = this.props.match.params.mailId;
        emailService.composeMail(this.state.mail)
            .then(this.closeModal)
            // .catch(err => console.log(err, 'error on submit'))
    }

    // .then((books) => {
    //     this.setState((prevState) => ({ ...prevState.search, results: books }));

    closeModal = () => {
        // const mailId = this.props.match.params.mailId;
        this.props.history.push(`/mail`)
    }

    render() {
        return (
            <form className="review-add" onSubmit={this.onAddMail}>
                {/* <label htmlFor="name">Subject</label> */}
                <input type="text" id="subject" name="subject" placeholder="Subject" onChange={this.handleChange} required />
                <div>
                    <textarea name="txt" id="txt" cols="30" rows="3" onChange={this.handleChange} ></textarea>
                </div>
                <button>Send</button>
            </form>
        )
    }

}