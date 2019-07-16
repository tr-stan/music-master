import React from 'react';
import discoBall from '../assets/mirror-ball.png';

const TrackProfile = ({ track }) => {
	if (track) {
        return (
            <div className="profile">
				<img src={track.album.images.length > 0 ? track.album.images[0].url : discoBall} />
				<div className="details">
					<h2>{track.name}</h2>
					<p>By: {track.artists[0].name}</p>
					<p>Album: {track.album.name}</p>
					<p><a href={track.external_urls.spotify} target="_blank">Play {track.name} in Spotify</a></p>
				</div>
			</div>
        );
    } else {
        return (
            <div>
				<p>Could not retrieve track data. Please try again.</p>
			</div>
        )
    }
}

export default TrackProfile;