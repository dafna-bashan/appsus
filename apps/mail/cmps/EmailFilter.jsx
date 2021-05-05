


export class EmailFilter extends React.Component {

    state = {
        filterBy: {
            read: false,
            unread: false,
        }
    }

    // inputRef = React.createRef()

    componentDidMount() {
        // We dont use dqs in react, instead use Ref
        // document.querySelector('input')
        // console.log(this.inputRef);
        // this.inputRef.current.focus()
    }

    handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value
        this.setState(({ filterBy }) => ({
            filterBy: { ...filterBy, [field]: value }
        }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
        console.log(this.state.filterBy)
    }

    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
    }

    render() {
        const { read, unread } = this.state.filterBy
        return (

            <form className="email-filter" onSubmit={this.onFilter}>
                {/* <label htmlFor="byVendor">By vendor</label>
            <input type="text" id="byVendor" ref={this.inputRef} name="vendor" value={vendor} onChange={this.handleChange} />
            <label htmlFor="minSpeed">Min speed</label>
            <input type="number" id="minSpeed" name="minSpeed" value={minSpeed} onChange={this.handleChange} /> */}

                <select id="myList" onChange={this.handleChange} >
                <option> choose </option>
                    <option> Read </option>
                    <option> UnRead </option>
                </select>
                <button>Filter</button>
            </form>
        )
    }

}