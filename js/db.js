/**
 * Romlue Energy - LocalStorage Database Simulation
 * Handles data persistence for Inquiries, Products, and Settings.
 */

const DB_KEYS = {
    INQUIRIES: 'romlue_inquiries',
    PRODUCTS: 'romlue_products',
    SETTINGS: 'romlue_settings',
    USER: 'romlue_admin_user'
};

const DB = {
    // --- Inquiries ---
    getInquiries: () => {
        const data = localStorage.getItem(DB_KEYS.INQUIRIES);
        return data ? JSON.parse(data) : [];
    },

    saveInquiry: (inquiry) => {
        const inquiries = DB.getInquiries();
        const newInquiry = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            read: false,
            ...inquiry
        };
        inquiries.unshift(newInquiry);
        localStorage.setItem(DB_KEYS.INQUIRIES, JSON.stringify(inquiries));
        return newInquiry;
    },

    markInquiryRead: (id) => {
        const inquiries = DB.getInquiries();
        const index = inquiries.findIndex(i => i.id === id);
        if (index !== -1) {
            inquiries[index].read = true;
            localStorage.setItem(DB_KEYS.INQUIRIES, JSON.stringify(inquiries));
        }
    },

    deleteInquiry: (id) => {
        let inquiries = DB.getInquiries();
        inquiries = inquiries.filter(i => i.id !== id);
        localStorage.setItem(DB_KEYS.INQUIRIES, JSON.stringify(inquiries));
    },

    // --- Products ---
    getProducts: () => {
        const data = localStorage.getItem(DB_KEYS.PRODUCTS);
        if (!data) {
            const defaults = [
                { id: '1', name: 'BrightCell 400W Solar Panel', category: 'Solar Panel', price: '85000', stock: '50', description: 'Premium monocrystalline panels with 22% efficiency rating', image: '../assets/images/Image 6.jpg' },
                { id: '2', name: 'SunFlow 8KW Hybrid Inverter', category: 'Inverters', price: '420000', stock: '12', description: 'Advanced MPPT technology with grid-tie capability', image: '../assets/images/Image20.jpg' },
                { id: '3', name: 'PowerVault LiFePO4 50KWh', category: 'Battery', price: '2500000', stock: '5', description: 'Industrial battery with 10,000 cycle lifespan', image: '../assets/images/Image 2.jpeg' },
                { id: '4', name: 'Super 360 Degree CCTV Camera', category: 'CCTVs', price: '45000', stock: '30', description: 'Advanced surveillance with night vision', image: '../assets/images/Image 12.jpg' },
                { id: '5', name: 'SnapRail Aluminum Mount System', category: 'Mounting Hardware', price: '150000', stock: '20', description: 'Corrosion-resistant mounting for 10+ panels', image: '../assets/images/Image 5.jpg' },
                { id: '6', name: 'Mono 550W High Efficiency Panel', category: 'Solar Panel', price: '95000', stock: '40', description: 'Ultra-high efficiency monocrystalline solar panel', image: '../assets/images/image15.jpg' },
                { id: '7', name: 'PowerTech 10KVA Inverter', category: 'Inverters', price: '550000', stock: '8', description: 'Industrial grade pure sine wave inverter', image: '../assets/images/Image20.jpg' },
                { id: '8', name: 'LithiumMax 100Ah Battery', category: 'Battery', price: '350000', stock: '15', description: 'Long-lasting lithium iron phosphate battery', image: '../assets/images/Image 2.jpeg' },
                { id: '9', name: '4K Dome CCTV System', category: 'CCTVs', price: '65000', stock: '25', description: '4K resolution with AI motion detection', image: '../assets/images/Image 12.jpg' },
                { id: '10', name: 'Ground Mount Rack Kit', category: 'Mounting Hardware', price: '85000', stock: '35', description: 'Heavy-duty ground mounting system for large arrays', image: '../assets/images/Image 5.jpg' }
            ];
            localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(defaults));
            return defaults;
        }
        return JSON.parse(data);
    },

    saveProduct: (product) => {
        const products = DB.getProducts();
        if (product.id) {
            const index = products.findIndex(p => p.id === product.id);
            if (index !== -1) products[index] = product;
        } else {
            product.id = Date.now().toString();
            products.push(product);
        }
        localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(products));
        return product;
    },

    deleteProduct: (id) => {
        let products = DB.getProducts();
        products = products.filter(p => p.id !== id);
        localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(products));
    },

    // --- Settings ---
    getSettings: () => {
        const data = localStorage.getItem(DB_KEYS.SETTINGS);
        return data ? JSON.parse(data) : {
            siteName: 'Romlue Energy',
            contactEmail: 'romlueenergy@gmail.com',
            phone: '08036372483'
        };
    },

    saveSettings: (settings) => {
        localStorage.setItem(DB_KEYS.SETTINGS, JSON.stringify(settings));
    },

    // --- Stats ---
    getStats: () => {
        const inquiries = DB.getInquiries();
        const products = DB.getProducts();
        return {
            inquiriesCount: inquiries.length,
            unreadInquiries: inquiries.filter(i => !i.read).length,
            productsCount: products.length,
            revenue: '850,000'
        };
    }
};

window.RomlueDB = DB;
