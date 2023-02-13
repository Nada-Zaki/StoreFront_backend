# Storefront Backend Project
## Steps to connect to the database
 1. Create a database called "shopping_store" and "shopping_store_test" for testing.
 2. Create a user with name "super_user" and password "password123".
 3. Run "docker-compose up" to connect to the database.
 4. Run "yarn" to install all required dependencies.
 4. Run "db-migrate up" to run migrations.

* The database is running on port 5432.
* The backend server is running on port 3000.

* In package.json, there are 6 scripts for the dependencies:
  - **prettier:** to format the code by the rules configured in the .prettierrc file.
  - **lint:** to run eslint dependency.
  - **dev:** to run typescript code with nodemon.
  - **build:** to compile typscript code.
  - **test:** to run tests on compiled code.
  - **start:** to run the compiled code.

* The env file content:
    - POSTGRES_HOST=127.0.0.1
    - POSTGRES_DB=shopping_store
    - POSTGRES_TEST_DB=shopping_store_test
    - POSTGRES_USER=super_user
    - POSTGRES_PASSWORD=password123
    - ENV=dev
    - BCRYPT_PASSWORD=user123
    - SALT_ROUNDS=10
    - TOKEN_SECRET=token123
    - PORT=3000

* The src folder contains:
  - **server.ts:** the entry point of the app.
  - **models folder:** contains the actions on the database.
    - order.ts: contains the CRUD methods for orders table.
    - product.ts: contains the CRUD methods for products table.
    - user.ts: contains the CRUD methods for users table.
  - **services folder:** contains services actions on the database.
    - dashboard.ts: contains actions for most popular products, active orders by user and completed orders. 
  - **routes folder:** contains the endpoints.
    - dashboard.ts: contains routes for dashboard service.
    - orders.ts: contains CRUD routes for order table.
    - products.ts: contains CRUD routes for products table.
    - users.ts: contains CRUD and authenticate routes for users table.
  - **middleware folder:** contains token verification and autherization.
    - verifyAuthToken.ts: to verify the token sent in the header in the apis that require token.
    - verifyAutherization.ts: to make sure that user can update or delete his own data only.
   


