require('dotenv').config();
const options = {
	swaggerDefinition: {
		info: {
			description: 'this is a server with basic API features',
			title: 'Kolombre',
			version: '1.0.0'
		},
		host: process.env.DB_SWAGGER_URL,
		basePath: '/',
		produces: [ 'application/json', 'application/xml' ],
		schemes: [ 'http', 'https' ],
		security: [
			{
				JWT: [],
			}
		],
		securityDefinitions: {
			JWT: {
				type: 'apiKey',
				in: 'header',
				name: 'authorization',
				description: ''
			}
		},
	},

	basedir: __dirname,
	files: [ '../../controllers/*.js' ]
};

export default options;