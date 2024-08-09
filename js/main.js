var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var searchInput = document.getElementById("searchInput");
var addbtn = document.getElementById("addbtn");
var updatebtn = document.getElementById("updatebtn");
var indexUpdate = 0;

var productContainer  = [];

if (localStorage.getItem("products") != null) {
   ///  false not found data in local -- and don't do any thing
      productContainer = JSON.parse(localStorage.getItem("products"));
      displayData();
   }
function addProduct(){

   if(regexName()&&regexPrice()&&regexCategory())
   {
   var product =
   {
      name:productNameInput.value,
      price:productPriceInput.value,
      category:productCategoryInput.value,
      description:productDescriptionInput.value,
   }
   productContainer.push(product);
   localStorage.setItem("products",JSON.stringify(productContainer));
   displayData();
   clearForm();
   productNameInput.classList.remove("is-valid");
   productNameInput.classList.remove("is-invalid");
   productPriceInput.classList.remove("is-valid");
   productPriceInput.classList.remove("is-invalid");
   productCategoryInput.classList.remove("is-valid");
   productCategoryInput.classList.remove("is-invalid");

  }
}

function deleteProduct(index){
   productContainer.splice(index,1);
   localStorage.setItem("products",JSON.stringify(productContainer));
   displayData();
}

function displayData(){
   var data = "";

   for(var i =0 ; i<productContainer.length;i++){
      data +=`
       <tr>
                     <td>${productContainer[i].name}</td>
                     <td>${productContainer[i].price}</td>
                     <td>${productContainer[i].category}</td>
                     <td>${productContainer[i].description}</td>
                     <td>
                        <button class="btn btn-outline-warning btn-sm" onclick = "setData(${i})">Update</button>
                        <button class="btn btn-outline-danger btn-sm" onclick="deleteProduct(${i})">Delete</button>
                     </td>
                  </tr>
                  `
   }
   document.getElementById("data").innerHTML = data;
}

function searchProduct (){
   var data = "";
   for(var i =0 ; i<productContainer.length;i++){
      if(productContainer[i].name.toLowerCase().includes(searchInput.value.toLowerCase())) {
         data +=`
       <tr>
                     <td>${productContainer[i].name}</td>
                     <td>${productContainer[i].price}</td>
                     <td>${productContainer[i].category}</td>
                     <td>${productContainer[i].description}</td>
                     <td>
                        <button class="btn btn-outline-warning btn-sm">Update</button>
                        <button class="btn btn-outline-danger btn-sm" onclick="deleteProduct(${i})">Delete</button>
                     </td>
                  </tr>
                  `
      }
   }

   document.getElementById("data").innerHTML = data;
}
function setData(index){
      var currentProduct = productContainer[index];
      indexUpdate = index;
      productNameInput.value = currentProduct.name;
      productPriceInput.value = currentProduct.price;
      productCategoryInput.value = currentProduct.category;
      productDescriptionInput.value = currentProduct.description;

      updatebtn.classList.remove("d-none");
      addbtn.classList.add("d-none");
}

function updateProduct(){
   var product = {
      name:productNameInput.value,
      price:productPriceInput.value,
      category:productCategoryInput.value,
      description:productDescriptionInput.value,

   }

   productContainer.splice(indexUpdate,1,product)
   updatebtn.classList.add("d-none");
   addbtn.classList.remove("d-none");
   localStorage.setItem("products",JSON.stringify(productContainer));
 
   displayData();
   clearForm();
   productNameInput.classList.remove("is-valid");
   productNameInput.classList.remove("is-invalid");
   productPriceInput.classList.remove("is-valid");
   productPriceInput.classList.remove("is-invalid");
   productCategoryInput.classList.remove("is-valid");
   productCategoryInput.classList.remove("is-invalid");



}

function clearForm(){

   productNameInput.value = "";
   productPriceInput.value = "";
   productCategoryInput.value = "";
   productDescriptionInput.value = "";
}

function regexName(){
   var regexName = /^[A-Z][a-z]{2,8}$/;
   var text = productNameInput.value;
   var InvalidName = document.getElementById("InvalidName");
   if(regexName.test(text))   //valid
   {
      productNameInput.classList.add("is-valid");
      productNameInput.classList.remove("is-invalid");
      InvalidName.classList.add("d-none");
      return true;

   }
   else{   //not valid
      productNameInput.classList.add("is-invalid");
      productNameInput.classList.remove("is-valid");
      InvalidName.classList.remove("d-none");
      return false;
   }
}

function regexPrice(){
   var regexPrice = /^[0-9]{2,6}$/;
   var Price = productPriceInput.value;
   var InvalidPrice = document.getElementById("InvalidPrice");
   if(regexPrice.test(Price) && Price > 0)   //valid
   {
      productPriceInput.classList.add("is-valid");
      productPriceInput.classList.remove("is-invalid");
      InvalidPrice.classList.add("d-none");
      return true;

   }
   else{   //not valid
      productPriceInput.classList.add("is-invalid");
      productPriceInput.classList.remove("is-valid");
      InvalidPrice.classList.remove("d-none");
      return false;
   }
}
function regexCategory(){
   var regexCategory = /^[A-Z][a-z]{2,8}$/;
   var Category = productCategoryInput.value;
   var InvalidCategory = document.getElementById("InvalidCategory");
   if(regexCategory.test(Category))   //valid
   {
      productCategoryInput.classList.add("is-valid");
      productCategoryInput.classList.remove("is-invalid");
      InvalidCategory.classList.add("d-none");
      return true;

   }
   else{   //not valid
      productCategoryInput.classList.add("is-invalid");
      productCategoryInput.classList.remove("is-valid");
      InvalidCategory.classList.remove("d-none");
      return false;
   }
}

productNameInput.addEventListener('input',function(){
   regexName();
});

productPriceInput.addEventListener('input',function(){
   regexPrice();
});

productCategoryInput.addEventListener('input',function(){
   regexCategory();
});

addbtn.addEventListener('click',function(){
   addProduct();
});

updatebtn.addEventListener('click',function(){
   updateProduct();
});

searchInput.addEventListener('input',function(){
   searchProduct();
});




