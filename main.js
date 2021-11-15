const inputBox = document.querySelector("#textoItem");
const botaoAdd = document.querySelector("#newItem");
const todoList = document.querySelector(".todoList");
const botaoDelTudo = document.querySelector(".footer button");

inputBox.onkeyup = ()=>{
    const textoTarefa = inputBox.value; 
    if(textoTarefa.trim() != 0){ 
        botaoAdd.classList.add("active"); 
    }else{
        botaoAdd.classList.remove("active");
    }
}

mostraTarefa(); 

botaoAdd.onclick = ()=>{ 
    const textoTarefa = inputBox.value;
    if(textoTarefa != ""){ 
        let getLocalStorageData = localStorage.getItem("New Todo"); 
        if(getLocalStorageData == null){ 
            listaArray = [];
        }else{
            listaArray = JSON.parse(getLocalStorageData); 
        }
    listaArray.push(textoTarefa); 
    localStorage.setItem("New Todo", JSON.stringify(listaArray)); 
    botaoAdd.classList.remove("active"); 
    mostraTarefa();
        }else{
            inputBox.focus();
    }
}

function mostraTarefa(){
    let getLocalStorageData = localStorage.getItem("New Todo");
    if(getLocalStorageData == null){
        listaArray = [];
    }else{
        listaArray = JSON.parse(getLocalStorageData); 
    }
    const tarefasPendentesNumb = document.querySelector(".tarefasPendentes");
    tarefasPendentesNumb.textContent = listaArray.length;
    if(listaArray.length > 0){
        botaoDelTudo.classList.add("active");
    }else{
        botaoDelTudo.classList.remove("active");
    }
    let novaLiTag = "";
    listaArray.forEach((element, index) => {
    novaLiTag += `<li><input type="checkbox" class="check">${element}</input><button onclick= deletaTarefa(${index});>Excluir</button></li>`;
    });
    todoList.innerHTML = novaLiTag;
    inputBox.value = "";
    inputBox.focus();
}

function deletaTarefa(index){
    let getLocalStorageData = localStorage.getItem("New Todo");
    listaArray = JSON.parse(getLocalStorageData);
    listaArray.splice(index, 1);
    localStorage.setItem("New Todo", JSON.stringify(listaArray));
    mostraTarefa();
}

botaoDelTudo.onclick = ()=>{
    listaArray = [];
    localStorage.setItem("New Todo", JSON.stringify(listaArray));
    mostraTarefa();
  }