ARQUITECTURA: Multi-Agente & Triaje de Incidentes Operativos
🛠️ PARTE 2: Documento de explicación operativa y técnica.

1. ¿Qué diseñaste o construiste?
Diseñé la arquitectura conceptual y funcional de un Sistema Avanzado de Clasificación, Triaje y Gestión de Incidentes con Gobernanza de IA Multi-Agente. Este framework intercepta de manera omnicanal los mensajes de los usuarios (huéspedes, propietarios o personal interno), analiza su contenido en tiempo real mediante modelos de lenguaje (LLMs), los clasifica bajo reglas de negocio estrictas, asigna prioridades operativas y define si la acción puede ser completamente autónoma o si requiere un flujo obligatorio con Human-in-the-Loop (Aprobación Humana).
2. ¿Qué herramienta usaste y por qué?
La solución está proyectada para ser construida sobre n8n. Elegí esta plataforma de automatización por tres razones críticas:
Control granular de datos: Permite insertar nodos de código personalizados (JavaScript) para manipular, limpiar y transformar las cargas de datos (payloads JSON) antes de enviarlas al LLM, optimizando el consumo de tokens.
Manejo de condicionales complejas: Su motor lógico permite crear rutas de enrutamiento avanzadas basadas en variables dinámicas (como el tipo de cliente o nivel de urgencia).
Seguridad y Conectividad: Facilita la integración segura mediante webhooks y APIs hacia sistemas PMS (Property Management Systems como Guesty o Hostaway), CRMs inmobiliarios y herramientas de comunicación (Slack/WhatsApp), manteniendo una infraestructura robusta y escalable.
3. ¿Cómo funciona tu solución paso a paso?
Paso 1: Recepción (Trigger): El sistema recibe un webhook con el payload del mensaje entrante, el ID del canal y los datos del emisor.
Paso 2: Extracción y Limpieza (JavaScript Code Node): Un nodo de código procesa el JSON para aislar el texto del mensaje, eliminando caracteres especiales y metadatos innecesarios para reducir el ruido técnico.
Paso 3: Agente Supervisor de Triaje (Prompt Engineering): El texto limpio se envía a un nodo de IA con un System Prompt estructurado que clasifica el mensaje en una de las 8 categorías oficiales y evalúa su nivel de prioridad (Alta, Media, Baja), devolviendo una salida estrictamente formateada en JSON.
Paso 4: Enrutamiento de Gobernanza (Router Lógico): Un nodo condicional evalúa la prioridad y el tipo de mensaje para dividir el flujo en tres caminos:
Ruta Alta/Crítica: Congela cualquier automatización de cara al cliente y dispara una alerta instantánea en Slack/WhatsApp al equipo de guardia.
Ruta Media: Crea un ticket en ClickUp/Asana, activa un Agente Redactor para generar una propuesta de respuesta en borrador y un Agente Auditor que valida que la IA no alucine. Finalmente, congela el mensaje en un rombo de decisión hasta que el operador técnico le dé clic a "Aprobar".
Ruta Baja: Consulta la base de conocimientos (RAG) y despacha una respuesta 100% autónoma.
4. ¿Qué tareas repetitivas detectaste?
La clasificación manual y asignación de mensajes entrantes a diferentes departamentos.
Respuestas a preguntas frecuentes de logística recurrente (como horarios de entrada/salida).
Redacción manual de confirmaciones de recepción de quejas, solicitudes de mantenimiento o validaciones de pago.
5. ¿Qué acciones dejarías automáticas?
Respuestas a dudas logísticas generales (ej. horarios de check-out, contraseñas de Wi-Fi) respaldadas por la base de conocimientos indexada de la propiedad.
Confirmaciones inmediatas de recepción de reportes críticos para dar certidumbre al usuario mientras el staff humano atiende la emergencia física.
6. ¿Qué acciones dejarías con revisión humana?
Cualquier mensaje que involucre accesos fallidos a las propiedades (bloqueos de huéspedes afuera).
Reportes de daños materiales, emergencias o quejas graves de limpieza y ruido que afecten directamente la experiencia o reputación del negocio.
Mensajes de administración y pagos: El dinero es un tema sumamente delicado; el manejo de flujos de caja exige validación estricta de un operador antes de dar una confirmación que pueda comprometer legalmente a la empresa.
7. ¿Qué errores podrían ocurrir y cómo mitigarlos?
Alucinación del modelo o errores en datos financieros: Que la IA invente una política o confirme un pago erróneo. Mitigación: Configurar un prompt con restricciones severas (System Prompt), forzar salidas en JSON estructurado y colocar un segundo Agente Supervisor de Control de Calidad que audite la respuesta del Agente Redactor antes de mostrarla al humano.
Fallas o caídas de API (Timeouts): Que el servicio del LLM o del PMS sufra una interrupción. Mitigación: Implementar una lógica de reintentos automáticos (Retry Logic) en los nodos de n8n y una ruta de escape (Error Trigger) que envíe el caso directamente a un buzón humano si el error persiste.
8. ¿Qué información necesitarías antes de implementarlo en una operación real?
Documentación técnica de las APIs del PMS (ej. Guesty, Hostaway) y del CRM utilizado por el equipo operativo.
La base de conocimientos oficial, estructurada y actualizada de cada propiedad (manuales de la casa, claves de acceso, reglas condominales y contactos de proveedores de mantenimiento por zona).
9. ¿Qué partes resolverías con herramientas existentes y qué partes con código personalizado?
Herramientas existentes: Conectores nativos de n8n para la escucha de Webhooks, nodos de OpenAI/Anthropic para el procesamiento de lenguaje natural y conectores de Slack/ClickUp para la gestión de tareas y alertas.
Código personalizado: Scripts en JavaScript dentro de n8n para limpiar los payloads JSON de entrada, estructurar el formato de los datos que viajan entre plataformas y asegurar que las fechas o montos económicos se parseen correctamente sin errores de formato.

11. ¿Qué harías para que la solución no dependa únicamente de ti?
Crear un diagrama visual del flujo en Miro (o similar) que mapee las reglas de negocio y arquitectura para el equipo directivo.
Escribir un manual de operación estándar (SOP) que explique técnicamente cómo actualizar los prompts de la IA y cómo gestionar las variables de entorno del servidor.
Estructurar el flujo de n8n de forma modular, comentada nodo por nodo y utilizando variables globales, garantizando que cualquier desarrollador o automatizador pueda entender y mantener la lógica en minutos.

💻 PARTE 1: SIMULACIÓN DE REGISTRO DE SALIDA (DATA TRIAJE)

Click aqui para ver tabla


Click aqui para ver diagrama de flujo
