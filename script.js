// ================= LOGIN =================

function abrirLogin() {

    const modal = document.getElementById("loginModal");

    modal.style.display = "flex";
}


function cerrarLogin() {

    const modal = document.getElementById("loginModal");

    modal.style.display = "none";
}


// Cerrar haciendo clic fuera del cuadro

window.onclick = function(event) {

    const modal = document.getElementById("loginModal");

    if (event.target === modal) {

        modal.style.display = "none";

    }

};


// ================= BOTÓN EXPLORAR =================

const explorar = document.querySelector(".btn-primary");

explorar.addEventListener("click", function() {

    window.scrollTo({
        top: 800,
        behavior: "smooth"
    });

});


// ================= BUSCADOR =================

const buscar = document.querySelector(".search-button");

buscar.addEventListener("click", function() {

    alert(
        "¡Próximamente podrás encontrar destinos, hospedajes y experiencias en el Chocó!"
    );

});

// ================= BUSCAR DESTINO =================

function buscarDestino() {

    const municipio =
        document.getElementById("municipio").value;

    const tarjetas =
        document.querySelectorAll(".destino-card");


    if (municipio === "") {

        tarjetas.forEach(tarjeta => {

            tarjeta.style.display = "block";

        });

        alert("Selecciona un destino para buscar.");

        return;
    }


    let encontrado = false;


    tarjetas.forEach(tarjeta => {

        if (
            tarjeta.dataset.municipio === municipio
        ) {

            tarjeta.style.display = "block";

            encontrado = true;

        } else {

            tarjeta.style.display = "none";

        }

    });


    if (encontrado) {

        document
            .getElementById("destinos-lista")
            .scrollIntoView({
                behavior: "smooth"
            });

    }

}
// =====================================================
// FILTRAR GASTRONOMÍA POR CATEGORÍA
// =====================================================

function filtrarCategoria(categoria, boton) {

    const tarjetas =
        document.querySelectorAll(".comida-card");

    const botones =
        document.querySelectorAll(".categoria");


    // Quitar selección de todos los botones

    botones.forEach(b => {

        b.classList.remove("active");

    });


    // Activar botón seleccionado

    boton.classList.add("active");


    // Mostrar / ocultar tarjetas

    tarjetas.forEach(tarjeta => {

        if (
            categoria === "todos" ||
            tarjeta.dataset.categoria === categoria
        ) {

            tarjeta.style.display = "block";

        } else {

            tarjeta.style.display = "none";

        }

    });

}



// =====================================================
// BUSCADOR DE COMIDA
// =====================================================

function filtrarComida() {

    const texto =
        document
        .getElementById("buscadorComida")
        .value
        .toLowerCase();


    const tarjetas =
        document.querySelectorAll(".comida-card");


    tarjetas.forEach(tarjeta => {

        const nombre =
            tarjeta.dataset.nombre
            .toLowerCase();


        if (nombre.includes(texto)) {

            tarjeta.style.display = "block";

        } else {

            tarjeta.style.display = "none";

        }

    });

}



// =====================================================
// INFORMACIÓN DE PLATO
// =====================================================

function mostrarInfo(plato) {

    const modal =
        document.getElementById("infoModal");

    const titulo =
        document.getElementById("modalTitulo");

    const texto =
        document.getElementById("modalTexto");


    titulo.textContent = plato;


    const informacion = {

        "Pescado en Tapao":
            "Preparación tradicional del Pacífico colombiano que combina pescado con plátano y otros ingredientes propios de la región.",

        "Sancocho de Pescado":
            "Sopa tradicional preparada con pescado fresco, plátano, yuca y diferentes hierbas y condimentos.",

        "Patacones de Plátano":
            "Plátano verde aplastado y frito, utilizado como acompañamiento de numerosos platos de la gastronomía del Pacífico.",

        "Viche":
            "Bebida tradicional del Pacífico colombiano, vinculada a las prácticas culturales y ancestrales de las comunidades.",

        "Arroz de Camarones":
            "Preparación de arroz combinada con camarones y diferentes ingredientes que representan los sabores del Pacífico.",

        "Dulces Tradicionales":
            "Preparaciones dulces elaboradas con ingredientes tradicionales y recetas transmitidas entre generaciones."

    };


    texto.textContent =
        informacion[plato] ||
        "Descubre este sabor tradicional del Chocó.";


    modal.style.display = "flex";

}



// =====================================================
// CERRAR MODAL
// =====================================================

function cerrarInfo() {

    document
        .getElementById("infoModal")
        .style.display = "none";

}



// =====================================================
// CERRAR MODAL AL HACER CLIC AFUERA
// =====================================================

window.addEventListener("click", function(event) {

    const modal =
        document.getElementById("infoModal");


    if (event.target === modal) {

        modal.style.display = "none";

    }

});



// =====================================================
// BOTÓN DESCUBRE MÁS SABORES
// =====================================================

function descubrirSabores() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}
document
    .getElementById("contactForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        alert(
            "¡Gracias por contactarnos! Tu mensaje ha sido recibido."
        );

        this.reset();

    });

    
/* ==================================================
   BLOG - SISTEMA DE PUBLICACIONES
================================================== */

const BLOG_STORAGE_KEY = "choco_blog_publicaciones";

let blogImagenSeleccionada = "";


/* ==================================================
   OBTENER PUBLICACIONES GUARDADAS
================================================== */

function obtenerPublicaciones() {

    try {

        const datos = localStorage.getItem(BLOG_STORAGE_KEY);

        if (!datos) {
            return [];
        }

        const publicaciones = JSON.parse(datos);

        return Array.isArray(publicaciones)
            ? publicaciones
            : [];

    } catch (error) {

        console.error("Error leyendo publicaciones:", error);

        return [];

    }

}


/* ==================================================
   GUARDAR PUBLICACIONES
================================================== */

function guardarPublicaciones(publicaciones) {

    try {

        localStorage.setItem(
            BLOG_STORAGE_KEY,
            JSON.stringify(publicaciones)
        );

        return true;

    } catch (error) {

        console.error("Error guardando publicaciones:", error);

        return false;

    }

}


/* ==================================================
   VISTA PREVIA DE IMAGEN
================================================== */

function inicializarImagenBlog() {

    const inputImagen = document.getElementById("blogImage");

    const vistaPrevia = document.getElementById("imagePreview");

    const contenedor = document.getElementById(
        "imagePreviewContainer"
    );

    const botonEliminar = document.getElementById("removeImage");

    if (!inputImagen || !vistaPrevia || !contenedor) {
        return;
    }


    inputImagen.addEventListener("change", function () {

        const archivo = this.files[0];

        blogImagenSeleccionada = "";

        if (!archivo) {

            contenedor.style.display = "none";

            vistaPrevia.src = "";

            return;

        }


        const tiposPermitidos = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif"
        ];


        if (!tiposPermitidos.includes(archivo.type)) {

            alert("Selecciona una imagen JPG, PNG, WEBP o GIF.");

            this.value = "";

            contenedor.style.display = "none";

            return;

        }


        // Límite de 1.5 MB

        const limite = 1.5 * 1024 * 1024;

        if (archivo.size > limite) {

            alert(
                "La imagen supera el límite de 1.5 MB. " +
                "Selecciona una imagen más pequeña."
            );

            this.value = "";

            contenedor.style.display = "none";

            return;

        }


        const lector = new FileReader();


        lector.onload = function (evento) {

            blogImagenSeleccionada = evento.target.result;

            vistaPrevia.src = blogImagenSeleccionada;

            contenedor.style.display = "block";

        };


        lector.onerror = function () {

            alert("No se pudo leer la imagen seleccionada.");

        };


        lector.readAsDataURL(archivo);

    });


    /* QUITAR IMAGEN */

    if (botonEliminar) {

        botonEliminar.addEventListener("click", function () {

            blogImagenSeleccionada = "";

            inputImagen.value = "";

            vistaPrevia.src = "";

            contenedor.style.display = "none";

        });

    }

}


/* ==================================================
   PUBLICAR ARTÍCULO
================================================== */

function inicializarFormularioBlog() {

    const formulario = document.getElementById("blogForm");

    if (!formulario) {
        return;
    }


    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault();


        const titulo = document.getElementById(
            "blogTitle"
        ).value.trim();

        const categoria = document.getElementById(
            "blogCategory"
        ).value;

        const contenido = document.getElementById(
            "blogContent"
        ).value.trim();

        const mensaje = document.getElementById(
            "blogMessage"
        );

        const boton = formulario.querySelector(
            ".blog-submit"
        );


        if (!titulo || !categoria || !contenido) {

            mostrarMensajeBlog(
                mensaje,
                "Completa el título, la categoría y el contenido.",
                "error"
            );

            return;

        }


        const publicaciones = obtenerPublicaciones();


        const nuevaPublicacion = {

            id: Date.now().toString(),

            titulo: titulo,

            categoria: categoria,

            contenido: contenido,

            imagen: blogImagenSeleccionada,

            fecha: new Date().toISOString()

        };


        publicaciones.unshift(nuevaPublicacion);


        // Guardar antes de mostrar la publicación

        boton.disabled = true;

        boton.innerHTML =
            'Guardando... <i class="fa-solid fa-spinner fa-spin"></i>';


        const guardado = guardarPublicaciones(publicaciones);


        if (!guardado) {

            boton.disabled = false;

            boton.innerHTML =
                'Publicar en el blog <i class="fa-solid fa-paper-plane"></i>';

            mostrarMensajeBlog(
                mensaje,
                "No se pudo guardar. El almacenamiento del navegador " +
                "puede estar lleno. Intenta con una imagen más pequeña " +
                "o elimina publicaciones anteriores.",
                "error"
            );

            return;

        }


        // Actualizar las publicaciones en la página

        renderizarPublicacionesBlog();


        // Limpiar formulario

        formulario.reset();

        blogImagenSeleccionada = "";


        const contenedor = document.getElementById(
            "imagePreviewContainer"
        );

        const vistaPrevia = document.getElementById(
            "imagePreview"
        );


        if (contenedor) {
            contenedor.style.display = "none";
        }

        if (vistaPrevia) {
            vistaPrevia.src = "";
        }


        boton.disabled = false;

        boton.innerHTML =
            'Publicar en el blog <i class="fa-solid fa-paper-plane"></i>';


        mostrarMensajeBlog(
            mensaje,
            "¡Publicación guardada correctamente!",
            "success"
        );


        // Ir a la sección de publicaciones

        const seccion = document.getElementById("publicaciones");

        if (seccion) {

            seccion.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

}


/* ==================================================
   MENSAJES DEL FORMULARIO
================================================== */

function mostrarMensajeBlog(elemento, texto, tipo) {

    if (!elemento) {
        return;
    }

    elemento.textContent = texto;

    elemento.className = "blog-message " + tipo;

}


/* ==================================================
   MOSTRAR PUBLICACIONES
================================================== */

function renderizarPublicacionesBlog() {

    const contenedor = document.getElementById("blogPosts");

    if (!contenedor) {
        return;
    }


    const publicaciones = obtenerPublicaciones();


    contenedor.replaceChildren();


    if (publicaciones.length === 0) {

        const vacio = document.createElement("div");

        vacio.className = "blog-empty";


        const icono = document.createElement("i");

        icono.className = "fa-solid fa-book-open";


        const titulo = document.createElement("h3");

        titulo.textContent = "Todavía no hay publicaciones";


        const texto = document.createElement("p");

        texto.textContent =
            "¡Sé el primero en compartir una historia, " +
            "una fotografía o una experiencia del Chocó!";


        vacio.append(icono, titulo, texto);

        contenedor.appendChild(vacio);

        return;

    }


    publicaciones.forEach(function (publicacion) {

        const tarjeta = document.createElement("article");

        tarjeta.className = "blog-post-card";


        /* IMAGEN */

        if (publicacion.imagen) {

            const imagen = document.createElement("img");

            imagen.className = "blog-post-image";

            imagen.src = publicacion.imagen;

            imagen.alt = publicacion.titulo;

            imagen.loading = "lazy";

            tarjeta.appendChild(imagen);

        } else {

            const marcador = document.createElement("div");

            marcador.className = "blog-post-placeholder";


            const icono = document.createElement("i");

            icono.className = "fa-solid fa-leaf";


            marcador.appendChild(icono);

            tarjeta.appendChild(marcador);

        }


        /* CONTENIDO */

        const contenido = document.createElement("div");

        contenido.className = "blog-post-content";


        const categoria = document.createElement("span");

        categoria.className = "blog-post-category";

        categoria.textContent = publicacion.categoria;


        const fecha = document.createElement("p");

        fecha.className = "blog-post-date";

        const fechaPublicacion = new Date(publicacion.fecha);


        fecha.textContent = isNaN(fechaPublicacion.getTime())
            ? ""
            : fechaPublicacion.toLocaleDateString("es-CO", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });


        const titulo = document.createElement("h3");

        titulo.textContent = publicacion.titulo;


        const texto = document.createElement("p");

        texto.className = "blog-post-text";

        texto.textContent = publicacion.contenido;


        contenido.append(
            categoria,
            fecha,
            titulo,
            texto
        );


        /* BOTÓN ELIMINAR */

        const acciones = document.createElement("div");

        acciones.className = "blog-post-actions";


        const botonEliminar = document.createElement("button");

        botonEliminar.className = "blog-delete";

        botonEliminar.type = "button";


        const iconoEliminar = document.createElement("i");

        iconoEliminar.className = "fa-solid fa-trash";


        botonEliminar.append(
            iconoEliminar,
            document.createTextNode(" Eliminar")
        );


        botonEliminar.addEventListener("click", function () {

            eliminarPublicacionBlog(publicacion.id);

        });


        acciones.appendChild(botonEliminar);

        contenido.appendChild(acciones);


        tarjeta.appendChild(contenido);

        contenedor.appendChild(tarjeta);

    });

}


/* ==================================================
   ELIMINAR PUBLICACIÓN
================================================== */

function eliminarPublicacionBlog(id) {

    const confirmar = confirm(
        "¿Estás seguro de que deseas eliminar esta publicación?"
    );


    if (!confirmar) {
        return;
    }


    const publicaciones = obtenerPublicaciones();


    const actualizadas = publicaciones.filter(function (publicacion) {

        return publicacion.id !== id;

    });


    const guardado = guardarPublicaciones(actualizadas);


    if (!guardado) {

        alert("No se pudo eliminar la publicación.");

        return;

    }


    renderizarPublicacionesBlog();

}


/* ==================================================
   INICIALIZAR BLOG
================================================== */

document.addEventListener("DOMContentLoaded", function () {

    inicializarImagenBlog();

    inicializarFormularioBlog();

    renderizarPublicacionesBlog();

});
