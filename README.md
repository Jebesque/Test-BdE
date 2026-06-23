# BdE Test Lab - Técnico Generalista

Web-app estática para preparar el proceso de **Técnico/a Generalista del Banco de España**.

## Banco incluido

- **92 preguntas oficiales de conocimientos 2026** relacionadas directamente con macroeconomía, microeconomía y estadística/econometría.
- **69 preguntas oficiales de apoyo BdE**: sistema financiero, mercados e instituciones financieras y matemáticas financieras.
- **19 preguntas propias de capacidades**: razonamiento numérico, lógico y verbal.

**Total: 180 preguntas cargadas.**

## Qué incluye

- Separación entre **Examen de conocimientos 2026**, **Apoyo BdE** y **Test normal / capacidades**.
- Modo práctica con feedback y modo simulacro sin feedback.
- Explicación breve en cada pregunta al contestar, tanto si aciertas como si fallas.
- Explicaciones visibles también en **Banco** y en **Registro de fallos**.
- Penalización configurable de **-0,33** por error.
- Priorización de preguntas no vistas recientemente.
- Registro automático de fallos.
- Repaso específico de fallos.
- Notas personales por pregunta.
- Marcar preguntas como dominadas.
- Panel de estadísticas, racha, meta diaria y temas débiles.
- Exportación/importación de progreso en JSON.
- Exportación de fallos en CSV, incluyendo explicación de cada fallo.
- Importación de nuevas preguntas en JSON.
- Instalable en móvil/ordenador como PWA.

## Uso recomendado

1. Empieza por **Examen de conocimientos 2026**.
2. Haz bloques de 20 preguntas con feedback.
3. Lee la explicación después de cada respuesta, incluso cuando aciertes.
4. Revisa **Fallos** después de cada test.
5. Usa **Apoyo BdE** para ampliar cultura financiera/BdE sin mezclarlo con el temario principal.
6. Exporta progreso si vas a cambiar de ordenador o móvil.

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
    "explanation": "Explicación opcional. Si no se incluye, la app genera una explicación contextual."
  }
]
```

## Aviso

El progreso se guarda en el navegador mediante `localStorage`. Antes de cambiar de dispositivo, usa **Exportar progreso**.
