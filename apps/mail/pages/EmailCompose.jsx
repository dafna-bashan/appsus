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
            sentAt: Date.now()
            // sentAt: new Date().toLocaleTimeString()
        }
    }

    handleChange = (ev) => {
        ev.preventDefault()
        console.log('hendle change in email compose')
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
        console.log('onAddMail in EmailCompose')
        ev.preventDefault()
        this.props.onAddMail(this.state.mail)

    }


    render() {
        return (
            <React.Fragment >
             <div className="email-compose"> 
            <div className="new-msg-header">New Messege</div>
            <form className="compose-mail-row" onSubmit={this.onAddMail}>
                <input className="compose-mail-row" type="text" id="to" name="to" placeholder="To:"  onChange={this.handleChange} />
                <input className="compose-mail-row" type="text" id="subject" name="subject" placeholder="Subject" onChange={this.handleChange} required />
                <div>
                    <textarea className="" name="body" id="body" onChange={this.handleChange} ></textarea>
                </div>
                <button className="send-mail">Send</button>
            </form>
            </div>
            </React.Fragment>
        )
    }

}