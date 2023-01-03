
# Argent-Bank

## General informations

This project presents a bank web application : 
- The first step of this project concerns users authentication. 
- Swagger documentation presents API endpoints that will be used in the second step : transactions. 

## Prerequisites (in frontend part)

- nodeJS (version 16.14.2)

- npm (version 8.5.0)

- Visual Studio Code (version 1.73.1) or another code editor

- git

## Technologies and Dependencies

- Javascript

- [Sass (version 1.56)](https://sass-lang.com/)

- [Axios (version 1.2.1)](https://axios-http.com/)

- [React (version 18.2)](https://fr.reactjs.org/)

- [React-dom (version 18.2)](https://fr.reactjs.org/docs/react-dom.html) 

- [React-scripts (version 5.0.1)](https://www.npmjs.com/package/react-scripts) 

- [React-toastify (version 9.1)](https://fkhadra.github.io/react-toastify/introduction)

- [Redux-toolkit (version 1.9.1)](https://redux-toolkit.js.org/)

- [jwt-decode (version 3.1)](https://jwt.io/libraries)

- [JsDoc (version 4.0)](https://jsdoc.app/)

## Installation 
#### BACKEND    
    
- Clone this project in your folder (argent-bank for example)

```bash
  git clone https://github.com/OpenClassrooms-Student-Center/Project-10-Bank-API.git
```

- Follow the README instructions

#### FRONTEND

- Clone this project in the same folder (argent-bank for example)

```bash
    git clone https://github.com/ascean/argent-bank-front.git
```

- Go to the project directory

```bash
  cd frontend
```

- Install dependencies

```bash
  npm install
```

## Run the project

You need to run first backend then frontend

#### BACKEND

```bash
  npm run dev:server
```

#### FRONTEND

```bash
  npm run start
```

## Populated database data

You can test application with these two users :

### Tony Stark

- First Name: `Tony`
- Last Name: `Stark`
- Email: `tony@stark.com`
- Password: `password123`

### Steve Rogers

- First Name: `Steve`,
- Last Name: `Rogers`,
- Email: `steve@rogers.com`,
- Password: `password456`

## Bank Argent API documentation

Find documentation in the frontend root : swagger.yaml

You can open it with online editor : https://editor.swagger.io/

## Document source code with JsDoc

### Installation

JsDoc is installed in devDependencies.

### Generation

```bash
  npm run jsdoc
```
### Consulting

Jsdoc files are generated in public folder. 
You can access to jsdoc by using URL : http://localhost:3000/docs/

## Author

- Sandrine