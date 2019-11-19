# Ride For Life - Back End API

## Project Name

build-immunization-tracking

## Pitch

 As a parent, it's hard to keep track of your child's immunization records! Especially if you move states, or switch doctors.  It's a pain to call around and figure out which immunizations your child still needs, or to have them mail you proof for things like school registration.  As an adult, it's even harder to access these records for travel that requires immunizations or booster shots. This app allows medical professionals to upload immunization records to your personal or family account. 
## Backend Developer (Node)

Jonathan Ho  
[LinkedIn](https://www.linkedin.com/feed')  
[Portfolio](https://zzzddd.github.io')  
[GitHub](https://github.com/zzzddd)

## Tech Stack

- NodeJS
- Express
- bcryptjs
- cors
- dotenv
- helmet
- jsonwebtoken
- knex
- knex-cleaner
- pg
- sqlite3
- nodemon

## Deployment

**Backend API:** https://immunazation.herokuapp.com//

**Marketing Site:** https://...

**React App:** https://...

BackEnd Repository for the build-immunization-tracking build week team
Base URL
https://immunazation.herokuapp.com

AUTHORIZATION ROUTES
POST to /api/auth/register

expects  username, password, and role in the req.body
POST to /api/auth/login

expects username and password in the req.body,
outputs a token and welcome message

USER ROUTES:

GET to /api/users

expects token for authorization
outputs an array of users




provider ROUTES:

GET to /api/provider

expects token for authorization
outputs an array of all providers

GET to /api/provider/:id

expects token for authorization
outputs provider object by id

POST to /api/provider

expects token for authorization
ADD provider object 

PUT to /api/provider/:ID

expects token for authorization
UPDATE provider object 

DELETE /api/provider/:id

expects token for authorization
DELETE provider object 

Immunization routs..

GET /api/immunization

expects token for authorization
outputs an array of all immunization

POST to /api/immunization

expects token for authorization
ADD immunization object to a specifid provider id

PUT to /api/immunization/:ID

expects token for authorization
UPDATE immunization object by id

DELETE /api/immunization/:id

expects token for authorization
delete immunization object by id

..children routs..

GET /api/children 

expects token for authorization
outputs an array of all children

GET to /api/children /:id

expects token for authorization
outputs children  object by id

POST to /api/children

expects token for authorization
ADD children object by specifying immunization and provider id

DELETE /api/children/:id

expects token for authorization
delete children object by id


..child Screening routs..

GET /api/screenings,

expects token for authorization
outputs an array of all children screenings,

GET /api/screenings/:id

expects token for authorization
outputs an array of all children screenings by id

Post /api/screenings

expects token for authorization
add  children  screenings by child id

DELETE /api/screenings/:id

expects token for authorization
deletes the screenings at the id point


