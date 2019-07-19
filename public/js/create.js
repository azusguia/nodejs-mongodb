function createCustomer() {
	const name = document.getElementById('inputName').value
	const user = document.getElementById('inputUser').value
	const age = document.getElementById('inputAge').value

	axios.post(
		'http://localhost:3000/customer/save',
		{
			name, 
			user,
			age
		}
	)
	.then((response) => {
		alertify.success(response.data.message)
	})
	.catch((error) => {
		alertify.error('Error creating new customer.')
		console.log(error.response)
	})
}