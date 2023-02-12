# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: 'products/' [GET]
- Show: 'products/:id' [GET]
- Create [token required]: 'products/' [POST]
- [OPTIONAL] Top 5 most popular products: 'dashboard/popular-products' [GET]
- [OPTIONAL] Products by category (args: product category): 'products/category/:category [GET]
- Update [token required]: 'products/:id' [PUT]
- Delete [token required]: 'products/:id' [DELETE]

#### Users
- Index [token required]: 'users/' [GET]
- Show [token required]: 'users/:id' [GET]
- Create N[token required]: 'users/' [POST]
- Authenticate: 'users/signin' [POST]
- Update [token required]: 'users/:id' [PUT]
- Delete [token required]: 'users/:id' [DELETE]


#### Orders
- Current Order by user (args: user id)[token required]: 'dashboard/active-orders' [POST]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]: 'dashboard/completed-orders' [POST]
- Index: 'orders/' [GET]
- Show: 'orders/:id' [GET]
- Create [token required]: 'orders/' [POST]
- Add products [token required]: '/orders/:id/products' [POST]
- Update [token required]: 'orders/:id' [PUT]
- Delete [token required]: 'orders/:id' [DELETE]

## Data Shapes
#### Product
- id: SERIAL PRIMARY KEY
- name: VARCHAR(65)
- price: FLOAT
- [OPTIONAL] category: VARCHAR(100)

#### User
- id: SERIAL PRIMARY KEY
- firstName: VARCHAR(35)
- lastName: VARCHAR(80)
- password: VARCHAR

#### Orders
- id: SERIAL PRIMARY KEY
- user_id: BIGINT[FOREIGN KEY FOR USERS TABLE]
- status of order (active or complete): BOOLEAN

#### Order_products
- id: SERIAL PRIMARY KEY
- id of the order: BIGINT[FOREIGN KEY FOR ORDERS TABLE]
- id of each product in the order: BIGINT[FOREIGN KEY FOR PRODUCTS TABLE]
- quantity of each product in the order: INTEGER


