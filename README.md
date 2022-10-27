# VIA (Video Interaction Application) Created Using MERN

### Project Live on [ https://via-webapp.netlify.app/ ]

### And if you like this project, then ADD a STAR ⭐️  to this project 👆

## How to Install and Run this project?

### Pre-Requisites:
1. Install Git Version Control
[ https://git-scm.com/ ]

2. Install Node Latest Version
[ https://nodejs.org/en/ ]

### Installation
**1. Navigate to directory where you want to save the project**

**2. Clone this project**
```
git clone https://github.com/Minal-singh/VIA.git
```

Then, Enter the project
```
cd VIA
```

**3. Open two terminals**
### In first terminal
Navigate to client folder
```
cd client
```
Install all dependency
```
npm install
```
Create ```.env``` file and add these lines
```
REACT_APP_AGORA_APPID=<YOUR AGORA APPID>
REACT_APP_ENDPOINT=http://localhost:5000/
```
**Agora [ https://sso2.agora.io/en/v4/signup/with-email ]**

*While creating project, in authentication mechanism, select Testing mode*

Start app
```
npm start
```

### In second terminal
Navigate to server folder
```
cd server
```
Install all dependency
```
npm install
```
Create ```.env``` file and add these lines
```
CONNECTION_URL=<YOUR MONGODB DATABASE URL>
FRONTEND_URL=http://localhost:3000
```
**Mondodb [ https://account.mongodb.com/account/register ]**

Start server
```
node index.js
```

## For contributing to this project create pull requests to dev branch
