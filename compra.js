// Espera a que la página se cargue completamente antes de ejecutar el código.
window.addEventListener("load", function(){
    // Cargar los juegos desde el almacenamiento local (localStorage)
    let games = JSON.parse(localStorage.getItem("games_campus"));

    if (games) {
        // Mostrar los juegos en la página
        let container = document.querySelector(".contain_games"); //contenedor de juegos en el HTML y almacena en "container".

        for (let x = 0; x < games.length; x++) {
            // Crear un nuevo elemento <div> para representar un juego
            let div_game = document.createElement("div");
            div_game.classList.add("game"); //clase "game" al elemento div.
            div_game.setAttribute("data-id", x); //"data-id" para identificar el juego.

            // Crear un elemento para la imagen de portada del juego
            let img = document.createElement("img");
            img.src = games[x].front; // Establece la fuente de la imagen.
            img.classList.add("game-img"); // Agrega la clase "game-img" al elemento img.
            div_game.appendChild(img);

            // Crear un botón de compra para el juego
            let buyButton = document.createElement("button");
            buyButton.textContent = games[x].comprado ? "Comprado" : "Comprar"; // Texto del botón basado en si el juego está comprado o no.
            buyButton.className = "b_comprar button"; // Agrega clases al botón.
            buyButton.onclick = function() {
                comprar_game(x, diccionarioClientes); // Define la acción de comprar
            }
            div_game.appendChild(buyButton);

            // Crear elementos HTML para mostrar detalles del juego
            let p = document.createElement("p");
            p.innerHTML = "<b>Titulo:</b> " + games[x].title + "<br>" +
                "<b>Valor licencia:</b> " + games[x].valor + "<br>" +
                "<b>Genero:</b> " + games[x].genre + "<br>" +
                "<b>Puntos:</b> " + games[x].Puntos + "<br>" +
                "<b>ID:</b> " + x;

            // Agregar "p" elemento "div_game"
            div_game.appendChild(p);

            // Agregar "div_game" al contenedor de juegos
            container.appendChild(div_game);
        }
    } else {
        // Si no hay juegos disponibles en el almacenamiento local.
        console.log("No hay juegos disponibles.");
    }

    // Función para comprar un juego y actualizar la información del cliente
    function comprar_game(identificacion, diccionarioClientes) {
        let game = games[identificacion];
        let identificacionCliente = prompt("Introduce el ID del cliente:");

        if (diccionarioClientes[identificacionCliente]) {
            if (!game.comprado) {
                // Marcar el juego como comprado
                game.comprado = true;
                localStorage.setItem("games_campus", JSON.stringify(games));

                // Actualizar el valor del cliente con un 16% de suma y luego un 4% adicional
                let valorCliente = parseFloat(diccionarioClientes[identificacionCliente].valor);
                let suma16 = valorCliente * 0.16;
                valorCliente += suma16;
                let suma4 = valorCliente * 0.04;
                valorCliente += suma4;

                // Actualiza el valor del cliente en el diccionario
                diccionarioClientes[identificacionCliente].valor = valorCliente;

                // Agregar puntos al cliente
                diccionarioClientes[identificacionCliente].puntos += parseInt(game.Puntos);

                // Actualizar los puntos del cliente en el almacenamiento local
                localStorage.setItem("clientes", JSON.stringify(diccionarioClientes));

                // Reflejar los cambios en la vista de los clientes
                actualizarPuntosCliente(identificacionCliente);
            } else {
                alert("El juego ya ha sido comprado.");
            }
        } else {
            alert("ID de cliente no válido. Por favor, ingresa un ID válido.");
        }
    }
});
