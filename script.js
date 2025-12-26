  
    // Load extra services from localStorage and append as cards
    const servicesContainer = document.getElementById('servicesContainer');

    function createServiceCard(service) {
        const card = document.createElement('div');
        card.className = 'service-card';

        card.innerHTML = `
            <div class="service-icon ${service.category || ''}">🏙️</div>
            <div class="service-content">
                <h2>${service.name}</h2>
                <span class="badge">${service.category || 'general'}</span>
                <p class="service-desc">${service.description}</p>
                <p class="service-line">📍 ${service.location}</p>
                <p class="service-line">📞 ${service.phone}</p>
                <p class="service-status">
                    <span class="dot ${service.status === 'inactive' ? 'red' : 'green'}"></span>
                    Status: ${service.status}
                </p>
            </div>
        `;
        return card;
    }

    function loadStoredServices() {
        const stored = localStorage.getItem('services');
        if (!stored) return;
        const services = JSON.parse(stored);
        services.forEach(s => {
            const card = createServiceCard(s);
            servicesContainer.appendChild(card);
        });
    }

    loadStoredServices();


    
    const form = document.getElementById('serviceForm');
    const msg = document.getElementById('msg');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const service = {
            name: document.getElementById('name').value.trim(),
            category: document.getElementById('category').value.trim(),
            description: document.getElementById('description').value.trim(),
            location: document.getElementById('location').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            status: document.getElementById('status').value
        };

        if (!service.name || !service.description || !service.location || !service.phone) {
            msg.textContent = 'Please fill all required fields.';
            msg.style.color = '#e53935';
            return;
        }

        const stored = localStorage.getItem('services');
        let services = stored ? JSON.parse(stored) : [];
        services.push(service);
        localStorage.setItem('services', JSON.stringify(services));

        msg.textContent = 'Service added. Go to Services page to see it.';
        msg.style.color = '#1fbf48';
        form.reset();
    });