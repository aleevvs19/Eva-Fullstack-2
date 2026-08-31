document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. MODO OSCURO
    // ==========================================
    const btnModoOscuro = document.getElementById('btn-modo-oscuro');
    if (btnModoOscuro) {
        btnModoOscuro.addEventListener('click', () => {
            document.body.classList.toggle('modo-oscuro');
        });
    }

    // ==========================================
    // 2. DATOS DE REGIONES Y COMUNAS
    // ==========================================
    const datosTerritoriales = {
        "Región Metropolitana": ["Santiago", "Maipú", "Puente Alto", "Providencia"],
        "Región de Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"],
        "Región del Biobío": ["Concepción", "Talcahuano", "Los Ángeles", "Chillán"]
    };

    const selectRegion = document.getElementById('reg-region');
    const selectComuna = document.getElementById('reg-comuna');

    if (selectRegion && selectComuna) {
        // Cargar regiones al iniciar
        Object.keys(datosTerritoriales).forEach(region => {
            let opcion = document.createElement('option');
            opcion.value = region;
            opcion.textContent = region;
            selectRegion.appendChild(opcion);
        });

        // Cambiar comunas según la región seleccionada
        selectRegion.addEventListener('change', (e) => {
            const regionSeleccionada = e.target.value;
            selectComuna.innerHTML = '<option value="" selected disabled>-- Seleccione la comuna --</option>'; // Limpiar
            
            if (regionSeleccionada) {
                selectComuna.disabled = false;
                datosTerritoriales[regionSeleccionada].forEach(comuna => {
                    let opcion = document.createElement('option');
                    opcion.value = comuna;
                    opcion.textContent = comuna;
                    selectComuna.appendChild(opcion);
                });
            } else {
                selectComuna.disabled = true;
            }
        });
    }

    // ==========================================
    // 3. FUNCIONES AUXILIARES DE VALIDACIÓN
    // ==========================================
    
    // Muestra el mensaje debajo del input
    const mostrarError = (inputId, errorId, mensaje) => {
        const input = document.getElementById(inputId);
        const errorDiv = document.getElementById(errorId);
        input.classList.add('is-invalid'); // Clase de Bootstrap para borde rojo
        errorDiv.textContent = mensaje;
        errorDiv.classList.remove('d-none');
    };

    // Oculta el mensaje si el campo es correcto
    const limpiarError = (inputId, errorId) => {
        const input = document.getElementById(inputId);
        const errorDiv = document.getElementById(errorId);
        input.classList.remove('is-invalid');
        errorDiv.classList.add('d-none');
    };

    // Valida dominios permitidos
    const esCorreoValido = (correo) => {
        const dominios = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
        return dominios.some(dominio => correo.toLowerCase().endsWith(dominio));
    };

    // ==========================================
    // 4. VALIDACIÓN: REGISTRO DE USUARIO
    // ==========================================
    const formRegistro = document.getElementById('form-registro');
    if (formRegistro) {
        formRegistro.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la página se recargue
            let formularioValido = true;

            // Limpiar errores previos
            ['reg-nombre', 'reg-correo', 'reg-pass', 'reg-pass-conf', 'reg-region', 'reg-comuna'].forEach(id => {
                limpiarError(id, `error-${id.replace('reg-', '')}`);
            });

            // Validar Nombre
            const nombre = document.getElementById('reg-nombre').value.trim();
            if (nombre === '' || nombre.length > 50) {
                mostrarError('reg-nombre', 'error-nombre', 'El nombre es obligatorio y no debe exceder los 50 caracteres.');
                formularioValido = false;
            }

            // Validar Correo
            const correo = document.getElementById('reg-correo').value.trim();
            if (correo === '' || correo.length > 100 || !esCorreoValido(correo)) {
                mostrarError('reg-correo', 'error-correo', 'Ingresa un correo válido terminado en @duoc.cl, @profesor.duoc.cl o @gmail.com.');
                formularioValido = false;
            }

            // Validar Contraseña (entre 4 y 10 caracteres)
            const pass = document.getElementById('reg-pass').value;
            if (pass.length < 4 || pass.length > 10) {
                mostrarError('reg-pass', 'error-pass', 'La contraseña debe tener entre 4 y 10 caracteres.');
                formularioValido = false;
            }

            // Validar Confirmación
            const passConf = document.getElementById('reg-pass-conf').value;
            if (pass !== passConf || passConf === '') {
                mostrarError('reg-pass-conf', 'error-pass-conf', 'Las contraseñas no coinciden.');
                formularioValido = false;
            }

            if (formularioValido) {
                alert('¡Registro exitoso! (Aquí se enviaría a la base de datos)');
                formRegistro.reset();
            }
        });
    }

    // ==========================================
    // 5. VALIDACIÓN: FORMULARIO DE CONTACTO
    // ==========================================
    const formContacto = document.getElementById('form-contacto');
    if (formContacto) {
        
        // Contador de caracteres en vivo para el comentario
        const txtMensaje = document.getElementById('cont-mensaje');
        const contador = document.getElementById('contador-mensaje');
        
        if (txtMensaje) {
            txtMensaje.addEventListener('input', () => {
                contador.textContent = txtMensaje.value.length;
            });
        }

        formContacto.addEventListener('submit', (e) => {
            e.preventDefault();
            let formularioValido = true;

            limpiarError('cont-nombre', 'error-cont-nombre');
            limpiarError('cont-correo', 'error-cont-correo');
            limpiarError('cont-mensaje', 'error-cont-mensaje');

            // Validar Nombre
            const nombre = document.getElementById('cont-nombre').value.trim();
            if (nombre === '' || nombre.length > 100) {
                mostrarError('cont-nombre', 'error-cont-nombre', 'El nombre es obligatorio (máx 100 caracteres).');
                formularioValido = false;
            }

            // Validar Correo
            const correo = document.getElementById('cont-correo').value.trim();
            if (correo === '' || correo.length > 100 || !esCorreoValido(correo)) {
                mostrarError('cont-correo', 'error-cont-correo', 'El correo debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com.');
                formularioValido = false;
            }

            // Validar Mensaje
            const mensaje = document.getElementById('cont-mensaje').value.trim();
            if (mensaje === '' || mensaje.length > 500) {
                mostrarError('cont-mensaje', 'error-cont-mensaje', 'El comentario es obligatorio y no puede superar los 500 caracteres.');
                formularioValido = false;
            }

            if (formularioValido) {
                alert('¡Mensaje enviado correctamente!');
                formContacto.reset();
                contador.textContent = '0';
            }
        });
    }

    // ==========================================
    // 6. CATÁLOGO Y CARRITO CON LOCALSTORAGE
    // ==========================================
    
    // Nuestro inventario de productos
    const productos = [
        { id: 1, nombre: "Suzuki GSXR 1000", categoria: "Deportiva", precio: 15000000, img: "img/GSXR1000.jpg" },
        { id: 2, nombre: "Kawasaki Ninja", categoria: "Deportiva", precio: 14500000, img: "img/kawa.webp" },
        { id: 3, nombre: "Yamaha R9", categoria: "Deportiva", precio: 16000000, img: "img/r9.jpeg" },
        { id: 4, nombre: "Porta Patente", categoria: "Accesorio", precio: 40000, img: "img/pl.jpg" },
        { id: 5, nombre: "Chaqueta MotorStore", categoria: "Indumentaria", precio: 120000, img: "img/pl.jpg" },
        { id: 6, nombre: "Casco Integral", categoria: "Seguridad", precio: 85000, img: "img/pl.jpg" }
    ];

    // Cargar el carrito guardado o iniciar uno vacío
    let carrito = JSON.parse(localStorage.getItem('carritoMotorStore')) || [];

    // --- A. MOSTRAR PRODUCTOS EN Productos.html ---
    const contenedorProductos = document.getElementById('lista-productos-js');
    if (contenedorProductos) {
        productos.forEach(prod => {
            const col = document.createElement('div');
            col.className = 'col-12 col-sm-6 col-md-3 mb-4';
            col.innerHTML = `
                <div class="card h-100 bg-dark text-white border-secondary shadow">
                    <img src="${prod.img}" class="card-img-top bg-secondary img-producto" alt="${prod.nombre}">
                    <div class="card-body d-flex flex-column justify-content-between text-center">
                        <h5 class="card-title text-primary fs-6 mb-2">${prod.nombre}</h5>
                        <div class="d-flex justify-content-between align-items-center mt-auto mb-3">
                            <small class="text-muted">${prod.categoria}</small>
                            <span class="fw-bold text-light">$${prod.precio.toLocaleString('es-CL')}</span>
                        </div>
                        <button class="btn btn-outline-light w-100 btn-agregar" data-id="${prod.id}">Añadir al carrito</button>
                    </div>
                </div>
            `;
            contenedorProductos.appendChild(col);
        });

        // Evento para los botones "Añadir al carrito"
        document.querySelectorAll('.btn-agregar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idProducto = parseInt(e.target.dataset.id);
                agregarAlCarrito(idProducto);
            });
        });
    }

    // --- B. LÓGICA DEL CARRITO ---
    function agregarAlCarrito(id) {
        const productoExistente = carrito.find(item => item.id === id);
        if (productoExistente) {
            productoExistente.cantidad++; // Si ya existe, suma 1
        } else {
            const producto = productos.find(item => item.id === id);
            carrito.push({ ...producto, cantidad: 1 }); // Si no, lo agrega
        }
        guardarCarrito();
        actualizarIconoCarrito();
        alert('¡Producto añadido al carrito!');
    }

    function guardarCarrito() {
        localStorage.setItem('carritoMotorStore', JSON.stringify(carrito));
    }

    function actualizarIconoCarrito() {
        const btnCarrito = document.querySelector('.carrito-btn');
        if (btnCarrito) {
            const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
            btnCarrito.textContent = `🛒 Carrito (${totalItems})`;
        }
    }

    // --- C. RENDERIZAR VISTA DEL CARRITO (Carrito.html) ---
    const contenedorCarrito = document.getElementById('items-carrito');
    const elementoTotal = document.getElementById('total-carrito');
    
    if (contenedorCarrito && elementoTotal) {
        renderizarCarrito();
    }

    function renderizarCarrito() {
        contenedorCarrito.innerHTML = '';
        let total = 0;

        if (carrito.length === 0) {
            contenedorCarrito.innerHTML = '<p class="text-center text-muted mt-4">Tu carrito está vacío.</p>';
        } else {
            carrito.forEach((item, index) => {
                const subtotal = item.precio * item.cantidad;
                total += subtotal;

                const fila = document.createElement('div');
                fila.className = 'd-flex justify-content-between align-items-center mb-3 p-3 border border-secondary rounded bg-light text-dark shadow-sm';
                fila.innerHTML = `
                    <div class="d-flex align-items-center gap-3">
                        <img src="${item.img}" alt="${item.nombre}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 4px;">
                        <div>
                            <h6 class="mb-0 fw-bold">${item.nombre}</h6>
                            <small class="text-muted">$${item.precio.toLocaleString('es-CL')}</small>
                        </div>
                    </div>
                    <div class="d-flex align-items-center gap-3">
                        <input type="number" class="form-control text-center border-dark" style="width: 75px;" value="${item.cantidad}" min="1" onchange="cambiarCantidad(${index}, this.value)">
                        <button class="btn btn-danger btn-sm fw-bold" onclick="eliminarDelCarrito(${index})">X</button>
                    </div>
                `;
                contenedorCarrito.appendChild(fila);
            });
        }
        elementoTotal.textContent = `$${total.toLocaleString('es-CL')}`;
    }

    // Funciones globales para que funcionen los botones del carrito
    window.cambiarCantidad = (index, valor) => {
        const nuevaCantidad = parseInt(valor);
        if (nuevaCantidad > 0) {
            carrito[index].cantidad = nuevaCantidad;
            guardarCarrito();
            renderizarCarrito();
            actualizarIconoCarrito();
        }
    };

    window.eliminarDelCarrito = (index) => {
        carrito.splice(index, 1);
        guardarCarrito();
        renderizarCarrito();
        actualizarIconoCarrito();
    };

    // Actualizar el número del botón en el nav en todas las páginas
    actualizarIconoCarrito();
});