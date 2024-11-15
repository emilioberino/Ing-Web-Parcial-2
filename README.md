# Express IW

## Descripción

Express IW es una aplicación web de Node.js construida con Express y TypeScript. Sirve como base para el proyecto Examen 2, proporcionando una base para construir aplicaciones web escalables y mantenibles.

## Requisitos Previos

- **Node.js** (v14.x o superior)
- **npm** (v6.x o superior)
- **Git**

## Instalación

Sigue estos pasos para poner en marcha el proyecto en tu máquina local:

### 1. Clonar el Repositorio

```sh
git clone https://github.com/emilioberino/Ing-Web-Parcial-2.git
```

### 2. Navegar al Directorio del Proyecto

```sh
cd Ing-Web-Parcial-2
```

### 3. Instalar Dependencias

```sh
npm install
```
### 4. Inicializar la Configuración de TypeScript

Si **`tsconfig.json`** no está presente, inicialízalo:

```sh
npx tsc --init
```

### 5. Pon en marcha el fichero .env

Crea un fichero .env en la raíz del proyecto.
Copia el contenido de .env.example en tu .env
Reemplaza la URI de MongoDB con tu propia conexión

```sh
# Ejemplo de .env
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@cluster.mongodb.net/database

```

### 6. No te olvides de cambiar también la conexión en el docker-compose.yml

```sh
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGO_URI= TU URI AQUI

  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:

```

### Uso

#### Iniciar el Servidor de Desarrollo

```sh
# Montar contenedores
docker compose up -d

# View logs
docker compose logs -f app

# Parar los contenedores
docker compose down
```

El docker montará la app y esta se iniciará en http://localhost:3000. Deberías ver el mensaje "Hello World" al acceder a la URL raíz.

#### Estructura del Proyecto

```sh

├── src
│   ├── app.ts
│   └── routes
│       └── index.routes.ts
├── package.json
├── tsconfig.json
└── .gitignore

```

#### Scripts

npm run dev: Inicia el servidor de desarrollo usando ts-node.

##### Colaboración

1.- Crear una nueva rama: **`git checkout -b tunombre-branch`**

Reemplaza **`tunombre`** con tu nombre.

2.- Realiza cambios en tu rama personal:

```sh
git add .
git commit -m "Descripción de tus cambios"
```

4.- Empuja tu rama al repositorio remoto

``` sh
git push origin nombre-branch
```

### Notas importantes

**NO REALICES CAMBIOS EN LA RAMA MAIN**

Cualquier cambio se notificará por grupo y si es necesario hacer un pull se hace así

```sh
git checkout master
git pull origin master
git checkout nombre-branch
git merge master
```
