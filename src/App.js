import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Spinner } from '@blueprintjs/core';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Logout from './components/Logout';
import DeckEditor from './components/DeckEditor';
import DeckList from './components/DeckList';
import { app, base } from './base';

function AuthenticatedRoute({component: Component, authenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
          ? <Component {...props} {...rest} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} /> } />
  )
}

function ShowRoute({component: Component, items, param, ...rest}) {
  return (
    <Route
      {...rest}
      render={({match, ...props}) => {
        if (rest.requireAuth === true && !rest.authenticated) {
          return (
            <Redirect to={{pathname: '/login', state: {from: props.location}}} />
          )
        }

        const item = items[match.params[param]]
        if (item) {
          return <Component item={item} {...props} match={match} {...rest}/>
        } else {
          return <h1>Not Found</h1>
        }
      }}
    />
  )
}

class App extends Component {
  constructor() {
    super();
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.addDeck = this.addDeck.bind(this);
    this.updateDeck = this.updateDeck.bind(this);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: true,
      decks: { }
    };
  }

  addDeck(title) {
    const decks = {...this.state.decks};
//    const id = Date.now();
    const id = title + this.state.currentUser.uid;
    decks[id] = {
      id: id,
      title: title,
      owner: this.state.currentUser.uid
    };

    this.setState({decks});
  }

 /*
  addDeck(title) {
  const decks = {...this.state.decks};
    //const deckKey = title + this.state.currentUser.uid;
    const id = title + this.state.currentUser.uid;
    //const id = Date.now();
    decks[id] = {
      id: id,
      title: title,
      owner: this.state.currentUser.uid
    };
     deckTitles.child(id).set({
      "question": "question text",
      "answer": "answer text"
     });

    this.setState({decks});
  }
*/

  updateDeck(deck) {
    const decks = {...this.state.decks};
    decks[deck.id] = deck;

    this.setState({decks});
  }

   setCurrentUser(user) {
    if (user) {
      this.setState({
        currentUser: user,
        authenticated: true
      })
    } else {
      this.setState({
        currentUser: null,
        authenticated: false
      })
    }
  }

  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          currentUser: user,
          loading: false,
        })

        this.decksRef = base.syncState(`decks/${user.uid}`, {
          context: this,
          state: 'decks'
        });
      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
          loading: false,
        })

        base.removeBinding(this.decksRef);
      }
    })
  }

  componentWillUnmount() {
    this.removeAuthListener();
    base.removeBinding(this.decksRef);
  }

  render() {
    if (this.state.loading === true) {
      return (
        <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
          <h3>Loading</h3>
          <Spinner />
        </div>
      )
    }

    return (
      <div style={{maxWidth: "1160px", margin: "0 auto"}}>
        <BrowserRouter>
          <div>
            <Header addDeck={this.addDeck} authenticated={this.state.authenticated} />
            <div className="main-content" style={{padding: "1em"}}>
              <div className="workspace">
                <Route exact path="/login" render={(props) => {
                  return <Login setCurrentUser={this.setCurrentUser} {...props} />
                }} />
                <Route exact path="/logout" component={Logout} />
                <AuthenticatedRoute
                  exact
                  path="/decks"
                  authenticated={this.state.authenticated}
                  component={DeckList}
                  decks={this.state.decks} />
                <ShowRoute
                  path="/decks/:deckId"
                  component={DeckEditor}
                  authenticated={this.state.authenticated}
                  requireAuth={true}
                  param="deckId"
                  updateDeck={this.updateDeck}
                  items={this.state.decks} />
              </div>
            </div>
          </div>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
