import React from 'react';

const TrackList = props => {
	let trackList = props.tracks.map((track, index ) => {
		console.log("track:", track)
		return (
			<p key={track.id}>{track.name}</p>
		)
	})

	return (
		<div>
			<h2>Tracks</h2>
			<ul style={{ listStyleType: 'none' }}>
				{trackList}
			</ul>
		</div>
	)
}

export default TrackList;