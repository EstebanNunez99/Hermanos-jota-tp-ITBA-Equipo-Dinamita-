const producto_grid = document.getElementById("productosGrid");
const resultadosBusqueda = document.getElementById("resultadosBusqueda");

async function FetchProductosDestacados() {
    try {
    const response = await fetch("../json/catalogo_hermanos_jota.json");
        if (!response.ok) {
            throw new Error("Error al cargar los productos destacados");
        }
        const ProductosDestacados = await response.json();
        
        console.log("Script cargado correctamente");

         const mezclados = [...ProductosDestacados].sort(() => Math.random() - 0.5);

        // 👉 Tomamos 3 aleatorios
        const destacados = mezclados.slice(0, 4);
        
        console.log("Productos cargados:", destacados);

        destacados.forEach(destacado => {
            const productoCard = document.createElement("div");
            productoCard.className = "producto-card";
            productoCard.href = `detalle.html?id=${destacado.id}`;
            
            
            const productoImg = document.createElement("img");
            productoImg.src = destacado.imagen;
            productoImg.alt = destacado.nombre;

            const productoInfo = document.createElement("div");
            productoInfo.className = "producto-info";

            const productoNombre = document.createElement("span");
            productoNombre.className = "producto-nombre";
            productoNombre.textContent = destacado.nombre;

            const productoPrecio = document.createElement("span");
            productoPrecio.className = "producto-precio";
            productoPrecio.textContent = `$${destacado.precio.toLocaleString()}`;

            productoInfo.appendChild(productoNombre);
            productoInfo.appendChild(productoPrecio);
            productoCard.appendChild(productoImg);
            productoCard.appendChild(productoInfo);
            producto_grid.appendChild(productoCard);
        });
    } catch (error) {
        console.error("Error fetching productos destacados:", error);
       const errorMessage = document.createElement("p");
       errorMessage.textContent = "No se pudieron cargar los productos destacados.";
       producto_grid.appendChild(errorMessage);
    }
}

FetchProductosDestacados();


        