class ProdRequests {
	static async getUsers(url) {
		const getData = async url => {
			const res = await fetch(url)
			const json = await res.json()
			return json
		}

		try {
			const data = await getData(url)
			return data
		} catch (error) {
			console.log(`Произошла ошибка при получении всех пользователей, ${error.message}`)
		}
	}

	static async getUser(url) {
		const getData = async url => {
			const res = await fetch(url)
			const json = await res.json()
			return json
		}

		try {
			const data = await getData(url)
			return data
		} catch (error) {
			console.log(`Произошла ошибка при получении пользователя по id, ${error.message}`)
		}
	}

	static async addUser(url, obj) {
		const postData = async (url, obj) => {
			const res = await fetch(url, {
				method: 'POST',
				body: JSON.stringify(obj),
				headers: { 'Content-type': 'application/json; charset=UTF-8' }
			})
			const json = await res.json()
			return json
		}

		try {
			const data = await postData(url, obj)
			return data
		} catch (error) {
			console.log(`Произошла ошибка в postData, ${error.message}`)
		}
	}
	static async delUser(url, id) {
		const patchData = async (url, id) => {
			const res = await fetch(`${url}/${id}`, {
				method: 'DELETE',
				headers: { 'Content-type': 'application/json; charset=UTF-8'}
			})
	
			if (!res.ok) throw new Error(`Ошибка при запросе ${res.status}`)
	
			const text = await res.text()
			try {
				return text
			} catch (err) {
				throw new Error('сервер вернул не JSON')
			}
		}
		try {
			const data = await patchData(url, id)
			console.log('Пользователь изменён')
			return data
		} catch (error) {
			console.log(`Произошла ошибка в patchData, ${error.message}`)
		}
	}
	static async patchUser(url, id, obj) {
		const patchData = async (url, id, obj) => {
			const res = await fetch(`${url}/${id}`, {
				method: 'PATCH',
				body: JSON.stringify({ ...obj }), // ?
				headers: { 'Content-type': 'application/json; charset=UTF-8' }
			})
	
			if (!res.ok) throw new Error(`Ошибка при запросе ${res.status}`)
	
			const text = await res.text()
			try {
				return JSON.parse(text)
			} catch (err) {
				throw new Error('сервер вернул не JSON')
			}
		}
		try {
			const data = await patchData(url, id, obj)
			console.log('Пользователь изменён')
			return data
		} catch (error) {
			console.log(`Произошла ошибка в patchData, ${error.message}`)
		}
	}
}

export default ProdRequests
