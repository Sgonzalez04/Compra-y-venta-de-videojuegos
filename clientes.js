// Crear un objeto para almacenar los clientes
var diccionarioClientes = {};

// Comprobar si hay datos en el Local Storage y cargarlos si es así
if (localStorage.getItem("clientes")) {
    diccionarioClientes = JSON.parse(localStorage.getItem("clientes"));
    // Mostrar los clientes guardados
    for (var identificacion in diccionarioClientes) {
        mostrarCliente(diccionarioClientes[identificacion]);
    }
}

// Función para agregar un cliente
function agregar_Cliente() {
    var identificacion = document.getElementById("identificacion").value;
    var nombres = document.getElementById("nombres").value;
    var apellidos = document.getElementById("apellidos").value;
    var telefono = document.getElementById("telefono").value;
    var correo = document.getElementById("correo").value;
    var nacimiento = document.getElementById("nacimiento").value;
    var nacionalidad = document.getElementById("nacionalidad").value;
    var puntos = 0

    // Crear un objeto cliente con los valores
    var cliente = {
        identificacion: identificacion,
        nombres: nombres,
        apellidos: apellidos,
        telefono: telefono,
        correo: correo,
        nacimiento: nacimiento,
        nacionalidad: nacionalidad,
        puntos: puntos
    };

    // Agregar el cliente al diccionario de clientes
    diccionarioClientes[identificacion] = cliente;

    // Guardar los datos actualizados en el Local Storage
    localStorage.setItem("clientes", JSON.stringify(diccionarioClientes));

    // Mostrar el cliente en el div "contain_clientes"
    mostrarCliente(cliente);

    // Limpia los campos del formulario después de agregar un cliente
    limpiarCampos();
}

// Función para mostrar un cliente en el div
function mostrarCliente(cliente) {
    var containClientes = document.querySelector(".contain_clientes");

    var clienteDiv = document.createElement("div");
    clienteDiv.innerHTML = `
        <p>Identificación: ${cliente.identificacion}</p>
        <p>Nombres: ${cliente.nombres}</p>
        <p>Apellidos: ${cliente.apellidos}</p>
        <p>Teléfono: ${cliente.telefono}</p>
        <p>Correo electrónico: ${cliente.correo}</p>
        <p>Fecha de nacimiento: ${cliente.nacimiento}</p>
        <p>Nacionalidad: ${cliente.nacionalidad}</p>
        <p>Valor total de compra: $${cliente.valor !== undefined ? "" + cliente.valor : "0"}</p>
        <p>Puntos: ${cliente.puntos}</p>
        <button onclick="eliminarCliente('${cliente.identificacion}')">Eliminar</button>`;
    containClientes.appendChild(clienteDiv);
}

// Función para eliminar un cliente
function eliminarCliente(identificacion) {
    if (confirm(`¿Estás seguro de que deseas eliminar al cliente con identificación "${identificacion}"?`)) {
        // Elimina al cliente del diccionario de clientes
        delete diccionarioClientes[identificacion];

        // Guarda los datos actualizados en el Local Storage
        localStorage.setItem("clientes", JSON.stringify(diccionarioClientes));

        // Limpia el div "contain_clientes"
        var containClientes = document.querySelector(".contain_clientes");
        containClientes.innerHTML = "";

        // Vuelve a mostrar todos los clientes después de la eliminación
        for (var identificacion in diccionarioClientes) {
            mostrarCliente(diccionarioClientes[identificacion]);
        }
    }
}

// Función para limpiar los campos del formulario

function limpiarCampos() {
    document.getElementById("identificacion").value = "";
    document.getElementById("nombres").value = "";
    document.getElementById("apellidos").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("nacimiento").value = "";
    document.getElementById("nacionalidad").value = "";
}