// Comprueba si hay un elemento con el ID 'container-slider' en el documento.
if (document.querySelector('#container-slider')) {
    // Establece un intervalo que llama a la función 'funcionEjecutar' con el argumento 'siguiente' cada 5000 milisegundos (5 segundos).
    setInterval(() => funcionEjecutar("siguiente"), 5000);
}

// Comprueba si hay un elemento con la clase 'listslider' en el documento.
if (document.querySelector('.listslider')) {
    // Obtiene todos los enlaces dentro de los elementos <li> con la clase 'listslider'.
    let link = document.querySelectorAll(".listslider li a");
    
    // Recorre todos los enlaces obtenidos.
    link.forEach(function(link) {
        // Añade un evento 'click' a cada enlace.
        link.addEventListener('click', function(e) {
            // Previene el comportamiento por defecto del enlace (navegar a la URL).
            e.preventDefault();
            
            // Obtiene el valor del atributo 'itlist' del enlace clicado.
            let item = this.getAttribute('itlist');
            
            // Divide el valor del atributo 'itlist' en un array usando el carácter '_' como separador.
            let arrItem = item.split("_");
            
            // Llama a la función 'funcionEjecutar' con el segundo elemento del array.
            funcionEjecutar(arrItem[1]);
            
            // Devuelve false para evitar cualquier acción adicional.
            return false;
        });
    });
}

// Define la función 'funcionEjecutar' que acepta un argumento 'side'.
function funcionEjecutar(side) {
    // Obtiene el elemento con el ID 'slider'.
    let parentTarget = document.getElementById('slider');
    
    // Obtiene todos los elementos <li> dentro del elemento 'slider'.
    let elements = parentTarget.getElementsByTagName('li');
    
    let curElement, siguienteElement;

    // Recorre todos los elementos <li> para encontrar el que tiene opacidad 1.
    for (var i = 0; i < elements.length; i++) {
        if (window.getComputedStyle(elements[i]).opacity == "1") {
            curElement = i;
            break;
        }
    }

    // Decide cuál será el siguiente elemento dependiendo del valor de 'side'.
    if (side == 'anterior' || side == 'siguiente') {
        if (side == "anterior") {
            // Si 'side' es 'anterior', establece el índice del siguiente elemento como el anterior en la lista o el último si el actual es el primero.
            siguienteElement = (curElement == 0) ? elements.length - 1 : curElement - 1;
        } else {
            // Si 'side' es 'siguiente', establece el índice del siguiente elemento como el siguiente en la lista o el primero si el actual es el último.
            siguienteElement = (curElement == elements.length - 1) ? 0 : curElement + 1;
        }
    } else {
        // Si 'side' no es ni 'anterior' ni 'siguiente', se asume que es un índice directo del siguiente elemento.
        siguienteElement = side;
        // Determina si la navegación es 'anterior' o 'siguiente' en función de la posición del índice.
        side = (curElement > siguienteElement) ? 'anterior' : 'siguiente';
    }

    // Obtiene todos los enlaces dentro del elemento con la clase 'listslider'.
    let elementSel = document.getElementsByClassName("listslider")[0].getElementsByTagName("a");
    
    // Elimina la clase 'item-select-slid' del enlace que representa el elemento actual.
    elementSel[curElement].classList.remove("item-select-slid");
    
    // Añade la clase 'item-select-slid' al enlace que representa el siguiente elemento.
    elementSel[siguienteElement].classList.add("item-select-slid");
    
    // Cambia la opacidad del elemento actual a 0 y su z-index a 0.
    elements[curElement].style.opacity = 0;
    elements[curElement].style.zIndex = 0;
    
    // Cambia la opacidad del siguiente elemento a 1 y su z-index a 1.
    elements[siguienteElement].style.opacity = 1;
    elements[siguienteElement].style.zIndex = 1;
}
