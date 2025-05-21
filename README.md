# ⚡ EV Charge App

The **EV Charge App** is a mobile application built using **React Native** that helps users locate nearby electric vehicle (EV) charging stations, by list display and map view. It supports registration and authentication using Firebase.

---

## 🔑 Features

### 👤 User Authentication
- Register with email and password
- Login securely using Firebase Authentication
- Logout and session management

### 🧭 Charging Station
- Browse nearby EV charging stations
- View charger details

---

## 🧱 Tech Stack

- **Frontend**: React Native, expo
- **Authentication & Backend**: Firebase Auth

---

## 🛠 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ev-charging-app.git
cd ev-charging-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Firebase
```bash
// Go to Firebase Console
// Create a new project
// Get your Firebase config from project settings
// Paste it in 'firebaseConfig.js'

// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

## Running the App
use expo or React Native CLI:
```bash
npx expo start 
```

##Screenshot
- Home Page
  
![IMG-20250521-WA0003](https://github.com/user-attachments/assets/c237eed3-49f5-436f-abe4-4ab98c15c1ec)

- Registeration Page

![IMG-20250521-WA0005](https://github.com/user-attachments/assets/11df5c32-776a-42e8-9473-4354e2668eb4)

- Login Page

![IMG-20250521-WA0004](https://github.com/user-attachments/assets/3692ef31-293e-4f75-bc3b-35ad7854708e)

- Charging Station Detail Page

![IMG-20250521-WA0002](https://github.com/user-attachments/assets/5db02d5e-45d7-4d85-9df8-8b4cf0a390b6)

- Map View Page

![IMG-20250521-WA0006](https://github.com/user-attachments/assets/86330bdc-959d-4280-89e5-c52aab9c4c7d)

- Admin Dashboard

![IMG-20250521-WA0010](https://github.com/user-attachments/assets/0deae076-d38f-4148-86f9-133933dc8306)

![IMG-20250521-WA0009](https://github.com/user-attachments/assets/9922b011-ed4e-4b8f-9d50-b5da01c0cd03)

![IMG-20250521-WA0008](https://github.com/user-attachments/assets/4a0ac191-2685-4ca0-b189-015fc6522996)

![IMG-20250521-WA0007](https://github.com/user-attachments/assets/d7ba7057-8260-4a9e-92d3-e53525ed650c)
