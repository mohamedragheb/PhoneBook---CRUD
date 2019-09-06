var currentIndex = 0;

var btn = document.getElementById("myBtn");

var productNameInp = document.getElementById("productName");

var productCompanyInp = document.getElementById("productCompany");

var productPriceInp = document.getElementById("productPrice");

var productDesInp = document.getElementById("productDes");

var searchInp = document.getElementById("searchInp");

var searchRow = document.getElementById("searchRow");




var productsContainer ;
    
if(localStorage.getItem("myproducts") == null)
    {
        productsContainer =[];
    }
else
    {
    productsContainer=JSON.parse(localStorage.getItem("myproducts"))
        displayProduct();
    }





btn.onclick = function()
{ 
    if(validateForm()==true)
        {
            addProduct();
            displayProduct();  
            clearData();
        };
    
    
    if(btn.innerHTML == "Add Product")
        {
            addProduct();
            displayProduct();  
            clearData();
        }
    else
        {
            updateProduct();
            displayProduct();
            clearData();
        };
    
}

searchInp.onkeyup = function()
{
    searchProduct(searchInp.value);
}



/* Start Inputs task */

function addProduct()
{
    var product =
        {
            name:productNameInp.value,
            price:productPriceInp.value,
            company:productCompanyInp.value,
            Des:productDesInp.value,
        };
    
    productsContainer.push(product);
    
    localStorage.setItem("myproducts" , JSON.stringify(productsContainer))
      
}

/* End Inputs task */




/* Start Grid for display products task */

function displayProduct()
{
    var cols="";
    for(var i=0 ; i<productsContainer.length ; i++)
        {
            cols+= ` <div class="col-md-4">
            <div class="product">
                <img src="full-5-600x420.jpg" class="img-fluid" >
                <h3>`+productsContainer[i].name+`</h3>
                <p class="text-muted">`+productsContainer[i].company+`</p>
                <span class="text-danger">`+productsContainer[i].price+`</span>
                <p class="text-muted">`+productsContainer[i].Des+`</p>
                <button class="btn btn-danger mb-3 mr-2" onclick="deleteProduct(`+i+`)">Delete</button>
                <button class="btn btn-info mb-3 " onclick="setForm(`+i+`)">Update</button>
            </div>
        </div>
        `         
        }
    
    document.getElementById("productRow").innerHTML = cols   
}

/* End Grid for display products task */




/* Start Clear task */

function clearData()
{
    var inputs= document.getElementsByClassName("form-control");
    
    for(i=0 ; i<inputs.length ; i++)
        {
            inputs[i].value="";
        }
}

/* End Clear task */



/* Start Delete task */

function deleteProduct(id)
{
    productsContainer.splice(id,1);
    
    localStorage.setItem("myproducts" , JSON.stringify(productsContainer))

    displayProduct();  
}

/* End Delete task */




/* Start Validation task */

function validateForm()
{
    var errers ="";
    var nameRegex = /^[A-Z][a-zA-z]{3,10}$/;
    var priceRegex = /^[1-9][0-9]{2,5}$/;
    
    if(nameRegex.test(productNameInp.value) ==false)
        {
            errers += "<h4 class='alert-heading'>productName not valid</h4>";
        }
    if(priceRegex.test(productPriceInp.value)==false)
        {
            errers += "<h4 class='alert-heading'>productPrice not valid</h4>";
        }
    if(errers.length>0)
        {
            alertContainer.style.display="block";
            alertContainer.innerHTML = errers;
            return false;
        }
    else
        {
            alertContainer.style.display="none";
            return true;
        }
}

/* End Validation task */




/* Start search task */

function searchProduct(term)
{
    var searchCols="";
    for(var i=0 ; i<productsContainer.length ; i++)
        {
            if(productsContainer[i].name.includes(term))
                {
                    searchCols += ` <div class="col-md-4">
            <div class="product">
                <img src="full-5-600x420.jpg" class="img-fluid" >
                <h3>`+productsContainer[i].name+`</h3>
                <p class="text-muted">`+productsContainer[i].company+`</p>
                <span class="text-danger">`+productsContainer[i].price+`</span>
                <p class="text-muted">`+productsContainer[i].Des+`</p>
                <button class="btn btn-danger mb-3 " onclick="deleteProduct(`+i+`)">Delete</button>
            </div>
        </div>
        `         
                }
        }
    searchRow.innerHTML=searchCols;
}

/* End search task */




/* Start update task */

function setForm(i)
{
    productNameInp.value=productsContainer[i].name;
    productPriceInp.value=productsContainer[i].price;
    productCompanyInp.value=productsContainer[i].company;
    productDesInp.value=productsContainer[i].Des;
    
    btn.innerHTML= "Update Product";
    
    currentIndex=i;
    
}


function updateProduct()
{
   productsContainer[currentIndex].name=productNameInp.value;
   productsContainer[currentIndex].price=productPriceInp.value;
   productsContainer[currentIndex].company=productCompanyInp.value;
    
   productsContainer[currentIndex].Des=productDesInp.value;
    
    
    btn.innerHTML= "Add Product";
    
    localStorage.setItem("myproducts" , JSON.stringify(productsContainer))
   
}

/* End update task */



