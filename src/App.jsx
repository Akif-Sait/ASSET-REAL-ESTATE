import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, Building2, Info, Phone, Search, Moon, Sun, 
  MapPin, Bed, Bath, Maximize, ArrowRight, Menu, X, 
  Facebook, Instagram, Linkedin, Twitter, CheckCircle, Star
} from 'lucide-react';

// --- Components ---

// Custom SVG Logo Component recreating the provided image
const AssetLogo = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    {/* The logo consists of three interlocking blue segments forming a triangle */}
    <path d="M50 5 L95 95 L5 95 Z" fill="none" /> {/* bounding box ref */}
    
    {/* Top-Right Segment */}
    <path d="M50 8 L92 92 H72 L50 48 L28 92 H8 L50 8 Z" fill="#0047AB" opacity="0" /> {/* Guide */}
    
    {/* Actual Construction based on the 'folded' blue triangle look */}
    <g transform="translate(0, 5) scale(0.9)">
        {/* Left folded arm */}
        <path d="M50 0 L0 100 L22 100 L59 26 L50 0Z" fill="#0047AB" />
        
        {/* Right folded arm */}
        <path d="M50 0 L100 100 L78 100 L41 26 L50 0Z" fill="#00338D" />
        
        {/* Bottom crossbar (The fold logic often implies a specific layering, simplifying to the visual triangle) */}
        <path d="M15 82 L85 82 L75 62 L25 62 Z" fill="#0055CC" style={{mixBlendMode: 'multiply'}} opacity="0"/> 
        
        {/* Let's draw the specific geometric lines from the image: 3 interlocking L-shapes */}
        <path d="M46 15 L18 78 L37 78 L55 40 Z" fill="#0047AB" /> {/* Inner Left */}
        <path d="M54 15 L82 78 L63 78 L45 40 Z" fill="#0047AB" /> {/* Inner Right */}
        <path d="M22 85 L78 85 L78 98 L22 98 Z" fill="#0047AB" /> {/* Bottom Bar? No, the image is a triangle. */}
        
        {/* Re-doing the paths to match the 'image_4b8894.png' perfectly (Penrose/Triangle) */}
        <path d="M50 5 L88 85 L12 85 Z" fill="none" />
        
        {/* Segment 1: Left Diagonal */}
        <path d="M48 10 L10 90 L30 90 L58 32 Z" fill="#0047AB" />
        
        {/* Segment 2: Right Diagonal */}
        <path d="M52 10 L90 90 L70 90 L42 32 Z" fill="#00338D" />
        
        {/* Segment 3: Bottom Horizontal (Connecting the two bases visually in the negative space or overlapping) */}
        {/* Looking at the logo, it's actually 3 nested chevrons or a thick outline triangle with cuts */}
        <path d="M25 75 L75 75 L65 55 L35 55 Z" fill="#0055CC" />
    </g>
    
    {/* Final Refined Path merging to look exactly like the reference image */}
    <rect width="100" height="100" fill="none" />
    <path 
      d="M50 10 L85 80 L65 80 L50 50 L35 80 L15 80 L50 10 Z M50 25 L38 50 L62 50 L50 25 Z" 
      fillRule="evenodd" 
      fill="#0047AB" 
      transform="translate(0, 5)"
    />
    {/* The white cuts */}
    <path d="M50 50 L35 80 M50 50 L65 80" stroke="white" strokeWidth="2" />
    <path d="M35 80 L65 80" stroke="white" strokeWidth="2" />
  </svg>
);

// We will use a cleaner, single-path SVG that matches the "Blue Triangle with White Triangle Hole" aesthetic
const FinalLogo = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M50 10L90 90H10L50 10Z" 
      fill="#0047AB" 
    />
    <path 
      d="M50 35L70 75H30L50 35Z" 
      fill="white" 
    />
    {/* Cuts to simulate the 3-piece look */}
    <path d="M50 10 L50 35" stroke="white" strokeWidth="2"/>
    <path d="M90 90 L70 75" stroke="white" strokeWidth="2"/>
    <path d="M10 90 L30 75" stroke="white" strokeWidth="2"/>
  </svg>
);

const FadeInSection = ({ children, delay = '0s', className = '' }) => {
  const domRef = useRef();
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
    });
    const { current } = domRef;
    if(current) observer.observe(current);
    return () => { if(current) observer.unobserve(current); };
  }, []);

  return (
    <div
      ref={domRef}
      style={{ transitionDelay: delay }}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  );
};

const Toast = ({ message, onClose }) => (
  <div className="fixed bottom-4 right-4 z-[100] animate-[slideIn_0.3s_ease-out]">
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
      <div className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl ${theme.cardBg} ${theme.text}`}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors">
          <X size={24} />
        </button>
        <div className="h-64 md:h-96 relative">
          <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider mb-2 inline-block">{property.tag}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-serif">{property.title}</h2>
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
              <h3 className="text-xl font-bold mb-4 font-serif">Description</h3>
              <p className={`leading-relaxed mb-6 ${theme.textMuted}`}>Experience the pinnacle of luxury living in this stunning property. Featuring state-of-the-art amenities, breathtaking views, and meticulous architectural details.</p>
              <h3 className="text-xl font-bold mb-4 font-serif">Features</h3>
              <ul className={`grid grid-cols-2 gap-2 text-sm ${theme.textMuted}`}>
                {['Smart Home', 'Private Pool', 'Gourmet Kitchen', 'Home Theater', 'Wine Cellar', '3 Car Garage'].map(f => (
                  <li key={f} className="flex items-center gap-2"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> {f}</li>
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
                 </div>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl mb-3 transition-colors">Schedule Viewing</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Data ---
const propertiesData = [
  { id: 1, title: "Modern Lakeside Villa", price: "$1,250,000", priceVal: 1250000, address: "123 Serenity Lane, Lakeview", beds: 4, baths: 3, sqft: 3200, image: "https://images.unsplash.com/photo-1600596542815-2a43876e4483?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", tag: "Featured" },
  { id: 2, title: "Downtown Penthouse", price: "$850,000", priceVal: 850000, address: "450 Skyline Blvd, Metro City", beds: 2, baths: 2, sqft: 1500, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", tag: "New Listing" },
  { id: 3, title: "Suburban Family Estate", price: "$675,000", priceVal: 675000, address: "78 Oak Wood Drive, Suburbia", beds: 5, baths: 4, sqft: 4100, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", tag: "Hot Deal" },
  { id: 4, title: "Minimalist Studio", price: "$350,000", priceVal: 350000, address: "12 Art District, Downtown", beds: 1, baths: 1, sqft: 850, image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", tag: "Sold" },
  { id: 5, title: "Coastal Retreat", price: "$2,100,000", priceVal: 2100000, address: "5 Oceanview Way, The Coast", beds: 6, baths: 5, sqft: 5000, image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", tag: "Luxury" },
  { id: 6, title: "Historic Townhouse", price: "$920,000", priceVal: 920000, address: "88 Heritage St, Old Town", beds: 3, baths: 2.5, sqft: 2200, image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", tag: "Classic" }
];

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [properties, setProperties] = useState(propertiesData);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let filtered = propertiesData;
    if (filterType === 'luxury') filtered = propertiesData.filter(p => p.priceVal >= 1000000);
    if (filterType === 'budget') filtered = propertiesData.filter(p => p.priceVal < 800000);
    setProperties(filtered);
  }, [filterType]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setToastMessage(`Message sent! We'll contact you shortly.`);
    setFormData({ firstName: '', lastName: '', email: '', message: '' });
    setTimeout(() => setToastMessage(null), 5000);
  };

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
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
      {selectedProperty && <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} theme={theme} />}

      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${theme.navBg} ${scrolled ? 'shadow-lg backdrop-blur-md py-2 border-b ' + theme.border : 'py-4'}`}>
        <div className="container mx-auto px-4">
          <div className="hidden lg:flex justify-between items-center relative h-24">
            {/* Left Nav */}
            <div className="flex items-center gap-4">
              <NavLink name="Home" id="home" icon={Home} />
              <NavLink name="Properties" id="properties" icon={Building2} />
            </div>
            
            {/* Center Logo Stack */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center cursor-pointer group z-20" onClick={() => document.getElementById('home').scrollIntoView({ behavior: 'smooth' })}>
              <FinalLogo className="h-20 w-auto mb-2 transition-transform duration-500 group-hover:scale-105" />
              <h1 className={`text-3xl font-bold tracking-widest leading-none ${darkMode ? 'text-white' : 'text-slate-900'} font-serif`}>ASSET</h1>
              <span className={`text-[10px] tracking-[0.4em] font-medium uppercase mt-1 ${theme.textMuted}`}>REAL ESTATE</span>
            </div>

            {/* Right Nav */}
            <div className="flex items-center gap-4">
              <NavLink name="About Us" id="about" icon={Info} />
              <NavLink name="Contact Us" id="contact" icon={Phone} />
              <button onClick={toggleDarkMode} className={`ml-4 p-2 rounded-full transition-all duration-300 ${darkMode ? 'bg-slate-700 text-yellow-400 hover:bg-slate-600' : 'bg-gray-100 text-slate-600 hover:bg-gray-200'}`}>
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
          
          {/* Mobile Header */}
          <div className="lg:hidden flex justify-between items-center">
             <div className="flex items-center gap-3">
                <FinalLogo className="h-14 w-auto" />
                <div><h1 className="text-lg font-bold tracking-wider leading-none font-serif">ASSET</h1><span className="text-[9px] tracking-[0.2em] block">REAL ESTATE</span></div>
             </div>
             <div className="flex items-center gap-4">
                <button onClick={toggleDarkMode} className={darkMode ? 'text-yellow-400' : 'text-slate-600'}>{darkMode ? <Sun size={24} /> : <Moon size={24} />}</button>
                <button onClick={() => setMobileMenuOpen(true)} className={theme.text}><Menu size={28} /></button>
             </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className={`fixed inset-0 z-[60] ${darkMode ? 'bg-slate-900' : 'bg-white'} flex flex-col items-center justify-center space-y-8`}>
          <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 p-2"><X size={32} /></button>
          <FinalLogo className="h-24 w-auto mb-4 animate-bounce" />
          <nav className="flex flex-col gap-6 text-center">
            {['home', 'properties', 'about', 'contact'].map((item) => (
              <button key={item} onClick={() => { setMobileMenuOpen(false); document.getElementById(item)?.scrollIntoView({ behavior: 'smooth' }); }} className="text-2xl font-light uppercase tracking-widest hover:text-blue-600 transition-colors font-serif">{item}</button>
            ))}
          </nav>
        </div>
      )}

      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Luxury Home" className="w-full h-full object-cover scale-105 animate-pulse-slow" style={{ animationDuration: '20s' }} />
          <div className={`absolute inset-0 ${darkMode ? 'bg-slate-900/80' : 'bg-slate-900/60'}`}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/90"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
          <FadeInSection>
            {/* The Blue Pill Badge */}
            <div className="mb-8">
              <span className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold tracking-wide uppercase shadow-lg shadow-blue-600/50">
                EST. 1991 • ASSET REAL ESTATE
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-none tracking-tight drop-shadow-lg font-serif">CREATING ASSETS <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200 italic">FOR YOU</span></h1>
            <p className="text-gray-200 text-lg md:text-2xl mb-12 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Celebrating 35 years of helping families find their dream homes. We don't just navigate the market; we curate opportunities that turn into lifelong assets and cherished memories.
            </p>
          </FadeInSection>
          <FadeInSection delay="200ms">
            <div className="bg-white/10 backdrop-blur-xl p-3 rounded-full border border-white/20 shadow-2xl flex flex-col md:flex-row gap-2 max-w-3xl mx-auto">
              <div className="flex-1 px-6 py-3 flex items-center border-r border-white/10">
                <Search className="text-gray-300 mr-3" />
                <input type="text" placeholder="City, ZIP, or Address..." className="bg-transparent border-none outline-none text-white placeholder-gray-300 w-full font-medium" />
              </div>
              <button onClick={() => document.getElementById('properties').scrollIntoView({ behavior: 'smooth' })} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-blue-600/50 flex items-center justify-center gap-2 group">Search <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></button>
            </div>
          </FadeInSection>
        </div>
      </section>

      <section id="properties" className={`py-32 px-4 ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto">
          <FadeInSection>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="text-left"><h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-2 flex items-center gap-2"><span className="w-12 h-[2px] bg-blue-600"></span> Exclusive Listings</h2><h3 className="text-3xl md:text-5xl font-bold font-serif">Featured Properties</h3></div>
              <div className={`flex bg-gray-200 dark:bg-slate-800 p-1 rounded-full ${theme.text}`}>{['all', 'luxury', 'budget'].map(f => (<button key={f} onClick={() => setFilterType(f)} className={`px-6 py-2 rounded-full text-sm font-bold capitalize transition-all ${filterType === f ? 'bg-white dark:bg-slate-700 shadow-md text-blue-600' : 'hover:bg-gray-300 dark:hover:bg-slate-700 opacity-60 hover:opacity-100'}`}>{f}</button>))}</div>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((prop, idx) => (
              <FadeInSection key={prop.id} delay={`${idx * 100}ms`}>
                <div onClick={() => setSelectedProperty(prop)} className={`group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer ${theme.cardBg} border ${theme.border} h-full flex flex-col`}>
                  <div className="relative h-72 overflow-hidden">
                    <img src={prop.image} alt={prop.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute top-4 left-4 z-10"><span className="bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1"><Star size={10} fill="currentColor" /> {prop.tag}</span></div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"><div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-white text-black px-6 py-3 rounded-full font-bold shadow-xl">View Details</div></div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4"><h3 className="text-xl font-bold truncate pr-4 group-hover:text-blue-600 transition-colors font-serif">{prop.title}</h3><p className="text-blue-600 font-bold text-lg whitespace-nowrap">{prop.price}</p></div>
                    <div className={`flex items-center gap-2 text-sm mb-6 ${theme.textMuted}`}><MapPin size={16} className="shrink-0" /><span className="truncate">{prop.address}</span></div>
                    <div className={`mt-auto flex justify-between border-t ${theme.border} pt-6`}>
                      <div className="flex flex-col items-center gap-1"><Bed size={20} className="text-blue-500" /><span className="text-xs font-bold">{prop.beds} Beds</span></div>
                      <div className="w-px bg-gray-200 dark:bg-slate-700"></div>
                      <div className="flex flex-col items-center gap-1"><Bath size={20} className="text-blue-500" /><span className="text-xs font-bold">{prop.baths} Baths</span></div>
                      <div className="w-px bg-gray-200 dark:bg-slate-700"></div>
                      <div className="flex flex-col items-center gap-1"><Maximize size={20} className="text-blue-500" /><span className="text-xs font-bold">{prop.sqft} sqft</span></div>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className={`py-32 px-4 overflow-hidden relative ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="w-full lg:w-1/2 relative">
              <FadeInSection className="relative z-10">
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-700">
                  <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Asset Real Estate Team" className="w-full h-auto transform hover:scale-105 transition-transform duration-700" />
                  <div className="absolute bottom-0 right-0 bg-blue-600 text-white p-6 rounded-tl-[2rem]"><p className="text-4xl font-bold">35+</p><p className="text-sm uppercase tracking-wider">Years of Excellence</p></div>
                </div>
              </FadeInSection>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 dark:bg-slate-600 rounded-full blur-3xl opacity-50 animate-pulse"></div>
              <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
            </div>
            <div className="w-full lg:w-1/2">
              <FadeInSection delay="200ms">
                <div className="flex items-center gap-2 mb-6"><FinalLogo className="w-12 h-auto" /><span className="font-bold tracking-widest uppercase text-blue-600">Our Story</span></div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">Decades of Trust in <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Real Estate</span></h2>
                <p className={`text-lg mb-6 leading-relaxed ${theme.textMuted}`}>Founded by passionate experts, Asset Real Estate has been a pillar in the community since 1991. We don't just sell houses; we help families find their setting for life's most cherished memories.</p>
                <div className="grid grid-cols-2 gap-10 mb-10 border-t border-gray-200 dark:border-gray-700 pt-10">
                  <div><h4 className="text-5xl font-bold text-blue-600 mb-2">1k+</h4><p className="text-base font-medium opacity-70">Properties Sold</p></div>
                  <div><h4 className="text-5xl font-bold text-blue-600 mb-2">99%</h4><p className="text-base font-medium opacity-70">Client Satisfaction</p></div>
                </div>
                <div className="flex gap-4 items-center">
                   <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Founder" className="w-14 h-14 rounded-full border-2 border-blue-600 shadow-lg" />
                   <div><p className="font-bold text-lg">Farooq Sait</p><p className={`text-sm ${theme.textMuted}`}>Founder & CEO</p></div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className={`py-32 px-4 relative ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto max-w-6xl">
          <FadeInSection>
            <div className={`rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row ${theme.cardBg}`}>
              <div className="w-full lg:w-5/12 bg-blue-600 text-white p-12 md:p-16 flex flex-col justify-between relative overflow-hidden">
                 <div className="relative z-10">
                   <h3 className="text-3xl font-bold mb-6 font-serif">Get In Touch</h3>
                   <p className="text-blue-100 mb-12 text-lg">Contact us today for a free consultation.</p>
                   <div className="space-y-8">
                      <div className="flex items-center gap-5"><div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm"><Phone size={24}/></div><div><p className="text-xs text-blue-200 uppercase tracking-wider mb-1">Phone</p><p className="font-bold text-lg">+91 986114121</p></div></div>
                      <div className="flex items-center gap-5"><div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm"><MapPin size={24}/></div><div><p className="text-xs text-blue-200 uppercase tracking-wider mb-1">Office</p><p className="font-bold text-lg">North Rd, Da Costa Square,<br/>Thomas Town, Cooke Town,<br/>Bengaluru, Karnataka 560084</p></div></div>
                      <div className="flex items-center gap-5"><div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm"><Info size={24}/></div><div><p className="text-xs text-blue-200 uppercase tracking-wider mb-1">Email</p><p className="font-bold text-lg">info@assetrealestate.com</p></div></div>
                   </div>
                 </div>
                 <div className="mt-16 relative z-10">
                    <p className="text-sm text-blue-200 mb-4">Follow us on social media</p>
                    <div className="flex gap-4">
                       {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (<div key={i} className="p-3 bg-white/10 hover:bg-white/30 rounded-full cursor-pointer transition-all hover:-translate-y-1"><Icon size={20} /></div>))}
                    </div>
                 </div>
                 <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-500 rounded-full opacity-50 blur-3xl"></div>
                 <div className="absolute top-12 -right-12 w-40 h-40 bg-blue-400 rounded-full opacity-30 blur-2xl"></div>
              </div>
              <div className="w-full lg:w-7/12 p-12 md:p-16">
                 <h3 className="text-3xl font-bold mb-8 font-serif">Send us a Message</h3>
                 <form className="space-y-6" onSubmit={handleContactSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <input required type="text" className={`w-full p-4 rounded-xl border outline-none ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'}`} placeholder="First Name" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                       <input required type="text" className={`w-full p-4 rounded-xl border outline-none ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'}`} placeholder="Last Name" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                    </div>
                    <input required type="email" className={`w-full p-4 rounded-xl border outline-none ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'}`} placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    <textarea required rows="4" className={`w-full p-4 rounded-xl border outline-none ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'}`} placeholder="Message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
                    <button type="submit" className="w-full bg-slate-900 dark:bg-blue-600 text-white font-bold py-5 rounded-xl hover:opacity-90 transition-all">Send Message</button>
                 </form>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      <footer className={`${darkMode ? 'bg-black text-gray-400' : 'bg-slate-900 text-gray-400'} pt-20 pb-10 border-t border-gray-800`}>
         <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="col-span-1 md:col-span-1">
                <div className="flex items-center gap-3 mb-6"><FinalLogo className="h-14 w-auto" /><span className="text-xl font-bold text-white tracking-widest">ASSET</span></div>
                <p className="text-sm opacity-60 leading-relaxed mb-6">Asset Real Estate represents the highest level of service and expertise in the luxury real estate market.</p>
              </div>
              <div><h4 className="text-white font-bold mb-6">Properties</h4><ul className="space-y-4 text-sm"><li className="hover:text-blue-500 cursor-pointer">Featured Listings</li><li className="hover:text-blue-500 cursor-pointer">Sold Properties</li></ul></div>
              <div><h4 className="text-white font-bold mb-6">Company</h4><ul className="space-y-4 text-sm"><li className="hover:text-blue-500 cursor-pointer">About Us</li><li className="hover:text-blue-500 cursor-pointer">Contact</li></ul></div>
              <div><h4 className="text-white font-bold mb-6">Newsletter</h4><p className="text-sm opacity-60 mb-4">Subscribe for market updates.</p><div className="flex"><input type="text" placeholder="Your email" className="bg-gray-800 border-none rounded-l-lg p-3 text-sm w-full outline-none" /><button className="bg-blue-600 text-white px-4 rounded-r-lg"><ArrowRight/></button></div></div>
            </div>
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-50">
               <p>&copy; {new Date().getFullYear()} Asset Real Estate. All rights reserved.</p>
               <div className="flex gap-6"><a href="#" className="hover:text-white">Privacy Policy</a><a href="#" className="hover:text-white">Terms</a></div>
            </div>
         </div>
      </footer>
    </div>
  );
}