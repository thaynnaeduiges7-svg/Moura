import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  ShoppingBag, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash, 
  Send, 
  Phone, 
  MapPin, 
  Clock, 
  Instagram, 
  Facebook, 
  Menu, 
  X, 
  ArrowRight, 
  Star, 
  Heart, 
  Award, 
  Copy, 
  Check, 
  ExternalLink, 
  Code, 
  Utensils 
} from "lucide-react";
import { vanillaHtmlCode } from "./htmlCode";

// Interface para os Itens do Cardápio
interface ItemCardapio {
  id: string;
  name: string;
  category: "burguers" | "acompanhamentos" | "bebidas";
  desc: string;
  price: number;
  image: string;
  badge?: string;
  ingredients: string[];
}

const MENU_ITEMS: ItemCardapio[] = [
  {
    id: "moura-classic",
    name: "Moura Classic",
    category: "burguers",
    desc: "Blend Angus Premium de 150g assado na brasa, queijo cheddar bem derretido, maionese artesanal da casa, alface crespa orgânica, rodelas de tomate fresco e cebola roxa no pão brioche selado.",
    price: 28.90,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=500&auto=format&fit=crop",
    badge: "Mais Vendido",
    ingredients: ["150g Blend Angus", "Queijo Cheddar", "Maionese Artesanal", "Alface e Tomate", "Pão Brioche"]
  },
  {
    id: "double-bacon",
    name: "Moura Double Bacon",
    category: "burguers",
    desc: "Para os amantes de bacon: Dois blends smash Angus de 100g cada, duplo queijo cheddar derretido, fatias crocantes de bacon defumado e geleia artesanal de bacon agridoce no pão australiano.",
    price: 38.90,
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=500&auto=format&fit=crop",
    badge: "Favorito da Casa",
    ingredients: ["2x Smash Angus 100g", "Bacon Fatiado", "Queijo Cheddar Duplo", "Geleia de Bacon", "Pão Australiano"]
  },
  {
    id: "moura-trufado",
    name: "Moura Trufado",
    category: "burguers",
    desc: "Sabor sofisticado e marcante. Blend Angus de 150g grelhado, cogumelos shitake salteados no azeite trufado de alta qualidade, queijo brie cremoso derretido e rúcula baby fresca no pão brioche amanteigado.",
    price: 42.90,
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=500&auto=format&fit=crop",
    badge: "Premium Gourmet",
    ingredients: ["150g Blend Angus", "Azeite Trufado", "Cogumelos Shitake", "Queijo Brie Crema", "Pão Brioche"]
  },
  {
    id: "moura-kids",
    name: "Moura Combo Kids",
    category: "burguers",
    desc: "Perfeito para as crianças: um blend especial suave de 120g Angus com queijo prato cremoso no pão brioche de gergelim. Acompanha porção de fritas palito sequinhas e um suco natural orgânico.",
    price: 34.90,
    image: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?q=80&w=500&auto=format&fit=crop",
    badge: "Combo Infantil",
    ingredients: ["120g Blend Clássico", "Queijo Prato", "Fritas Palito", "Suco Natural", "Pão Gergelim"]
  },
  {
    id: "rustica-moura",
    name: "Batata Rústica da Casa",
    category: "acompanhamentos",
    desc: "Deliciosas batatas fritas rústicas cortadas à mão, temperadas com alecrim fresco do jardim e sal marinho grosso. Acompanha nosso pote exclusivo de maionese de alho assado.",
    price: 16.90,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=500&auto=format&fit=crop",
    badge: "Acompanhamento",
    ingredients: ["Batata Frita Rústica", "Alecrim Fresco", "Maionese de Alho Assado", "Flor de Sal"]
  },
  {
    id: "bebida-chopp",
    name: "Chopp Artesanal Moura (500ml)",
    category: "bebidas",
    desc: "Chopp pilsen artesanal super gelado, de produção de microcervejaria local. Refrescante, leve e com colarinho cremoso perfeito para harmonizar com os nossos burguers.",
    price: 14.00,
    image: "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?q=80&w=500&auto=format&fit=crop",
    ingredients: ["Chopp Pilsen", "Puro Malte", "Produção Local", "Gelado na Tulipa"]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // State para o Carrinho de Pedidos
  const [cart, setCart] = useState<{ [itemId: string]: number }>({});
  const [orderType, setOrderType] = useState<"delivery" | "retirada">("delivery");
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cartão de Crédito");
  const [showOrderCheckout, setShowOrderCheckout] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<"all" | "burguers" | "acompanhamentos" | "bebidas">("all");

  // Efeito para fechar o menu mobile ao redimensionar a tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Adicionar ao carrinho
  const addToCart = (id: string) => {
    setCart(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  // Remover do carrinho
  const removeFromCart = (id: string) => {
    setCart(prev => {
      const next = { ...prev };
      if (next[id] <= 1) {
        delete next[id];
      } else {
        next[id] -= 1;
      }
      return next;
    });
  };

  // Limpar carrinho
  const clearCart = () => {
    setCart({});
    setShowOrderCheckout(false);
  };

  const getCartQuantity = (): number => {
    return Object.keys(cart).reduce((a, key) => a + (cart[key] || 0), 0);
  };

  const calculateTotal = (): number => {
    return Object.keys(cart).reduce((sum, id) => {
      const item = MENU_ITEMS.find(i => i.id === id);
      const qty = cart[id] || 0;
      return sum + (item ? item.price * qty : 0);
    }, 0);
  };

  // Enviar pedido simulado para o WhatsApp com base no carrinho real
  const handleSendOrder = () => {
    if (!clientName.trim()) {
      alert("Por favor, informe seu nome para podermos lhe atender!");
      return;
    }
    if (orderType === "delivery" && !clientAddress.trim()) {
      alert("Por favor, preencha o seu endereço de entrega!");
      return;
    }

    const total = calculateTotal();
    const taxaEntrega = orderType === "delivery" ? 7.00 : 0.00;
    
    let mensagem = `*🍔 NOVO PEDIDO - MOURA BURGUER 🍔*\n\n`;
    mensagem += `*Cliente:* ${clientName}\n`;
    mensagem += `*Tipo:* ${orderType === "delivery" ? "🚀 Entrega em Domicílio" : "🛍️ Retirada no Balcão"}\n`;
    if (orderType === "delivery") {
      mensagem += `*Endereço:* ${clientAddress}\n`;
    }
    mensagem += `*Método de Pagamento:* ${paymentMethod}\n\n`;
    mensagem += `*🛒 ITENS REQUISITADOS:*\n`;

    Object.keys(cart).forEach((id) => {
      const item = MENU_ITEMS.find(i => i.id === id);
      const qty = cart[id] || 0;
      if (item && qty > 0) {
        mensagem += `• _${qty}x_ *${item.name}* - R$ ${(item.price * qty).toFixed(2)}\n`;
      }
    });

    mensagem += `\n`;
    if (taxaEntrega > 0) {
      mensagem += `*Taxa de Entrega:* R$ ${taxaEntrega.toFixed(2)}\n`;
    }
    mensagem += `*TOTAL GERAL:* R$ ${(total + taxaEntrega).toFixed(2)}\n\n`;
    mensagem += `_Pedido gerado via Website Interativo Moura Burguer. Aguardando confirmação._`;

    const encodedMsg = encodeURIComponent(mensagem);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=5511987654321&text=${encodedMsg}`;
    
    // Abre em nova janela/aba
    window.open(whatsappUrl, "_blank");
    alert("Incrível! Compilamos o seu pedido. Estamos te redirecionando para o WhatsApp do Moura Burguer agora para finalizar o atendimento.");
    clearCart();
  };

  // Copiar código HTML do dev toggle
  const copyToClipboard = () => {
    navigator.clipboard.writeText(vanillaHtmlCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(err => {
      console.error("Falha ao copiar código: ", err);
    });
  };

  return (
    <div className="min-h-screen bg-[#0d0d0e] text-gray-100 font-sans selection:bg-orange-600 selection:text-white">
      
      {/* DEVELOPER PLAYGROUND PANEL HEADER */}
      <div className="sticky top-0 z-50 bg-[#161619] border-b border-gray-800 px-4 py-2 flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-mono font-medium text-gray-400">
            MOURA BURGUER ARTESANAL • PLAYGROUND UX/UI
          </span>
        </div>
        <div className="flex bg-black p-1 rounded-lg border border-gray-800">
          <button
            id="toggle-preview"
            onClick={() => setActiveTab("preview")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "preview"
                ? "bg-orange-600 text-white shadow"
                : "text-gray-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <Utensils size={14} />
            Website Interativo (Live App)
          </button>
          <button
            id="toggle-code"
            onClick={() => setActiveTab("code")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "code"
                ? "bg-orange-600 text-white shadow"
                : "text-gray-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <Code size={14} />
            Código HTML5 / CSS3 Puro
          </button>
        </div>
      </div>

      {activeTab === "code" ? (
        /* VILA/HTML SOURCE EXPORTER VIEW */
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-[#161619] rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
            <div className="px-6 py-4 bg-[#111113] border-b border-gray-800 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Code className="text-orange-500" size={20} />
                  Código Único Pronto para Produção
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Este arquivo contêm todo a estrutura HTML5, CSS3 responsivo em tag style e JS Vanilla do menu e WhatsApp flutuante. Salve como <code className="text-orange-400">index.html</code> e rode em qualquer lugar!
                </p>
              </div>
              <button
                id="copy-code-btn"
                onClick={copyToClipboard}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copiado para Área de Transferência!" : "Copiar Todo o Código"}
              </button>
            </div>
            
            <div className="p-6 bg-black overflow-x-auto">
              <pre className="text-xs font-mono text-zinc-300 leading-relaxed overflow-x-auto max-h-[600px] scrollbar-thin">
                {vanillaHtmlCode}
              </pre>
            </div>
          </div>
        </div>
      ) : (
        /* LIVE RESTAURANT LANDING PAGE */
        <>
          {/* HEADER & STICKY GLASSMORPHISM NAVBAR */}
          <header className="sticky top-0 z-40 bg-[#0d0d0e]/85 backdrop-blur-md border-b border-white/[0.04]">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
              <a href="#inicio" className="text-2xl font-black text-white tracking-tighter flex items-center gap-1.5">
                Moura <span className="text-orange-500 font-extrabold text-3xl">Burguer</span>
              </a>

              {/* Desktop menu */}
              <nav className="hidden md:flex items-center gap-8">
                <a href="#inicio" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Início</a>
                <a href="#cardapio" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Cardápio</a>
                <a href="#sobre" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Sobre Nós</a>
                <a href="#contato" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Contatos</a>
              </nav>

              <div className="flex items-center gap-4">
                <a 
                  href="#cardapio" 
                  className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-bold text-sm rounded-full transition-all tracking-wide"
                >
                  Pedir Agora
                </a>
                
                {getCartQuantity() > 0 && (
                  <button 
                    onClick={() => setShowOrderCheckout(true)}
                    className="relative cursor-pointer p-2 bg-zinc-800 text-orange-500 hover:text-orange-400 hover:bg-zinc-700 rounded-full transition-colors flex items-center justify-center"
                    aria-label="Ver sacola de compras"
                  >
                    <ShoppingBag size={20} />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-orange-500 text-white font-mono text-xxs font-black flex items-center justify-center animate-bounce">
                      {getCartQuantity()}
                    </span>
                  </button>
                )}

                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 text-gray-300 hover:text-white"
                  aria-label="Toggle Menu"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>

            {/* Mobile Drawer */}
            {isMobileMenuOpen && (
              <div id="mobile-nav" className="md:hidden border-t border-zinc-800 bg-[#0d0d0e] px-6 py-8 flex flex-col gap-6 animate-fade-in absolute w-full left-0 shadow-xl">
                <a 
                  href="#inicio" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-semibold text-gray-300 hover:text-white py-2 border-b border-zinc-900"
                >
                  Início
                </a>
                <a 
                  href="#cardapio" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-semibold text-gray-300 hover:text-white py-2 border-b border-zinc-900"
                >
                  Cardápio
                </a>
                <a 
                  href="#sobre" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-semibold text-gray-300 hover:text-white py-2 border-b border-zinc-900"
                >
                  Sobre Nós
                </a>
                <a 
                  href="#contato" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-semibold text-gray-300 hover:text-white py-2"
                >
                  Contatos
                </a>
                <a 
                  href="#cardapio"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-3 bg-orange-600 text-white font-bold rounded-xl shadow-lg mt-2"
                >
                  Pedir Agora
                </a>
              </div>
            )}
          </header>

          {/* HERO SECTION - CHAVAL DE ACESSO */}
          <section id="inicio" className="relative py-24 md:py-32 overflow-hidden bg-radial from-orange-950/20 via-[#0d0d0e] to-[#0d0d0e]">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-500 text-xs font-bold tracking-wider uppercase mb-6">
                  <Award size={14} /> NOVO MOURA DOUBLE BACON DISPONÍVEL!
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                  O Hamburguer <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                    Artesanal Supremo
                  </span>
                </h1>
                <p className="text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed mb-10">
                  Experimente o autêntico sabor grelhado do Moura Burguer. Nossos hambúrgueres são feitos com blend Angus de 150g assados no ponto perfeito, queijos selecionados derretidos no maçarico e ingredientes 100% livres de aditivos. Uma receita irresistível pensada para agradar jovens, casais e toda a família.
                </p>
                <div className="flex flex-wrap gap-4 w-full sm:w-auto">
                  <a 
                    href="#cardapio" 
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 active:scale-98 text-white font-bold rounded-full shadow-lg hover:shadow-orange-700/20 transition-all text-base"
                  >
                    Montar Meu Pedido <ArrowRight size={18} />
                  </a>
                  <a 
                    href="#sobre" 
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center px-8 py-4 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 text-white font-semibold rounded-full transition-all text-base"
                  >
                    Conhecer História
                  </a>
                </div>

                <div className="mt-12 flex flex-wrap items-center gap-8 border-t border-zinc-900 pt-8 w-full">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                      ★
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">4.9 / 5 no Google</h4>
                      <p className="text-xs text-secondary text-zinc-500">Baseado em +500 reviews</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                      ⏱
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Entrega em até 30 min</h4>
                      <p className="text-xs text-secondary text-zinc-500">Em toda a região central</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Burger Hero Image Container */}
              <div className="lg:col-span-5 relative flex justify-center items-center">
                <div className="relative max-w-md w-full aspect-square">
                  <div className="absolute inset-0 bg-orange-600/10 rounded-full blur-3xl transform scale-110"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop" 
                    alt="Belo Hamburguer Moura Burguer com queijo derretido e sementes de gergelim" 
                    className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl border border-white/[0.05] transform -rotate-2 hover:rotate-0 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-10 -left-6 z-20 bg-zinc-900/90 border border-zinc-800 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3 shadow-xl animate-bounce" style={{ animationDuration: "3s" }}>
                    <div className="w-9 h-9 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold">🍔</div>
                    <div>
                      <h4 className="text-xs font-black text-white">100% Angus Beef</h4>
                      <p className="text-xxs text-zinc-400">Origem controlada</p>
                    </div>
                  </div>

                  <div className="absolute -bottom-6 -right-4 z-20 bg-zinc-900/90 border border-zinc-800 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3 shadow-xl animate-bounce" style={{ animationDuration: "4.5s" }}>
                    <div className="w-9 h-9 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold">❤️</div>
                    <div>
                      <h4 className="text-xs font-black text-white">Ambiente Familiar</h4>
                      <p className="text-xxs text-zinc-400">Feito para se reunir</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* DYNAMIC MENU & CART SYSTEM */}
          <motion.section 
            id="cardapio" 
            className="py-24 bg-[#121214]"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-xs font-black text-orange-500 uppercase tracking-widest block mb-3">CONSTRUÇÃO PREMIUM</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Nosso Incrível Cardápio de <span className="text-orange-500">Destaques</span>
                </h2>
                <div className="w-16 h-1 bg-orange-500 mx-auto my-6 rounded-full"></div>
                <p className="text-gray-400 font-medium">
                  Clique no botão de adicionar para montar seu pedido em tempo real. Veja sua conta atualizada no rodapé e compartilhe de forma direta seu carrinho no WhatsApp!
                </p>
              </div>

              {/* Category selector */}
              <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
                {[
                  { id: "all", label: "🍔 Todos" },
                  { id: "burguers", label: "✨ Burguers" },
                  { id: "acompanhamentos", label: "🍟 Acompanhamentos" },
                  { id: "bebidas", label: "🥤 Bebidas" }
                ].map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id as any)}
                      className={`relative px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 pointer-events-auto cursor-pointer border overflow-hidden ${
                        isActive
                          ? "text-white border-orange-500/30 shadow-lg shadow-orange-600/10 scale-105"
                          : "bg-zinc-900/40 text-zinc-400 border-zinc-800/80 hover:text-gray-100 hover:border-zinc-700 hover:bg-zinc-850"
                      }`}
                    >
                      <span className="relative z-10">{cat.label}</span>
                      {isActive && (
                        <motion.span
                          layoutId="activeCategoryIndicator"
                          className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Grid of items */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {MENU_ITEMS.filter(item => selectedCategory === "all" || item.category === selectedCategory).map((item) => {
                  const itemInCart = cart[item.id] || 0;
                  return (
                    <motion.article 
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      id={`item-${item.id}`} 
                      key={item.id} 
                      className="relative bg-[#1a1a1e] rounded-2xl overflow-hidden border border-zinc-800/80 hover:border-orange-500/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative h-56 overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                          {item.badge && (
                            <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 bg-orange-600 text-white rounded-full uppercase tracking-wider shadow">
                              {item.badge}
                            </span>
                          )}
                          <span className="absolute bottom-4 right-4 text-base font-black px-3 py-1 bg-zinc-950/90 text-white rounded-md border border-zinc-800">
                            R$ {item.price.toFixed(2)}
                          </span>
                        </div>

                        <div className="p-6">
                          <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
                          <p className="text-xs text-gray-400 leading-relaxed mb-4 min-h-[50px]">{item.desc}</p>
                          
                          <div className="flex flex-wrap gap-1 mb-5">
                            {item.ingredients.map((ing, k) => (
                              <span key={k} className="text-[10px] font-semibold px-2 py-0.5 bg-zinc-900 border border-zinc-800/50 rounded text-zinc-500">
                                {ing}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Card Button Section */}
                      <div className="p-6 pt-0 border-t border-zinc-900/60 flex items-center justify-between">
                        <span className="text-xs text-zinc-500 font-semibold">Preço Unitário</span>
                        
                        {itemInCart > 0 ? (
                          <div className="flex items-center gap-3.5 bg-[#0d0d0e] p-1.5 rounded-full border border-zinc-800">
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300 hover:bg-zinc-700 active:scale-90"
                              aria-label="Diminuir quantidade"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-bold text-white font-mono w-4 text-center">{itemInCart}</span>
                            <button 
                              onClick={() => addToCart(item.id)}
                              className="w-7 h-7 rounded-full bg-orange-600 flex items-center justify-center text-white hover:bg-orange-700 active:scale-90"
                              aria-label="Aumentar quantidade"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(item.id)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 hover:bg-zinc-800 text-white text-xs font-bold rounded-full transition-colors active:scale-95 cursor-pointer"
                          >
                            <Plus size={14} className="text-orange-500" /> Adicionar à Mesa
                          </button>
                        )}
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </motion.section>

          {/* ACTIVE ORDER CONTROLS OVERLAY SHEET (CART DETAILS) */}
          {getCartQuantity() > 0 && !showOrderCheckout && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 max-w-lg w-[calc(100%-2rem)] bg-[#1a1a1e] border border-orange-500/30 rounded-2xl p-5 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-slide-up bg-radial from-zinc-900 to-zinc-950">
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center relative">
                  <ShoppingCart size={22} className="animate-pulse" />
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-orange-600 text-white font-mono text-[10px] font-black flex items-center justify-center border-2 border-[#1a1a1e]">
                    {getCartQuantity()}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Mesa de Pedido Aberta</h4>
                  <p className="text-xs text-orange-500 font-extrabold mt-0.5">Total: R$ {calculateTotal().toFixed(2)}</p>
                </div>
              </div>
              <div className="flex gap-2.5 w-full sm:w-auto">
                <button 
                  onClick={clearCart} 
                  className="px-3.5 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-red-500/40 hover:bg-zinc-800 text-zinc-400 hover:text-red-400 text-xs font-bold transition-all cursor-pointer"
                >
                  Limpar
                </button>
                <button 
                  onClick={() => setShowOrderCheckout(true)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white text-xs font-black rounded-full shadow-lg hover:shadow-orange-700/20 transition-all cursor-pointer"
                >
                  Confirmar Itens <Send size={14} />
                </button>
              </div>
            </div>
          )}

          {/* ACTIVE CHECKOUT DIALOG MODAL */}
          {showOrderCheckout && (
            <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-[#1a1a1e] border border-zinc-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col p-6 animate-scale-up">
                
                {/* Modal Header */}
                <div className="flex justify-between items-start pb-4 border-b border-zinc-800">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <ShoppingBag size={20} className="text-orange-500" />
                      Finalizar Pedido via WhatsApp
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">Preencha os detalhes para gerarmos o seu chat direto de entrega.</p>
                  </div>
                  <button 
                    onClick={() => setShowOrderCheckout(false)} 
                    className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Modal Basket Summary */}
                <div className="py-4 border-b border-zinc-800 max-h-[180px] overflow-y-auto space-y-3">
                  <h4 className="text-xs font-extrabold text-zinc-500 uppercase tracking-widest pl-1">Resumo da Sacola</h4>
                  {Object.keys(cart).map((id) => {
                    const item = MENU_ITEMS.find(i => i.id === id);
                    const qty = cart[id] || 0;
                    if (!item || qty <= 0) return null;
                    return (
                      <div key={id} className="flex justify-between items-center text-sm bg-black/30 p-2.5 rounded-lg border border-zinc-900">
                        <span className="text-gray-300 font-medium">
                          <strong className="text-orange-500 mr-2 font-mono">{qty}x</strong> {item.name}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-zinc-400 font-bold">R$ {(item.price * qty).toFixed(2)}</span>
                          <button 
                            onClick={() => removeFromCart(item.id)} 
                            className="p-1 text-zinc-500 hover:text-red-400 bg-zinc-900 border border-zinc-800 rounded hover:border-red-500/20"
                            aria-label={`Remover unidade de ${item.name}`}
                          >
                            <Trash size={12} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Checkout forms */}
                <div className="py-4 space-y-4">
                  
                  {/* Delivery Type Switch */}
                  <div className="grid grid-cols-2 gap-2 bg-[#0d0d0e] p-1 rounded-xl border border-zinc-800">
                    <button
                      type="button"
                      onClick={() => setOrderType("delivery")}
                      className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        orderType === "delivery" 
                          ? "bg-orange-600 text-white shadow" 
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      🚀 Entrega (Domicílio)
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType("retirada")}
                      className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        orderType === "retirada" 
                          ? "bg-orange-600 text-white shadow" 
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      🛍️ Retirada (Balcão)
                    </button>
                  </div>

                  {/* Client Name entry */}
                  <div>
                    <label className="block text-xs font-extrabold text-zinc-400 mb-2 uppercase tracking-wide">Seu Nome *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ex: João da Silva" 
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-[#0d0d0e] border border-zinc-800 hover:border-zinc-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none rounded-xl px-4 py-3 text-sm text-white transition-all"
                    />
                  </div>

                  {/* Delivery Address entry (Conditional) */}
                  {orderType === "delivery" && (
                    <div>
                      <label className="block text-xs font-extrabold text-zinc-400 mb-2 uppercase tracking-wide">Endereço de Entrega *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Rua, número, bairro e referência" 
                        value={clientAddress}
                        onChange={(e) => setClientAddress(e.target.value)}
                        className="w-full bg-[#0d0d0e] border border-zinc-800 hover:border-zinc-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none rounded-xl px-4 py-3 text-sm text-white transition-all"
                      />
                      <span className="text-[10px] text-zinc-500 pl-1 mt-1 block">Taxa de entrega fixa para a região central de R$ 7,00</span>
                    </div>
                  )}

                  {/* Payment Method Selector */}
                  <div>
                    <label className="block text-xs font-extrabold text-zinc-400 mb-2 uppercase tracking-wide">Forma de Pagamento</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full bg-[#0d0d0e] border border-zinc-800 hover:border-zinc-700 focus:border-orange-500 outline-none rounded-xl px-4 py-3 text-sm text-white font-medium transition-all"
                    >
                      <option value="Cartão de Crédito">💳 Cartão de Crédito (na entrega)</option>
                      <option value="Cartão de Débito">💳 Cartão de Débito (na entrega)</option>
                      <option value="Dinheiro">💵 Dinheiro (Troco)</option>
                      <option value="Pix">📱 PIX Instantâneo</option>
                    </select>
                  </div>

                </div>

                {/* Final Cost & Order Trigger */}
                <div className="pt-4 border-t border-zinc-800 flex flex-col gap-4 mt-auto">
                  <div className="flex flex-col gap-1.5 pl-1 font-mono">
                    <div className="flex justify-between text-xs text-zinc-500">
                      <span>Subtotal Consumo</span>
                      <span>R$ {calculateTotal().toFixed(2)}</span>
                    </div>
                    {orderType === "delivery" && (
                      <div className="flex justify-between text-xs text-zinc-500">
                        <span>Taxa de Entrega</span>
                        <span>R$ 7.00</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-black text-white pt-1.5 border-t border-dashed border-zinc-800 mt-1">
                      <span>VALOR TOTAL DO PEDIDO:</span>
                      <span className="text-orange-500">
                        R$ {(calculateTotal() + (orderType === "delivery" ? 7.00 : 0.00)).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3.5">
                    <button
                      type="button"
                      onClick={() => setShowOrderCheckout(false)}
                      className="col-span-4 py-3 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-400 font-bold rounded-xl text-xs transition-colors active:scale-98 cursor-pointer"
                    >
                      Voltar
                    </button>
                    <button
                      type="button"
                      onClick={handleSendOrder}
                      className="col-span-8 inline-flex items-center justify-center gap-2 py-3 bg-orange-600 hover:bg-orange-700 text-white font-black rounded-xl text-xs shadow-lg hover:shadow-orange-700/20 active:scale-98 transition-all cursor-pointer"
                    >
                      Enviar no WhatsApp <Send size={14} />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* HISTORICAL ABOUT THE BRAND (PONTOS DE CONTATO SOBRE INGREDIENTES E FAMÍLIA) */}
          <motion.section 
            id="sobre" 
            className="py-24 bg-zinc-950"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          >
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Image Collage Grid */}
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=400&auto=format&fit=crop" 
                  alt="Processo de selagem do blend na chapa" 
                  className="rounded-2xl shadow-xl w-full h-full object-cover aspect-square hover:scale-[1.02] transition-transform duration-300 border border-white/[0.04]"
                  referrerPolicy="no-referrer"
                />
                <img 
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop" 
                  alt="Hambúrguer com molho de queijo artesanal Moura" 
                  className="rounded-2xl shadow-xl w-full h-full object-cover aspect-square hover:scale-[1.02] transition-transform duration-300 border border-white/[0.04]"
                  referrerPolicy="no-referrer"
                />
                <img 
                  src="https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=400&auto=format&fit=crop" 
                  alt="Batatas rústicas com temperos" 
                  className="col-span-2 rounded-2xl shadow-xl w-full h-48 object-cover hover:scale-[1.01] transition-transform duration-300 border border-white/[0.04]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Text Information Grid */}
              <div className="flex flex-col items-start text-left">
                <span className="text-xs font-black text-orange-500 uppercase tracking-widest block mb-3">HISTÓRIA DE SABOR</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-6">
                  Nascidos da união em volta de uma mesa familiar
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Começamos nossa jornada no Moura Burguer com um propósito modesto mas revolucionário: desmistificar que comida rápida precisa ser industrializada. Queremos resgatar o sabor honesto do hambúrguer preparado de forma tradicional na brasa, usando receitas autoritárias testadas ao longo de anos com nossa própria família e amigos.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  Fazemos questão de moinho nosso blend Angus de cortes selecionados diariamente. Não adicionamos conservantes, amaciantes de carne ou temperos químicos — apenas sal marinho defumado e pimenta moída na hora antes de selar. Nossos vegetais são fornecidos por granjas de agricultura familiar parceira regional, garantindo crocância e saudabilidade incomparável.
                </p>

                {/* Bullet List of Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full pt-4 border-t border-zinc-900">
                  <div className="flex items-start gap-3">
                    <span className="text-lg">🌿</span>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-0.5">Sem Aditivos Artificiais</h4>
                      <p className="text-xs text-zinc-500">100% carnes puras e tempero natural honesto</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-lg">🍞</span>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-0.5">Pão de Forno Diário</h4>
                      <p className="text-xs text-zinc-500">Brioches extremamente frescos assados com carinho</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.section>

          {/* SOCIAL TESTIMONIALS SECTION */}
          <section className="py-24 bg-[#121214] border-t border-zinc-900/40">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-xs font-black text-orange-500 uppercase tracking-widest block mb-3">CONVERSÃO DE SUCESSO</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  O Moura Burguer na opinião de nossa Comunidade
                </h2>
                <p className="text-gray-400 font-medium text-sm mt-3">
                  Para casais em datas importantes, jovens que amam sabor intenso e famílias buscando aconchego.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Review 1 */}
                <div className="bg-[#1a1a1e] rounded-2xl p-8 border border-zinc-800/80 hover:border-orange-500/10 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex text-amber-500 text-base mb-6">★★★★★</div>
                    <p className="text-zinc-300 italic text-sm leading-relaxed mb-8">
                      "Fomos com as crianças e a vovó em uma noite de sábado. O espaço é muito amplo e confortável, e as opções Kids integraram as meninas perfeitamente. O clássico com a maionese de alho é um pecado de gostoso!"
                    </p>
                  </div>
                  <div className="flex items-center gap-3.5 pt-4 border-t border-zinc-900/60">
                    <img 
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop" 
                      alt="Mariana Santos" 
                      className="w-11 h-11 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-xs font-black text-white">Mariana Santos</h4>
                      <p className="text-xxs text-zinc-500">Mãe de Família</p>
                    </div>
                  </div>
                </div>

                {/* Review 2 */}
                <div className="bg-[#1a1a1e] rounded-2xl p-8 border border-zinc-800/80 hover:border-orange-500/10 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex text-amber-500 text-base mb-6">★★★★★</div>
                    <p className="text-zinc-300 italic text-sm leading-relaxed mb-8">
                      "Sou um verdadeiro fã de carnes e confesso que poucas hamburguerias entregam a suculência do blend no ponto correto. O Moura Trufado é uma explosão gastronômica surreal, e a geleia do Double Bacon é o equilíbrio puro."
                    </p>
                  </div>
                  <div className="flex items-center gap-3.5 pt-4 border-t border-zinc-900/60">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" 
                      alt="Pedro Albuquerque" 
                      className="w-11 h-11 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-xs font-black text-white">Pedro Albuquerque</h4>
                      <p className="text-xxs text-zinc-500">Fã de Burgers e Gourmet</p>
                    </div>
                  </div>
                </div>

                {/* Review 3 */}
                <div className="bg-[#1a1a1e] rounded-2xl p-8 border border-zinc-800/80 hover:border-orange-500/10 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex text-amber-500 text-base mb-6">★★★★★</div>
                    <p className="text-zinc-300 italic text-sm leading-relaxed mb-8">
                      "Nosso point obrigatório pós-faculdade ou no final de semana. A entrega sempre chega em tempo recorde, os entregadores são gentis e as batatas fritas crocantes com alecrim combinam perfeitamente com o chopp!"
                    </p>
                  </div>
                  <div className="flex items-center gap-3.5 pt-4 border-t border-zinc-900/60">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" 
                      alt="Gabriela & Lucas" 
                      className="w-11 h-11 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-xs font-black text-white">Gabriela & Lucas</h4>
                      <p className="text-xxs text-zinc-500">Parceiros de Jantar</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* CONTACT & MAP LOCATION / HOURS FOOTER */}
          <footer id="contato" className="bg-[#09090a] pt-24 pb-12 border-t border-zinc-900">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
              
              {/* Box 1: Brand description and social */}
              <div className="lg:col-span-5 flex flex-col items-start text-left">
                <a href="#inicio" className="text-2xl font-black text-white tracking-tighter mb-6">
                  Moura <span className="text-orange-500">Burguer</span>
                </a>
                <p className="text-zinc-500 text-xs leading-relaxed max-w-sm mb-8">
                  Nossa meta é servir memórias alegres através de comida de alta qualidade no ambiente físico e no conforto da sua casa. Sabor clássico com dedicação de forno diário artesanal.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 hover:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors" aria-label="Instagram Moura Burguer">
                    <Instagram size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 hover:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors" aria-label="Facebook Moura Burguer">
                    <Facebook size={18} />
                  </a>
                </div>
              </div>

              {/* Box 2: Working hours schedule list */}
              <div className="lg:col-span-4 flex flex-col items-start text-left">
                <h3 className="text-sm font-black text-white uppercase tracking-wider mb-6 pb-2 border-b-2 border-orange-500">
                  Horário de Atendimento
                </h3>
                <ul className="w-full text-xs text-zinc-400 space-y-4 font-medium">
                  <li className="flex justify-between border-b border-zinc-900 pb-2">
                    <span className="text-white">Segunda-feira</span>
                    <span className="text-zinc-500 italic">Fechado para descanso</span>
                  </li>
                  <li className="flex justify-between border-b border-zinc-900 pb-2">
                    <span className="text-white">Terça a Quinta</span>
                    <span>18:00h às 23:00h</span>
                  </li>
                  <li className="flex justify-between border-b border-zinc-900 pb-2">
                    <span className="text-white">Sexta e Sábado</span>
                    <span className="text-orange-500 font-bold">18:00h às 23:59h</span>
                  </li>
                  <li className="flex justify-between pb-2">
                    <span className="text-white font-semibold">Domingo</span>
                    <span>18:00h às 23:30h</span>
                  </li>
                </ul>
              </div>

              {/* Box 3: Address & Info Details */}
              <div className="lg:col-span-3 flex flex-col items-start text-left">
                <h3 className="text-sm font-black text-white uppercase tracking-wider mb-6 pb-2 border-b-2 border-orange-500">
                  Nosso Endereço
                </h3>
                <ul className="text-xs text-zinc-400 space-y-5">
                  <li className="flex gap-3">
                    <MapPin size={22} className="text-orange-500 shrink-0" />
                    <span>Av. Principal dos Sabores, 1200 - Centro, Cidade Gourmet - SP</span>
                  </li>
                  <li className="flex gap-3">
                    <Clock size={18} className="text-orange-500 shrink-0" />
                    <span>Delivery e Retirada local ativos</span>
                  </li>
                  <li className="flex gap-3">
                    <Phone size={18} className="text-orange-500 shrink-0" />
                    <span className="font-semibold text-white">(11) 98765-4321 / 3456-7890</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Sub-footer copyright disclaimer */}
            <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
              <p>&copy; 2026 Moura Burguer LTDA. Todos os direitos reservados. Fotos originais do Unsplash para fins ilustrativos.</p>
              <p className="flex items-center gap-1">
                Feito com carinho para a Moura Burguer • <a href="#toggle-code" onClick={() => { setActiveTab("code"); window.scrollTo(0,0); }} className="text-orange-500 hover:underline font-bold">Ver Código HTML Puro</a>
              </p>
            </div>
          </footer>

          {/* FLOATING ACTION BOTTOM BUTTON (Direct Simulate chat) */}
          <div 
            onClick={() => {
              const whatsappUrl = `https://api.whatsapp.com/send?phone=5511987654321&text=${encodeURIComponent("Olá, Moura Burguer! Gostaria de falar com o atendimento para tirar dúvidas ou fazer um pedido especial.")}`;
              window.open(whatsappUrl, "_blank");
            }}
            className="whatsapp-float fixed bottom-6 right-6 z-30 w-14 h-14 bg-[#25d366] text-white rounded-full flex items-center justify-center shadow-xl cursor-pointer active:scale-95 group"
            title="Deseja falar diretamente no WhatsApp?"
          >
            <span className="absolute right-16 scale-0 group-hover:scale-100 transition-transform bg-zinc-900 text-white text-xxs font-black px-3.5 py-1.5 rounded-lg whitespace-nowrap shadow-xl border border-zinc-800">
              Falar Conosco no WhatsApp! 💬
            </span>
            <Phone size={24} className="animate-wiggle" />
            <span className="absolute inset-0 rounded-full bg-[#25d366]/40 -z-10 animate-ping"></span>
          </div>

        </>
      )}

    </div>
  );
}
