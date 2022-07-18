# Task

## Quick launch

```sh
# install deps
npm i 

# run app in dev
npm run start:app
```

## Docs
```sh
# Documentation
Documentation is available .../docs
For Example: http://localhost:5000/docs/
```

## Communication between services (FRONT => BACK)
###### FRONT Request => BACK Route => Middlewares (Cache, Checks) => Controller 
1. The client requests data.
2. The server checks whether there is data in the application's **Node** memory.
3. If it is in **Node** - gives it. If not, checks the **Redis** store.
4. If it is in **Redis** - gives it. If not, a query is made to the database.
5. Returns data to the client. Updates **Redis** and **Node** cache

## Full step-by-step server startup
### Step 1 (Install deps)
````sh
# install deps
npm i
````

### Step 2 (Create .env file)
````sh
Create .env file. 
Copy the variables from the .env.example file 
and paste them into the created .env file.
````

### Step 3 (Paste the values into the .env file)
````sh
For Example:
# Сan't change it
NODE_ENV=dev

# Set your DB_URL (from ElephantSQL cloud or local)
#(For Example: postgres://UserName:Password@Hostname:5432/DBName)
DB_URL=

# Сan't change it or set your port
PORT=5000

# Сan't change it
ALLOWED_ORIGINS=
````

### Step 4 (Start server)
````sh
# run app in dev
npm run start:app
````

## Work with data in DB
### Step 1 (Create tables)
````sh
Copy SQL queries from the database.sql file
and insert in ElephantSQL cloud or local DB
````

### Step 2 (Create and Get test data)
````sh
Perform a POST request to create new data in the database.

Documentation is available .../docs 
For Example: http://localhost:5000/docs/

Look in the documentation for:
endpoints, parameters that are required, data, etc.

Then can use Get requests.
````
