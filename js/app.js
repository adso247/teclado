// Define el arreglo 'keys' que representa la disposición de las teclas del teclado virtual.
// Cada elemento de este arreglo es un arreglo que contiene una pareja de caracteres.
// El primer carácter es el carácter normal, y el segundo es el carácter que se obtiene al presionar Shift.
// Cada subarreglo representa una fila del teclado.
// La última fila contiene una sola tecla, la barra espaciadora.
const keys = [
    [
        ["1", "!"],
        ["2", "@"],
        ["3", "#"],
        ["4", "$"],
        ["5", "%"],
        ["6", "&"],
        ["7", "/"],
        ["8", "("],
        ["9", ")"],
        ["0", "="],
        ["'", "?"],
        ["¡", "¿"],
    ],
    [
        ["q", "Q"],
        ["w", "W"],
        ["e", "E"],
        ["r", "R"],
        ["t", "T"],
        ["y", "Y"],
        ["u", "U"],
        ["i", "I"],
        ["o", "O"],
        ["p", "P"],
        ["`", "^"],
        ["+", "*"],
    ],
    [
        ["MAYUS", "MAYUS"],
        ["a", "A"],
        ["s", "S"],
        ["d", "D"],
        ["f", "F"],
        ["g", "G"],
        ["h", "H"],
        ["j", "J"],
        ["k", "K"],
        ["l", "L"],
        ["ñ", "Ñ"],
        ["¨", "{"],
        ["Ç", "}"],
    ],
    [
        ["SHIFT", "SHIFT"],
        ["<", ">"],
        ["z", "Z"],
        ["x", "X"],
        ["c", "C"],
        ["v", "V"],
        ["b", "B"],
        ["n", "N"],
        ["m", "M"],
        [",", ";"],
        [".", ":"],
        ["-", "_"],
    ],
    [["SPACE", "SPACE"]],
];

// Variables para rastrear el estado de las teclas SHIFT y MAYUS.
let shift = false;
let mayus = false;
// Variable para rastrear el elemento de entrada (input) actual.
let current = null;

// Llama a la función para renderizar el teclado en la página.
renderKeyboard();

function renderKeyboard() {
    // Obtiene una referencia al elemento HTML con el id "keyboard-container".
    const keyboardContainer = document.querySelector("#keyboard-container");

    // Crea una variable 'empty' que contiene una etiqueta div vacía con la clase "key-empty".
    let empty = `<div class="key-empty"></div>`;

    // La variable 'layers' es creada usando el método 'map' en el arreglo 'keys'.
    // Este arreglo representa las filas del teclado virtual.
    const layers = keys.map((layer, i) => {
        // Para cada fila (layer) en 'keys', se mapea sobre las teclas individuales en esa fila.
        return layer.map((key) => {
            // Se verifica si el carácter de la tecla es "SHIFT".
            if (key[0] === "SHIFT") {
                // Si es "SHIFT", se crea un botón con la clase "key-shift".
                return `<button class="key key-shift">${key[0]}</button>`;
            }
            // Se verifica si el carácter de la tecla es "MAYUS".
            if (key[0] === "MAYUS") {
                // Si es "MAYUS", se crea un botón con la clase "key-mayus".
                // Además, se agrega la clase "activated" si la variable 'mayus' es verdadera.
                return `<button class="key key-mayus ${mayus ? "activated" : ""}">${key[0]}</button>`;
            }
            // Se verifica si el carácter de la tecla es "SPACE" (espacio).
            if (key[0] === "SPACE") {
                // Si es "SPACE", se crea un botón con la clase "key-space".
                return `<button class="key key-space"></button>`;
            }
            // Para todas las demás teclas:
            // - Si la tecla SHIFT está activada, se muestra el segundo carácter (mayúscula).
            // - Si la tecla MAYUS está activada y la tecla es una letra minúscula,se muestra el segundo carácter(mayúscula).
            // - En otros casos, se muestra el primer carácter (minúscula o caracter especial).
            // Esta línea crea un botón HTML para una tecla en el teclado virtual basándose en ciertas condiciones.
            // La estructura general es un elemento <button> con clases CSS y el contenido del botón.
            return `<button class="key key-normal">${shift
                // Si la tecla SHIFT está activada, se muestra key[1], que es el carácter en mayúscula correspondiente.
                ? key[1]
                : mayus &&
                    // Si la tecla MAYUS está activada y la tecla es una letra minúscula (código ASCII entre 97 y 122),
                    // se muestra key[1], que es el carácter en mayúscula correspondiente.
                    key[0].toLowerCase().charCodeAt(0) >= 97 &&
                    key[0].toLowerCase().charCodeAt(0) <= 122
                    ? key[1]
                    // Si ninguna de las condiciones anteriores se cumple,se muestra key[0]
                    //que es el carácter en minúscula o especial.
                    : key[0]
                }</button>`;

        });
    });

    // Agrega una tecla vacía al final de la primera fila (layers[0]).
    layers[0].push(empty);

    // Agrega una tecla vacía al principio de la segunda fila (layers[1]).
    layers[1].unshift(empty);

    // Finalmente, se imprime en la consola el resultado de 'layers' después de realizar estas modificaciones.
    console.log(layers);


    //Utilizando el método .map, se itera a través del arreglo layers. 
    //Cada elemento del arreglo layers representa una fila del teclado
    const htmlLayers = layers.map((layer) => {
        //En el contexto de cada iteración, layer representa una fila del teclado
        //quí se llama al método .join("") en el arreglo layer. Esto toma todas 
        //las cadenas HTML dentro de layer y las concatena en una sola cadena, utilizando una cadena vacía "" 
        //como separador.
        return layer.join("");
    });
    //Esta línea borra todo el contenido del elemento HTML con el id "keyboard-container" 
    keyboardContainer.innerHTML = "";
    //Aquí se utiliza el método forEach para iterar a través de cada elemento del arreglo htmlLayers
    htmlLayers.forEach((layer) => {
        // Crea un nuevo div con la clase "layer" para representar una fila del teclado.
        // Luego, agrega la representación HTML de la fila actual al interior de este div.
        keyboardContainer.innerHTML += `<div class="layer">${layer}</div>`;
    });

    // Selecciona todos los elementos HTML con la clase "key".
    document.querySelectorAll(".key").forEach((key) => {
        // Agrega un evento de clic a cada elemento "key".
        key.addEventListener("click", (e) => {
            // Verifica si existe un elemento de entrada (input) activo.
            if (current) {
                // Comienza a manejar las acciones según la tecla clicada.

                // Si la tecla es "SHIFT":
                if (key.textContent === "SHIFT") {
                    // Alterna el estado de la variable "shift".
                    shift = !shift;
                    // Llama a la función "renderKeyboard()" para actualizar el teclado visual.
                    renderKeyboard();
                }
                // Si la tecla es "MAYUS":
                else if (key.textContent === "MAYUS") {
                    // Alterna el estado de la variable "mayus".
                    mayus = !mayus;
                    // Llama a la función "renderKeyboard()" para actualizar el teclado visual.
                    renderKeyboard();
                }
                // Si la tecla es una tecla vacía (representada como una cadena vacía ""):
                else if (key.textContent === "") {
                    // Se utiliza el depurador (debugger) para pausar la ejecución para fines de depuración.
                    debugger;
                    // Agrega un espacio al valor del elemento de entrada actual.
                    current.value += " ";
                }
                // Si la tecla es cualquier otra tecla:
                else {
                    // Agrega el texto de la tecla al valor del elemento de entrada actual.
                    current.value += key.textContent;

                    // Si la tecla SHIFT está activada:
                    if (shift) {
                        // Desactiva la tecla SHIFT.
                        shift = false;
                        // Llama a la función "renderKeyboard()" para actualizar el teclado visual.
                        renderKeyboard();
                    }
                }

                // Enfoca nuevamente en el elemento de entrada actual.
                current.focus();
            }
        });
    });

    // Selecciona todos los elementos HTML de tipo "input".
    document.querySelectorAll("input").forEach((input) => {
        // Agrega un evento de enfoque (focusin) a cada elemento "input".
        input.addEventListener("focusin", (e) => {
            // Cuando un elemento "input" recibe el enfoque (seleccionado por el usuario), 
            // asigna ese elemento como el "current" (elemento actual) que se utiliza para registrar 
            // en cuál de los campos de entrada se deben agregar caracteres del teclado virtual.
            current = e.target;
        });
    });
}