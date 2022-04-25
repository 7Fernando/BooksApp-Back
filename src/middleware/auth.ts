var { expressjwt: jwt } = require("express-jwt");
require('dotenv').config()





export const jwtCheck = 
jwt({
  secret: '75S5doLarmsiNKesQK1HkDYd8b6pM3L6',
  audience: 'secreto',
  issuer: 'https://dev-0h7i5plo.us.auth0.com/',
  algorithms: ['HS256']
});