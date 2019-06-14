import React, { Component } from 'react';


export default class App extends Component {
	state = { artistQuery: '' };

	updateArtistQuery = event => {
		console.log('event', event.target.value)
		this.setState({ artistQuery: event.target.value })
	}

	searchArtist = () => {
		console.log('this.state', this.state)
	}

	handleKeyPress = event => {
		if (event.key === 'Enter') {
			console.log('this.state', this.state)	
		}
	}

    render() {
        return (
            <div id="app">
              <h2>Music Master</h2>
              <input
              	onChange={this.updateArtistQuery}
              	onKeyPress={this.handleKeyPress}
              	placeholder='Search for an artist'
              />
              <button onClick={this.searchArtist}>Search</button>
			</div>
        )
    }
}