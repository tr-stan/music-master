import React from 'react';

const TopTracks = props => {
	let tracks = props.topTracks.map(track => {
		console.log("track:", track)
		return (<li key={track.id} onClick={props.getTrack.bind(null, track, track.name)}>{track.name}</li>)
	})
	return (
		<ul>
		<h2>Top Tracks</h2>
		{tracks}
		</ul>
	)
}

export default TopTracks;