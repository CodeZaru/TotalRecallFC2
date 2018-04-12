import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Popover, PopoverInteractionKind, Position } from '@blueprintjs/core'
import NewDeckForm from './NewDeckForm'

class Header extends Component {
  constructor(props) {
    super(props)
    this.closePopover = this.closePopover.bind(this)
    this.state = {
      popoverOpen: false
    }
  }

  closePopover() {
    this.setState({ popoverOpen: false })
  }

  render() {
    return (
      <nav className="pt-navbar">
        <div className="pt-navbar-group pt-align-left">
          <div className="pt-navbar-heading">Total Recall Flash Card Creator</div>
          {this.props.authenticated
              ? <input className="pt-input" placeholder="Search Decks..." type="text" />
              : null
          }
        </div>
        {
          this.props.authenticated
          ? (
            <div className="pt-navbar-group pt-align-right">
              <Link className="pt-button pt-minimal" to="/decks">Decks</Link>
              <Popover
                content={(<NewDeckForm addDeck={this.props.addDeck} postSubmitHandler={this.closePopover} />)}
                interactionKind={PopoverInteractionKind.CLICK}
                isOpen={this.state.popoverOpen}
                onInteraction={(state) => this.setState({ popoverOpen: state })}
                position={Position.BOTTOM}>
                <button className="pt-button pt-minimal pt-icon-add" aria-label="add new deck"></button>
              </Popover>
              <span className="pt-navbar-divider"></span>
              <button className="pt-button pt-minimal pt-icon-user"></button>
              <button className="pt-button pt-minimal pt-icon-cog"></button>
              <Link className="pt-button pt-minimal pt-icon-log-out" to="/logout" aria-label="Log Out"></Link>
            </div>
          )
            : (
              <div className="pt-navbar-group pt-align-right">
                <Link className="pt-button pt-intent-primary" to="/login">Register/Log In</Link>
              </div>
            )
        }
      </nav>
    );
  }
}

export default Header;
