var buffer = {};

const http = require('node:http');

http.createServer((request, response) => {

	let reqJson;
	let body = [];
	let responseData;
	
	request
	.on('error', err => {
		console.error(err);
	})
	.on('data', chunk => {
			body.push(chunk);
	})
	.on('end', () => {
		
		body = Buffer.concat(body).toString();
		
		// BEGINNING OF NEW STUFF
		response
		.on('error', err => {
			console.error(err);
		});

		try {
			reqJson = JSON.parse(body);

			switch (reqJson.tipo) {
				case 'write':
				buffer = reqJson.data;
				responseData = "Datos guardados correctamente"
				break;

				case 'read':
				responseData = buffer;
				break;

				default:
				responseData = "Tipo desconocido"
				break;
			}
		}
		catch {
			responseData = "No se recibieron datos"
		}
		
		response.writeHead(200, {'Content-Type': 'application/json'})
		response.end(JSON.stringify(responseData));
		// END OF NEW STUFF

	});
}).listen(8080);

/* express-session (Session persist)

var session = require('express-session');
var app = express();
app.use(session({secret: 'ssshhhhh'}));

app.get('/',function(req,res){
req.session = myData;
}

*/

/* node-persist (global persist)

var storage = require('node-persist');
storage.initSync();
storage.setItem('myPersistentData', { ... });
console.log(storage.getItem('myPersistentData'));

*/