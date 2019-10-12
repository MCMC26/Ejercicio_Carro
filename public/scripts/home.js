window.addEventListener("load", () => {
  var form = document.querySelector("#order");
  var listProduct = document.querySelector(".listProduct");

  addExistProduct();

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    // transforma el formulario como DOM (lo que el usuario puede ver)
    // a una colección de datos (variables con valores)
    var formInfo = new FormData(form);
    // agrego esos datos a lo que vamos a enviar
    var data = new URLSearchParams(formInfo);

    var promise = fetch("/api/car", {
      method: "POST",
      body: data
    });

    promise
      .then(response => {
        return response.json();
      })
      .then(response => {
        form.reset();
        console.log(response);
        addProduct(response.product);
      });
  });

  function addExistProduct() {
    var promise = fetch("/api/car", {
      method: "GET"
    });

    promise
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log("Se añadieron todos los productos");
        response.forEach(product => {
          addProduct(product);
        });
      });
  }

  function addProduct(product) {
    product.view = createView(product);

    listProduct.appendChild(product.view);
  }

  function createView(product) {
    let template = document.createElement("div");
    template.className = "template horizontal";

    let view_delete = document.createElement("button");
    view_delete.className = "delete btn";
    view_delete.innerText = "Eliminar";

    let edit = document.createElement("button");
    edit.className = "edit btn";
    edit.innerText = "Editar";

    let confirm = document.createElement("button");
    confirm.className = "confirm btn";
    confirm.innerText = "Confirmar";

    view_delete.addEventListener("click", () => {
      removeProduct(product.id);
      listProduct.remove(product.view);
    });

    edit.addEventListener("click", () => {
      template.innerHTML = `
            <div class="template__propiedades">
            <div class="horizontal propiedad">
                <div class="color__title">
                    <h1>Marca:</h1>
                </div>
                <div class="color__color">
                <input class="input_brand" type="text" value="${product.brand}" />
                </div>
            </div>
            <div class="horizontal propiedad">
                <div class="color__title">
                    <h2>Llantas:</h2>
                </div>
                <div class="color__color">
                <input class="input_rims" type="range" value="${product.rims}" />
                </div>
            </div>
            <div class="color horizontal propiedad">
                <div class="color__title">
                    <h2>Color:</h2>
                </div>
                <div class="color__color">
                <input class="input_color" type="color" value="${product.color}" />
                </div>
            </div>
            </div>
            <div class="template__acciones">
           
            </div>
        `;

      let acciones_view = template.querySelector(".template__acciones");
      acciones_view.appendChild(confirm);
    });

    confirm.addEventListener("click", () => {
      product.brand = template.querySelector(".input_brand").value;
      product.rims = template.querySelector(".input_rims").value;
      product.color = template.querySelector(".input_color").value;

      putProduct(product);

      template.innerHTML = `
        <div class="template__propiedades">
        <div class="horizontal propiedad">
            <div class="color__title">
                <h1>Marca:</h1>
            </div>
            <div class="color__color">
            ${product.brand}
            </div>
        </div>
        <div class="horizontal propiedad">
            <div class="color__title">
                <h2>Llantas:</h2>
            </div>
            <div class="color__color">
            ${product.rims}
            </div>
        </div>
        <div class="color horizontal propiedad">
            <div class="color__title">
                <h2>Color:</h2>
            </div>
            <div class="color__color">
                <div style="background:  ${product.color};" class="color__color__view"></div>
            </div>
        </div>
        </div>
        <div class="template__acciones">
        
        </div>
    `;

      let acciones_view = template.querySelector(".template__acciones");
      acciones_view.appendChild(view_delete);
      acciones_view.appendChild(edit);
    });

    template.innerHTML = `
        <div class="template__propiedades">
        <div class="horizontal propiedad">
            <div class="color__title">
                <h1>Marca:</h1>
            </div>
            <div class="color__color">
            ${product.brand}
            </div>
        </div>
        <div class="horizontal propiedad">
            <div class="color__title">
                <h2>Llantas:</h2>
            </div>
            <div class="color__color">
            ${product.rims}
            </div>
        </div>
        <div class="color horizontal propiedad">
            <div class="color__title">
                <h2>Color:</h2>
            </div>
            <div class="color__color">
                <div style="background:  ${product.color};" class="color__color__view"></div>
            </div>
        </div>
        </div>
        <div class="template__acciones">
    
        </div>
    `;

    let acciones_view = template.querySelector(".template__acciones");
    acciones_view.appendChild(view_delete);
    acciones_view.appendChild(edit);
    return template;
  }

  function createProduct(brand, rims, color, id) {
    let product = {
      brand: brand,
      rims: rims,
      color: color,
      id: id
    };
    return product;
  }

  function removeProduct(id) {
    var data = new URLSearchParams();
    data.append("id", id);

    var promise = fetch("/api/car", {
      method: "delete",
      body: data
    });

    promise
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log("Se elimino el producto");
      });
  }

  function putProduct(product) {
    var data = new URLSearchParams();
    data.append("product", JSON.stringify(product));

    var promise = fetch("/api/car", {
      method: "PUT",
      body: data
    });

    promise
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log("Se cambio el producto");
      });
  }
});
