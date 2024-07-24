# Slack Translation Bot

Este proyecto es un bot de Slack que traduce mensajes entre inglés y español utilizando la API de DeepL.

## Requisitos Previos

- Node.js instalado (versión 14 o superior).
- Cuenta de Slack y acceso para crear aplicaciones.
- API key de DeepL.
- Herramienta `ngrok` para desarrollo local (opcional, pero recomendada).

## Instalación

### 1. Clonar el Repositorio

```sh
git clone https://github.com/Evelo00/slack-translation-bot
cd slack-translation-bot
```

2. Instalar Dependencias
```sh
Copiar código
npm install
```
3. Configurar Variables de Entorno
Crea un archivo .env en la raíz del proyecto con el siguiente contenido:
```sh
SLACK_BOT_TOKEN=your-slack-bot-token
SLACK_SIGNING_SECRET=your-slack-signing-secret
DEEPL_API_KEY=your-deepl-api-key
PORT=3000
```
Configuración de Slack
1. Crear una App en Slack
Ve a Slack API: Applications y crea una nueva aplicación.
Configura las Bot Token Scopes bajo "OAuth & Permissions":
channels:history
channels:read
chat:write
chat:write.public
Instala la app en tu espacio de trabajo.
2. Configurar Event Subscriptions
Ve a "Event Subscriptions" y habilita "Enable Events".
Configura la Request URL:
Si estás desarrollando localmente, usa una URL pública de ngrok (e.g., https://<subdominio>.ngrok.io/slack/events).
Suscríbete a los eventos necesarios bajo "Subscribe to Bot Events":
message.channels
message.groups
message.im
message.mpim
Ejecutar el Servidor
1. Iniciar ngrok (si estás desarrollando localmente)
```sh
ngrok http 3000
```
2. Iniciar el servidor
```sh
node app.js
```
Uso del Bot
Envía un mensaje en cualquier canal donde el bot esté presente usando el formato:

```sh
translate: [texto] to [código de idioma]
```

Ejemplos:
translate: Hello, how are you? to ES
translate: Hola, ¿cómo estás? to EN

Manejo de Errores y Depuración

Verificar Logs del Servidor: Revisa los logs para cualquier mensaje de error o solicitud incorrecta.
Verificar ngrok Dashboard: Ve a http://localhost:4040 para ver las solicitudes que están siendo redirigidas a tu servidor.
Despliegue en Producción
Para un despliegue en producción, configura tu servidor en una plataforma como Heroku, AWS, o cualquier otro servicio de alojamiento web que prefieras. Asegúrate de actualizar la Request URL en Slack para que apunte a tu dominio de producción.
