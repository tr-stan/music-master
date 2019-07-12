import React, { Component } from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';
import ArtistList from './ArtistList';
import ArtistProfile from './ArtistProfile';
import TrackList from './TrackList';
import TrackProfile from './TrackProfile';
import TopTracks from './TopTracks';
import Home from './Home';
import BadSearch from './BadSearch';
import '../index.css';

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
                        artists: results.data.items,
                        query: ''
                    });
                    console.log("artist search results on frontend:", this.state.artists);
                    navigate("/artists");
                } else {
                    this.setState({ query: '' });
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
                        tracks: results.data.tracks.items,
                        query: ''
                    })
                    navigate("/tracks");
                } else {
                    this.setState({ query: '' });
                    navigate("/bad-search");
                }
            })
            .catch(error => {
                console.log("There was an error fetching track data", error.message);
                navigate("/bad-search");
            })
        console.log("this.state", this.state);
    }

    getArtist = (artist, artistName, artistId) => {
        axios.get(`http://localhost:4321/artists/${artistId}/top-tracks`)
            .then(results => {
                console.log("results from top tracks fetch", results.data.tracks);
                this.setState({
                    topTracks: results.data.tracks,
                    artist: artist
                });
                console.log("top tracks of search:", this.state.topTracks);
            })
            .then(navigate(`/artists/${artistName}`))
            .catch(error => {
                console.log("There was an error fetching top tracks", error.message);
                navigate("/bad-search");
            })
    }

    getTrack = (track, trackName) => {
        this.setState({ track: track });
        navigate(`/tracks/${trackName}`);
    }

    // getTopTracks = (id, name) => {
    //     axios.get(`http://localhost:4321/artists/${id}/top-tracks`)
    //         .then(results => {
    //             console.log("results from fetch", results.data.tracks);
    //             this.setState({
    //                 topTracks: results.data.tracks
    //             });
    //             console.log("top tracks of search:", this.state.topTracks);
    //             return name;
    //         })
    //         .then(name => {
    //             navigate(`/artists/${name}/top-ten`);
    //         })
    //         .catch(error => {
    //             console.log("There was an error fetching top tracks", error.message);
    //             navigate("/bad-search");
    //         })
    // }

    handleKeyPress = event => {
        if (event.key === "Enter") {
            event.preventDefault();
            console.log("this.state", this.state)
        }
    }

    render() {
        return (
            <div id="app">
              <Link className="link" to="/"><h2>Spotify Search Master</h2></Link>
              <div id="search">
              <input
                value={this.state.query}
                onChange={this.updateQuery}
                onKeyPress={this.handleKeyPress}
                placeholder="Search for an artist"
              />
              <button onClick={this.searchArtists}>Search Artists</button>
              <button onClick={this.searchTracks}>Search Tracks</button>
              </div>
              <Router>
                <Home path="/" />
                <ArtistList path="/artists" artists={this.state.artists} getArtist={this.getArtist}>
                </ArtistList>
                <ArtistProfile path="/artists/:artistName" artist={this.state.artist} topTracks={this.state.topTracks} getTrack={this.getTrack}>
                </ArtistProfile>
                <TrackList path="/tracks" tracks={this.state.tracks} getTrack={this.getTrack}>
                </TrackList>
                <TrackProfile path="/tracks/:trackName" track={this.state.track}/>
                <BadSearch path="/bad-search" />
              </Router>
            </div>
        )
    }
}