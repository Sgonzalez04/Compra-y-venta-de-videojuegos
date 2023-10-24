//guarda lista juegos
let games = [];

//guardar o esconder
function show(current, hide){
    let section_show = document.querySelector(current);
    let section_hide = document.querySelector(hide);
    section_show.style.display = "block";
    section_hide.style.display = "none";
}

//agrega un juego
function add_game(){
    let name = "game" + games.length;
    let title = document.getElementById("title");
    let front = document.getElementById("front");
    let valor = document.getElementById("valor");
    let genre = document.getElementById("genre");
    let Puntos = document.getElementById("Puntos");
    let inputs = document.querySelectorAll(".info_game input");
    let validation = true;
    inputs.forEach((input) =>{
        if (input.value.trim() == ""){
            validation = false
        }
    })
    if (validation){
        window[name]={
            title: title.value,
            front: front.value,
            valor: parseInt(valor.value),
            genre: genre.value,
            Puntos: parseInt(Puntos.value)//convertir numeros,
        }
        games.push(window[name]);
        localStorage.setItem("games_campus", JSON.stringify(games));
        let order = document.getElementById("sort").value;
        sorted(order);
        show(`#games`,`#add`);
        inputs.forEach((input) =>{
            input.value = "";
        });
        change_back("");
    
        // Obtén la ID del juego agregado
        let gameId = games.length - 1;
    
        // Muestra la ID en la página
        document.querySelector("#game_id span").textContent = gameId;    
    }else{
        alert("No dejes campos vacios")
    }
}

function load_games(library){
    games = library;
    let container = document.querySelector(".contain_games");
    container.textContent = "";
    for(let x = 0; x < games.length; x++){
        let div_game = document.createElement("div");
        div_game.classList.add("game");

        let div_img = document.createElement("div");
        div_img.classList.add("contain_img");
        let img = document.createElement("img");
        img.setAttribute("src", games[x].front);
        div_img.appendChild(img);

        let div_text = document.createElement("div")
        let p = document.createElement("p");

        let b_delete = document.createElement("button");
        b_delete.textContent = "Eliminar";
        b_delete.setAttribute("class","b_delete button");

        //cambios eliminar
        b_delete.setAttribute("data-id", x); //ubicacion lista
        b_delete.setAttribute("onclick", "delete_game(this)")
        
        p.innerHTML = "<b>Titulo:</b> "+ games[x].title + "<br>" +
            "<b>Link portada:</b> "+ games[x].genre + "<br>" +
            "<b>Valor licencia:</b> "+ games[x].valor + "<br>" +
            "<b>Genero:</b> "+ games[x].genre + "<br>" +
            "<b>Puntos:</b> "+ games[x].Puntos + "<br>" +
            "<b>ID:</b> "+ [x]

        div_text.appendChild(p);
        div_text.appendChild(b_delete);
        div_game.appendChild(div_img);
        div_game.appendChild(div_text)
        container.appendChild(div_game);
    }
}

function change_back(link){
    let img_contain = document.querySelector(".img_game");
    img_contain.textContent = "";
    let img = document.createElement("img")
    img.setAttribute("src", link);
    img_contain.appendChild(img)
}

function sorted(id){
    if (id == 1){
        games.sort(sort_title);
        load_games(games)
    }
    if (id == 2){
        games.sort(sort_Puntos);
        load_games(games)
    }
    if (id == 3){
        games.sort(sort_valor);
        load_games(games)
    }
    if (id == 4){
        games.sort(sort_genre);
        load_games(games)
    }
    if (id == 5){
        games.sort(function(a,b){
            return (a.lend === b.lend)? 0 : a.lend? 1 : -1;
        });
        load_games(games)
    }

    localStorage.setItem("order_b", id)
}

function sort_title(a,b){
    if (a.title > b.title){
        return 1;
    }else if (a.title < b.title){
        return -1;
    }else{
        return 0;
    }
}

function sort_Puntos(a,b){
    if (a.Puntos > b.Puntos){
        return 1;
    }else if (a.Puntos < b.Puntos){
        return -1;
    }else{
        return 0;
    }
}

function sort_valor(a,b){
    if (a.valor > b.valor){
        return 1;
    }else if (a.valor < b.valor){
        return -1;
    }else{
        return 0;
    }
}

function sort_genre(a,b){
    if (a.genre > b.genre){
            return 1;
        }else if (a.genre < b.genre){
        return -1;
    }else{
        return 0;
    }
}

function delete_game(x){
    //busca el id del libro
    let id = x.getAttribute("data-id")
    let gameToRemove = games[id];

    if (confirm(`¿Estás seguro de que deseas eliminar el libro "${gameToRemove.title}"?`)) {
        // Elimina el libro del arreglo "games" usando splice
        games.splice(id, 1);
        
        localStorage.setItem("games_campus", JSON.stringify(games)) //stringify hace que quede en formato orginal
        load_games(games);
        let order = document.getElementById("sort").value
        sorted(order)
    }
}

window.addEventListener("load", function(){
    games = JSON.parse(localStorage.getItem("games_campus"));
    if (games){
        load_games(games)
    }else{
        games = []
    }

    let order = localStorage.getItem("order_b");
    let select = document.getElementById("sort")
    if(order){
        select.value = order
        sorted(order)
    }else{
        select.value = 1
        sorted(1)
    }
})