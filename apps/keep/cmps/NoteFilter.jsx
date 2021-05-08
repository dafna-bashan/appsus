export class NoteFilter extends React.Component {

    state = {
      filterBy: {
          title: ''
      }
    }
  
    handleChange = (ev) => {
      const field = ev.target.name
      const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value
      this.setState({ filterBy: { ...this.state.filterBy, [field]: value } }, () => {
        this.props.onSetFilter(this.state.filterBy)
      })
    }
  
    onFilter = (ev) => {
      ev.preventDefault()
      this.props.onSetFilter(this.state.filterBy)
    }
  
    render() {
      const { title } = this.state.filterBy
      return (
        <div className="filter-container container flex">
          <form className="note-filter" onSubmit={this.onFilter}>
            {/* <label htmlFor="byTitle">By Title</label> */}
            <input type="text" id="byTitle" name="title" value={title} onChange={this.handleChange} placeholder="search notes by title"/>
            {/* <button>Filter</button> */}
          </form>
        </div>
        )
    }
  }