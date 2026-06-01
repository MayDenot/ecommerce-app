# 🛍️ Velora — Ecommerce App

**Aplicación de ecommerce fullstack con catálogo de productos, carrito de compras y autenticación JWT**

[![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

[🌐 Ver en producción](https://ecommerce-app-ten-mocha.vercel.app) · [📂 Explorar el código](#estructura-del-proyecto) · [🐛 Reportar un bug](https://github.com/MayDenot/ecommerce-app/issues)

---

## 📋 Tabla de contenidos

- [Descripción](#-descripción)
- [Capturas](#-capturas)
- [Características](#-características)
- [Stack tecnológico](#-stack-tecnológico)
- [Arquitectura](#️-arquitectura)
- [Instalación y ejecución local](#-instalación-y-ejecución-local)
- [Variables de entorno](#-variables-de-entorno)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [API Endpoints](#-api-endpoints)
- [Deploy](#️-deploy)

---

## 📖 Descripción

**Velora** es una aplicación web full-stack de ecommerce desarrollada como proyecto de práctica y portafolio. Permite explorar un catálogo de productos filtrable por categorías, gestionar un carrito de compras y dejar reseñas con puntaje. El backend expone una API REST documentada con Swagger, protegida mediante autenticación JWT con soporte de refresh token.

---

## 📸 Capturas

**Inicio**
![Home](https://raw.githubusercontent.com/MayDenot/ecommerce-app/main/docs/screenshots/home.png)

**Tienda**
![Shop](https://raw.githubusercontent.com/MayDenot/ecommerce-app/main/docs/screenshots/shop.png)

**Categorías**
![Categories](https://raw.githubusercontent.com/MayDenot/ecommerce-app/main/docs/screenshots/categories.png)

**Iniciar sesión**
![Login](https://raw.githubusercontent.com/MayDenot/ecommerce-app/main/docs/screenshots/login.png)

---

## ✨ Características

- 🔐 **Autenticación segura** — Registro e inicio de sesión con JWT (access token + refresh token)
- 🛒 **Carrito de compras** — Agregar, quitar y gestionar productos en el carrito
- 🔍 **Búsqueda y filtros** — Búsqueda por nombre y filtro por categoría con paginación
- ⭐ **Reseñas** — Puntaje promedio y total de reseñas por producto
- 📦 **CRUD de productos y categorías** — Gestión completa desde el panel admin
- 📄 **API documentada** — Swagger UI disponible en `/swagger-ui.html`
- 🌍 **Deploy en producción** — Frontend, backend y base de datos desplegados

---

## 🧰 Stack tecnológico

| Capa                | Tecnología                              |
| ------------------- |-----------------------------------------|
| **Frontend**        | React 18, TypeScript, Vite, TailwindCSS |
| **Backend**         | Java 21, Spring Boot 3, Spring Security  |
| **Base de datos**   | PostgreSQL (Aiven)                      |
| **Autenticación**   | JWT — access token + refresh token      |
| **Documentación**   | Swagger / OpenAPI 3                     |
| **Deploy Backend**  | Render                                  |
| **Deploy Frontend** | Vercel                                  |

---

## 🏗️ Arquitectura

```
┌──────────────────────────┐         ┌────────────────────────────────┐
│   React + Vite           │  HTTP   │   Spring Boot API REST         │
│   TypeScript + Tailwind  │ ──────► │   Spring Security + JWT        │
│                          │  JWT    │                                │
│   Vercel (prod)          │ ◄────── │   /api/auth                    │
└──────────────────────────┘         │   /api/products                │
                                     │   /api/categories              │
                                     └──────────────┬─────────────────┘
                                                    │
                                         ┌──────────▼──────────┐
                                         │   PostgreSQL        │
                                         │   Aiven (prod)      │
                                         └─────────────────────┘
```

---

## 🚀 Instalación y ejecución local

### Requisitos previos

- Java 17+
- Node.js 18+
- PostgreSQL 14+
- Maven

### 1. Clonar el repositorio

```bash
git clone https://github.com/MayDenot/ecommerce-app.git
cd ecommerce-app
```

### 2. Configurar la base de datos

Crear una base de datos en PostgreSQL:

```sql
CREATE DATABASE velora;
```

### 3. Backend — Spring Boot

```bash
cd backend
```

Configurar las variables de entorno (ver [sección Variables de entorno](#-variables-de-entorno)) y luego ejecutar:

```bash
./mvnw spring-boot:run
```

El servidor quedará disponible en `http://localhost:8080`.  
Swagger UI en `http://localhost:8080/swagger-ui.html`.

### 4. Frontend — React

```bash
cd frontend
npm install
npm run dev
```

La aplicación quedará disponible en `http://localhost:5173`.

---

## 🔑 Variables de entorno

### Backend — `application.properties`

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce_db
spring.datasource.username=TU_USUARIO
spring.datasource.password=TU_CONTRASEÑA
spring.jpa.hibernate.ddl-auto=update

jwt.secret=TU_CLAVE_SECRETA_JWT
jwt.expiration=900000
```

### Frontend — `.env`

```env
VITE_API_URL=http://localhost:8080
```

---

## 📂 Estructura del proyecto

```
ecommerce-app/
│
├── backend/                        # API REST (Spring Boot)
│   └── src/main/java/com/example/backend/
│       ├── auth/                   # Registro, login, refresh token
│       │   ├── controller/
│       │   ├── dto/
│       │   └── service/
│       ├── product/                # CRUD de productos
│       │   ├── controller/
│       │   ├── dto/
│       │   ├── entity/
│       │   └── service/
│       ├── category/               # CRUD de categorías
│       │   ├── controller/
│       │   ├── dto/
│       │   ├── entity/
│       │   └── service/
│       └── security/               # Configuración JWT y Spring Security
│
└── frontend/                       # Cliente React + TypeScript
    └── src/
        ├── components/             # Componentes reutilizables
        ├── pages/                  # Vistas (Home, Shop, Login, etc.)
        ├── services/               # Llamadas a la API
        └── types/                  # Tipos TypeScript
```

---

## 📡 API Endpoints

### Autenticación — `/api/auth`

| Método | Endpoint    | Descripción                              |
| ------ | ----------- | ---------------------------------------- |
| `POST` | `/register` | Registrar nuevo usuario, devuelve JWT    |
| `POST` | `/login`    | Iniciar sesión, devuelve access + refresh token |
| `POST` | `/refresh`  | Renovar el access token                  |

### Productos — `/api/products` *(requieren JWT)*

| Método   | Endpoint   | Descripción                                              |
| -------- | ---------- | -------------------------------------------------------- |
| `GET`    | `/`        | Listar productos (filtros: `search`, `category`, `page`, `size`, `sort`) |
| `GET`    | `/{id}`    | Obtener producto por ID                                  |
| `POST`   | `/`        | Crear producto                                           |
| `PUT`    | `/{id}`    | Actualizar producto                                      |
| `DELETE` | `/{id}`    | Eliminar producto                                        |

### Categorías — `/api/categories` *(requieren JWT)*

| Método   | Endpoint | Descripción              |
| -------- | -------- | ------------------------ |
| `GET`    | `/`      | Listar todas las categorías |
| `GET`    | `/{id}`  | Obtener categoría por ID |
| `POST`   | `/`      | Crear categoría          |
| `PUT`    | `/{id}`  | Actualizar categoría     |
| `DELETE` | `/{id}`  | Eliminar categoría       |

---

## ☁️ Deploy

| Servicio        | Plataforma | URL                                                                 |
| --------------- | ---------- | ------------------------------------------------------------------- |
| Frontend        | Vercel     | [ecommerce-app-ten-mocha.vercel.app](https://ecommerce-app-ten-mocha.vercel.app) |
| Backend         | Render     | [ecommerce-app-4d50.onrender.com](https://ecommerce-app-4d50.onrender.com) |
| Base de datos   | Aiven      | PostgreSQL en la nube                                               |

---

## 👩‍💻 Autor

**MayDenot** — [@MayDenot](https://github.com/MayDenot)

---

Hecho con 🧉 y Spring Boot