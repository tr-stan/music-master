import React from 'react';

const ArtistProfile = (props) => {
	if (props) {
        return (
            <div>
				<h2>artist profile</h2>
				
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

export default ArtistProfile;