import React, { Component } from 'react';
import { Router, navigate } from '@reach/router';
import axios from 'axios';
import ArtistList from './ArtistList';
import TrackList from './TrackList';
import TopTracks from './TopTracks';
import Home from './Home';

const API_URL = (process.env.NODE_ENV !== "production") ? "http://localhost:4321" : "https://audio-vision.herokuapp.com";

export default class App extends Component {
    state = { query: "", artists: null, tracks: null };

    updateQuery = event => {
        console.log("event", event.target.value);
        this.setState({ query: event.target.value });
    }

    searchArtists = () => {
        let artist = encodeURI(this.state.query);
        axios.get(`http://localhost:4321/artists/${artist}`)
            .then(results => {
                if (results.data.total > 0) {
                    this.setState({
                        artists: results.data.items
                    })
                    console.log("artist search results on frontend:", this.state.artists);
                    navigate("/artists");
                } else { this.setState({ artists: null }) }
            })
            .catch(error => {
                console.log("There was an error fetching artist data", error.message);
            })
        console.log("this.state", this.state)
    }

    searchTracks = () => {
        let track = encodeURI(this.state.query);
        axios.get(`http://localhost:4321/tracks/${track}`)
            .then(results => {
                console.log("Track results on frontend:", results.data.tracks)
                if (results.data.tracks.total > 0) {
                    this.setState({
                        tracks: results.data.tracks.items
                    })
                    navigate("/tracks");
                } else { this.setState({ tracks: null }) }
            })
        console.log("this.state", this.state)
    }

    handleKeyPress = event => {
        if (event.key === "Enter") {
            console.log("this.state", this.state)
        }
    }

    render() {
        return (
            <div id="app">
              <h2>Music Master</h2>
              <input
                onChange={this.updateQuery}
                onKeyPress={this.handleKeyPress}
                placeholder="Search for an artist"
              />
              <button onClick={this.searchArtists}>Search Artists</button>
              <button onClick={this.searchTracks}>Search Tracks</button>
              <Router>
                <Home path="/" />
                <ArtistList path="/artists" artists={this.state.artists}/>
                <TrackList path="/tracks" tracks={this.state.tracks}/>
                <TopTracks path="/:name" />
              </Router>
            </div>
        )
    }
}