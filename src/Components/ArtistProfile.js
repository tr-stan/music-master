import React from 'react';
import discoBall from '../assets/mirror-ball.png';

const ArtistProfile = ({ artist }) => {
    if (artist) {
        return (
            <div className="profile">
				<img src={artist.images.length ? artist.images[0]['url'] : discoBall} />
				<div className="details">
					<h2>{artist.name}</h2>
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