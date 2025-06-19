# Star Wars Frontend

This is the frontend microservice of the **Star Wars Web Application**, developed with Angular. It displays information from the Star Wars universe (People and Planets) in a responsive, sortable, and searchable format.

The application communicates with a backend service that integrates with [SWAPI](https://swapi.py4e.com/), providing access to Star Wars data.

---

## 🚀 Features

- Display tables of **People** and **Planets**
- Search by name (case-insensitive)
- Sort by `name` or `created` (ascending/descending)
- Pagination (15 items per page)
- Responsive UI using Angular Material
- Developed following clean code and software engineering principles

---

## 📦 Project Structure

```
src/
├── app/
│   ├── components/
│   ├── services/
│   ├── models/│   
│   └── app.ts
├── index.html
├── main.ts

angular.json
package.json
proxy.conf.json
```

---

## 🧰 Technologies Used

- Angular
- Angular Material
- TypeScript
- RxJS

---

## ⚙️ Prerequisites

- Node.js (v18.x recommended)
- Angular CLI (`npm install -g @angular/cli`)

---

## 🛠️ Local Development

1. **Install dependencies**:

```bash
npm install
```

2. **Run development server**:

```bash
npm start
```

This will start the frontend at `http://localhost:4200`  
It will proxy API requests to the backend at `http://localhost:8080`.

---


## 📊 Backend vs Frontend Logic

Although the backend supports **filtering, sorting and pagination** through its API endpoints, in this specific case, **the frontend retrieves the full dataset from the backend** for both People and Planets.

Given the moderate size of the data, this approach allows the frontend to handle:

- Faster client-side **pagination**
- Instant **searching/filtering**
- Responsive **sorting**

This decision favors user experience and responsiveness without compromising performance.

---

## Using Docker Compose for Frontend and Backend

This project includes a `docker-compose.yml` file for the **frontend** Angular app that launches both the frontend and the backend services. For this setup to work properly, **both projects (frontend and backend) should be organized as sibling folders at the same directory level** on your filesystem.

- **The backend provides a similar docker-compose file as well. It’s not necessary to run both docker-compose setups; running one of them will launch both frontend and backend.**

### Running the containers

To start both the frontend and backend containers, open a terminal and run the following command **from within the `starwarsfrontend` folder**:
```bash
docker-compose up
```
This will build both images and start the containers.

To stop the containers, press Ctrl + C and then run:
```bash
docker-compose down
```


