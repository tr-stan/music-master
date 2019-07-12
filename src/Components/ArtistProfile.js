import React from 'react';
import discoBall from '../assets/mirror-ball.png';
import TopTracks from './TopTracks';

const ArtistProfile = props => {
    if (props.artist) {
        return (
            <div className="profile">
				<h2 className="name">{props.artist.name}</h2>
				<img src={props.artist.images.length ? props.artist.images[0]['url'] : discoBall} />
				<div className="details">
					<TopTracks topTracks={props.topTracks} getTrack={props.getTrack}/>
				</div>
			</div>
        );
    } else {
        return (
            <div>
				<p>Could not retrieve artist data. Please try again.</p>
			</div>
        )
    }
}

export default ArtistProfile;