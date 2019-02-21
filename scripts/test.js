document.addEventListener("DOMContentLoaded", function(){
    /**
    *   1) Añadir un evento a la cabezera de los filtros que al hacer click en ella se desplieguen los filtros si están ocultos, y los oculte si no lo están.
    *
    *       The filters column must collapse or expand depending on the case, the action for doing this is a mouse click on the filter header.
    *
    */

    var btns = document.getElementsByClassName("filter-btn");

    [...btns].forEach(function(btn) {
        
        btn.addEventListener("click", function(){
            
            this.classList.toggle("active");
        
            var panel = this.nextElementSibling;
            
            if(panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
            
        })
    });


    /**
    *   3) Teniendo la variable 'products' agregue al listado los productos cuando el document esté listo
    *       
    *       When the document is ready, loop through the 'products' Array and add each product to the product list.
    *
    */
    var products = [
        { title: 'Botín', price: 800.44, category: 'Botines', image: 'http://placehold.it/225x225', brand: 'nike' },
        { title: 'Ojotas', price: 300.99, category: 'Ojotas', image: 'http://placehold.it/225x225', brand: 'adidas' },
        { title: 'Zapatillas', price: 1120.00, category: 'Calzado', image: 'http://placehold.it/225x225', brand: 'puma' },
        { title: 'Short', price: 320.44, category: 'Vestimenta', image: 'http://placehold.it/225x225', brand: 'nike' },
        { title: 'Pantalón', price: 360.44, category: 'Natación', image: 'http://placehold.it/225x225', brand: 'nike' } 
    ];
    products.forEach(function(product){
        var prodThumb = document.createElement("div");
        prodThumb.className = "product-thumbnail";
        
        var prodTitle = document.createElement("p");
        var prodPrice = document.createElement("p");
        var prodCat = document.createElement("p");
        var prodSale = document.createElement("p");
        var prodImg = document.createElement("img");
        var prodBrand = document.createElement("span");
        
        prodTitle.className = "product-title";
        prodPrice.className = "product-price";
        prodCat.className = "product-cat";
        prodImg.className = "product-image";
        prodBrand.className = "product-brand icon " + product.brand;
        prodSale.className = "sale hidden";

        prodThumb.appendChild(prodImg);        
        prodThumb.appendChild(prodSale);
        prodThumb.appendChild(prodTitle);
        prodThumb.appendChild(prodPrice);
        prodThumb.appendChild(prodBrand);
        prodThumb.appendChild(prodCat);
        
        prodTitle.innerHTML = product.title;
        prodPrice.innerHTML = "$ " + product.price;
        prodSale.innerHTML = "Oferta";
        prodImg.src = product.image;
        prodCat.innerHTML = product.category;
        
        document.getElementById("products-list").appendChild(prodThumb);
    });

    /**
    *   2) En el listado de productos, agregue la clase 'oferta' a todos los productos impares
    *
    *       In the products list, add class "offer" to the odd products (eg. position 1, 3, 5, etc)
    *
    */

    var productos = document.getElementsByClassName("product-thumbnail");

    [...productos].forEach(function(item, index) {
        if (index % 2 == 0) {
            item.querySelector(".sale").classList.remove("hidden");
        }
    })

    /**
    *   4) En el hover de la imagen del producto que cambié el color del precio a verde, y que aumente el tamaño del título en 2 píxeles.
    *       Los valores deben volver a su estado original al quitar el mouse de la imagen.
    *
    *       Upon hovering the product image, change the price color to green and increase the title size by 2 pixels.
    *       The values must return to the original state on mouseleave.
    *
    */

    var prodThumbs = document.getElementsByClassName("product-thumbnail");

    // Funcion tomada de https://stackoverflow.com/questions/1955048/get-computed-font-size-for-dom-element-in-js
    function getStyle(el,styleProp) {
      var camelize = function (str) {
        return str.replace(/\-(\w)/g, function(str, letter){
          return letter.toUpperCase();
        });
      };

      if (el.currentStyle) {
        return el.currentStyle[camelize(styleProp)];
      } else if (document.defaultView && document.defaultView.getComputedStyle) {
        return document.defaultView.getComputedStyle(el,null).getPropertyValue(styleProp);
      } else {
        return el.style[camelize(styleProp)]; 
      }
    }

    [...prodThumbs].forEach(function(thumb) {
        var price = thumb.querySelector(".product-price");
        var title = thumb.querySelector(".product-title");
        var priceColor = price.style.color;

        thumb.addEventListener("mouseenter", function() {
            title.style.fontSize = parseInt(getStyle(title, "font-size").split('px')[0]) + 2 + "px";
            price.style.color = "green";
        });

        thumb.addEventListener("mouseleave", function() {
            title.style.fontSize = parseInt(getStyle(title, "font-size").split('px')[0]) - 2 + "px";
            price.style.color = priceColor;
        })
    });
             
    /**
    *  5) Al hacer click sobre las marcas (debajo del slider principal) ejecutar una llamada AJAX a la siguiente URL: http://remote.fizzmod.com/ajax.php
    *       Si la llamada es satisfactoria ocultar las marcas, y mostrar el resultado devuelto dónde estaban las marcas.
    *
    *   On clicking the image that's below the main slider, make an AJAX request to the URL http://remote.fizzmod.com/ajax.php.
    *       If the request is successful hide the brands and show the result instead.
    *
    */

    var brandsImage = document.getElementsByClassName("js-brands-image")[0];
    var brandsWrapper = document.getElementsByClassName("js-brands")[0];

    brandsImage.addEventListener("click", function() {
        var request = new XMLHttpRequest();
        request.open("GET", "http://remote.fizzmod.com/ajax.php",true);
        request.send();
        
        request.onreadystatechange = function(){
            if(request.readyState === 4 && request.status === 200) {
                console.log(request.responseText);
                brandsWrapper.innerHTML = request.responseText;
            }
        }
    })
    
})