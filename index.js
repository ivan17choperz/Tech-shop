let $cards = document.getElementById("panel-cards");
let $carGrid = document.querySelector("#carGrid");
let contador = 0;
let trolley = {};
let $pre_loader= document.querySelector('.pre-loading')
// fuction for make the request
function main(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => second(data))
    .catch((err) => console.error(err));
};
// Rows of trolly shopping
function rowsOfCar(propierties) {
  
  let {amount,id,img,name,price}=propierties
 
 return rowArticle = `<div class="rowArticle">               
                          <img src="${img}">
                          <h3 class="name">${name}</h3>
                          <input type="number" placeholder="${amount}" id="amount-input"></input>
                          <h3 id="price">${price}</h3>
                      </div>`;
};
// function for the structure of the cards
function card(properties) {
  let { _id, _img, _name, _description, price } = properties;

  return `<div class="card col s12 m12 xl3">
                    <div class="card-image">
                        <img id="img" src="${_img}" class="resposive-img" >
                        
                    </div>
                    <div class="card-content">
                        <button class="btn material-icons-outlined article" data-id="${_id}" >
                          add_shopping_cart
                        </button>
                        <h2 id="title" class="card-title">${_name}</h2>
                        <p id="description">${_description}</p>
                        <h3 id="price">${price}</h3>
                    </div>
          </div>`;
};
// fuction for show cards
function second(data) {
  let showCards,
    cardAccumulator = "",
    reciveData = data;
  reciveData.forEach((dataObj) => {
    showCards = cardAccumulator += card(dataObj);
  });
  $cards.innerHTML = showCards;
  $pre_loader.setAttribute('class','display-none')

  let $addButton = document.querySelectorAll(".addButton");
  $addButton.forEach((e) => {
    e.addEventListener("click", (event) => {
      
    });
  });
};

main("https://api-rest-soretech.herokuapp.com/api/portatiles");

$cards.addEventListener('click',(e)=>{addTrolly(e)})

function addTrolly(e) {
    let event = e.target.classList.contains('article')
      if(event){
        let data = e.target.parentElement
        
        enterToTrolley(data)
      }
    e.stopPropagation()
}
function enterToTrolley(data){
    let eleFather = data.parentElement,
    extracImg = eleFather.querySelector('#img');

    let product = {
      id : data.querySelector('.btn').dataset.id,
      name : data.querySelector('#title').textContent,
      price : data.querySelector('#price').textContent,
      img : extracImg.src,
      amount: 1      
    }
    if(trolley.hasOwnProperty(product.id)){
      product.amount = trolley[product.id].amount+1;
    }
    trolley[product.id]={...product}
    printTrolley(trolley)
    
}
function printTrolley(data) {
  let print = '';
  Object.values(data).forEach(e=>{
    
    let properties = {
      id : e.id,
      img : e.img,
      name:e.name,
      price:e.price,
      amount : e.amount
      
    };
    print += rowsOfCar(properties);
  })
  $carGrid.innerHTML=print
  
  let $countNotifi = document.querySelectorAll('.rowArticle').length,
      notificationCounter = document.querySelector('.count');
  notificationCounter.innerHTML= `<h1>${$countNotifi}</h1>`;

  let $emptyTrolley = document.querySelector('.empty')
    $emptyTrolley.addEventListener('click',(e)=>{
    emptyCar(e)
  })
  
  let $to_buy = document.querySelector('.to-buy')
  $to_buy.addEventListener('click',()=>{
    buyFinal()
  }) 
}

function emptyCar(e){
  trolley = {}
  printTrolley(trolley) 
  arrayFinalBuy = []; 
}


let $btnTrolley = document.getElementById('btn-trolly');
$btnTrolley.addEventListener('click',(e)=>{
    let printTrolley = document.querySelector('.trolley')
    printTrolley.classList.remove('display-none')
    
})
 let $quitTrolley = document.querySelector('#close')
$quitTrolley.addEventListener('click',(e)=>{
    let printTrolley = document.querySelector('.trolley')
    printTrolley.classList.add('display-none')

})

let arrayFinalBuy = [];

function buyFinal() {
 
}

