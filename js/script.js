document.addEventListener('DOMContentLoaded', function() {
    // Projects data structure
    const projectFolders = [
        { name: 'Habitação SP', folder: 'habitacao_sp' },
        { name: 'Projeto Zumba', folder: 'projeto_zumba' },
        { name: 'Projeto Cabeleireiro e Manicure', folder: 'Projeto_Cabeleireiro _manicure_Ministério_do_Trabalho_SP' },
        { name: 'Projeto Yoga', folder: 'projeto_yoga' },
        { name: 'Páscoa Solidária', folder: 'pascoa_solidaria' },
        { name: 'Projeto Vozes Renascidas', folder: 'projeto_vozes_renacidas' },
        { name: 'Projeto Caça Fome', folder: 'projeto_caca_fome' },
        { name: 'Viva Leite e Alongamento para Idosos', folder: 'viva_leite_projeto_alongamento_para_idosos' },
        { name: 'Cestas Básicas - Cidade Solidária SP', folder: 'cestas_basicas_projeto_cidade_solidaria_sp' },
        { name: 'Atendimento Psicológico', folder: 'atendimento_psico_parceria_anhanguera' },
        { name: 'Capoeira', folder: 'capoeira' },
        { name: 'Natal Solidário', folder: 'natal_solidario' },
        { name: 'Ação Social - Violência e Feminicídio', folder: 'acao_social_violencia_feminicidio' },
        { name: 'Mulheres Gerando Falcões', folder: 'mulheres_gerando_falcoes' },
        { name: 'Futebol para Crianças', folder: 'futbol_criancas' },
        { name: 'Ação Cidadania', folder: 'acao_cidadania' },
        { name: 'Programa Habitação', folder: 'programa_habitacao' },
        { name: 'Passeio com Crianças', folder: 'passeio_criancas' }
    ];

    // Initialize elements
    const projectsGallery = document.getElementById('projectsGallery');
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    let scrollTimer = null;

    // Function to handle scroll events
    function handleScroll() {
        const scrollY = window.pageYOffset;
        
        // Clear the previous timer
        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
        }

        // Add/remove scrolled class with debounce
        scrollTimer = setTimeout(() => {
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, 100);

        // Update active nav item
        let foundActive = false;
        sections.forEach((section, idx) => {
            const sectionTop = section.offsetTop - 120; // ajuste conforme altura da navbar
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (
                (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) ||
                (idx === sections.length - 1 && (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2)
            ) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
                foundActive = true;
            }
        });
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Smooth scrolling for navigation links
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Function to get all images from a project folder
    async function getProjectImages(folder) {
        try {
            const response = await fetch(`/list-images?folder=${folder}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const images = await response.json();
            return images;
        } catch (error) {
            console.error('Error loading images:', error);
            return [];
        }
    }

    // Function to create project card
    function createProjectCard(project, firstImage) {
        const card = document.createElement('div');
        card.className = 'project-card fade-in';
        card.innerHTML = `
            <img src="assets/imgs/${project.folder}/${firstImage}" 
                 alt="${project.name}" 
                 loading="lazy"
                 onerror="this.onerror=null; this.src='assets/imgs/passaro.png'; this.classList.add('fallback-image')">
            <div class="card-body">
                <h5 class="card-title">${project.name}</h5>
                <p class="card-text">Clique para ver mais fotos</p>
            </div>
        `;
        card.addEventListener('click', () => openGallery(project.folder, project.name));
        return card;
    }

    // Load all projects
    async function loadProjects() {
        // Add loading spinner
        projectsGallery.innerHTML = '<div class="loading-spinner"></div>';
        
        try {
            const loadedProjects = [];
            for (const project of projectFolders) {
                try {
                    const images = await getProjectImages(project.folder);
                    if (images.length > 0) {
                        loadedProjects.push({ project, firstImage: images[0] });
                    }
                } catch (error) {
                    console.error(`Error loading project ${project.name}:`, error);
                }
            }

            // Clear loading spinner
            projectsGallery.innerHTML = '';
            
            // Add all projects at once
            loadedProjects.forEach(({ project, firstImage }, index) => {
                const card = createProjectCard(project, firstImage);
                projectsGallery.appendChild(card);
                
                // Add fade-in animation with staggered delay
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 100);
            });
        } catch (error) {
            console.error('Error loading projects:', error);
            projectsGallery.innerHTML = '<div class="alert alert-danger">Erro ao carregar projetos. Por favor, tente novamente mais tarde.</div>';
        }
    }

    // Start loading projects
    loadProjects();

    // Initialize Bootstrap modal
    const galleryModal = new bootstrap.Modal(document.getElementById('galleryModal'));

    // Function to open gallery
    window.openGallery = async function(folderName, projectName) {
        try {
            // Update modal title
            document.querySelector('.modal-title').textContent = projectName;

            // Clear existing carousel items and thumbnails
            const carouselInner = document.querySelector('.carousel-inner');
            const thumbnailsContainer = document.getElementById('galleryThumbnails');
            const documentsContainer = document.getElementById('projectDocuments');
            carouselInner.innerHTML = '<div class="modal-loading"></div>';
            thumbnailsContainer.innerHTML = '';
            documentsContainer.innerHTML = '';

            // Show modal immediately with loading state
            galleryModal.show();

            // Load all images from the project folder
            const images = await getProjectImages(folderName);

            if (images.length === 0) {
                carouselInner.innerHTML = '<div class="carousel-item active"><p class="text-center">Nenhuma imagem encontrada</p></div>';
                return;
            }

            // Clear loading state
            carouselInner.innerHTML = '';

            // Create carousel items and thumbnails
            images.forEach((image, index) => {
                if (!image.toLowerCase().endsWith('.pdf')) {
                    // Create carousel item
                    const carouselItem = document.createElement('div');
                    carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
                    carouselItem.innerHTML = `
                        <img src="assets/imgs/${folderName}/${image}" 
                             class="d-block w-100" 
                             alt="Foto ${index + 1}"
                             loading="${index === 0 ? 'eager' : 'lazy'}">
                    `;
                    carouselInner.appendChild(carouselItem);

                    // Create thumbnail
                    const thumbnail = document.createElement('div');
                    thumbnail.className = `thumbnail-item ${index === 0 ? 'active' : ''}`;
                    thumbnail.innerHTML = `
                        <img src="assets/imgs/${folderName}/${image}" 
                             alt="Thumbnail ${index + 1}"
                             loading="lazy">
                    `;
                    thumbnail.onclick = () => {
                        document.querySelectorAll('.carousel-item').forEach(item => item.classList.remove('active'));
                        document.querySelectorAll('.thumbnail-item').forEach(thumb => thumb.classList.remove('active'));
                        carouselInner.children[index].classList.add('active');
                        thumbnail.classList.add('active');
                    };
                    thumbnailsContainer.appendChild(thumbnail);
                }
            });

            // Add PDF documents for Projeto Vozes Renascidas
            if (folderName === 'projeto_vozes_renacidas') {
                documentsContainer.innerHTML = `
                    <h6 class="text-center mb-3">Documentos do Projeto</h6>
                    <div class="d-flex justify-content-center flex-wrap">
                        <a href="assets/imgs/${folderName}/Termo de Fomento.pdf" class="document-link" target="_blank">
                            <i class="fas fa-file-pdf"></i>
                            Termo de Fomento
                        </a>
                        <a href="assets/imgs/${folderName}/Plano de Trabalho.pdf" class="document-link" target="_blank">
                            <i class="fas fa-file-pdf"></i>
                            Plano de Trabalho
                        </a>
                    </div>
                `;
            }
           
            


        } catch (error) {
            console.error('Error loading gallery:', error);
            carouselInner.innerHTML = '<div class="alert alert-danger m-3">Erro ao carregar imagens. Por favor, tente novamente mais tarde.</div>';
        }
    };

    // Handle mobile navigation menu
    document.querySelector('.navbar-toggler').addEventListener('click', function() {
        document.querySelector('.navbar-collapse').classList.toggle('show');
    });
}); 