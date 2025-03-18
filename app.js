alert("BIENVENIDO AL JUEGO DEL AMIGO SECRETO");
let amigos = [];

function agregarAmigo() {
    const input = document.getElementById('amigo');
    const nombreAmigo = input.value.trim();

    if (nombreAmigo && amigos.length < 5) {
        amigos.push(nombreAmigo);
        actualizarLista();
        input.value = ''; // Limpiar el campo de entrada
    } else if (amigos.length >= 5) {
        alert("Ya has añadido 5 amigos.");
    } else {
        alert("Por favor, ingresa un nombre válido.");
    }
}

function actualizarLista() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = ''; // Limpiar la lista actual

    amigos.forEach(amigo => {
        const li = document.createElement('li');
        li.textContent = amigo;
        lista.appendChild(li);
    });
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Se necesitan al menos dos personas para sortear.");
        return;
    }

    // Hacer una copia de la lista de amigos y barajarla
    let amigosSorteados = [...amigos];
    let resultado = [];
    
    // Asignar a cada persona un amigo secreto único
    for (let i = 0; i < amigos.length; i++) {
        const amigoActual = amigos[i];
        let index = Math.floor(Math.random() * amigosSorteados.length);
        let amigoSorteado = amigosSorteados.splice(index, 1)[0]; // Eliminar el amigo sorteado de la lista

        // Evitar que una persona sea su propio amigo secreto
        if (amigoActual === amigoSorteado) {
            i--; // Volver a intentar si se asigna a sí mismo
            amigosSorteados = [...amigos]; // Resetear la lista para el siguiente intento
        } else {
            resultado.push(`${amigoActual} → ${amigoSorteado}`);
        }
    }

    mostrarResultados(resultado);

    // Limpiar la lista de amigos después de realizar el sorteo
    amigos = []; // Limpiar la lista de amigos
    actualizarLista(); // Limpiar la lista visualmente

    // Deshabilitar el botón de sorteo después de realizarlo
    document.querySelector('.button-draw').disabled = true;

    // Mostrar mensaje de que el sorteo ha terminado
    const mensajeFinal = document.createElement('p');
    mensajeFinal.textContent = "¡El sorteo ha finalizado! Los amigos secretos han sido asignados.";
    document.querySelector('.input-section').appendChild(mensajeFinal);

    // Reiniciar el juego automáticamente después de 3 segundos
    setTimeout(reiniciarJuego, 3000); // Espera de 3 segundos antes de reiniciar
}

function mostrarResultados(resultado) {
    const listaResultado = document.getElementById('resultado');
    listaResultado.innerHTML = ''; // Limpiar resultados anteriores

    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    const amigoSorteado = amigos[indiceAleatorio];
    document.getElementById('resultado').textContent = `El amigo secreto sorteado es: ${amigoSorteado}`;
}

function reiniciarJuego() {
    // Limpiar los resultados y el mensaje final
    document.getElementById('resultado').innerHTML = '';
    const mensajeFinal = document.querySelector('.input-section p');
    if (mensajeFinal) {
        mensajeFinal.remove(); // Eliminar el mensaje de finalización
    }

    // Habilitar el botón de sortear
    document.querySelector('.button-draw').disabled = false;

    // Limpiar la lista de amigos
    amigos = [];
    actualizarLista();

    // Restaurar la interfaz para agregar nuevos amigos
    alert("¡El juego se ha reiniciado! Ahora puedes agregar nuevos amigos.");
}
