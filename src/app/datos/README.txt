GUIA DEL FORMATO JSON DE EVENTOS - 18MM FILMS
==============================================

Cada evento tiene dos partes:

1. Un registro en datos/eventos.json con metadatos del evento
2. Un archivo JSON dentro de datos/eventos/ con el contenido del evento


1. datos/eventos.json (registro del evento)
-------------------------------------------

{
  "id": 1,
  "nombre": "Bodas",
  "ruta": "bodas",
  "archivo": "bodas.json",
  "heroImagen": "bodas-hero.webp"
}

Campos:
- id: numero unico del evento
- nombre: nombre visible en menus y cabeceras
- ruta: identificador para la URL (/eventos/bodas)
- archivo: nombre del archivo JSON dentro de datos/eventos/
- heroImagen: (opcional) imagen de fondo del hero


2. Archivo del evento (ej. datos/eventos/bodas.json)
------------------------------------------------------

Estructura completa del JSON:

{
  "hero": {
    "titulo": "Bodas",
    "subtitulo": "El dia mas importante merece las mejores imagenes"
  },
  "bloques": [
    { ... bloque 1 ... },
    { ... bloque 2 ... }
  ]
}

El campo "hero" es opcional. Si existe, se muestra al inicio de la pagina.
El campo "bloques" es un array con los bloques de contenido en orden.


3. Tipos de bloques disponibles
--------------------------------

Tipo "parrafo" - Texto con imagen opcional
{
  "tipo": "parrafo",
  "contenido": "Texto del parrafo aqui...",
  "media": {
    "imagen": "foto-ejemplo.webp",
    "alt": "Descripcion de la imagen",
    "posicion": "izquierda"
  }
}

Opciones del campo "media" (todo opcional):
- imagen: ruta de la imagen
- alt: texto alternativo
- posicion: "izquierda" (imagen a la izquierda, texto a la derecha) o "derecha" (invertido)

Ejemplo sin imagen:
{
  "tipo": "parrafo",
  "contenido": "Texto del parrafo sin imagen..."
}


Tipo "galeria" - Conjunto de imagenes en cuadricula
{
  "tipo": "galeria",
  "imagenes": [
    { "url": "foto1.webp", "alt": "Descripcion 1" },
    { "url": "foto2.webp", "alt": "Descripcion 2" },
    { "url": "foto3.webp", "alt": "Descripcion 3" }
  ]
}

Se muestran en una cuadricula de 3 columnas.


Tipo "video" - Reproductor de video
{
  "tipo": "video",
  "archivo": "video-ejemplo.mp4",
  "poster": "poster-ejemplo.webp"
}

- archivo: ruta del archivo de video
- poster: (opcional) imagen de portada antes de reproducir


Tipo "cita" - Frase destacada
{
  "tipo": "cita",
  "texto": "Frase destacada del evento...",
  "autor": "Nombre de la persona o entidad"
}

Se muestra con fondo gris claro y borde izquierdo decorativo.
El campo "autor" es opcional.


Tipo "separador" - Linea divisoria
{
  "tipo": "separador",
  "estilo": "linea"
}

Sirve para separar visualmente secciones del contenido.


4. Ejemplo completo minimo
---------------------------

{
  "hero": {
    "titulo": "Mi Evento"
  },
  "bloques": [
    {
      "tipo": "parrafo",
      "contenido": "Este es el primer parrafo de mi evento."
    },
    {
      "tipo": "cita",
      "texto": "Una foto vale mas que mil palabras.",
      "autor": "Anonimo"
    },
    {
      "tipo": "separador",
      "estilo": "linea"
    },
    {
      "tipo": "parrafo",
      "contenido": "Ultimo parrafo del evento.",
      "media": {
        "imagen": "foto-final.webp",
        "alt": "Foto final",
        "posicion": "derecha"
      }
    }
  ]
}


5. Notas importantes
--------------------

- Los bloques se renderizan en el orden exacto del array
- Todos los campos de imagen pueden dejarse vacios ("") si aun no se tiene la imagen
- Si un evento no tiene "archivo" en eventos.json, la pagina no mostrara contenido
- Para anadir un nuevo evento:
  1. Crear el archivo JSON en datos/eventos/
  2. Registrar el archivo en el mapa de imports en servicios/eventos.service.ts
  3. Anadir la entrada en datos/eventos.json
