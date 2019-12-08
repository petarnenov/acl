(async () => {
	const response = await fetch(
		'http://localhost:3000/users/5ded1e064c0d8356e5021620'
	);
	const user = await response.json();
	const {
		email,
		age,
		name = { firstName: undefined, lastName: undefined }
	} = user;
	const pEmail = document.getElementById('email');
	const pFirstName = document.getElementById('firstName');
	const pLastName = document.getElementById('lastName');
	const pAge = document.getElementById('age');
	pEmail.value = email;
	pFirstName.value = name.firstName;
	pLastName.value = name.lastName;
	pAge.value = age;
})();
