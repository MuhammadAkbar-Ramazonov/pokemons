const elList = document.querySelector(".site-list");
const elBody = document.querySelector("body");
const elTemplate = document.querySelector(".site-template").content;
const newPokemonFregment = document.createDocumentFragment();
const elForm = document.querySelector(".site-form");
const elSelect = document.querySelector(".site-select");
const elFormInput = document.querySelector(".js-input");
const elSelectSort = document.querySelector(".site-select-sort");
const weaknesSum = [];


function sortFunc(arr, select){
  if(select == "A-Z"){
    arr.sort((a, b) => {
      if(String(a.name) > String(b.name)){
        return 1;
      }
      if(String(a.name) < String(b.name)){
        return -1;
      }
      return 0;
    });
  }
  else if(select == "Z-A"){
    arr.sort((a, b) =>{
      if(a.name > b.name){
        return -1;
      }
      if(a.name < b.name){
        return 1;
      }
      return 0;
    })
  }
  
  if(select == "01:30-23:40"){
    arr.sort((a, b) => a.spawn_time.charCodeAt(0) - b.spawn_time.charCodeAt(0));
  }
  else if(select == "23:40-01:30"){
    arr.sort((a, b) => b.spawn_time.charCodeAt(0) - a.spawn_time.charCodeAt(0));
  }
};  

function createElement(kino) {
  elList.innerHTML = "";
  
  kino.forEach(item => {
    
    const elClonePekemon = elTemplate.cloneNode(true);
    item.type.forEach(function(element){
      if(!weaknesSum.includes(element)){
        weaknesSum.push(element);
        const elOption = document.createElement("option");
        elOption.textContent = element;
        elSelect.appendChild(elOption);
      } 
    });
    elClonePekemon.querySelector(".pokemon-title").textContent = item.name;
    elClonePekemon.querySelector(".pokemon-badge").textContent = item.num;
    elClonePekemon.querySelector(".pokemon-img").src = item.img;
    elClonePekemon.querySelector(".pokemon-img").width = "350";
    elClonePekemon.querySelector(".pokemon-img").height = "350";
    elClonePekemon.querySelector(".pokemon-time").textContent = item.spawn_time;
    elClonePekemon.querySelector(".pokemon-text").textContent = item.type.join(" ");
    newPokemonFregment.appendChild(elClonePekemon);
  });
  elList.appendChild(newPokemonFregment);
}

elForm.addEventListener("submit", function(evt){
  evt.preventDefault();
  
  
  const elSelctCatecoryValue = elSelect.value;
  const elFormInputValue = elFormInput.value.trim();
  const elSelectValue = elSelect.value.trim();
  const regexValue = new RegExp(elFormInputValue, "gi");
  const regexCategory = new RegExp(elSelctCatecoryValue, "gi");
  const elSelectSortValue = elSelectSort.value;
  
  
  if(elFormInputValue == ""){
    const searchMovie = pokemons.filter(item => (item.type.join(" ").match(regexCategory) || elSelctCatecoryValue === "All"));
    sortFunc(pokemons, elSelectSortValue);
    createElement(searchMovie.slice(0));
  }
  else{
    const searchMovie = pokemons.filter(item => String(item.name).match(regexValue) && (elSelectValue === item.type.join("") || elSelectValue === "All"));
    
    sortFunc(searchMovie, elSelectSortValue);
    
    createElement(searchMovie.slice(0));
    
    if (searchMovie.length > 0){
      createElement(searchMovie);
    }else{
      elMoviesList.innerHTML = "Not found !!!";
    }
  }  
})

createElement(pokemons.slice(0, 10));
