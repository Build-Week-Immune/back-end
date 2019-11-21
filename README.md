# Ride For Life - Back End API

## Project Name

build-immunization-tracking

## Pitch

 As a parent, it's hard to keep track of your child's immunization records! Especially if you move states, or switch doctors.  It's a pain to call around and figure out which immunizations your child still needs, or to have them mail you proof for things like school registration.  As an adult, it's even harder to access these records for travel that requires immunizations or booster shots. This app allows medical professionals to upload immunization records to your personal or family account. 
## Backend Developer (Node)

zeleke dema


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

expects  username, password, and role(admin,user) in the req.body
POST to /api/auth/login

expects username and password in the req.body,
outputs a token and welcome message

USER(patient) ROUTES:

GET to /api/users

expects token for authorization
outputs an array of users

GET to /api/users/:id

expects token for authorization
outputs users object by id

PUT to /api/users/:ID

expects token for authorization
UPDATE users object 

DELETE /api/users/:id

expects token for authorization
DELETE users object






provider ROUTES:

GET to /api/provider

expects token for authorization
outputs an array of all providers

GET to /api/provider/:id

expects token for authorization
outputs provider object by id

POST to /api/provider

expects token for authorization
ADD provider(providerName) object 

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

expects(ImmunizationName,providerid) token for authorization
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
sample output
[
  {
    "id": 1,
    "name": "Jane",
    "parent_name": "Mrs. Doe",
    "contact": "mrs.doe@gmail.com",
    "gender": "F",
    "DOB": "09/28/2010",
    "immunization_id": 1,
    "provider_id": 1
  },
  {
    "id": 2,
    "name": "Jose",
    "parent_name": "Mr. Machado",
    "contact": "machado@email.com",
    "gender": "M",
    "DOB": "09/28/2010",
    "immunization_id": 1,
    "provider_id": 1
  },


GET to /api/children /:id

expects token for authorization
outputs children  object by id
sample output:
{
  "id": 3,
  "name": "Paulo",
  "parent_name": "Ms. Moreno",
  "contact": "moreno@email.com",
  "gender": "M",
  "DOB": "09/28/2010",
  "ProviderName": "Gregory House MD",
  "provider_id": 1,
  "ImmunizationName": "DTaP - Diphtheria, tetanus, and acellular pertussis",
  "immunization_id": 2,
  "screenings": [
    {
      "id": 7,
      "date": "04/12/2010",
      "height": 22.5,
      "weight": 26.5,
      "name": "Paulo"
    },
    {
      "id": 8,
      "date": "05/12/2010",
      "height": 23,
      "weight": 30.1,
      "name": "Paulo"
    },
    {
      "id": 9,
      "date": "10/05/2011",
      "height": 25.1,
      "weight": 35.4,
      "name": "Paulo"
    }
  ]
}

PUT /api/children/:id endpoint to Update a child -

GET /api/children/:id/screenings

expects token for authorization
outputs a child visit records by id

POST to /api/children

expects(immunizationid,
			  providerid) token for authorization
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


