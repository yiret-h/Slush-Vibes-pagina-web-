const modal = document.getElementById('menuModal');
const modalTitle = document.getElementById('modalTitle');
const menuItemsContainer = document.getElementById('menuItems');

function openMenu(category, title) {
    modalTitle.textContent = title;
    menuItemsContainer.innerHTML = '<div class="loader">Cargando delicias...</div>';
    
    // Mostrar modal
    modal.style.display = 'flex';
    // Pequeño delay para permitir que la transición CSS funcione
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);

    // Fetch API hacia el backend PHP
    fetch(`api.php?category=${category}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la red');
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                menuItemsContainer.innerHTML = `<p>${data.error}</p>`;
                return;
            }
            
            if (data.length === 0) {
                menuItemsContainer.innerHTML = '<p>No hay productos en esta categoría aún.</p>';
                return;
            }

            renderMenuItems(data);
        })
        .catch(error => {
            console.error('Error fetching menu:', error);
            menuItemsContainer.innerHTML = '<p>Error al cargar el menú. Por favor intenta luego.</p>';
        });
}

function renderMenuItems(items) {
    menuItemsContainer.innerHTML = '';
    
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'menu-item';
        
        // Placeholder en caso de que no haya imagen configurada
        const imgSrc = item.image_url ? item.image_url : 'https://via.placeholder.com/200x150/ff4081/ffffff?text=Slush+Vibes';

        itemElement.innerHTML = `
            <img src="${imgSrc}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/200x150/ff4081/ffffff?text=Slush+Vibes'">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <div class="price">$${item.price}</div>
        `;
        menuItemsContainer.appendChild(itemElement);
    });
}

function closeMenu() {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300); // Esperar que termine la transición
}

// Cerrar modal al hacer clic fuera de su contenido
window.onclick = function(event) {
    if (event.target === modal) {
        closeMenu();
    }
}
