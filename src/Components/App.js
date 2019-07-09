import React, { Component } from 'react';
import { Router, navigate } from '@reach/router';
import axios from 'axios';
import ArtistList from './ArtistList';
import ArtistProfile from './ArtistProfile';
import TrackList from './TrackList';
import TrackProfile from './TrackProfile';
import TopTracks from './TopTracks';
import Home from './Home';
import BadSearch from './BadSearch';

const API_URL = (process.env.NODE_ENV !== "production") ? "http://localhost:4321" : "https://audio-vision.herokuapp.com";

export default class App extends Component {
    state = { query: "", artists: null, artist: null, tracks: null, track: null, topTracks: null };

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
                    });
                    console.log("artist search results on frontend:", this.state.artists);
                    navigate("/artists");
                } else {
                    navigate("/bad-search");
                    // this.setState({ artists: null });
                }
            })
            .catch(error => {
                console.log("There was an error fetching artist data", error.message);
                navigate("/bad-search");
            })
        console.log("this.state", this.state);
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
                } else {
                    this.setState({ tracks: null });
                    navigate("/bad-search");
                }
            })
            .catch(error => {
                console.log("There was an error fetching track data", error.message);
                navigate("/bad-search");
            })
        console.log("this.state", this.state);
    }

    getArtist = (artist, artistName) => {
        this.setState({ artist: artist });
        navigate(`/artists/${artistName}`);
    }

    getTrack = (track, trackName) => {
        this.setState({ track: track });
        navigate(`/tracks/${trackName}`);
    }

    getTopTracks = (id, name) => {
        axios.get(`http://localhost:4321/artists/${id}/top-tracks`)
            .then(results => {
                console.log("results from fetch", results.data.tracks);
                this.setState({
                    topTracks: results.data.tracks
                });
                console.log("top tracks of search:", this.state.topTracks);
                return name;
            })
            .then(name => {
                navigate(`/artists/${name}/top-ten`);
            })
            .catch(error => {
                console.log("There was an error fetching top tracks", error.message);
                navigate("/bad-search");
            })
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
                <ArtistList path="/artists" artists={this.state.artists} getArtist={this.getArtist}>
                </ArtistList>
                <ArtistProfile path="/artists/:artistName" artist={this.state.artist} getTopTracks={this.getTopTracks}>
                    <TopTracks path="top-ten" topTracks={this.state.topTracks} />
                </ArtistProfile>
                <TrackList path="/tracks" tracks={this.state.tracks} getTracks={this.getTracks}>
                    <TrackProfile path=":trackName" track={this.state.track}/>
                </TrackList>
                <BadSearch path="/bad-search" />
              </Router>
            </div>
        )
    }
}