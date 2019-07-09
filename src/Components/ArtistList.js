import React from 'react';
import logo from '../assets/tri-be_logo.png';

const ArtistList = props => {
    if (props.artists) {
        let artistList = props.artists.map((artist, index) => {
            console.log("artist images:", artist.images)
            return (
                <li style={{ padding: '10px' }} key={index} id={artist.id}>
					<button onClick={props.getArtist.bind(null, artist, artist.name)}>
					<img style={{ maxWidth: '3vw', height: 'auto'}} src={artist.images.length ? artist.images[0]['url'] : logo} />
					<p style={{ display: 'inline' }}>{artist.name}</p>
					</button>
				</li>
            )
        })
        return (
            <div>
				<h2>Artists</h2>
				<ul style={{ listStyleType: 'none' }}>
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