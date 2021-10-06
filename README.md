# Anoninetwork 
Anoninetwork is a social network created to participate in the [EUREKA](https://www.provincia.bz.it/arte-cultura/giovani/721.asp) competition!

# How to setup
Clone the repository
```bash
git clone https://github.com/Superredstone/Anoninetwork.git && cd Anoninetwork 
```

Initialize database for queries otherwise it won't work
```bash
npm i mongodb && node InitDB.js
```

Install all dependencies
```bash
cd ./anoninetwork-backend/ && npm install mongodb express && cd ../anoninetwork-frontend/ && npm install react-scripts typescript serve # Serve is optional, you can use another web server if you prefer
```

## IF you want HTTPS put SSL certificates inside Anoninetwork/ssl/ and set DEV=false inside anoninetwork-backend/.env 

Start backend
```bash
cd ./anoninetwork-backend/ && node index.js
```

## EDIT anoninetwork-frontend/Consts.tsx with your backend ip

Compile and serve frontend 
```bash
cd ./anoninetwork-frontend/ && npm run build && npm run serve # If you want to run without HTTPS you must use "serve -l 80 build/" instead of "npm run serve"
```

# How to fix: ReferenceError: TextEncoder is not defined #198
Just edit 

```Anoninetwork/anoninetwork-backend/node_modules/whatwg-url/dist/encoding.js```

with your favourite editor and add this line to the second line:
 
```const { TextEncoder, TextDecoder } = require("util");```
