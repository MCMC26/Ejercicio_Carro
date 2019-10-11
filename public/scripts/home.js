window.addEventListener('load', () => {

    var form = document.querySelector('#order');
    var listProduct = document.querySelector(".listProduct");

    addExistProduct();

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // transforma el formulario como DOM (lo que el usuario puede ver)
        // a una colección de datos (variables con valores)
        var formInfo = new FormData(form);
        // agrego esos datos a lo que vamos a enviar
        var data = new URLSearchParams(formInfo);


        var promise = fetch('/api/car', {
            method: 'POST',
            body: data
        });

        promise.then((response) => {
            return response.json();
        })
            .then((response) => {
                form.reset();
                console.log(response);
                addProduct(response.product);
            });
    });

    function addExistProduct() {
        var promise = fetch('/api/car', {
            method: 'GET',
        });

        promise.then((response) => {
            return response.json();
        })
            .then((response) => {
                console.log("Se añadieron todos los productos");
                response.forEach(product => {
                    addProduct(product)
                });
            });
    }

    function addProduct(product) {
        product.view = createView(product);

        listProduct.appendChild(product.view);
    }

    function createView(product) {

        let view_delete = document.createElement("button");
        view_delete.className = "delete btn";
        view_delete.innerText = "Eliminar";

        let edit = document.createElement("button");
        edit.className = "delete btn";
        edit.innerText = "Editar";

        view_delete.addEventListener("click", () => {
            removeProduct(product.id);
            listProduct.remove(product.view);
        });
        view_edited.addEventListener("click", () => {
            template.innerHTML = `
            <div class="template__propiedades">
            <div class="horizontal propiedad">
                <div class="color__title">
                    <h1>Marca:</h1>
                </div>
                <div class="color__color">
                <input type="text" value="${product.brand}" />
                </div>
            </div>
            <div class="horizontal propiedad">
                <div class="color__title">
                    <h2>Llantas:</h2>
                </div>
                <div class="color__color">
                <input type="range" value="${product.rims}" />
                </div>
            </div>
            <div class="color horizontal propiedad">
                <div class="color__title">
                    <h2>Color:</h2>
                </div>
                <div class="color__color">
                <input type="range" value="${product.color}" />
                </div>
            </div>
            </div>
            <div class="template__acciones">
            
            <button class="edited btn">
                editar
            </button>
            </div>
        `;
        });

        let template = document.createElement("div");
        template.className = "template horizontal";
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
        
        <button class="edited btn">
            editar
        </button>
        </div>
    `;


        let acciones_view = template.querySelector(".template__acciones");
        acciones_view.appendChild(view_delete);
        return template;
    }

    function createViewEdit(product) {

        let change = document.createElement("button");
        change.className = "delete btn";
        change.innerText = "Confirmar";
        change.addEventListener("click", () => {

        });


        let view = document.createElement("div");
        view.className = "template horizontal";
        view.innerHTML = `
   <div class="template__propiedades">
       <div class="horizontal propiedad">

           <div class="color__title">
               <h1>Marca:</h1>
           </div>
           <div class="color__color">
                   <input class="input__edit" type="text" placeholder="Texto" />
           </div>
       </div>
       <div class="horizontal propiedad">

           <div class="color__title">
               <h2>Llantas:</h2>
           </div>
           <div class="color__color horizontal">
               <input class="input__edit" type="range" placeholder="Texto" />
               <div>0</div>
           </div>
       </div>
       <div class="color horizontal propiedad">
           <div class="color__title">
               <h2>Color:</h2>
           </div>
           <div class="color__color">
               <input class="input__edit" type="color"/>
           </div>


       </div>
   </div>
   <div class="template__acciones">
       <button class="delete btn">
           Confirmar
       </button>

   </div>`;

        let acciones_view = template.querySelector(".template__acciones");
        acciones_view.appendChild(change);

        return template;

    }
    function createProduct(brand, rims, color, id) {
        let product = {
            brand: brand,
            rims: rims,
            color: color,
            id: id
        }
        return product;
    }


    function removeProduct(id) {

        var data = new URLSearchParams();
        data.append("id", id);

        var promise = fetch('/api/car', {
            method: 'delete',
            body: data
        });

        promise.then((response) => {
            return response.json();
        })
            .then((response) => {
                console.log("Se elimino el producto");

            });
    }
});
