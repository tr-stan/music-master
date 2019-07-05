import React from 'react';
import logo from '../assets/tri-be_logo.png';
import { Link } from '@reach/router';

const ArtistList = props => {
	let artistList = props.artists.map((artist, index ) => {
		console.log("artist images:", artist.images)
		return (
			<li style={{ padding: '10px' }} key={index} id={artist.id}>
			<Link to={`/${artist.name}`}>
			<img style={{ maxWidth: '3vw', height: 'auto'}} src={artist.images.length ? artist.images[0]['url'] : logo} />
			<p style={{ display: 'inline' }}>{artist.name}</p>
			</Link>
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
	)
}

export default ArtistList;