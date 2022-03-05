# Deployments

Back-end: https://anywherefitness-back-end.herokuapp.com/api/
Front-end: https://anywhere-fitness-front-end-orcin.vercel.app/

# Back-end

Anywhere fitness back-end repo

## Authentication

Endpoint | Description
--|--
POST /api/auth/register | Register new user, returns created user.
POST /api/auth/login | Login. Returns login information including `token`.

## Users

Endpoint | Description
--|--
GET /api/users/ | Find all users
GET /api/users/:id | Get user by ID
POST /api/users/ | Create new user
PUT /api/users/:id | Update user by ID
DELETE /api/users/:id | Delete user by ID

## Classes

Endpoint | Description
--|--
GET /api/classes/ | Find all classes
GET /api/classes/:id | Get class by ID
POST /api/classes/ | Create new class
PUT /api/classes/:id | Update class by ID
DELETE /api/classes/:id | Delete class by ID

## Orders

Endpoint | Description
--|--
GET /api/orders/ | Find all orders
GET /api/orders/:id | Get order by ID
POST /api/orders/ | Create new order
PUT /api/orders/:id | Update order by ID
DELETE /api/orders/:id | Delete order by ID
