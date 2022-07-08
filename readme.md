## Instalar dependencias.

```
npm install
```

## Variables de entorno.

El proyecto hace uso de un puerto, el servicio de MongoDB, JWT, OAUTH Google, para funcionar, por lo que es necesario **crear un archivo en la raíz del proyecto** llamado **".env"**, dentro de ese archivo, se añadirán las debidas variables de entorno, las cuales se encuentran en el archivo **"example.env"**, estas **deben ser reemplazadas** para el funcionamiento del proyecto.

Otra credencial necesaria es el **"CLIENT_ID"** de OAUTH Google, esta credencial estará en el archivo **".env"** con el nombre de **'GOOGLE_CLIENT_ID'**. la credencial se utiliza en el archivo **'public/index.html'**, dentro del archivo se reemplazara la opción llamada **'YOUR_GOOGLE_CLIENT_ID'**, dicha opción esta en el apartado de login, dentro de un div con el atributo **'data-client_id'**.

### Iniciar la app.

```
npm start
```

## Ejemplos de uso.

El proyecto es solo de ejemplo para un rest server, se pueden probar las rutas en postman en el localhost
