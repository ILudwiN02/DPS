const productos = [
    { id: 1, nombre: "Laptop HP", precio: 1200, stock: 10 },
    { id: 2, nombre: "Smartphone Samsung", precio: 900, stock: 15 },
    { id: 3, nombre: "Audífonos Sony", precio: 200, stock: 20 }
];

let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos();
    actualizarCarrito();
});

function mostrarProductos() {
    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";
    productos.forEach(producto => {
        contenedor.innerHTML += `
            <div>
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <p>Stock disponible: ${producto.stock}</p>
                <input type="number" id="cantidad-${producto.id}" min="1" max="${producto.stock}" value="1">
                <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
            </div>
        `;
    });
}

function agregarAlCarrito(id) {
    const cantidad = parseInt(document.getElementById(`cantidad-${id}`).value);
    const producto = productos.find(p => p.id === id);
    if (cantidad > 0 && cantidad <= producto.stock) {
        const productoEnCarrito = carrito.find(p => p.id === id);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad += cantidad;
        } else {
            carrito.push({ ...producto, cantidad });
        }
        producto.stock -= cantidad;
        actualizarCarrito();
        mostrarProductos();
    } else {
        alert("Cantidad no válida");
    }
}

function actualizarCarrito() {
    const contenedor = document.getElementById("listaCarrito");
    contenedor.innerHTML = "";
    let total = 0;
    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;
        contenedor.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${producto.nombre} - ${producto.cantidad} x $${producto.precio} = $${subtotal}
                <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
            </li>
        `;
    });
    document.getElementById("totalPrecio").textContent = total;
}

function eliminarDelCarrito(id) {
    const producto = carrito.find(p => p.id === id);
    productos.find(p => p.id === id).stock += producto.cantidad;
    carrito = carrito.filter(p => p.id !== id);
    actualizarCarrito();
    mostrarProductos();
}

document.getElementById("btnFacturar").addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Factura de Compra", 10, 10);

    let y = 20;
    let total = 0;
    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;
        doc.text(`${producto.nombre} - ${producto.cantidad} x $${producto.precio} = $${subtotal}`, 10, y);
        y += 10;
    });

    doc.text(`Total: $${total}`, 10, y + 10);
    doc.save("factura.pdf");
});

mostrarProductos();