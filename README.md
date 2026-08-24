# 🌐 CV Web Interactivo & Bilingüe — Oscar Octavio Alvarado Cornejo

Una versión web moderna, animada y profesional de currículum vitae con soporte para **Español / Inglés (Bilingüe)**, **Modo Oscuro / Modo Claro**, contadores de impacto interactivos, filtrado de habilidades técnicas y **exportación a PDF ATS/Ejecutivo** 100% optimizada en ambos idiomas.

---

## 🌟 Características Principales

- 🌐 **Soporte Bilingüe (Español / Inglés):** Botón selector en la barra superior que traduce dinámicamente todo el contenido (experiencia, métricas, habilidades, educación, cursos y mensajes).
- 🌓 **Modo Oscuro / Modo Claro:** Detección automática del sistema y persistencia en `localStorage`.
- 📊 **Métricas Animadas:** Contadores dinámicos que se activan al hacer scroll.
- 🗂️ **Filtros de Habilidades:** Pestañas interactivas para explorar el stack tecnológico.
- 🖨️ **Descarga a PDF Bilingüe (Formato ATS / Ejecutivo):** Si estás en Español, exporta el PDF en Español; si cambias a Inglés, **¡exporta el PDF en Inglés!** sin fondos oscuros ni botones web.

---

## 🚀 Cómo Probarlo en Tu Computadora (Local)

1. Simplemente haz doble clic sobre el archivo [`index.html`](./index.html) para abrirlo en tu navegador favorito (Chrome, Edge, Firefox, etc.).
2. Alternativamente, si usas VS Code, puedes usar la extensión **Live Server** haciendo clic derecho en `index.html` > *Open with Live Server*.

---

## ☁️ Guía Paso a Paso para Subirlo a la Nube Gratis

Puedes elegir cualquiera de estas dos opciones (ambas son 100% gratuitas de por vida).

---

### Opción A: Desplegar en **GitHub Pages** (Recomendado)

#### Paso 1: Crear el repositorio en GitHub
1. Ve a [github.com/new](https://github.com/new).
2. Nombre del repositorio: `cv-web` (o el nombre que prefieras).
3. Asegúrate de marcarlo como **Public** (Público).
4. Haz clic en **Create repository**.

#### Paso 2: Subir tu código con Git
Abre una terminal (PowerShell o Git Bash) en la carpeta de este proyecto y ejecuta:

```bash
git init
git add .
git commit -m "feat: CV Web interactivo bilingüe y optimizado para PDF"
git branch -M main
git remote add origin https://github.com/TU_USUARIO_GITHUB/cv-web.git
git push -u origin main
```
*(Reemplaza `TU_USUARIO_GITHUB` por tu nombre de usuario en GitHub).*

#### Paso 3: Activar GitHub Pages
1. En tu repositorio de GitHub, ve a la pestaña **Settings** (Configuración).
2. En la barra lateral izquierda, haz clic en **Pages**.
3. En la sección **Branch**, selecciona `main` y la carpeta `/(root)`.
4. Haz clic en **Save** (Guardar).
5. ¡Listo! En unos segundos tendrás tu enlace público activo en:
   👉 `https://TU_USUARIO_GITHUB.github.io/cv-web/`

---

### Opción B: Desplegar en **Vercel** (Rápido y con CDN Global)

1. Ve a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **"Add New..."** > **"Project"**.
3. Selecciona tu repositorio `cv-web` y presiona **Import**.
4. Deja la configuración por defecto y haz clic en **Deploy**.
5. En 10 segundos Vercel te entregará una URL como:
   👉 `https://cv-web-tuusuario.vercel.app`

---

## 🔄 ¿Cómo Actualizar o Editar los Textos en el Futuro?

- Todos los textos en español e inglés están organizados de forma limpia y legible en el archivo [`translations.js`](./translations.js).
- Para actualizar fechas, empresas o nuevas habilidades:
  1. Abre [`translations.js`](./translations.js) y edita la sección correspondiente (`es` o `en`).
  2. Guarda los cambios.
  3. En tu terminal corre:
     ```bash
     git add .
     git commit -m "update: actualización de experiencia"
     git push
     ```
  4. **Tanto GitHub Pages como Vercel se actualizarán solos en internet en menos de 1 minuto.** ⚡

---

## 📂 Estructura del Proyecto

```text
CV-WEB/
├── index.html        # Estructura semántica, metadatos SEO/OpenGraph y maquetación
├── styles.css        # Paleta de colores, diseño Glassmorphism, temas dark/light, @media print
├── translations.js   # Diccionario completo con textos en Español e Inglés
├── main.js           # Lógica interactiva (i18n bilingüe, cambio de tema, contadores, PDF)
└── README.md         # Documentación y guía de despliegue en la nube
```
