import React from 'react';

const TrackList = ({ tracks, getTrack }) => {
    if (tracks) {
        let trackList = tracks.map((track, index) => {
            console.log("track:", track)
            return (
                <li key={track.id}><button onClick={getTrack.bind(null, track, track.name)}>{track.name}</button></li>
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
    } else {
    	return (
            <div>
				<p>Your search returned no results. Please try another search.</p>
			</div>
        )
    }
}

export default TrackList;