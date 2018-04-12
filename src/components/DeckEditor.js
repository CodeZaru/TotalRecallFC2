import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class DeckEditor extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const deck = {...this.props.item};

    this.props.updateDeck(deck);
  }

  render() {
    const { item: deck } = this.props

    return (
      <div>
        <ul className="pt-breadcrumbs">
          <li><Link to="/decks" className="pt-breadcrumb">Decks</Link></li>
          <li><Link to="#" className="pt-breadcrumb">{deck.title}</Link></li>
        </ul>
        <h2 style={{margin: "0.5em 0"}}>{deck.title}</h2>
        <div className="deck-editor">
          <div className="panel">
            <h3>Question</h3>
            <textarea
              style={{width: "100%", height: "100%"}}
              />
          </div>
          <div className="panel">
            <h3>Answer</h3>
            <textarea
              style={{width: "100%", height: "100%"}}
              />
          </div>
        </div>
      </div>
    );
  }
}

export default DeckEditor;
