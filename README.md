# Tech Journey

An interactive technology museum and engineering playground built with Angular.

Tech Journey explores the evolution of technology through a personal and engineering perspective — from Atari and home computers to the web, Java, cloud computing, and AI.

Rather than functioning as a traditional portfolio, the application is designed to be explored.

**Discover the technology. Inspect the API. Enter the lab.**

## Live Application

**Museum:** https://museum.techjourney.dev

**Main Tech Journey site:** https://techjourney.dev

---

## About the Project

Tech Journey began as a way to connect decades of technology evolution with the software engineering concepts behind modern applications.

The frontend is built as an interactive experience with three primary layers:

```text
MUSEUM
   ↓
TECHNOLOGY DETAIL
   ↓
┌─────────────────────┬─────────────────────┐
│                     │                     │
API EXPLORER      ENGINEERING LAB
│                     │
Inspect APIs      Run experiments
│                     │
Understand data   Understand engineering
└─────────────────────┴─────────────────────┘
```

The overall philosophy is:

> **PLAY → UNDERSTAND → ENGINEER**

Visitors can explore technology history, interact with a real Spring Boot REST API, and use hands-on engineering experiments to see concepts such as Java Streams, Spring Boot, and Spring Security in action.

---

## Features

### Technology Museum

The Museum presents a curated timeline of important technologies and milestones spanning gaming, computing, the internet, software development, cloud infrastructure, and artificial intelligence.

Timeline entries lead into dedicated technology detail experiences rather than functioning as static cards.

Examples include:

- Atari 2600
- Home Computers
- Early Internet
- Java
- HTML / Web
- AWS
- Docker / Kubernetes
- CI/CD and DevOps
- Generative AI
- AI Agents

---

### Technology Details

Each timeline item can open a dedicated technology view containing:

- historical context
- why the technology mattered
- key concepts
- supporting imagery
- related engineering experiences
- links into the API Explorer or Engineering Lab when appropriate

This creates the transition between the technology story and the engineering implementation.

---

## API Explorer

The API Explorer provides an interactive interface for communicating directly with the Tech Journey Spring Boot backend.

Users can send requests, inspect payloads, and observe real API behavior without leaving the application.

### Museum API

Explore the timeline REST API using operations such as:

```http
GET /api/timeline
GET /api/timeline/{id}
```

### Sandbox API

A separate sandbox provides a safe environment for experimenting with CRUD operations:

```http
GET    /api/sandbox/events
GET    /api/sandbox/events/{id}
POST   /api/sandbox/events
PUT    /api/sandbox/events/{id}
DELETE /api/sandbox/events/{id}
```

The explorer displays information including:

- HTTP method
- request payload
- response body
- HTTP status
- response time
- response size

Sandbox records are temporary and are automatically removed after their retention period.

---

# Engineering Lab

The Engineering Lab moves beyond viewing technology and allows visitors to interact with engineering concepts directly.

Experiments follow a common structure:

### 01 PLAY

Configure or interact with the experiment.

### 02 UNDERSTAND

Visualize what the application or framework is doing.

### 03 ENGINEER

Inspect the concepts and implementation behind the behavior.

---

## Java Experiments

### 01 — Java Data Processing

**Collections • Streams • Lambdas**

A live backend experiment that builds and executes a Java Stream pipeline against timeline data.

Visitors can configure:

- category filtering
- sort direction
- result mapping
- result limits

The UI then visualizes the resulting pipeline:

```text
COLLECTION
    ↓
STREAM
    ↓
FILTER
    ↓
SORT
    ↓
MAP
    ↓
LIMIT
    ↓
TO_LIST
    ↓
RESULT
```

The experiment communicates with the Spring Boot backend in real time.

---

### 02 — Spring Boot Lifecycle

**Under the Covers**

An interactive visualization of what happens when a Spring Boot application starts.

The experiment walks through:

```text
MAVEN BUILD
    ↓
APPLICATION STARTUP
    ↓
COMPONENT SCANNING
    ↓
DEPENDENCY INJECTION
    ↓
AUTO-CONFIGURATION
    ↓
SPRING DATA
    ↓
CONTROLLER ONLINE
    ↓
API ONLINE
```

The goal is to make the framework lifecycle visible instead of treating Spring Boot startup as a black box.

---

### 03 — Spring Security

**Authentication • Authorization • Roles**

A controlled authentication experiment backed by Spring Security.

The experiment demonstrates the difference between:

> **Authentication — Who are you?**

and

> **Authorization — What are you allowed to do?**

Scenarios include:

```text
Valid login
→ Authentication succeeds

Invalid password
→ 401 Unauthorized

USER accessing /user
→ 200 OK

USER accessing /admin
→ 403 Forbidden
```

The UI visualizes the request as it moves through the Spring Security flow.

---

## Personal Technology Experiments

The Engineering Lab also includes frontend-focused experiences inspired by technologies represented in the Museum.

These experiments focus more on interaction and technology evolution than backend processing.

Current areas include:

- Atari
- Home Computers
- Early Web
- Angular
- Napster / Peer-to-Peer technology

---

# Frontend Technology Stack

| Technology | Purpose |
|---|---|
| Angular 21 | Application framework |
| TypeScript | Application development |
| RxJS | Reactive programming |
| Angular Router | Application navigation |
| Angular Signals | Component state |
| HTML / CSS | UI and responsive design |
| Docker | Containerized production build |
| Nginx | Production web server and API proxy |

The frontend communicates with a separate Spring Boot REST API.

---

# Application Routes

Primary application routes include:

```text
/                     Museum
/technology/:id       Technology Detail
/api-explorer         API Explorer
/lab                  Engineering Lab
```

---

# Architecture

At a high level:

```text
Browser
   │
   ▼
Angular Application
   │
   │ /api
   ▼
Nginx Reverse Proxy
   │
   ▼
Spring Boot REST API
   │
   ▼
Persistence Layer
```

The frontend and backend are maintained as separate repositories and deployed as separate Docker containers.

---

# Local Development

## Prerequisites

Recommended development environment:

```text
Node.js 22+
npm 10+
Angular CLI 21+
```

The Spring Boot API should also be running locally if you want to use features that require backend communication.

---

## Install Dependencies

Clone the repository and install packages:

```bash
git clone https://github.com/wjones-dev/tech-journey.git

cd tech-journey

npm install
```

---

## Start the Angular Development Server

```bash
npm start
```

or:

```bash
ng serve
```

Open:

```text
http://localhost:4200
```

The development proxy forwards `/api` requests to the locally running Spring Boot application.

---

# Production Build

Create an optimized Angular production build:

```bash
npm run build
```

Build output is generated in the Angular `dist` directory.

---

# Docker

The production frontend uses a multi-stage Docker build.

Angular is compiled using Node and the resulting static application is served through Nginx.

```text
Node Build Stage
       ↓
Angular Production Build
       ↓
Nginx Runtime Container
```

Build the image locally with:

```bash
docker build -t tech-journey-ui .
```

---

# Related Repositories

### Spring Boot API

https://github.com/wjones-dev/tech-journey-api

Contains the REST API, persistence layer, Engineering Lab backend services, Spring Security configuration, and API error handling.

### Deployment

https://github.com/wjones-dev/tech-journey-deployment

Contains the Docker Compose configuration used to run the frontend and backend services together.

---

# Deployment

Tech Journey is deployed to a DigitalOcean Ubuntu server using Docker.

Production architecture:

```text
Internet
   ↓
museum.techjourney.dev
   ↓
DigitalOcean
   ↓
Docker
   ├── Angular / Nginx
   └── Spring Boot API
```

Nginx serves the Angular application and proxies API requests to the backend service.

---

# Project Goal

Tech Journey is intentionally different from a traditional résumé or static developer portfolio.

The goal is to demonstrate software engineering through an application that can actually be explored.

Instead of simply listing technologies such as Angular, Java, Spring Boot, REST, Docker, and Spring Security, the project provides interactive examples of how those technologies work together.

> **Explore the technology.  
> Understand the system.  
> Engineer the solution.**

---

## Author

**William Jones**

Software Engineer

Tech Journey is an ongoing project and will continue to evolve as additional technologies and engineering experiments are added.
