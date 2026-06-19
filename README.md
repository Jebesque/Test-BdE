# BdE Test Lab - Técnico Generalista

Web-app estática para preparar el proceso de **Técnico/a Generalista del Banco de España**.

## Qué incluye

- Separación entre **Examen de conocimientos** y **Test normal / capacidades**.
- Banco inicial de preguntas de macro, micro, estadística, econometría, numérico, verbal y lógico.
- Modo práctica con feedback y modo simulacro sin feedback.
- Penalización configurable de **-0,33** por error.
- Registro automático de fallos.
- Repaso específico de fallos.
- Notas personales por pregunta.
- Marcar preguntas como dominadas.
- Panel de estadísticas, racha, meta diaria y temas débiles.
- Exportación/importación de progreso en JSON.
- Exportación de fallos en CSV.
- Importación de nuevas preguntas en JSON.
- Instalable en móvil/ordenador como PWA.

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
    "explanation": "Explicación opcional"
  }
]
```

## Aviso

El progreso se guarda en el navegador mediante `localStorage`. Antes de cambiar de dispositivo, usa **Exportar progreso**.
