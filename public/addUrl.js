// // import axios from "axios";

// async function addUrl(url, alias) {
// 	try {
// 		const res = await axios({
// 			method: "POST",
// 			url: "http://localhost:3000/api/",
// 			data: {
// 				url,
// 				alias,
// 			},
// 		});
// 		console.log("res :>> ", res);
// 	} catch (err) {
// 		console.log("err :>> ", err);
// 	}
// }

// const getData = async () => {
// 	document.getElementById("urlForm").addEventListener("submit", (e) => {
// 		e.preventDefault();
// 		const url = document.getElementById("urlInput").value;
// 		const alias = document.getElementById("aliasInput").value;
// 		addUrl(url, alias);
// 	});
// };

// getData();

// import axios from "axios";

// Function to handle form submission
async function addUrl(url, alias) {
	try {
		const res = await axios({
			method: "POST",
			url: "http://localhost:3000/api/",
			data: {
				url,
				alias,
			},
		});
		console.log("res :", res);
		// Assuming you want to reload the page after successful submission
		location.reload();
	} catch (err) {
		console.log("err :", err);
		// Display fancy error message on the page
		let msg = err.response.data.message;
		if (msg.includes("E11000"))
			return displayErrorMessage(
				"the url or alias is used before please change it."
			);
		displayErrorMessage(err.response.data.message);
	}
}

// Function to display error message on the page
function displayErrorMessage(message) {
	// Create error message container
	const errorContainer = document.createElement("div");
	errorContainer.classList.add("error-message");
	errorContainer.textContent = message;

	// Append error message container below the form
	const formContainer = document.querySelector(".form-container");
	formContainer.appendChild(errorContainer);

	// Remove error message after a few seconds (optional)
	setTimeout(() => {
		errorContainer.remove();
	}, 5000); // Remove after 5 seconds
}

// Form submission event listener
document.getElementById("urlForm").addEventListener("submit", function (event) {
	event.preventDefault(); // Prevent form submission

	const url = document.getElementById("urlInput").value;
	const alias = document.getElementById("aliasInput").value;

	addUrl(url, alias);
});
