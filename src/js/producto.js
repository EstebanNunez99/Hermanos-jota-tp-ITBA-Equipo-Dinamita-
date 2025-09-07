// const contendorProducto = document.getElementById("contenedor-producto")
// const iamgenDelProducto = document.getElementById("imagen-del-producto")

// const idProducto = 1


// async function traerProductos() {

//     try {
//         const respuesta  = await fetch("../json/catalogo_hermanos_jota.json") //traigo el archivo json
//         if (!respuesta.ok) throw new Error("Error al cargar el JSON"); //sino hay repuesta del json se muestra un error
    
//         const productos = await respuesta.json() // convierto el json en un arreglo llamado productos 
        
//         const productoDelJSON = productos.find(idProducto)

//         iamgenDelProducto.src = productoDelJSON.imagen

//         contendorProducto.appendChild(iamgenDelProducto)
    
//     }


//     catch (error) {
//     console.error("Error al cargar cursos:", error);
//     const msg = document.createElement("p");
//     msg.textContent = "No se pudieron cargar los cursos 😢";
//     courseList.appendChild(msg);
//   }
// }

// traerProductos() vamo de nuevo de cerito acá


const contenedorProducto = document.getElementById("contenedor-producto");
const imagenDelProducto = document.getElementById("imagen-del-producto");
const nombrePagina = document.getElementById("nombre-de-la-pagina")

const nombre = document.querySelector(".nombre-producto");
const descripcion= document.querySelector(".descripcion-producto");
const precio = document.querySelector(".precio");
const descripcionTexto = document.querySelector(".descripcion-texto p");
const caracteristicasTds = document.querySelectorAll(".caracteristicas-prodcuto tbody tr td");
const caracteristicasThs = document.querySelectorAll(".caracteristicas-prodcuto thead tr th");


async function cargarProducto() {

      try {
        
        const respuesta = await fetch("../json/catalogo_hermanos_jota.json"); // trgo el archivo JSON
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);

        
        const productos = await respuesta.json(); // convierto el json a array de objetos que se llama productos
        
        // Obtiene la parte de la URL con los parámetros
        const urlParams = new URLSearchParams(window.location.search);
        // Extrae el valor del parámetro 'id'
        const idProducto = urlParams.get('id');

        const producto = productos.find(p => p.id == idProducto); // busco con find el producto en el arrelo de productos

        console.log(typeof(producto))

        if (!producto) { // si no existe, mostramos mensaje y salimos
          contenedorProducto.innerHTML = "<p>Producto no encontrado</p>";
          return;
        }

        //cargo la parte del contenedor del producto
        nombrePagina.textContent = "Producto | " + producto.nombre // le pongo nombresito a la pag :D
        imagenDelProducto.src = encodeURI(producto.imagen); // cargo la imagen
        imagenDelProducto.alt = producto.nombre || "Producto";
        nombre.textContent = producto.nombre || "";
        descripcion.textContent = producto.descripcion || "";
        descripcionTexto.textContent = producto.descripcion || "";
        precio.textContent = "$ " + producto.precio || ""
        
        // console.log(producto)

        //cargo la tabla de caracateristicas
        //Verificar los encabezados, no todos tienen las mismas caracteristicas

        const clavesDelProdcuto = [] // voy a guardar las claves del producto para despues comparar con las que no quiero mostrar
        Object.keys(producto).forEach(clave => {
          clavesDelProdcuto.push(clave) // voy agregando las claves al arreglo
        });

        const claveNoMostrar = [
          "id",
          "nombre",
          "descripcion",
          "imagen",
          "precio"
        ] //en este objeto cargo las claves que no quiero mostrar en la tabla
        let contadorTabla = 1
        for (let i = 0; i < clavesDelProdcuto.length; i++) {
          
          if (!claveNoMostrar.includes(clavesDelProdcuto[i])) { //sino está en el arreglo claveNoMostrar entra
            // console.log("holaaa")  
            // console.log(clavesDelProdcuto[i]) // esta es la clave
            // console.log(producto[clavesDelProdcuto[i]]) //esto es el contenido o valor
            // console.log(contadorTabla)
            
            const tituloDelth =  clavesDelProdcuto[i].charAt(0).toUpperCase() + clavesDelProdcuto[i].slice(1); // convierto la primer letra en mayuscula, se podria converir y renderizar al mismo tiempo pero queda mas prolijo usando otra variable
            caracteristicasThs[contadorTabla].textContent = tituloDelth
            caracteristicasTds[contadorTabla].textContent = producto[clavesDelProdcuto[i]]
            contadorTabla = contadorTabla + 1
          }
        }
        // caracteristicasTds[1].textContent = producto.medidas || "";
        // caracteristicasTds[2].textContent = producto.materiales || producto.estructura || "";
        // caracteristicasTds[3].textContent = producto.acabado || "";
        // caracteristicasTds[4].textContent = producto.peso || producto.carga_maxima || "";
        // caracteristicasTds[5].textContent = producto.capacidad || producto.incluye || producto.apilables || "";
    

      } catch (err) {
        console.error("Error al cargar productos:", err);
        contenedorProducto.innerHTML = "<p>Ocurrió un error al cargar el producto.</p>";
      }
    }
    cargarProducto();


// la parte del carrito
const botonAnadirCarrito = document.querySelector(".aniadir-carrito");
const contadorCarrito = document.querySelector(".cart-count");


function actualizarContadorCarrito() { // función que lee el total de productos y lo pone en el HTML

  const totalItems = parseInt(localStorage.getItem("carritoCount")) || 0;   // Traemos el número del localStorage, si no hay nada, arrancamos en cero
  
  contadorCarrito.textContent = totalItems; // con este le cambio el numerito al contador en la página
}


function anadirAlCarrito() {
  
  const totalItems = parseInt(localStorage.getItem("carritoCount")) || 0;
  const nuevoTotal = totalItems + 1; //si se hizo clcl incremento el cont
  
  localStorage.setItem("carritoCount", nuevoTotal); // Guardamos el nuevo número para que no se borre si cambiás de página
  
  actualizarContadorCarrito(); // renderizo el nuevo resultado, actulizo el carrito nms
}

botonAnadirCarrito.addEventListener("click", anadirAlCarrito); //que escuche el clcik

actualizarContadorCarrito(); // llamada a la funcion que casi me olvido de llamarla por 5ta vezzz