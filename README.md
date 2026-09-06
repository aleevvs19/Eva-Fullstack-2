# MotorStore - E-Commerce & Backoffice Administrativo

Repositorio oficial del proyecto **MotorStore**, una plataforma web completa de comercio electrónico y panel de administración desarrollada para la asignatura **Desarrollo Fullstack II** de **Duoc UC**.

## Características Principales

* **Catálogo y Carrito de Compras:** Sistema interactivo que permite añadir productos, modificar cantidades, calcular subtotales y totales en CLP, con persistencia de datos mediante `localStorage`.
* **Panel de Administración (Backoffice):** Sección protegida por roles que restringe el acceso mediante un guardián de seguridad, permitiendo la gestión integral (CRUD) de productos y usuarios registrados.
* **Validaciones Estrictas en el Cliente:** Formularios de registro, inicio de sesión y contacto validados en JavaScript con restricciones de dominios permitidos (`@duoc.cl`, `@profesor.duoc.cl`, `@gmail.com`), longitudes de contraseñas seguras (4 a 10 caracteres) y contadores de caracteres en tiempo real.
* **Integración con EmailJS:** Despacho asíncrono y real de correos electrónicos corporativos desde el formulario de contacto.
* **Modo Oscuro (Dark Mode):** Interfaz adaptable con un botón global que alterna los estilos visuales de toda la aplicación.
* **Selectores Territoriales Dinámicos:** Campos de Región y Comuna interconectados para el territorio nacional.
* **Diseño Responsivo:** Interfaz completamente adaptada a dispositivos móviles, tablets y escritorios utilizando componentes y grillas de **Bootstrap 5.3**.

---

## Tecnologías Utilizadas

* **HTML5:** Estructura semántica en vistas públicas y privadas.
* **CSS3:** Hoja de estilos externa y centralizada con variables corporativas y soporte para Modo Oscuro.
* **JavaScript (ES6+):** Vanilla JS para la lógica de negocio, validaciones, control de rutas y manipulación del DOM.
* **Bootstrap 5.3:** Framework UI para maquetación responsiva.
* **LocalStorage API:** Persistencia de datos del lado del cliente (carrito de compras y base de usuarios).
* **EmailJS:** API de mensajería asíncrona para la pasarela de contacto.
* **Git & GitHub:** Control de versiones y colaboración en equipo.

---

## Estructura del Directorio

```text
MotorStore/
│
├── index.html                  # Página de inicio con carrusel y destacados
├── Productos.html              # Catálogo general de productos
├── DetalleProducto.html        # Vista detallada de producto individual (?id=x)
├── Carrito.html                # Carrito de compras y pasarela simulada
├── RegistroUsuario.html        # Formulario de registro con selectores territoriales
├── IniciarSesion.html          # Formulario de inicio de sesión con validación de roles
├── Contacto.html               # Formulario de contacto integrado con EmailJS
├── Nosotros.html               # Información corporativa y presentación del equipo
├── Blogs.html                  # Sección de artículos y noticias
├── DetalleBlog1.html           # Artículo sobre superbikes
├── DetalleBlog2.html           # Artículo sobre mantenimiento de transmisión
│
├── AdminHome.html              # Panel principal de administración
├── AdminProductos.html         # Listado y gestión de inventario
├── AdminProductoNuevo.html     # Registro de nuevos productos
├── AdminProductoEditar.html    # Modificación de productos existentes
├── AdminUsuarios.html          # Listado y control de usuarios registrados
├── AdminUsuarioNuevo.html      # Creación de usuarios desde el backoffice
│
├── css/
│   └── style.css               # Estilos personalizados y modo oscuro
├── js/
│   └── script.js               # Lógica global unificada
├── img/                        # Recursos gráficos, productos y avatares
└── docs/                       # Documentación ERS del sistema

Equipo de Desarrollo
Alejandro Salazar - Desarrollador JavaScript & Lógica de Negocio

Oswel Andrade - Desarrollador Frontend & Git

Benjamin Navarrete - QA & Documentación ERS

Proyecto desarrollado con fines académicos para Duoc UC - 2026