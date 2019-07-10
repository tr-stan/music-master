import React from 'react';
import discoBall from '../assets/mirror-ball.png';

const TrackList = ({ tracks, getTrack }) => {
    if (tracks) {
        let trackList = tracks.map((track, index) => {
            console.log("track:", track)
            return (
                <li key={track.id}>
                	<button onClick={getTrack.bind(null, track, track.name)}>
                	<img src={track.album.images.length > 0 ? track.album.images[0].url : discoBall} />
                	<h3>{track.name}</h3>
                	</button>
                </li>
            )
        })
        return (
            <div>
				<h2>Tracks</h2>
				<ul>
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