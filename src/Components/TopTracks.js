import React from 'react';

const TopTracks = ({ topTracks }) => {
	let tracks = topTracks.map(track => {
		console.log("track:", track)
		return (<li key={track.id}>{track.name}</li>)
	})
	return (
		<ul>
		{tracks}
		</ul>
	)
}

export default TopTracks;