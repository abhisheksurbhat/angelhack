export const api = {
	get(path, params) {
		const defaultGetReqParam = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		};

		if (params != undefined) {
			path += '?';
			for (let key in params) {
				path += encodeURIComponent(key) + '=' + params[key];
			}
		}

		return fetch(path, defaultGetReqParam)
			.then((response) => {
				if (response.ok) return response.json();
				else {
					throw new Error(
						'Response Status:' + response.status + ' and Response Message:' + response.statusText
					);
				}
			})
			.then((response) => response)
			.catch((error) => {
				throw error;
			});
	},

	put(path, body) {
		const defaultPostReqParam = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		};

		return fetch(path, defaultPostReqParam)
			.then((response) => {
				if (response.ok) return response.json();
				else {
					throw new Error(
						'Response Status:' + response.status + ' and Response Message:' + response.statusText
					);
				}
			})
			.then((response) => response)
			.catch((error) => {
				throw error;
			});
	},
	post(path, body) {
		const defaultPostReqParam = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		};

		return fetch(path, defaultPostReqParam)
			.then((response) => {
				if (response.ok) return response.json();
				else {
					throw new Error(
						'Response Status:' + response.status + ' and Response Message:' + response.statusText
					);
				}
			})
			.then((response) => response)
			.catch((error) => {
				throw error;
			});
	}
};
