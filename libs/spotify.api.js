// PACKAGES
const axios = require('axios');

// SPOTIFY AUTH
const client_id = '2412e036a19c416ca3e99aff4105b147'; 
const client_secret = '4005eea211664fe0981381270bd490a6';

module.exports = exports = {
  	auth: (credentials) => {
  		let auth = '';
  		if(!credentials) {
  			auth = Buffer.from(client_id + ':' + client_secret).toString('base64');
  		} else {
  			if(credentials.token) {
  				auth = credentials.hash;
  			} else {
  				auth = Buffer.from(credentials.client_id + ':' + credentials.client_secret).toString('base64');
  			}
  		}
  		let options = {
			method: 'post',
			url: 'https://accounts.spotify.com/api/token',
			headers: {
				'Authorization': 'Basic ' + auth
			},
			withCredentials: true,
			params: {
				grant_type: 'client_credentials'
			}
	    };
		return axios(options);
	},
	search: (token, query, limit) => {
		if(!limit) {
			limit = 10;
		}
  		let options = {
		    url: 'https://api.spotify.com/v1/search',
		    headers: {
		      'Authorization': 'Bearer ' + token
		    },
		    params: {
			    q: query,
			    type: 'artist,album,track',
			    limit: limit
		  	}
	  	};
		return axios(options);
	},
	artists: (token, id) => {
  		let options = {
		    url:'https://api.spotify.com/v1/artists/'+id,
		    headers: {
		      'Authorization': 'Bearer ' + token
		    }
	  	};
		return axios(options);
	},
	artists_albums: (token, id, limit) => {
		if(!limit) {
			limit = 10;
		}
  		let options = {
		    url: 'https://api.spotify.com/v1/artists/'+id+'/albums',
		    headers: {
		      'Authorization': 'Bearer ' + token
		    },
		    params: {
		    	limit: limit
		    }
	  	};
		return axios(options);
	},
	albums: (token, id) => {
  		let options = {
		    url:'https://api.spotify.com/v1/albums/'+id,
		    headers: {
		      'Authorization': 'Bearer ' + token
		    }
	  	};
		return axios(options);
	},
	albums_tracks: (token, id, limit) => {
		if(!limit) {
			limit = 10;
		}
  		let options = {
		    url: 'https://api.spotify.com/v1/albums/'+id+'/tracks',
		    headers: {
		      'Authorization': 'Bearer ' + token
		    },
		    params: {
		    	limit: limit
		    }
	  	};
		return axios(options);
	}
};