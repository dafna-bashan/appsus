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
            readAt: Date.now()
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
        console.log('onAddMail state mail',this.state.mail)
        emailService.composeMail(this.state.mail)

            // .then(() => {
            //     this.props.history.push('/mail')
            // })
    }




    render() {
        return (
            <form className="review-add" onSubmit={this.onAddMail}>
                {/* <label htmlFor="name">Subject</label> */}
                <input type="text" id="subject" name="subject" placeholder="Subject" onChange={this.handleChange} required />
                <div>
                    <textarea name="body" id="body" cols="30" rows="3" onChange={this.handleChange} ></textarea>
                </div>
                <button>Send</button>
            </form>
        )
    }

}