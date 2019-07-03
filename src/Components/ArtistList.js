import React from 'react';
import logo from '../assets/tri-be_logo.png'

const ArtistList = props => {
	let artistList = props.artists.map((artist, index ) => {
		console.log("artist images:", artist.images)
		return (
			<li style={{ padding: '10px' }} key={index} id={artist.id}>
			<img style={{ maxWidth: '3vw', height: 'auto'}} src={artist.images.length ? artist.images[0]['url'] : logo} />
			<p style={{ display: 'inline' }}>{artist.name}</p>
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