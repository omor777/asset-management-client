# AssetAura


Our asset management website is intended to ease the process of managing corporate assets. HR may use this tool to add, amend, and delete assets, as well as add employees to their new teams. This platform promotes effective asset management and open communication between employees and HR.



Live Site Link: [https://asset-management-system-330cd.web.app](https://asset-management-system-330cd.web.app)

## Features and Characteristics:

- Secure user authentication and authorization system
- Integrated payment system to handle transactions, subscriptions, and invoices securely and efficiently.
- Secure access with role-based permissions for HR managers and employees, ensuring data privacy and integrity.

## Technology uses

- React
- Express
- MongoDB

## How to run this project in your local machine

1. clone this project in your local machine
```
git@github.com:omor777/asset-management-client.git
```
2. install dependencies
```
yarn install
```
3. create firebase project

4. replace this with your firebase config
```
// ./src/firebase/firebase.config.js

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

```
5. run project
```
yarn dev
```
