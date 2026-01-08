# 🔤 Sopa de Letras

<div align="center">

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/Licencia-MIT-green?style=for-the-badge)

**Un juego interactivo de sopa de letras construido con React y Vite**

[Demo](#-demo) • [Características](#-características) • [Instalación](#-instalación) • [Tecnologías](#️-tecnologías)

</div>

---

## 📖 Descripción

Sopa de Letras es un juego web interactivo donde los jugadores deben encontrar palabras ocultas en una cuadrícula de letras. El juego incluye una **ruleta temática** que añade emoción al seleccionar diferentes categorías, un **temporizador** para aumentar el desafío, y un sistema de **resaltado colorido** para las palabras encontradas.

## ✨ Características

- 🎡 **Ruleta de Temas** - Gira la ruleta para seleccionar entre 8 categorías diferentes
- ⏱️ **Temporizador** - 10 minutos para encontrar todas las palabras
- 🎨 **Resaltado Colorido** - Cada palabra encontrada se marca con un color diferente
- 📱 **Diseño Responsivo** - Compatible con dispositivos móviles y escritorio
- 🔄 **Palabras Multidireccionales** - Horizontal, vertical y diagonal en todas las direcciones
- 🎯 **Selección Intuitiva** - Arrastra para seleccionar las palabras
- 🏆 **Pantalla de Victoria** - Celebración al completar el puzzle

## 🎮 Temas Disponibles

| Tema | Emoji | Ejemplos de Palabras |
|------|-------|---------------------|
| Fútbol | ⚽ | GOL, BALÓN, PORTERO, ESTADIO |
| Gastronomía | 🍕 | PIZZA, SUSHI, PAELLA, TACOS |
| Astronomía | 🌌 | PLANETA, ESTRELLA, GALAXIA, LUNA |
| Cine | 🎬 | ACTOR, DRAMA, ESCENA, OSCAR |
| Música | 🎵 | PIANO, ROCK, JAZZ, VIOLÍN |
| Animales | 🐾 | LEÓN, TIGRE, ÁGUILA, LOBO |
| Geografía | 🌍 | OCÉANO, ISLA, VOLCÁN, BOSQUE |
| Tecnología | 💻 | CÓDIGO, DATOS, ROBOT, WIFI |

## 🚀 Instalación

### Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- npm o yarn

### Pasos de Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/sopa.git

# Navegar al directorio del proyecto
cd sopa

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📜 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la versión de producción |
| `npm run preview` | Previsualiza la versión de producción |
| `npm run lint` | Ejecuta ESLint para verificar el código |

## 🏗️ Estructura del Proyecto

```
sopa/
├── public/              # Archivos estáticos
├── src/
│   ├── components/      # Componentes React
│   │   ├── SpinningWheel.jsx    # Ruleta de selección de tema
│   │   ├── WordSearchGrid.jsx   # Cuadrícula del juego
│   │   ├── Timer.jsx            # Temporizador
│   │   └── WordList.jsx         # Lista de palabras
│   ├── hooks/
│   │   └── useWordSearch.js     # Hook personalizado del juego
│   ├── data/
│   │   └── themes.js            # Datos de temas y palabras
│   ├── App.jsx          # Componente principal
│   ├── App.css          # Estilos de la aplicación
│   └── main.jsx         # Punto de entrada
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

## 🛠️ Tecnologías

- **[React 19](https://react.dev/)** - Biblioteca de interfaz de usuario
- **[Vite](https://vitejs.dev/)** - Herramienta de desarrollo y empaquetado
- **[ESLint](https://eslint.org/)** - Linter de código JavaScript
- **CSS3** - Estilos y animaciones

## 🎯 Cómo Jugar

1. **Gira la Ruleta** - Haz clic en "GIRAR" para seleccionar un tema aleatorio
2. **Busca las Palabras** - Encuentra las 10 palabras oculidas en la cuadrícula
3. **Selecciona** - Haz clic y arrastra sobre las letras para formar palabras
4. **¡Completa!** - Encuentra todas las palabras antes de que termine el tiempo

> 💡 **Consejo:** Las palabras pueden estar en horizontal, vertical o diagonal, ¡y en cualquier dirección!

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Realiza tus cambios y haz commit (`git commit -m 'Añadir nueva característica'`)
4. Haz push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## 👤 Autor

**Álvaro**

---

<div align="center">

⭐ ¡Si te gusta este proyecto, no olvides darle una estrella! ⭐

</div>
