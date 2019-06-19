import React from 'react';

const ArtistList = props => {
	let artistList = props.artists.map((artist, index ) => {
		return (
			<li key={index} id={artist.id}>{artist.name}</li>
		)
	})

	return (
		<div>
			<h2>Artists</h2>
			<ul>
				{artistList}
			</ul>
		</div>
	)
}

export default ArtistList;