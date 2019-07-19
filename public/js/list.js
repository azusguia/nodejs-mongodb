let list = []

alertify.set('notifier','position', 'top-center');

window.addEventListener('load', () => {
    
	axios.post(
		'http://localhost:3000/customer/list'
	)
	.then((response) => {
		this.setList(response.data)
		const table = document.getElementById('dataTable')
		for (let i = 0; i < response.data.length; i++) {
		table.innerHTML += 
		 `<tr id="row${i}">
				<th scope="row">${i}</th>
				<td><input class="form-control" type="text" id="inputName${i}" value="${response.data[i].name}" /></td>
				<td><input class="form-control" type="text" id="inputUser${i}" value="${response.data[i].user}" /></td>
				<td><input class="form-control" type="number" id="inputAge${i}" value="${response.data[i].age}" /></td>
				<td><button type="button" onclick="saveCustomer(${i})" class="btn btn-success">Save</button></td>
				<td><button type="button" onclick="deleteCustomer(${i})" class="btn btn-danger">Delete</button></td>
			</tr>`
		}
	})
	.catch((error) => {
		alertify.error('Error loading customers.')
		console.log(error.response);
	});
})

function setList(data) {
	list = data
}

function deleteCustomer(i) {
	axios.delete(
		"http://localhost:3000/customer/" + list[i]._id
	)
	.then(response => {
		document.getElementById('row' + i).remove()
		alertify.success(response.data.message)
	})
	.catch(error => {
		alertify.error('Error deleting user.')
		console.log(error.response)
	})
}

function saveCustomer(i) {
	const name = document.getElementById('inputName' + i).value
	const user = document.getElementById('inputUser' + i).value
	const age = document.getElementById('inputAge' + i).value

  axios.put(
    "http://localhost:3000/customer/"+ list[i]._id, 
    {
      name,
      user,
      age
    }
  )
  .then(response => {
		alertify.success(response.data.message)
	})
  .catch(error => {
		alertify.error('Error saving changes.')
		console.log(error.response)
	})
}

