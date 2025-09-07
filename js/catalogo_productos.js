const gridProducto = document.querySelector(".grid-productos"); // este es el div donde van a ir todos los productos

let productos = []; //  aca voy a guardar todos los productos del json pa despues usarlos en la busqueda

//  esta funcion agarra una lista de productos y los renderixa en el html
function renderizarProductos(lista) {
  gridProducto.innerHTML = ""; // limpio todo antes de volver a cargar

  if (lista.length === 0) {
    gridProducto.innerHTML = "<p>No se encontraron productos.</p>"; // si no hay nada q mostrar muestro msjito
    return;
  }

  for (const prodcuto of lista) {
    // recorro cada producto del array
    const cardProducto = document.createElement("div"); // creo el div principal (la tarjetita)
    cardProducto.className = "card-producto";

    const imgProducto = document.createElement("img"); // creo la imagen
    imgProducto.src = prodcuto.imagen; // le pongo la url de la img q viene del json
    imgProducto.alt = prodcuto.nombre; // alt por accesibilidad

    const bodyProducto = document.createElement("div"); // div de adentro de la tarjeta
    bodyProducto.className = "card-body"; // le pongo una clase

    const tituloProducto = document.createElement("h2"); // titulo del producto
    tituloProducto.textContent = prodcuto.nombre;

    const breveDescripcionProducto = document.createElement("p"); // parrafito breve del detalle
    breveDescripcionProducto.textContent = prodcuto.materiales;

    const precioProducto = document.createElement("p"); // parrafo para el precio
    precioProducto.textContent = "$" + prodcuto.precio;

    const detalleProdcuto = document.createElement("a"); // link al detalle
    detalleProdcuto.textContent = "Detalle del producto";
    detalleProdcuto.href = `producto.html?id=${prodcuto.id}`; // le paso el id para saber cual es

    // ahora voy armando el arbol del DOM,  o sea le voy diciendo que etiqueta esta dentro de quien
    bodyProducto.appendChild(tituloProducto);
    bodyProducto.appendChild(breveDescripcionProducto);
    bodyProducto.appendChild(precioProducto);
    bodyProducto.appendChild(detalleProdcuto);
    cardProducto.appendChild(imgProducto);
    cardProducto.appendChild(bodyProducto);
    gridProducto.appendChild(cardProducto); // y al final meto la tarjeta completa en el grid, para rendierizar en el HTML
  }
}

//  aca cargo todos los productos del json apenas abre la pag
async function cargarTodosLosProductos() {
  try {
    const respuesta = await fetch("../json/catalogo_hermanos_jota.json"); // me traigo el archivo json
    if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`); // si falla tiro error

    productos = await respuesta.json(); // guardo todos los productos en la variable global
    console.log(productos);
    renderizarProductos(productos); // dibujo todo apenas carga
  } catch (err) {
    console.error("Error al cargar productos:", err);
    gridProducto.innerHTML = "<p>Ocurrió un error al cargar el catálogo.</p>"; // si falla pongo msjito
  }
}

cargarTodosLosProductos();

// >>>>>>>>>>>>>>>>>>>>>>>>> la parte de la busqueda <<<<<<<<<<<<<<<<<<<<<<<<<<<<
const cuadroDeBusqueda = document.getElementById("cuadroDeBusqueda"); // agarro el input del buscador

cuadroDeBusqueda.addEventListener("input", (e) => {
  // escucho cuando alguien escribe
  const texto = e.target.value.toLowerCase(); // paso todo a minusculas par comparar

  // filtro los productos q tengan el texto en el nombre o en los materiales

  const filtrados = productos.filter(
    (p) =>
      (p.nombre || "").toLowerCase().includes(texto) ||
      (p.materiales || "").toLowerCase().includes(texto)
  );

  renderizarProductos(filtrados); // muestro los q pasaron el filtro
});
