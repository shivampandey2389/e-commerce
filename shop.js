let products = [];
let cart =[];

const fetchData = ()=>{
  fetch('products.json').
  then(response => response.json()).
  then(
    data => {
      products = data;
      console.log(products);
      getDataToPage();
      if(localStorage.getItem('data')){
        cart=JSON.parse(localStorage.getItem('data'));
        addToCartList();
      }
    }
  ) 

}
fetchData();

let cardsSection = document.querySelector('.cards-section');
const getDataToPage=()=>{
 
  if(products.plants.length > 0){
    products.plants.forEach(plant => {
      let anchor = document.createElement("a");
        // anchor.href = "product.html";
        anchor.id = `${plant.id}`; // Use a more specific ID format
        anchor.classList.add("card");
  
        // Add card content
        anchor.innerHTML = `
          <div class="img-card-sec">
            <img src="${plant.image_url}" alt="${plant.name}" width="250px" height="250px">
          </div>
          <div class="card-img-des">
            <div class="card-plant-name flex flex-col">
              <span class="fn-sm font-gray-clr">Category</span>
              <div class="fn-card-name">${plant.name}</div>
            </div>
            <div class="price-card-rating flex align-c">
              <div class="price-card font-gray-clr">
                $${plant.price}
              </div>
              <div class="rating-card flex">
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
              </div>
            </div>
            <button class="green-btn-cart add-to-btn">Add To Cart</button>
          </div>
        `;
  
        // Append card to the container
        cardsSection.appendChild(anchor);
    });
  }
  
}

cardsSection.addEventListener("click",(e)=>{
  if(e.target.classList.contains('add-to-btn')){
    let product_id =e.target.closest('.card').id;
    addToCart(product_id);
  }
})

function addToCart(product_id){
  let valueOfQuantity = cart.findIndex((value)=>value.product_id == product_id);
  
  if(cart.length <=0){
    cart= [{
      product_id:product_id,
      quantity:1
    }]
  }
  else if(valueOfQuantity < 0){
    cart.push({
      product_id:product_id,
      quantity:1
    })
  }
  else{
    cart[valueOfQuantity].quantity = cart[valueOfQuantity].quantity + 1;
  }
 addToCartList();
 addToLocal();
}

function addToLocal(){
  localStorage.setItem("data",JSON.stringify(cart));
}


let list_cart = document.querySelector(".list-section-prd ul");
let red_cart = document.querySelector(".red-cart-header");
function addToCartList(){
  list_cart.innerHTML=" ";
  let totalQuantity=0;
  if(cart.length > 0){
    cart.forEach(cartProduct =>{
    totalQuantity = totalQuantity + cartProduct.quantity;
    let list = document.createElement('li');
    list.classList.add('cart-list');
    list.dataset.id = cartProduct.product_id;
    let positionProduct = products.plants.findIndex((value)=>value.id == cartProduct.product_id);    
    let info = products.plants[positionProduct];
    list.innerHTML =`
            <img src="${info.image_url}" alt="" width="80px">
            <div class="cart-name">
              <span>${info.name}</span>
            </div>
            <span>$${info.price * cartProduct.quantity}</span>
            <div class="quantity_cart flex align-c justify-c">
              <div class="flex align-c justify-c minus pointer">&lt</div>
              <div class="flex align-c justify-c">${cartProduct.quantity}</div>
              <div class="flex align-c justify-c plus pointer">&gt</div>
            </div>

    `
    list_cart.appendChild(list);
    })
    
  }
  red_cart.innerHTML = totalQuantity;
}

let list_Cart = document.querySelector('.list-section-prd');
list_Cart.addEventListener("click",(e)=>{
  let target = e.target;
  if(target.classList.contains('plus')||target.classList.contains('minus')){
    let product_id =target.parentElement.parentElement.dataset.id;
    let type ='minus';
    if(target.classList.contains('plus')){
      type = 'plus';
    }
    cartQuantity(product_id,type);
    
  }
  
})

function cartQuantity(id,type){
  let cartValue = cart.findIndex((value)=>value.product_id == id)
  if(cartValue >= 0){
    if(type == 'plus'){
      cart[cartValue].quantity += 1;
    }else if(type == 'minus'){
      let valueChange =cart[cartValue].quantity -=1;
      if (valueChange > 0) {
        cart[cartValue].quantity = valueChange;
      } else {
        cart.splice(cartValue, 1); // Remove the item if quantity reaches 0
      }
    }else{
      console.log("error");
    }
  }
  addToLocal();
  addToCartList();
  
}