import React, { Component } from 'react'

const newDeckStyles = {
  padding: '10px'
}

class NewDeckForm extends Component {
  constructor(props) {
    super(props)
    this.createDeck = this.createDeck.bind(this)
  }

  createDeck(event) {
    event.preventDefault()

    const title = this.titleInput.value
    this.props.addDeck(title)

    this.deckForm.reset()
    this.props.postSubmitHandler()
  }

  render() {
    return (
      <div style={newDeckStyles}>
        <form onSubmit={(event) => this.createDeck(event)} ref={(form) => this.deckForm = form }>
          <label className="pt-label">
            Deck Title
            <input style={{width: "100%"}} className="pt-input" name="title" type="text" ref={(input) => { this.titleInput = input }} placeholder="TRFC1"></input>
          </label>
          <input style={{width: "100%"}} type="submit" className="pt-button pt-intent-primary" value="Create Deck"></input>
        </form>
      </div>
    )
  }
}

export default NewDeckForm
