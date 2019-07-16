import React from 'react';

const TopTracks = props => {
	let tracks = props.topTracks.map(track => {
		console.log("track:", track)
		return (<li key={track.id} onClick={props.getTrack.bind(null, track, track.name)}>{track.name}</li>)
	})
	return (
		<div>
			<h3>Top Tracks on Spotify</h3>
			<ul>
			{tracks}
			</ul>
		</div>
	)
}

export default TopTracks;