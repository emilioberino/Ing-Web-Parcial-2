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

### Uso

#### Iniciar el Servidor de Desarrollo

```sh
npm run dev
```

El servidor se iniciará en http://localhost:3000. Deberías ver el mensaje "Hello World" al acceder a la URL raíz.

####Scripts

npm run dev: Inicia el servidor de desarrollo usando ts-node.
