const elList = document.querySelector(".site-list");
const elHero = document.querySelector(".hero");

const elBody = document.querySelector("body");
const elTemplate = document.querySelector(".site-template").content;
const newPokemonFregment = document.createDocumentFragment();
const elForm = document.querySelector(".site-form");
const elSelect = document.querySelector(".site-select");
const elFormInput = document.querySelector(".js-input");
const elInputStart = document.querySelector(".js-start-input");
const elInputEnd = document.querySelector(".js-end-input");

const elSelectSort = document.querySelector(".site-select-sort");
const weaknesSum = [];

// bookmark
// const bookmarkBtn =  document.querySelector(".bookmark-open");
// const bookmarkList =  document.querySelector(".book-list");

// bookmarkBtn.addEventListener("click", evt => {
//   evt.preventDefault();
//   bookmarkList.classList.toggle("d-none");
//   bookmarkList.classList.length < 3 ? bookmarkBtn.textContent = ">" : bookmarkBtn.textContent = "<";
//   elHero.classList.toggle("bookmark-hero");
//   elBody.classList.toggle("bookmark-body")
// });

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
  
  if(select == "001-151"){
    arr.sort((a, b) => a.weight.charCodeAt(0) - b.weight.charCodeAt(0));
  }
  else if(select == "151-001"){
    arr.sort((a, b) => b.weight.charCodeAt(0) - a.weight.charCodeAt(0));
  }
};

function createElement(kino, regex = "") {
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
    if(regex.source != "(?:)" && regex){
      elClonePekemon.querySelector(".pokemon-title").innerHTML = item.name.replace(regex, `<mark class="bg-warning">${regex.source.toLowerCase()}</mark>`);
    } else {
      elClonePekemon.querySelector(".pokemon-title").textContent = item.name;
    }

    // elClonePekemon.querySelector(".pokemon-title").textContent = item.name;
    elClonePekemon.querySelector(".pokemon-badge").textContent = item.num;
    elClonePekemon.querySelector(".pokemon-candy").textContent = item.candy_count;

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
  
  
    const searchMovie = pokemons.filter(item => String(item.name).match(regexValue) && (elSelectValue === item.type.join("") || elSelectValue === "All") && ( elInputStart.value == "" || item.candy_count >= elInputStart.value) && ( elInputEnd.value == "" || item.candy_count <= elInputEnd.value ) );
    
    sortFunc(searchMovie, elSelectSortValue);
    
    createElement(searchMovie.slice(0));
    
    if (searchMovie.length > 0){
      createElement(searchMovie,  regexValue);
    }else{
      elMoviesList.innerHTML = "Not found !!!";
    }
})

createElement(pokemons.slice(0, 10));