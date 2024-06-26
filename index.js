var contador = 0;

const http = require('http');

const requestListener = (req, res)=>{
	console.log("Request is Incoming");
	
	contador++;

	const responseData = {
		message:"Hello, GFG Learner",
		articleData:{
		articleName: "How to send JSON response from NodeJS",
		category:"NodeJS",
		status: "published",
		contador: contador
	},
	endingMessage:"Visit Geeksforgeeks.org for more"
	}

	const jsonContent = JSON.stringify(responseData);
	res.end(jsonContent);
};

const server = http.createServer(requestListener);

server.listen(3000,'localhost', function(){
	console.log("Server is Listening at Port 3000!");
});