# Vue To-Do List Drag and Drop 2025

Este proyecto es una aplicación interactiva de lista de tareas (To-Do List) desarrollada con **Vue 3**, **Pinia**, y **TailwindCSS**. Permite a los usuarios gestionar proyectos y tareas utilizando un sistema de columnas con funcionalidad de **drag-and-drop**. Es el proyecto final de un Bootcamp y está diseñado para demostrar habilidades avanzadas en desarrollo frontend.

---

## **Características**

- **Autenticación de usuarios**:
  - Registro, inicio de sesión y cierre de sesión utilizando **Supabase**.
  - Gestión de usuarios autenticados para personalizar la experiencia.

- **Gestión de proyectos**:
  - Crear, editar y eliminar proyectos.
  - Asignar prioridades (alta, media, baja) y fechas límite.
  - Mover proyectos entre columnas (Backlog, To Do, Doing, Done) mediante drag-and-drop.

- **Filtros avanzados**:
  - Filtrar proyectos por texto, prioridad y estado.

- **Interfaz moderna**:
  - Diseñada con **TailwindCSS** y **DaisyUI** para una experiencia de usuario atractiva y responsiva.

- **Despliegue en producción**:
  - Aplicación desplegada en **Netlify**.

---

## **Tecnologías utilizadas**

- **Framework principal**: [Vue 3](https://vuejs.org/)
- **Gestión de estado**: [Pinia](https://pinia.vuejs.org/)
- **Estilos**: [TailwindCSS](https://tailwindcss.com/) y [DaisyUI](https://daisyui.com/)
- **Autenticación y base de datos**: [Supabase](https://supabase.com/)
- **Drag-and-Drop**: [FormKit Drag and Drop](https://formkit.com/)
- **Iconos**: [Heroicons](https://heroicons.com/)
- **Empaquetador**: [Vite](https://vitejs.dev/)

---

## **Instalación y configuración**

### **Requisitos previos**
- Node.js (v16 o superior)
- NPM o Yarn

### **Clonar el repositorio**
```bash
git clone https://github.com/yobo-16/vue-to-do-list-dragndrop-2025.git
cd vue-to-do-list-dragndrop-2025
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
