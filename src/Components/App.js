import React, { Component } from 'react';
import axios from 'axios';
import ArtistList from './ArtistList';

const API_URL = (process.env.NODE_ENV !== 'production') ? 'http://localhost:4321' : 'https://audio-vision.herokuapp.com';

export default class App extends Component {
    state = { query: '', artists: null};

    updateQuery = event => {
        console.log('event', event.target.value)
        this.setState({ query: event.target.value })
    }

    searchArtists = () => {
        let artist = encodeURI(this.state.query)
        axios.get(`http://localhost:4321/artists/${artist}`)
            .then(results => {
                if (results.data.total > 0) {
                    this.setState({
                        artists: results.data.items
                    })
                    console.log("artist search results:", this.state.artists)
                } else { this.setState({ artists: null }) }
            })
            .catch(error => {
                console.log("There was an error fetching artist data", error.message);
            })
        console.log('this.state', this.state)
    }

    searchTrack = () => {
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
              	onChange={this.updateQuery}
              	onKeyPress={this.handleKeyPress}
              	placeholder='Search for an artist'
              />
              <button onClick={this.searchArtists}>Search Artists</button>
              <button onClick={this.searchTrack}>Search Tracks</button>
              {this.state.artists ? <ArtistList artists={this.state.artists}/> : null }
			</div>
        )
    }
}