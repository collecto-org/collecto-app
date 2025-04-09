# Guía de Estándares de Git para el Equipo Collecto

## 1. Estructura de nombres para ramas

| Tipo de tarea       | Prefijo sugerido | Ejemplo de nombre de rama                      |
|---------------------|------------------|-----------------------------------------------|
| Nueva funcionalidad | `feature/`       | `feature/registro-usuario`                    |
| Corrección de bug   | `fix/`           | `fix/error-login-token`                       |
| Mejora de código    | `refactor/`      | `refactor/limpieza-componente-header`         |
| Tarea de diseño     | `ui/` o `style/` | `ui/mejoras-formulario-login`                 |
| Configuración       | `config/`        | `config/ajuste-env-production`                |
| Documentación       | `docs/`          | `docs/manual-deploy-readme`                   |
| Integración general | `integration/`   | `integration/chat-con-notificaciones`         |

> Usa guiones medios `-` para separar palabras. No uses tildes ni espacios.

---

## 2. Flujo de trabajo recomendado

```bash
# 1. Cambiar a la rama principal
$ git checkout main

# 2. Actualizar el repositorio local
$ git pull origin main

# 3. Crear una nueva rama
$ git checkout -b feature/nombre-de-la-tarea

# 4. Trabajar en la tarea y hacer commits frecuentes
$ git add .
$ git commit -m "feat: implementar funcionalidad X"

# 5. Antes de hacer push, asegurarse de tener la última versión
$ git pull origin main

# 6. Subir la nueva rama al repositorio remoto
$ git push -u origin feature/nombre-de-la-tarea

# 7. Crear Pull Request desde GitHub hacia main

##  Importante: creación de Pull Request obligatoria

Una vez que hayas terminado tu tarea en una rama nueva, **no basta con hacer commit y push**.

Debes completar el proceso creando un **Pull Request** (PR) en GitHub para que tu código pueda ser revisado e integrado a `main`.

###  Pasos para crear el Pull Request:

1. Ve a GitHub → pestaña **Pull Requests** → botón **“New Pull Request”**
2. Selecciona tu rama como origen (ej: `feature/crear-formulario`)
3. Asegúrate de que el destino es `main`
4. Escribe un título claro (ej: `feat: formulario de registro terminado`)
5. (Opcional) Agrega una descripción de los cambios
6. Haz clic en **“Create Pull Request”**

Solo después de esto, el administrador podrá revisar y hacer merge.  
No se fusionará código directamente a `main` sin PR.

```

---

## 3. Estándar para mensajes de commit

Utiliza el formato:

```bash
<tipo>: <descripción corta y clara>
```

### Tipos válidos
- `feat`: nueva funcionalidad	(feat: crear endpoint de registro de usuario)
- `fix`: corrección de errores	(fix: corregir validación de email en login)
- `refactor`: reestructuración de código sin cambiar funcionalidad (refactor: extraer lógica de autenticación)
- `docs`: cambios en la documentación (	docs: actualizar pasos de instalación)
- `style`: cambios visuales o de CSS sin modificar lógica (style: aplicar formato con prettier)
- `test`: agregar o modificar tests (test: agregar tests para controlador de login)
- `chore`: tareas de mantenimiento (chore: crear estructura base del backend)
- `build`: Cambios que afectan el proceso de build/deploy (build: configuración de entorno de producción)

### Ejemplos
```bash
feat: crear formulario de registro
fix: corregir bug en validación de email
refactor: dividir componente Header en subcomponentes
style: ajustar márgenes en vista de perfil
```

---

## 4. Notas adicionales para el equipo

- Siempre hacer `git pull origin main` antes de empezar una tarea.
- Nunca trabajes directamente sobre `main`.
- Las ramas deben tener un propósito claro y estar vinculadas a una tarea.
- Crea PRs solo cuando tu rama esté lista para revisión.
- Usa el espacio de comentarios en el Pull Request para explicar cambios importantes.

---


## 5 Reglas de estilo al escribir los commits
- Usa infinitivo en presente: crear, configurar, agregar, actualizar, etc.
- Nada de commits tipo "cambios", "cosas", "final" ❌
- Los mensajes deben ser descriptivos pero concisos
- Si necesitas explicar más, usa el cuerpo del commit con una línea en blanco y luego la explicación adicional.

---


¿Dudas? Comunícalas al equipo.
