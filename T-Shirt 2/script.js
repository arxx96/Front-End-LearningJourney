function openNav() {

    document.getElementById("mySidebar").style.width = "350px";
    document.getElementById("customize").style.left = "72%";
    document.getElementById("mySidebar").style.padding = "30px";
  }
  
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0px";
    document.getElementById("customize").style.left = "100%";
    document.getElementById("mySidebar").style.padding = "0px";
  }


function changeFont(name,id){
    var elements = document.getElementsByName("main");
    var fontButtons = document.getElementsByClassName("btn-fonts");
    for (var i = 0; i < fontButtons.length; i++){
      if(fontButtons[i].id != id){
        fontButtons[i].style.border = '1px gray solid';
      }
      else{
        fontButtons[i].style.border = '1px blue solid';
      }
    }

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.fontFamily = name;
    }
}

function changeColor(id){
  var elements = document.getElementsByName("cat-2");
  var elements2 = document.getElementsByName("cat-1");
  var fontButtons = document.getElementsByClassName("btn-colors");
  for (var i = 0; i < fontButtons.length; i++){
    if(fontButtons[i].id != id){
      fontButtons[i].style.border = '1px gray solid';
    }
    else{
      fontButtons[i].style.border = '1px blue solid';
    }
  }
  
  var colors = [];
  switch (id){
    case 'c1':
      colors[0] = 'rgb(0,0,0)';
      colors[1] = 'rgb(233, 213, 207)';
      break;
    case 'c2':
      colors[0] = 'rgb(102, 0, 128)';
      colors[1] = 'rgb(195, 51, 195)';
      break;
    case 'c3':
      colors[0] = 'rgb(221, 66, 66)';
      colors[1] = 'rgb(229, 96, 47)';
      break;
    case 'c4':
      colors[0] = 'rgb(208, 30, 56)';
      colors[1] = 'rgb(161, 38, 133)';
      break;
    case 'c5':
      colors[0] = 'rgb(208, 30, 56)';
      colors[1] = 'rgb(161, 38, 133)';
      break;
    case 'c6':
      colors[0] = 'rgb(255, 102, 0)';
      colors[1] = 'rgb(228, 164, 53)';
      break;
    case 'c7':
      colors[0] = 'rgb(217, 197, 15)';
      colors[1] = 'rgb(188, 175, 53)';
      break;
    case 'c8':
      colors[0] = 'rgb(23, 95, 34)';
      colors[1] = 'rgb(39, 145, 37)';
      break;
    case 'c9':
      colors[0] = 'rgb(23, 95, 34)';
      colors[1] = 'rgb(39, 145, 37)';
      break;
    case '11':
      colors[1] = 'rgb(0, 123, 255)';
      colors[0] = 'rgb(85, 73, 255)';
    case 'c10':
      colors[1] = 'rgb(0, 123, 255)';
      colors[0] = 'rgb(85, 73, 255)';
      break;
    default:
      colors[0] = 'rgb(25, 0, 138)';
      colors[1] = 'rgb(85, 73, 255)';
  }
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.backgroundColor =  colors[0];
    elements2[i].style.backgroundColor = colors[1];
}
}


// shopping Cart

const cartIcon= document.querySelector('.cart-icon');
const cart= document.querySelector(".cart");
const closeCart=document.querySelector("#cart-close");
cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
})
closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
})

if(document.readyState =="loading"){
  document.addEventListener('DOMContentLoaded',start);
}
else{
  start();
}

function start(){
addEvents();
}

function update(){
addEvents();
updateTotal();
}

function addEvents(){
let cartRemove = document.querySelectorAll(".cart-remove");
console.log(cartRemove);
cartRemove.forEach((btn) => {
  btn.addEventListener("click", handle_RemovedItem);
});

let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
cartQuantity_inputs.forEach(input =>{
  input.addEventListener("change", handle_changeItemQuantity);
});

let addCart_btns = document.querySelectorAll(".action-btn");
addCart_btns.forEach((btn) => {
  btn.addEventListener("click", handle_addCartItem);

});


}


function handle_addCartItem(){
  let actionbtn_parent = this.parentElement;
  let product= actionbtn_parent.parentElement;
  let title = product.querySelector(".shirt_text").innerHTML;
  let price = product.querySelector(".price").innerHTML;
  let imgSrc = product.querySelector(".img-product").src;

  let newToAdd ={
    title, 
    price,
    imgSrc,
  };

 
 
 
//add product to cart
  let cartBoxElement = CartBoxComponent(title, price, imgSrc);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector(".cart-content");
  cartContent.appendChild(newNode);


  
  update();
}
function handle_RemovedItem(){
    this.parentElement.remove();
    update();
}

function handle_changeItemQuantity(){
  if(isNaN(this.value) || this.value < 1){
    this.value = 1;
  }
  this.value = Math.floor(this.value);

  update();
}

function updateTotal(){
  let cartBoxes = document.querySelectorAll(".cart-box");
  const totalElement = cart.querySelector(".total-price");
 
  let total = 0;
  cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    let quantity = cartBox.querySelector(".cart-quantity").value;

    total += price * quantity;


  });

  total = total.toFixed(2);
  

  totalElement.innerHTML = "$" + total;

 
}

function CartBoxComponent(title, price, imgSrc){
  return `
  <div class="cart-box">
  <img src="${imgSrc}" alt="" srcset="" class="cart-img">
  <div class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="cart-price">${price}</div>
      <input type="number" value="1" class="cart-quantity">
  </div>
  <i class="fa-regular fa-circle-xmark cart-remove"></i>
</div>
</div>`;
}

