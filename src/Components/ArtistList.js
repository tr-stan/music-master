import React from 'react';
import discoBall from '../assets/mirror-ball.png';

const ArtistList = props => {
    if (props.artists) {
        let artistList = props.artists.map((artist, index) => {
            console.log("artist images:", artist.images)
            return (
                <li key={index} id={artist.id}>
					<button onClick={props.getArtist.bind(null, artist, artist.name)}>
					<img src={artist.images.length ? artist.images[0]['url'] : discoBall} />
					<h3>{artist.name}</h3>
					</button>
				</li>
            )
        })
        return (
            <div>
				<h2>Artists</h2>
				<ul>
					{artistList}
				</ul>
			</div>
        );
    } else {
        return (
            <div>
				<p>Your search returned no results. Please try another search.</p>
			</div>
        )
    }
}

export default ArtistList;