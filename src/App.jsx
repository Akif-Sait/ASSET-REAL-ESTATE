import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  Building2, 
  Info, 
  Phone, 
  Search, 
  Moon, 
  Sun, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  ArrowRight,
  Menu,
  X,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  CheckCircle,
  Filter,
  ChevronRight,
  Star
} from 'lucide-react';

// --- Custom Hooks ---

// Hook for scroll animations
const useOnScreen = (options) => {
  const ref = useRef(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect(); // Only trigger once
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isVisible];
};

// --- Components ---

const FadeInSection = ({ children, delay = '0s', className = '' }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  
  return (
    <div
      ref={ref}
      style={{ transitionDelay: delay }}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  );
};

const AssetLogo = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M50 10 L85 85 L15 85 Z" fill="none" />
    <path d="M50 5 L95 90 L5 90 Z" fill="none" />
    <path d="M50 15 L78 75 L35 75 L56 30 L50 15" fill="#0047AB" /> 
    <path d="M28 85 L80 85 L65 55 L38 55 L28 85" fill="#003380" />
    <path d="M45 40 L22 85 L12 85 L42 25 L45 40" fill="#0055CC" />
    <path d="M50 10 L88 88 L12 88 Z" fill="currentColor" fillOpacity="0.05" />
    <path d="M50 30 L70 75 L30 75 Z" fill="white" fillOpacity="0.2" /> 
  </svg>
);

const Toast = ({ message, onClose }) => (
  <div className="fixed bottom-4 right-4 z-[100] animate-in slide-in-from-bottom duration-300">
    <div className="bg-green-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3">
      <CheckCircle size={24} />
      <div>
        <h4 className="font-bold">Success</h4>
        <p className="text-sm text-green-100">{message}</p>
      </div>
      <button onClick={onClose} className="ml-4 hover:bg-green-700 p-1 rounded"><X size={16}/></button>
    </div>
  </div>
);

const PropertyModal = ({ property, onClose, theme }) => {
  if (!property) return null;
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300 ${theme.cardBg} ${theme.text}`}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors">
          <X size={24} />
        </button>
        
        <div className="h-64 md:h-96 relative">
          <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider mb-2 inline-block">
              {property.tag}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">{property.title}</h2>
            <p className="text-gray-200 flex items-center gap-2 mt-2"><MapPin size={18}/> {property.address}</p>
          </div>
        </div>

        <div className="p-8">
          <div className="flex flex-wrap justify-between items-center mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
             <div className="text-3xl font-bold text-blue-600">{property.price}</div>
             <div className="flex gap-6 text-sm md:text-base">
                <div className="flex items-center gap-2"><Bed className="text-blue-500"/> <strong>{property.beds}</strong> Beds</div>
                <div className="flex items-center gap-2"><Bath className="text-blue-500"/> <strong>{property.baths}</strong> Baths</div>
                <div className="flex items-center gap-2"><Maximize className="text-blue-500"/> <strong>{property.sqft}</strong> sqft</div>
             </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Description</h3>
              <p className={`leading-relaxed mb-6 ${theme.textMuted}`}>
                Experience the pinnacle of luxury living in this stunning property. 
                Featuring state-of-the-art amenities, breathtaking views, and 
                meticulous architectural details. Perfect for those who seek 
                elegance and comfort in equal measure.
              </p>
              <h3 className="text-xl font-bold mb-4">Features</h3>
              <ul className={`grid grid-cols-2 gap-2 text-sm ${theme.textMuted}`}>
                {['Smart Home System', 'Private Pool', 'Gourmet Kitchen', 'Home Theater', 'Wine Cellar', '3 Car Garage'].map(feat => (
                  <li key={feat} className="flex items-center gap-2"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> {feat}</li>
                ))}
              </ul>
            </div>
            <div className={`p-6 rounded-2xl ${theme.bg === 'bg-slate-900' ? 'bg-slate-800' : 'bg-gray-50'}`}>
              <h3 className="text-xl font-bold mb-4">Agent Information</h3>
              <div className="flex items-center gap-4 mb-6">
                 <img src="https://randomuser.me/api/portraits/women/44.jpg" className="w-16 h-16 rounded-full border-2 border-blue-500" alt="Agent" />
                 <div>
                    <p className="font-bold text-lg">Sarah Jenkins</p>
                    <p className={`text-sm ${theme.textMuted}`}>Senior Broker</p>
                    <div className="flex text-yellow-400 text-xs mt-1">
                       <Star fill="currentColor" size={12}/>
                       <Star fill="currentColor" size={12}/>
                       <Star fill="currentColor" size={12}/>
                       <Star fill="currentColor" size={12}/>
                       <Star fill="currentColor" size={12}/>
                    </div>
                 </div>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl mb-3 transition-colors">
                 Schedule Viewing
              </button>
              <button className={`w-full border-2 border-blue-600 text-blue-600 font-bold py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors`}>
                 Contact Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Data ---
const propertiesData = [
  {
    id: 1,
    title: "Modern Lakeside Villa",
    price: "$1,250,000",
    priceVal: 1250000,
    address: "123 Serenity Lane, Lakeview",
    beds: 4,
    baths: 3,
    sqft: 3200,
    image: "https://images.unsplash.com/photo-1600596542815-2a43876e4483?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    tag: "Featured"
  },
  {
    id: 2,
    title: "Downtown Penthouse",
    price: "$850,000",
    priceVal: 850000,
    address: "450 Skyline Blvd, Metro City",
    beds: 2,
    baths: 2,
    sqft: 1500,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    tag: "New Listing"
  },
  {
    id: 3,
    title: "Suburban Family Estate",
    price: "$675,000",
    priceVal: 675000,
    address: "78 Oak Wood Drive, Suburbia",
    beds: 5,
    baths: 4,
    sqft: 4100,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    tag: "Hot Deal"
  },
  {
    id: 4,
    title: "Minimalist Studio",
    price: "$350,000",
    priceVal: 350000,
    address: "12 Art District, Downtown",
    beds: 1,
    baths: 1,
    sqft: 850,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    tag: "Sold"
  },
  {
    id: 5,
    title: "Coastal Retreat",
    price: "$2,100,000",
    priceVal: 2100000,
    address: "5 Oceanview Way, The Coast",
    beds: 6,
    baths: 5,
    sqft: 5000,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    tag: "Luxury"
  },
  {
    id: 6,
    title: "Historic Townhouse",
    price: "$920,000",
    priceVal: 920000,
    address: "88 Heritage St, Old Town",
    beds: 3,
    baths: 2.5,
    sqft: 2200,
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    tag: "Classic"
  }
];

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Advanced State
  const [properties, setProperties] = useState(propertiesData);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [filterType, setFilterType] = useState('all'); // all, luxury, budget

  // Form State
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });

  // Toggle Dark Mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Scroll effect & Spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Simple Scroll Spy
      const sections = ['home', 'properties', 'about', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
             setActiveTab(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter Logic
  useEffect(() => {
    if (filterType === 'all') {
      setProperties(propertiesData);
    } else if (filterType === 'luxury') {
      setProperties(propertiesData.filter(p => p.priceVal >= 1000000));
    } else if (filterType === 'budget') {
      setProperties(propertiesData.filter(p => p.priceVal < 800000));
    }
  }, [filterType]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setToastMessage(`Message sent! We'll contact you at ${formData.email} shortly.`);
    setFormData({ firstName: '', lastName: '', email: '', message: '' });
    setTimeout(() => setToastMessage(null), 5000);
  };

  // Theme Classes
  const theme = {
    bg: darkMode ? 'bg-slate-900' : 'bg-gray-50',
    text: darkMode ? 'text-gray-100' : 'text-slate-800',
    textMuted: darkMode ? 'text-gray-400' : 'text-slate-500',
    cardBg: darkMode ? 'bg-slate-800' : 'bg-white',
    border: darkMode ? 'border-slate-700' : 'border-gray-200',
    navBg: darkMode ? (scrolled ? 'bg-slate-900/95' : 'bg-slate-900') : (scrolled ? 'bg-white/95' : 'bg-white'),
    navText: darkMode ? 'text-gray-200' : 'text-slate-700',
  };

  const NavLink = ({ name, id, icon: Icon }) => (
    <button
      onClick={() => {
        // setActiveTab(id); // handled by scroll spy now, but keeps click responsive
        setMobileMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }}
      className={`group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
        activeTab === id 
          ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/30' 
          : `${theme.navText} hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-800`
      }`}
    >
      {Icon && <Icon size={16} className={activeTab === id ? 'text-white' : 'text-blue-600 group-hover:scale-110 transition-transform'} />}
      <span className="uppercase tracking-wide text-xs md:text-sm">{name}</span>
    </button>
  );

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-blue-200 selection:text-blue-900 ${theme.bg} ${theme.text}`}>
      
      {/* Toast Notification */}
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
      
      {/* Property Modal */}
      {selectedProperty && (
        <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} theme={theme} />
      )}

      {/* --- HEADER --- */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${theme.navBg} ${scrolled ? 'shadow-lg backdrop-blur-md py-2 border-b ' + theme.border : 'py-4'}`}>
        <div className="container mx-auto px-4">
          
          <div className="hidden lg:flex justify-between items-center relative">
            
            <div className="flex items-center gap-2">
              <NavLink name="Home" id="home" icon={Home} />
              <NavLink name="Properties" id="properties" icon={Building2} />
            </div>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center cursor-pointer group"
                 onClick={() => document.getElementById('home').scrollIntoView({ behavior: 'smooth' })}>
              <div className="relative">
                <AssetLogo className={`h-12 w-12 mb-1 transition-transform duration-500 group-hover:rotate-180 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`} />
              </div>
              <h1 className={`text-xl font-bold tracking-widest leading-none ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                ASSET
              </h1>
              <span className={`text-[10px] tracking-[0.3em] font-medium uppercase ${theme.textMuted}`}>
                Real Estate
              </span>
            </div>

            <div className="flex items-center gap-2">
              <NavLink name="About Us" id="about" icon={Info} />
              <NavLink name="Contact Us" id="contact" icon={Phone} />
              
              <button 
                onClick={toggleDarkMode}
                className={`ml-4 p-2 rounded-full transition-all duration-300 ${darkMode ? 'bg-slate-700 text-yellow-400 hover:bg-slate-600' : 'bg-gray-100 text-slate-600 hover:bg-gray-200'}`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="lg:hidden flex justify-between items-center">
             <div className="flex items-center gap-3">
                <AssetLogo className={`h-10 w-10 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`} />
                <div>
                   <h1 className="text-lg font-bold tracking-wider leading-none">ASSET</h1>
                   <span className="text-[9px] tracking-[0.2em] block">REAL ESTATE</span>
                </div>
             </div>
             
             <div className="flex items-center gap-4">
                <button onClick={toggleDarkMode} className={darkMode ? 'text-yellow-400' : 'text-slate-600'}>
                  {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                </button>
                <button onClick={() => setMobileMenuOpen(true)} className={theme.text}>
                  <Menu size={28} />
                </button>
             </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className={`fixed inset-0 z-[60] ${darkMode ? 'bg-slate-900' : 'bg-white'} flex flex-col items-center justify-center space-y-8 animate-in slide-in-from-right duration-300`}>
          <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 p-2">
            <X size={32} />
          </button>
          <AssetLogo className="h-20 w-20 text-blue-600 mb-4 animate-bounce" />
          <nav className="flex flex-col gap-6 text-center">
            {['home', 'properties', 'about', 'contact'].map((item) => (
              <button 
                key={item}
                onClick={() => {
                  setMobileMenuOpen(false);
                  document.getElementById(item)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-2xl font-light uppercase tracking-widest hover:text-blue-600 transition-colors"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Luxury Home"
            className="w-full h-full object-cover scale-105 animate-pulse-slow" 
            style={{ animationDuration: '20s' }}
          />
          <div className={`absolute inset-0 ${darkMode ? 'bg-slate-900/80' : 'bg-slate-900/60'}`}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/90"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
          <FadeInSection>
            <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase mb-6 inline-block shadow-lg shadow-blue-600/50">
              Est. 1995 • Asset Real Estate
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-none tracking-tight drop-shadow-lg">
              Find Your Place <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200 italic font-serif">In The World</span>
            </h1>
            <p className="text-gray-200 text-lg md:text-2xl mb-12 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Exclusive properties. Exceptional service. We curate the finest real estate listings for your lifestyle.
            </p>
          </FadeInSection>

          {/* Advanced Search Bar */}
          <FadeInSection delay="200ms">
            <div className="bg-white/10 backdrop-blur-xl p-3 rounded-full border border-white/20 shadow-2xl flex flex-col md:flex-row gap-2 max-w-3xl mx-auto">
              <div className="flex-1 px-6 py-3 flex items-center border-r border-white/10">
                <Search className="text-gray-300 mr-3" />
                <input 
                  type="text" 
                  placeholder="City, ZIP, or Address..." 
                  className="bg-transparent border-none outline-none text-white placeholder-gray-300 w-full font-medium"
                />
              </div>
              <div className="hidden md:flex items-center px-6 border-r border-white/10 cursor-pointer hover:bg-white/5 transition-colors">
                 <span className="text-white text-sm font-medium whitespace-nowrap">Price Range</span>
              </div>
              <button 
                onClick={() => document.getElementById('properties').scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-blue-600/50 flex items-center justify-center gap-2 group"
              >
                Search <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </FadeInSection>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
           <ChevronRight size={32} className="rotate-90" />
        </div>
      </section>

      {/* --- PROPERTIES SECTION --- */}
      <section id="properties" className={`py-32 px-4 ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto">
          <FadeInSection>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="text-left">
                <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-2 flex items-center gap-2">
                  <span className="w-12 h-[2px] bg-blue-600"></span> Exclusive Listings
                </h2>
                <h3 className="text-3xl md:text-5xl font-bold">Featured Properties</h3>
              </div>
              
              {/* Filter Tabs */}
              <div className={`flex bg-gray-200 dark:bg-slate-800 p-1 rounded-full ${theme.text}`}>
                {['all', 'luxury', 'budget'].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilterType(f)}
                    className={`px-6 py-2 rounded-full text-sm font-bold capitalize transition-all ${
                      filterType === f 
                      ? 'bg-white dark:bg-slate-700 shadow-md text-blue-600' 
                      : 'hover:bg-gray-300 dark:hover:bg-slate-700 opacity-60 hover:opacity-100'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((prop, idx) => (
              <FadeInSection key={prop.id} delay={`${idx * 100}ms`}>
                <div 
                  onClick={() => setSelectedProperty(prop)}
                  className={`group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer ${theme.cardBg} border ${theme.border} h-full flex flex-col`}
                >
                  {/* Image Container */}
                  <div className="relative h-72 overflow-hidden">
                    <img 
                      src={prop.image} 
                      alt={prop.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1">
                        <Star size={10} fill="currentColor" /> {prop.tag}
                      </span>
                    </div>
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-white text-black px-6 py-3 rounded-full font-bold shadow-xl">
                        View Details
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold truncate pr-4 group-hover:text-blue-600 transition-colors">{prop.title}</h3>
                      <p className="text-blue-600 font-bold text-lg whitespace-nowrap">{prop.price}</p>
                    </div>
                    <div className={`flex items-center gap-2 text-sm mb-6 ${theme.textMuted}`}>
                      <MapPin size={16} className="shrink-0" />
                      <span className="truncate">{prop.address}</span>
                    </div>

                    <div className={`mt-auto flex justify-between border-t ${theme.border} pt-6`}>
                      <div className="flex flex-col items-center gap-1">
                        <Bed size={20} className="text-blue-500" />
                        <span className="text-xs font-bold">{prop.beds} Beds</span>
                      </div>
                      <div className="w-px bg-gray-200 dark:bg-slate-700"></div>
                      <div className="flex flex-col items-center gap-1">
                        <Bath size={20} className="text-blue-500" />
                        <span className="text-xs font-bold">{prop.baths} Baths</span>
                      </div>
                      <div className="w-px bg-gray-200 dark:bg-slate-700"></div>
                      <div className="flex flex-col items-center gap-1">
                        <Maximize size={20} className="text-blue-500" />
                        <span className="text-xs font-bold">{prop.sqft} sqft</span>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <button className={`group px-10 py-4 border-2 border-blue-600 text-blue-600 rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all uppercase tracking-wider flex items-center gap-2 mx-auto`}>
              View All Properties <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
            </button>
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className={`py-32 px-4 overflow-hidden relative ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            
            {/* Image Side with Decoration */}
            <div className="w-full lg:w-1/2 relative">
              <FadeInSection className="relative z-10">
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-700">
                  <img 
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                    alt="Asset Real Estate Team" 
                    className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 right-0 bg-blue-600 text-white p-6 rounded-tl-[2rem]">
                    <p className="text-4xl font-bold">28+</p>
                    <p className="text-sm uppercase tracking-wider">Years of Excellence</p>
                  </div>
                </div>
              </FadeInSection>
              {/* Decorative Elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 dark:bg-slate-600 rounded-full blur-3xl opacity-50 animate-pulse"></div>
              <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
            </div>

            {/* Text Side */}
            <div className="w-full lg:w-1/2">
              <FadeInSection delay="200ms">
                <div className="flex items-center gap-2 mb-6">
                  <AssetLogo className="w-8 h-8 text-blue-600" />
                  <span className="font-bold tracking-widest uppercase text-blue-600">Our Story</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                  Decades of Trust in <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Real Estate</span>
                </h2>
                <p className={`text-lg mb-6 leading-relaxed ${theme.textMuted}`}>
                  Founded by passionate experts, Asset Real Estate has been a pillar in the community for over 25 years. We don't just sell houses; we help families find their setting for life's most cherished memories.
                </p>
                <p className={`text-lg mb-10 leading-relaxed ${theme.textMuted}`}>
                  Whether you are buying your first home, seeking a luxury waterfront estate, or investing in commercial opportunities, our dedicated team treats every transaction with the integrity and attention it deserves.
                </p>
                
                <div className="grid grid-cols-2 gap-10 mb-10 border-t border-gray-200 dark:border-gray-700 pt-10">
                  <div>
                    <h4 className="text-5xl font-bold text-blue-600 mb-2">1k+</h4>
                    <p className="text-base font-medium opacity-70">Properties Sold</p>
                  </div>
                  <div>
                    <h4 className="text-5xl font-bold text-blue-600 mb-2">99%</h4>
                    <p className="text-base font-medium opacity-70">Client Satisfaction</p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                   <img 
                     src="https://randomuser.me/api/portraits/men/32.jpg" 
                     alt="Founder" 
                     className="w-14 h-14 rounded-full border-2 border-blue-600 shadow-lg" 
                   />
                   <div>
                      <p className="font-bold text-lg">Farooq Sait</p>
                      <p className={`text-sm ${theme.textMuted}`}>Founder & CEO</p>
                   </div>
                   {/* Signature Placeholder - Add back when available
                   <img 
                     src="..." 
                     alt="Signature" 
                     className={`h-10 ml-auto opacity-50 ${darkMode ? 'invert' : ''}`}
                   />
                   */}
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className={`py-32 px-4 relative ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto max-w-6xl">
          <FadeInSection>
            <div className={`rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row ${theme.cardBg}`}>
              
              {/* Contact Info Side */}
              <div className="w-full lg:w-5/12 bg-blue-600 text-white p-12 md:p-16 flex flex-col justify-between relative overflow-hidden">
                 <div className="relative z-10">
                   <h3 className="text-3xl font-bold mb-6">Get In Touch</h3>
                   <p className="text-blue-100 mb-12 text-lg">Ready to start your journey? Contact us today for a free consultation with our senior agents.</p>
                   
                   <div className="space-y-8">
                      <div className="flex items-center gap-5">
                         <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm"><Phone size={24}/></div>
                         <div>
                            <p className="text-xs text-blue-200 uppercase tracking-wider mb-1">Phone</p>
                            <p className="font-bold text-lg">+91 986114121</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-5">
                         <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm"><MapPin size={24}/></div>
                         <div>
                            <p className="text-xs text-blue-200 uppercase tracking-wider mb-1">Office</p>
                            <p className="font-bold text-lg">North Rd, Da Costa Square,<br/>Thomas Town, Cooke Town,<br/>Bengaluru, Karnataka 560084</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-5">
                         <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm"><Info size={24}/></div>
                         <div>
                            <p className="text-xs text-blue-200 uppercase tracking-wider mb-1">Email</p>
                            <p className="font-bold text-lg">info@assetrealestate.com</p>
                         </div>
                      </div>
                   </div>
                 </div>

                 <div className="mt-16 relative z-10">
                    <p className="text-sm text-blue-200 mb-4">Follow us on social media</p>
                    <div className="flex gap-4">
                       {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                         <div key={i} className="p-3 bg-white/10 hover:bg-white/30 rounded-full cursor-pointer transition-all hover:-translate-y-1">
                            <Icon size={20} />
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* Abstract decorative circles */}
                 <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-500 rounded-full opacity-50 blur-3xl"></div>
                 <div className="absolute top-12 -right-12 w-40 h-40 bg-blue-400 rounded-full opacity-30 blur-2xl"></div>
              </div>

              {/* Form Side */}
              <div className="w-full lg:w-7/12 p-12 md:p-16">
                 <h3 className="text-3xl font-bold mb-8">Send us a Message</h3>
                 <form className="space-y-6" onSubmit={handleContactSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wide opacity-70">First Name</label>
                          <input 
                            required
                            type="text" 
                            className={`w-full p-4 rounded-xl border focus:ring-2 focus:ring-blue-600 outline-none transition-all ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'}`} 
                            placeholder="John" 
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wide opacity-70">Last Name</label>
                          <input 
                            required
                            type="text" 
                            className={`w-full p-4 rounded-xl border focus:ring-2 focus:ring-blue-600 outline-none transition-all ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'}`} 
                            placeholder="Doe" 
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase tracking-wide opacity-70">Email Address</label>
                       <input 
                         required
                         type="email" 
                         className={`w-full p-4 rounded-xl border focus:ring-2 focus:ring-blue-600 outline-none transition-all ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'}`} 
                         placeholder="john@example.com" 
                         value={formData.email}
                         onChange={(e) => setFormData({...formData, email: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase tracking-wide opacity-70">Message</label>
                       <textarea 
                         required
                         rows="4" 
                         className={`w-full p-4 rounded-xl border focus:ring-2 focus:ring-blue-600 outline-none transition-all ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'}`} 
                         placeholder="I'm interested in viewing a property..."
                         value={formData.message}
                         onChange={(e) => setFormData({...formData, message: e.target.value})}
                       ></textarea>
                    </div>
                    <button type="submit" className="w-full bg-slate-900 dark:bg-blue-600 text-white font-bold py-5 rounded-xl hover:opacity-90 transition-all shadow-lg hover:shadow-xl transform active:scale-95">
                       Send Message
                    </button>
                 </form>
              </div>

            </div>
          </FadeInSection>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className={`${darkMode ? 'bg-black text-gray-400' : 'bg-slate-900 text-gray-400'} pt-20 pb-10 border-t border-gray-800`}>
         <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="col-span-1 md:col-span-1">
                <div className="flex items-center gap-3 mb-6">
                  <AssetLogo className="h-10 w-10 text-blue-600" />
                  <span className="text-xl font-bold text-white tracking-widest">ASSET</span>
                </div>
                <p className="text-sm opacity-60 leading-relaxed mb-6">
                   Asset Real Estate represents the highest level of service and expertise in the luxury real estate market.
                </p>
              </div>
              
              <div>
                 <h4 className="text-white font-bold mb-6">Properties</h4>
                 <ul className="space-y-4 text-sm">
                    <li className="hover:text-blue-500 cursor-pointer transition-colors">Featured Listings</li>
                    <li className="hover:text-blue-500 cursor-pointer transition-colors">Sold Properties</li>
                    <li className="hover:text-blue-500 cursor-pointer transition-colors">New Developments</li>
                    <li className="hover:text-blue-500 cursor-pointer transition-colors">Commercial</li>
                 </ul>
              </div>

              <div>
                 <h4 className="text-white font-bold mb-6">Company</h4>
                 <ul className="space-y-4 text-sm">
                    <li className="hover:text-blue-500 cursor-pointer transition-colors">About Us</li>
                    <li className="hover:text-blue-500 cursor-pointer transition-colors">Careers</li>
                    <li className="hover:text-blue-500 cursor-pointer transition-colors">Press & Media</li>
                    <li className="hover:text-blue-500 cursor-pointer transition-colors">Contact</li>
                 </ul>
              </div>

              <div>
                 <h4 className="text-white font-bold mb-6">Newsletter</h4>
                 <p className="text-sm opacity-60 mb-4">Subscribe to our newsletter for the latest market updates.</p>
                 <div className="flex">
                    <input type="text" placeholder="Your email" className="bg-gray-800 border-none rounded-l-lg p-3 text-sm w-full outline-none focus:ring-1 focus:ring-blue-600" />
                    <button className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700 transition-colors"><ChevronRight/></button>
                 </div>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-50">
               <p>&copy; {new Date().getFullYear()} Asset Real Estate. All rights reserved.</p>
               <div className="flex gap-6">
                  <a href="#" className="hover:text-white">Privacy Policy</a>
                  <a href="#" className="hover:text-white">Terms of Service</a>
                  <a href="#" className="hover:text-white">Sitemap</a>
               </div>
            </div>
         </div>
      </footer>

    </div>
  );
}