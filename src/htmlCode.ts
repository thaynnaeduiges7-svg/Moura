export const vanillaHtmlCode = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Moura Burguer - Hamburgueria Artesanal</title>
    <style>
        /* ==========================================================================
           RESET & ESTILOS BASE 
           ========================================================================== */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
        }

        :root {
            --bg-color: #0d0d0e;
            --bg-card: #161619;
            --text-primary: #f3f4f6;
            --text-secondary: #9ca3af;
            --color-primary: #ea580c; /* Coral Orange */
            --color-primary-hover: #c2410c;
            --color-accent: #f97316;
            --color-whatsapp: #25d366;
            --shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-primary);
            line-height: 1.6;
            overflow-x: hidden;
        }

        a {
            text-decoration: none;
            color: inherit;
        }

        ul {
            list-style: none;
        }

        img {
            max-width: 100%;
            height: auto;
            display: block;
        }

        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 24px;
        }

        /* ==========================================================================
           BOTÕES E COMPONENTES GERAIS
           ========================================================================== */
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 12px 28px;
            border-radius: 9999px;
            font-weight: 600;
            font-size: 0.95rem;
            cursor: pointer;
            transition: var(--transition);
            border: none;
            gap: 8px;
        }

        .btn-primary {
            background-color: var(--color-primary);
            color: white;
            box-shadow: 0 4px 14px rgba(234, 88, 12, 0.3);
        }

        .btn-primary:hover {
            background-color: var(--color-primary-hover);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(234, 88, 12, 0.45);
        }

        .btn-outline {
            background-color: transparent;
            color: var(--text-primary);
            border: 2px solid #374151;
        }

        .btn-outline:hover {
            border-color: var(--text-primary);
            background-color: rgba(255, 255, 255, 0.05);
            transform: translateY(-2px);
        }

        .section-title {
            text-align: center;
            margin-bottom: 48px;
        }

        .section-title h2 {
            font-size: 2.25rem;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 12px;
            letter-spacing: -0.025em;
        }

        .section-title h2 span {
            color: var(--color-primary);
        }

        .section-title p {
            color: var(--text-secondary);
            font-size: 1.1rem;
            max-width: 600px;
            margin: 0 auto;
        }

        /* ==========================================================================
           HEADER OUTLINE
           ========================================================================== */
        header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
            background: rgba(13, 13, 14, 0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.04);
            transition: var(--transition);
        }

        header.scrolled {
            padding: 12px 0;
            box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        }

        .header-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 80px;
            transition: var(--transition);
        }

        header.scrolled .header-content {
            height: 64px;
        }

        /* Logo styling */
        .logo {
            font-size: 1.5rem;
            font-weight: 800;
            color: white;
            display: flex;
            align-items: center;
            gap: 8px;
            letter-spacing: -0.05em;
        }

        .logo span {
            color: var(--color-primary);
        }

        .nav-links {
            display: flex;
            align-items: center;
            gap: 32px;
        }

        .nav-link {
            font-weight: 500;
            font-size: 0.95rem;
            color: var(--text-secondary);
            transition: var(--transition);
            position: relative;
            padding: 8px 0;
        }

        .nav-link:hover, .nav-link.active {
            color: white;
        }

        .nav-link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background-color: var(--color-primary);
            transition: var(--transition);
        }

        .nav-link:hover::after, .nav-link.active::after {
            width: 100%;
        }

        /* Menu Hamburguer Mobile */
        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 4px;
        }

        /* ==========================================================================
           HERO SECTION
           ========================================================================== */
        .hero {
            padding-top: 160px;
            padding-bottom: 96px;
            min-height: 90vh;
            display: flex;
            align-items: center;
            position: relative;
            background: radial-gradient(circle at 10% 20%, rgba(234, 88, 12, 0.08) 0%, transparent 45%);
        }

        .hero-grid {
            display: grid;
            grid-template-columns: 1.1fr 0.9fr;
            gap: 48px;
            align-items: center;
        }

        .hero-content h1 {
            font-size: 3.5rem;
            font-weight: 800;
            line-height: 1.15;
            color: white;
            margin-bottom: 24px;
            letter-spacing: -0.025em;
        }

        .hero-content h1 span {
            color: var(--color-primary);
        }

        .hero-content p {
            font-size: 1.15rem;
            color: var(--text-secondary);
            margin-bottom: 36px;
            max-width: 540px;
        }

        .hero-actions {
            display: flex;
            gap: 16px;
            align-items: center;
        }

        .hero-image-wrapper {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .hero-img {
            max-width: 100%;
            height: auto;
            border-radius: 24px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.04);
            transform: rotate(-1deg);
            transition: var(--transition);
        }

        .hero-img:hover {
            transform: rotate(0deg) scale(1.02);
        }

        .hero-badge {
            position: absolute;
            background: rgba(22, 22, 25, 0.9);
            border: 1px solid rgba(255,255,255,0.08);
            backdrop-filter: blur(8px);
            padding: 12px 20px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            gap: 12px;
            box-shadow: var(--shadow);
            animation: float 4s ease-in-out infinite;
        }

        .hero-badge-1 {
            top: 10%;
            left: -5%;
        }

        .hero-badge-2 {
            bottom: 10%;
            right: -2%;
            animation-delay: 2s;
        }

        .badge-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: rgba(234, 88, 12, 0.15);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--color-primary);
            font-weight: bold;
        }

        .hero-badge p {
            font-size: 0.85rem;
            color: var(--text-secondary);
            margin: 0;
            line-height: 1.2;
        }

        .hero-badge h4 {
            font-size: 0.95rem;
            color: white;
            font-weight: 700;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        /* ==========================================================================
           MENU/DESTAQUES
           ========================================================================== */
        .menu-section {
            padding: 96px 0;
            background-color: rgba(22, 22, 25, 0.3);
        }

        .menu-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 32px;
        }

        .menu-card {
            background-color: var(--bg-card);
            border-radius: 20px;
            border: 1px solid rgba(255,255,255,0.03);
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            transition: var(--transition);
        }

        .menu-card:hover {
            transform: translateY(-8px);
            border-color: rgba(234, 88, 12, 0.2);
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
        }

        .menu-img-container {
            height: 200px;
            overflow: hidden;
            position: relative;
        }

        .menu-card-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: var(--transition);
        }

        .menu-card:hover .menu-card-img {
            transform: scale(1.08);
        }

        .menu-category {
            position: absolute;
            top: 16px;
            left: 16px;
            background: var(--color-primary);
            color: white;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            padding: 6px 12px;
            border-radius: 9999px;
            letter-spacing: 0.05em;
        }

        .menu-info {
            padding: 24px;
        }

        .menu-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: white;
            margin-bottom: 8px;
        }

        .menu-desc {
            font-size: 0.88rem;
            color: var(--text-secondary);
            margin-bottom: 20px;
            height: 44px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }

        .menu-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid rgba(255,255,255,0.05);
            padding-top: 16px;
        }

        .menu-price {
            font-size: 1.35rem;
            font-weight: 800;
            color: white;
        }

        .menu-price span {
            color: var(--color-primary);
            font-size: 1.1rem;
            font-weight: 600;
        }

        .menu-order-btn {
            background-color: rgba(255, 255, 255, 0.05);
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: var(--transition);
        }

        .menu-order-btn:hover {
            background-color: var(--color-primary);
            color: white;
            transform: scale(1.1);
        }

        /* ==========================================================================
           SOBRE NOS
           ========================================================================== */
        .sobre-section {
            padding: 96px 0;
            position: relative;
        }

        .sobre-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 64px;
            align-items: center;
        }

        .sobre-collage {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
        }

        .collage-img {
            border-radius: 16px;
            box-shadow: var(--shadow);
            border: 1px solid rgba(255,255,255,0.04);
            transition: var(--transition);
        }

        .collage-img-tall {
            grid-row: span 2;
            align-self: center;
        }

        .collage-img:hover {
            transform: scale(1.03);
        }

        .sobre-content h4 {
            color: var(--color-primary);
            text-transform: uppercase;
            font-size: 0.85rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            margin-bottom: 12px;
        }

        .sobre-content h3 {
            font-size: 2.25rem;
            font-weight: 800;
            line-height: 1.2;
            color: white;
            margin-bottom: 24px;
        }

        .sobre-content p {
            color: var(--text-secondary);
            margin-bottom: 24px;
        }

        .sobre-features {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-top: 32px;
        }

        .feature-item {
            display: flex;
            align-items: flex-start;
            gap: 12px;
        }

        .feature-icon-wrapper {
            background-color: rgba(234, 88, 12, 0.1);
            color: var(--color-primary);
            width: 32px;
            height: 32px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            margin-top: 2px;
        }

        .feature-info h5 {
            font-size: 1rem;
            font-weight: 600;
            color: white;
            margin-bottom: 4px;
        }

        .feature-info p {
            font-size: 0.85rem;
            color: var(--text-secondary);
            margin: 0;
        }

        /* ==========================================================================
           DEPOIMENTOS 
           ========================================================================== */
        .reviews-section {
            padding: 96px 0;
            background-color: rgba(13, 13, 14, 0.5);
        }

        .reviews-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 32px;
            margin-top: 16px;
        }

        .review-card {
            background-color: var(--bg-card);
            border-radius: 20px;
            padding: 32px;
            border: 1px solid rgba(255,255,255,0.03);
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .review-rating {
            color: #fbbf24; /* Star gold */
            display: flex;
            gap: 4px;
            margin-bottom: 16px;
        }

        .review-text {
            font-style: italic;
            color: var(--text-primary);
            font-size: 0.95rem;
            margin-bottom: 24px;
            line-height: 1.6;
            flex-grow: 1;
        }

        .review-author {
            display: flex;
            align-items: center;
            gap: 12px;
            border-top: 1px solid rgba(255,255,255,0.05);
            padding-top: 16px;
        }

        .author-avatar {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            object-fit: cover;
        }

        .author-info h5 {
            font-size: 0.95rem;
            font-weight: 600;
            color: white;
        }

        .author-info p {
            font-size: 0.75rem;
            color: var(--text-secondary);
            margin: 0;
        }

        /* ==========================================================================
           FOOTER / CONTATO
           ========================================================================== */
        footer {
            background-color: #09090a;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            padding-top: 80px;
            padding-bottom: 40px;
        }

        .footer-grid {
            display: grid;
            grid-template-columns: 1.5fr 1fr 1.2fr;
            gap: 64px;
            margin-bottom: 64px;
        }

        .footer-brand .logo {
            font-size: 1.75rem;
            margin-bottom: 20px;
        }

        .footer-brand p {
            color: var(--text-secondary);
            font-size: 0.95rem;
            margin-bottom: 24px;
            max-width: 320px;
        }

        .social-icons {
            display: flex;
            gap: 16px;
        }

        .social-btn {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.05);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text-secondary);
            transition: var(--transition);
        }

        .social-btn:hover {
            background-color: var(--color-primary);
            color: white;
            transform: translateY(-3px);
            border-color: var(--color-primary);
        }

        .footer-title {
            font-size: 1.15rem;
            font-weight: 700;
            color: white;
            margin-bottom: 24px;
            position: relative;
        }

        .footer-title::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 0;
            width: 40px;
            height: 2px;
            background-color: var(--color-primary);
        }

        .footer-hours-list li {
            display: flex;
            justify-content: space-between;
            font-size: 0.9rem;
            color: var(--text-secondary);
            margin-bottom: 12px;
            border-bottom: 1px dashed rgba(255,255,255,0.05);
            padding-bottom: 8px;
        }

        .footer-hours-list span.day {
            color: white;
            font-weight: 500;
        }

        .footer-contact-list li {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            font-size: 0.9rem;
            color: var(--text-secondary);
            margin-bottom: 16px;
        }

        .contact-icon {
            color: var(--color-primary);
            flex-shrink: 0;
            margin-top: 3px;
        }

        .footer-bottom {
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            padding-top: 32px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 20px;
        }

        .footer-bottom p {
            font-size: 0.85rem;
            color: var(--text-secondary);
        }

        /* ==========================================================================
           BOTÃO FLOATING WHATSAPP
           ========================================================================== */
        .whatsapp-float {
            position: fixed;
            bottom: 32px;
            right: 32px;
            background-color: var(--color-whatsapp);
            color: white;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 8px 30px rgba(37, 211, 102, 0.4);
            cursor: pointer;
            z-index: 999;
            transition: var(--transition);
            animation: pulse-whatsapp 2s infinite;
        }

        .whatsapp-float:hover {
            transform: scale(1.1) translateY(-4px);
            box-shadow: 0 12px 40px rgba(37, 211, 102, 0.6);
        }

        .whatsapp-float svg {
            width: 32px;
            height: 32px;
            fill: currentColor;
        }

        .whatsapp-tooltip {
            position: absolute;
            right: 80px;
            background-color: rgba(22, 22, 25, 0.95);
            border: 1px solid rgba(255, 255, 255, 0.08);
            color: white;
            padding: 10px 16px;
            border-radius: 12px;
            font-size: 0.85rem;
            font-weight: 500;
            white-space: nowrap;
            box-shadow: var(--shadow);
            opacity: 0;
            visibility: hidden;
            transform: translateX(10px);
            transition: var(--transition);
        }

        .whatsapp-float:hover .whatsapp-tooltip {
            opacity: 1;
            visibility: visible;
            transform: translateX(0);
        }

        @keyframes pulse-whatsapp {
            0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5); }
            70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
            100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }

        /* ==========================================================================
           RESPONSIVIDADE (MEDIA QUERIES)
           ========================================================================== */
        @media (max-width: 968px) {
            .hero-grid {
                grid-template-columns: 1fr;
                gap: 56px;
                text-align: center;
            }

            .hero-content h1 {
                font-size: 2.75rem;
            }

            .hero-content p {
                margin: 0 auto 36px;
            }

            .hero-actions {
                justify-content: center;
            }

            .hero-image-wrapper {
                max-width: 450px;
                margin: 0 auto;
            }

            .sobre-grid {
                grid-template-columns: 1fr;
                gap: 48px;
            }

            .sobre-collage {
                order: 2;
                max-width: 500px;
                margin: 0 auto;
            }

            .footer-grid {
                grid-template-columns: 1fr;
                gap: 40px;
            }
        }

        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block;
            }

            .nav-links {
                position: fixed;
                top: 80px;
                left: -100%;
                width: 100%;
                height: calc(100vh - 80px);
                background-color: var(--bg-color);
                flex-direction: column;
                justify-content: center;
                gap: 40px;
                z-index: 998;
                transition: var(--transition);
            }

            header.scrolled .nav-links {
                top: 64px;
                height: calc(100vh - 64px);
            }

            .nav-links.active {
                left: 0;
            }

            .nav-link {
                font-size: 1.25rem;
            }

            .header-info-btn {
                display: none; /* Hide top CTA to avoid squeeze */
            }

            .whatsapp-float {
                bottom: 24px;
                right: 24px;
                width: 50px;
                height: 50px;
            }

            .whatsapp-tooltip {
                display: none; /* Hide on mobile to avoid overlap */
            }
        }
    </style>
</head>
<body>

    <!-- ==========================================================================
         HEADER / NAVEGAÇÃO
         ========================================================================== -->
    <header id="header">
        <div class="container header-content">
            <a href="#inicio" class="logo">
                Moura <span>Burguer</span>
            </a>

            <nav>
                <ul class="nav-links" id="nav-links">
                    <li><a href="#inicio" class="nav-link active">Início</a></li>
                    <li><a href="#menu" class="nav-link">Menu</a></li>
                    <li><a href="#sobre" class="nav-link">Sobre Nós</a></li>
                    <li><a href="#contato" class="nav-link">Contato</a></li>
                </ul>
            </nav>

            <div style="display: flex; align-items: center; gap: 16px;">
                <a href="#menu" class="btn btn-primary header-info-btn" style="padding: 10px 20px; font-size: 0.88rem;">
                    Pedir Agora
                </a>
                <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Abrir Menu">
                    <!-- Hamburger icon -->
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="4" y1="12" x2="20" y2="12"></line>
                        <line x1="4" y1="6" x2="20" y2="6"></line>
                        <line x1="4" y1="18" x2="20" y2="18"></line>
                    </svg>
                </button>
            </div>
        </div>
    </header>

    <!-- ==========================================================================
         SEÇÃO HERO (PRINCIPAL)
         ========================================================================== -->
    <section class="hero" id="inicio">
        <div class="container hero-grid">
            <div class="hero-content">
                <h1>O Hambúrguer <br>Artesanal <span>Perfeito</span></h1>
                <p>Ingredientes sempre frescos, blends suculentos de 150g assados na grelha e um pão brioche selado na manteiga extremamente macio. Feito com amor para toda a família e amigos.</p>
                <div class="hero-actions">
                    <a href="#menu" class="btn btn-primary">
                        Ver Cardápio
                    </a>
                    <a href="#sobre" class="btn btn-outline">
                        Conhecer História
                    </a>
                </div>
            </div>
            <div class="hero-image-wrapper">
                <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop" 
                     alt="Hambúrguer artesanal Moura Burguer com queijo derretido e gergelim" 
                     class="hero-img" 
                     referrerpolicy="no-referrer">
                
                <div class="hero-badge hero-badge-1">
                    <div class="badge-icon">✓</div>
                    <div>
                        <h4>Blend 100% Angus</h4>
                        <p>Moído diariamente</p>
                    </div>
                </div>

                <div class="hero-badge hero-badge-2">
                    <div class="badge-icon">❤</div>
                    <div>
                        <h4>Espaço Familiar</h4>
                        <p>Para todas as idades</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ==========================================================================
         SEÇÃO MENU / DESTAQUES
         ========================================================================== -->
    <section class="menu-section" id="menu">
        <div class="container">
            <div class="section-title">
                <h2>Nosso Cardápio De <span>Destaques</span></h2>
                <p>Nossos hambúrgueres mais cobiçados, preparados com blends selecionados e combinados com queijos nobres e molhos especiais.</p>
            </div>

            <div class="menu-grid">
                <!-- Hambúrguer 1 -->
                <article class="menu-card">
                    <div class="menu-img-container">
                        <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=500&auto=format&fit=crop" 
                             alt="Moura Classic Burger" 
                             class="menu-card-img"
                             referrerpolicy="no-referrer">
                        <span class="menu-category">Mais Vendido</span>
                    </div>
                    <div class="menu-info">
                        <h3 class="menu-title">Moura Classic</h3>
                        <p class="menu-desc">Blend Angus de 150g, queijo cheddar bem derretido, alface crespa, tomate fresco, cebola roxa e nossa lendária maionese artesanal no pão brioche selado.</p>
                        <div class="menu-footer">
                            <span class="menu-price"><span>R$</span> 28,90</span>
                            <button class="menu-order-btn" onclick="simularPedido('Moura Classic')" aria-label="Adicionar Moura Classic">
                                ➔
                            </button>
                        </div>
                    </div>
                </article>

                <!-- Hambúrguer 2 -->
                <article class="menu-card">
                    <div class="menu-img-container">
                        <img src="https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=500&auto=format&fit=crop" 
                             alt="Moura Double Bacon Burger" 
                             class="menu-card-img"
                             referrerpolicy="no-referrer">
                        <span class="menu-category">Gourmet</span>
                    </div>
                    <div class="menu-info">
                        <h3 class="menu-title">Moura Double Bacon</h3>
                        <p class="menu-desc">Dois blends smash angus de 100g, queijo cheddar duplo, muito bacon crocante fatiado e geleia artesanal de bacon defumado no pão australiano.</p>
                        <div class="menu-footer">
                            <span class="menu-price"><span>R$</span> 38,90</span>
                            <button class="menu-order-btn" onclick="simularPedido('Moura Double Bacon')" aria-label="Adicionar Moura Double Bacon">
                                ➔
                            </button>
                        </div>
                    </div>
                </article>

                <!-- Hambúrguer 3 -->
                <article class="menu-card">
                    <div class="menu-img-container">
                        <img src="https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=500&auto=format&fit=crop" 
                             alt="Moura Trufado Burger" 
                             class="menu-card-img"
                             referrerpolicy="no-referrer">
                        <span class="menu-category">Premium</span>
                    </div>
                    <div class="menu-info">
                        <h3 class="menu-title">Moura Trufado</h3>
                        <p class="menu-desc">Blend Angus 150g, cogumelos shitake salteados no azeite trufado, queijo brie cremoso derretido e rúcula fresca no pão brioche amanteigado.</p>
                        <div class="menu-footer">
                            <span class="menu-price"><span>R$</span> 42,90</span>
                            <button class="menu-order-btn" onclick="simularPedido('Moura Trufado')" aria-label="Adicionar Moura Trufado">
                                ➔
                            </button>
                        </div>
                    </div>
                </article>

                <!-- Hambúrguer 4 (Kids/Combo) -->
                <article class="menu-card">
                    <div class="menu-img-container">
                        <img src="https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?q=80&w=500&auto=format&fit=crop" 
                             alt="Combo Moura Família" 
                             class="menu-card-img"
                             referrerpolicy="no-referrer">
                        <span class="menu-category">Combo</span>
                    </div>
                    <div class="menu-info">
                        <h3 class="menu-title">Moura Combo Kids</h3>
                        <p class="menu-desc">Blend Angus 120g mais suave com queijo prato cremoso, uma batatinha frita fofinha e crocante individual e uma bebida suco ou refri.</p>
                        <div class="menu-footer">
                            <span class="menu-price"><span>R$</span> 34,90</span>
                            <button class="menu-order-btn" onclick="simularPedido('Moura Combo Kids')" aria-label="Adicionar Moura Combo Kids">
                                ➔
                            </button>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </section>

    <!-- ==========================================================================
         SEÇÃO SOBRE NÓS
         ========================================================================== -->
    <section class="sobre-section" id="sobre">
        <div class="container sobre-grid">
            <div class="sobre-collage">
                <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=400&auto=format&fit=crop" 
                     alt="Batatas fritas e hambúrguer Moura" 
                     class="collage-img collage-img-tall"
                     referrerpolicy="no-referrer">
                <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300&auto=format&fit=crop" 
                     alt="Processo de montagem do hambúrguer" 
                     class="collage-img"
                     referrerpolicy="no-referrer">
                <img src="https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?q=80&w=300&auto=format&fit=crop" 
                     alt="Família comendo hambúrguer artesanal" 
                     class="collage-img"
                     referrerpolicy="no-referrer">
            </div>

            <div class="sobre-content">
                <h4>Nossa Origem</h4>
                <h3>Unindo Famílias e Amigos com o Sabor de Verdade</h3>
                <p>O Moura Burguer começou no coração de uma cozinha familiar com uma promessa simples: preparar hambúrgueres honestos, suculentos e que reúnam gerações ao redor da mesa.</p>
                <p>Nossos blends são feitos exclusivamente com cortes selecionados de carne Angus de altíssima procedência. Não utilizamos conservantes ou temperos químicos, realçando o verdadeiro sabor da carne bovina selada na grelha no ponto perfeito para você.</p>
                
                <div class="sobre-features">
                    <div class="feature-item">
                        <div class="feature-icon-wrapper">⭐</div>
                        <div class="feature-info">
                            <h5>Ingredientes Locais</h5>
                            <p>Legumes selecionados de produtores parceiros locais.</p>
                        </div>
                    </div>

                    <div class="feature-item">
                        <div class="feature-icon-wrapper">🔥</div>
                        <div class="feature-info">
                            <h5>Pão Diário Fresco</h5>
                            <p>Assados artesanalmente todas as manhãs em nossa padaria.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ==========================================================================
         SEÇÃO DEPOIMENTOS (PREMIUM & FAMILIAR)
         ========================================================================== -->
    <section class="reviews-section">
        <div class="container">
            <div class="section-title">
                <h2>O que nossos <span>Clientes</span> dizem</h2>
                <p>Não há nada mais gratificante do que ouvir os nossos clientes de todas as origens que consideram o Moura o melhor ponto da cidade.</p>
            </div>

            <div class="reviews-grid">
                <!-- Depoimento 1 -->
                <div class="review-card">
                    <div class="review-rating">★★★★★</div>
                    <p class="review-text">"Espaço incrivelmente acolhedor! Levamos nossas filhas e fomos muito bem atendidos. O hambúrguer Kids é incrível e o Moura Classic tem uma maionese de alho que não existe igual."</p>
                    <div class="review-author">
                        <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop" 
                             alt="Mariana Santos" 
                             class="author-avatar"
                             referrerpolicy="no-referrer">
                        <div class="author-info">
                            <h5>Mariana Santos</h5>
                            <p>Mãe e Cliente Assídua</p>
                        </div>
                    </div>
                </div>

                <!-- Depoimento 2 -->
                <div class="review-card">
                    <div class="review-rating">★★★★★</div>
                    <p class="review-text">"Sou apaixonado por hambúrgueres e o Moura Double Bacon é disparado o melhor que já comi. A geleia de bacon é suave e equilibra perfeitamente com a suculência do blend!"</p>
                    <div class="review-author">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" 
                             alt="Pedro Albuquerque" 
                             class="author-avatar"
                             referrerpolicy="no-referrer">
                        <div class="author-info">
                            <h5>Pedro Albuquerque</h5>
                            <p>Sommelier de Burguer</p>
                        </div>
                    </div>
                </div>

                <!-- Depoimento 3 -->
                <div class="review-card">
                    <div class="review-rating">★★★★★</div>
                    <p class="review-text">"Virou nossa parada obrigatória de sábado à noite. O atendimento é rápido, os preços são justos para a qualidade e as fritas rústicas crocantes por fora e macias por dentro são perfeitas!"</p>
                    <div class="review-author">
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" 
                             alt="Gabriela e Lucas" 
                             class="author-avatar"
                             referrerpolicy="no-referrer">
                        <div class="author-info">
                            <h5>Gabriela & Lucas</h5>
                            <p>Casal de Clientes</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ==========================================================================
         FOOTER / CONTATOS & MAPA
         ========================================================================== -->
    <footer id="contato">
        <div class="container footer-grid">
            <div class="footer-brand">
                <a href="#inicio" class="logo">
                    Moura <span>Burguer</span>
                </a>
                <p>Nossa missão é servir sorrisos através de blends suculentos e ingredientes saudáveis. Sabor autêntico para toda a família e amigos.</p>
                <div class="social-icons">
                    <a href="#" class="social-btn" aria-label="Instagram Moura Burguer">IG</a>
                    <a href="#" class="social-btn" aria-label="Facebook Moura Burguer">FB</a>
                    <a href="#" class="social-btn" aria-label="TikTok Moura Burguer">TT</a>
                </div>
            </div>

            <div>
                <h4 class="footer-title">Funcionamento</h4>
                <ul class="footer-hours-list">
                    <li><span class="day">Segunda-feira</span> <span>Fechado</span></li>
                    <li><span class="day">Terça a Quinta</span> <span>18:00 às 23:00</span></li>
                    <li><span class="day">Sexta e Sábado</span> <span>18:00 às 23:59</span></li>
                    <li><span class="day">Domingo</span> <span>18:00 às 23:30</span></li>
                </ul>
            </div>

            <div>
                <h4 class="footer-title">Contato & Endereço</h4>
                <ul class="footer-contact-list">
                    <li>
                        <span class="contact-icon">📍</span>
                        <span>Av. Principal dos Sabores, 1200 - Centro, Cidade Gourmet - SP</span>
                    </li>
                    <li>
                        <span class="contact-icon">📞</span>
                        <span>(11) 98765-4321 / (11) 3456-7890</span>
                    </li>
                    <li>
                        <span class="contact-icon">✉</span>
                        <span>contato@mouraburguer.com.br</span>
                    </li>
                </ul>
            </div>
        </div>

        <div class="container footer-bottom">
            <p>&copy; Moura Burguer 2026. Todos os direitos reservados. Fotos ilustrativas (Unsplash).</p>
            <p>Criado com amor para a Moura Burguer</p>
        </div>
    </footer>

    <!-- ==========================================================================
         BOTÃO INSTANTÂNEO DE PEDIDO WHATSAPP (BOTÃO FLUTUANTE)
         ========================================================================== -->
    <div class="whatsapp-float" onclick="enviarWhatsappDireto()">
        <span class="whatsapp-tooltip">Mande um Olá no WhatsApp! 💬</span>
        <!-- SVG whatsapp logo -->
        <svg viewBox="0 0 448 512">
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
        </svg>
    </div>

    <!-- ==========================================================================
         CÓDIGO JAVASCRIPT VANILLA
         ========================================================================== -->
    <script>
        // 1. Menu Mobile Drawer
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const navLinks = document.getElementById('nav-links');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Fechar menu mobile ao clicar em um link
        const navItemLinks = document.querySelectorAll('.nav-link');
        navItemLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                
                // Mudar link ativo
                navItemLinks.forEach(item => item.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // 2. Mudança suave na Header ao rolar a página
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Mudar link ativo de acordo com a seção atual
            const scrollPos = window.scrollY + 120;
            const sections = ['inicio', 'menu', 'sobre', 'contato'];
            
            sections.forEach(secId => {
                const el = document.getElementById(secId);
                if (el) {
                    if (scrollPos >= el.offsetTop && scrollPos < (el.offsetTop + el.offsetHeight)) {
                        navItemLinks.forEach(item => {
                            item.classList.remove('active');
                            if (item.getAttribute('href') === \`#\${secId}\`) {
                                item.classList.add('active');
                            }
                        });
                    }
                }
            });
        });

        // 3. Simular pedido a partir do cardápio direcionando ao WhatsApp
        function simularPedido(burgerName) {
            const numeroTel = "5511987654321"; // Número fictício do Moura Burguer
            const mensagem = encodeURIComponent(\`Olá, Moura Burguer! Gostaria de pedir o delicioso hambúrguer artesanal: *\\"\${burgerName}\\"* preparado no ponto perfeito. Qual o tempo de espera aproximado?\`);
            const urlCompleta = \`https://api.whatsapp.com/send?phone=\${numeroTel}&text=\${mensagem}\`;
            
            alert(\`Você decolou no sabor do Moura Burguer! Pedido Simulando o redirecionamento ao WhatsApp para encomendar o: \${burgerName}. Redirecionando em instantes!\`);
            window.open(urlCompleta, '_blank');
        }

        // 4. Botão Geral "Falar Conosco" do WhatsApp Flutuante
        function enviarWhatsappDireto() {
            const numeroTel = "5511987654321"; // Número fictício do Moura Burguer
            const mensagem = encodeURIComponent("Olá, Moura Burguer! Gostaria de ver o cardápio e receber as novidades do dia de vocês. Pode me passar mais informações?");
            const urlCompleta = \`https://api.whatsapp.com/send?phone=\${numeroTel}&text=\${mensagem}\`;
            
            window.open(urlCompleta, '_blank');
        }
    </script>
</body>
</html>
`;
