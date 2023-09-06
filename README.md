# front-end-prueba-manel-linares
## Descripción del Proyecto

Esta es una aplicación de votación de imágenes construida con Vue.js. Permite a los usuarios buscar imágenes mediante dos motores de búsqueda: Google y Unsplash. Los usuarios pueden votar por las imágenes que más les gusten, asociadas a diferentes vendedores. El proyecto se integra con la API de Alegra para la gestión de vendedores, clientes, productos y facturas.

### Características

- **Buscador de imágenes**: Dos motores de búsqueda (Google Custom Search y Unsplash API).
- **Votación de imágenes**: Vota por la imagen que más te guste.
- **Ganadores y Puntos**: Cuando un vendedor alcanza 20 puntos, se declara como ganador.
- **Generación de Facturas**: Posibilidad de generar facturas a nombre del vendedor ganador.
- **Integración con Alegra**: Creación y manejo de vendedores, clientes, productos y facturas.

## Tecnologías Utilizadas

- Vue.js
- Vuex
- TypeScript
- Tailwind
- Alegra API
- Google Custom Search API
- Unsplash API
- 
## Configuración de Variables de Entorno

Antes de ejecutar el proyecto, asegúrate de configurar las siguientes variables de entorno en tu archivo `.env`. Aquí hay ejemplos de cómo deberían verse:

```env
VUE_APP_ALEGRA_API=https://api.alegra.com/api/v1
VUE_APP_ALEGRA_EMAIL=ejemplo@gmail.com
VUE_APP_ALEGRA_TOKEN=token_alegra

VUE_APP_GOOGLE_API_URL=https://www.googleapis.com/customsearch/v1
VUE_APP_GOOGLE_API_KEY=api_key_google
VUE_APP_GOOGLE_SEARCH_ENGINE_ID=id_motor_busqueda

VUE_APP_UNSPLASH_ACCESS_KEY=access_key_unsplash

## Instalación y Uso

Para configurar el proyecto en tu máquina local:

1. Clona el repositorio: 
```
git clone https://github.com/mlinaresweb/Prueba-Tecnica-FrontEnd-Mlinares.git
```
2. Instala las dependencias:
 ```
npm install
```
3.  Ejecuta el servidor de desarrollo: 
```
npm run serve
```
### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
