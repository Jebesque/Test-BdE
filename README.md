# BdE Test Lab - Técnico Generalista

Web-app estática para preparar el proceso de **Técnico/a Generalista del Banco de España**.

## Banco incluido

El banco conserva las preguntas base, las preguntas oficiales y el material original importado del Drive, y añade un bloque final de **120 preguntas de repaso auditadas**:

- 30 de Macroeconomía.
- 30 de Microeconomía.
- 30 de Estadística.
- 30 de Econometría.

Se han retirado de la carga activa los antiguos bancos automáticos de 200 y 400 preguntas porque generaban variantes repetitivas, distractores demasiado débiles y un patrón frecuente en el que la respuesta correcta era la más larga.

Al iniciar la aplicación, `data/question-audit-2026.js` realiza además una depuración automática: elimina duplicados exactos, conjuntos de opciones repetidos y preguntas antiguas con un sesgo de longitud muy acusado. El resultado se expone en la consola como `window.BDE_AUDIT_REPORT`.

## Qué incluye

- Separación entre **Examen de conocimientos 2026**, **Apoyo BdE** y **Test normal / capacidades**.
- Modo práctica con feedback y modo simulacro sin feedback.
- Explicación breve en cada pregunta al contestar, tanto si aciertas como si fallas.
- Preguntas de cálculo, interpretación y aplicación, no solo definiciones.
- Opciones barajadas en cada test.
- Selección que evita repetir el mismo tema dentro del test cuando hay alternativas.
- Penalización configurable de **-0,33** por error.
- Priorización de preguntas no vistas recientemente.
- Registro automático de fallos y repaso específico.
- Notas personales por pregunta y marcado de preguntas dominadas.
- Panel de estadísticas, racha, meta diaria y temas débiles.
- Exportación/importación de progreso en JSON.
- Exportación de fallos en CSV, incluyendo explicación de cada fallo.
- Importación de nuevas preguntas en JSON.
- Instalable en móvil/ordenador como PWA.

## Uso recomendado antes del examen

1. Haz un test de 20 preguntas de cada bloque: Macro, Micro, Estadística y Econometría.
2. Usa primero el modo práctica y lee las explicaciones.
3. Entra en **Fallos** y repasa únicamente los errores.
4. Termina con un simulacro mixto sin feedback.
5. No estudies la letra correcta: las opciones se barajan y la distribución de respuestas del bloque final está equilibrada.

## Activar GitHub Pages

1. Entra en este repositorio.
2. Ve a **Settings → Pages**.
3. En **Build and deployment**, selecciona **Deploy from a branch**.
4. Rama: `main`.
5. Carpeta: `/(root)`.
6. Pulsa **Save**.

La web quedará publicada en una URL parecida a:

`https://jebesque.github.io/Test-BdE/`

## Importar nuevas preguntas

Desde la pestaña **Ajustes** puedes pegar un JSON con este formato:

```json
[
  {
    "id": "PREGUNTA_001",
    "type": "conocimientos",
    "section": "Macroeconomía",
    "topic": "Política monetaria",
    "source": "2025A13",
    "question": "Texto de la pregunta",
    "options": [
      {"key": "A", "text": "Opción A"},
      {"key": "B", "text": "Opción B"},
      {"key": "C", "text": "Opción C"},
      {"key": "D", "text": "Opción D"}
    ],
    "answer": "A",
    "explanation": "Explicación opcional."
  }
]
```

## Aviso

El progreso se guarda en el navegador mediante `localStorage`. Antes de cambiar de dispositivo, usa **Exportar progreso**. Tras una actualización importante, recarga la página para que el service worker descargue la nueva versión.