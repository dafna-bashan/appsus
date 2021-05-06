


export class EmailFilter extends React.Component {

    state = {
        // filterBy: {
        //     all: true,
        //     read: false,
        //     unread: false,
        // },
        // value: 'All'
        filterBy: 'All',
        isShow: {
            read: true,
            unread: true
        }
    }

    // inputRef = React.createRef()

    componentDidMount() {
        // We dont use dqs in react, instead use Ref
        // document.querySelector('input')
        // console.log(this.inputRef);
        // this.inputRef.current.focus()
    }

    setSelectedOption = (ev) => {
        this.setState({ value: ev.target.value });
        console.log(this.state.value)
    }

    handleChange = (ev) => {
        var filterValue = ev.target.value
        console.log(filterValue)
        this.setState(({ filterBy }) => (
            {filterBy: filterValue}
            ), () => {
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
                {/* <div className="email-filter"> */}
                {/* <label htmlFor="byVendor">By vendor</label>
            <input type="text" id="byVendor" ref={this.inputRef} name="vendor" value={vendor} onChange={this.handleChange} />
            <label htmlFor="minSpeed">Min speed</label>
            <input type="number" id="minSpeed" name="minSpeed" value={minSpeed} onChange={this.handleChange} /> */}

                {/* <select id="myList" onChange={this.setSelectedOption}>  */}
                <select id="myList" onChange={this.handleChange}>
                    {/* <option> choose </option> */}
                    <option> All </option>
                    <option> Read </option>
                    <option> Unread </option>
                </select>
                {/* </div> */}
            </form>
        )
        {/* <button>Filter</button> */ }
    }

}