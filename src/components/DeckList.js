import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const deckListStyles = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
}

const deckCardStyles = {
  maxWidth: "30%",
  minWidth: "150px",
  flex: "1",
  margin: "5px",
}

class DeckList extends Component {
  render() {
    const { decks } = this.props
    const deckIds = Object.keys(decks)

    return (
      <div>
        <h1 style={{marginBottom: "0.5em"}}>Decks</h1>

        <div style={deckListStyles}>
          {deckIds.map((id) => {
            const deck = decks[id]
            return (
              <div key={id} style={deckCardStyles} className="pt-card pt-elevation-0 pt-interactive">
                <h5><Link to={`/decks/${id}`}>{deck.title}</Link></h5>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default DeckList
