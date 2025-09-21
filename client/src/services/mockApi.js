// Mock API for donation platform
// This simulates backend API calls with localStorage persistence

// Seed data for campaigns
const seedCampaigns = [
  {
    id: 1,
    title: "Emergency Relief for Flood Victims",
    description: "Help provide immediate relief to families affected by recent floods. Your donation will go towards food, clean water, medical supplies, and temporary shelter.",
    longDescription: "The recent floods have displaced thousands of families, leaving them without basic necessities. This campaign aims to provide immediate relief including food packages, clean drinking water, medical supplies, and temporary shelter. We work with local communities to ensure aid reaches those most in need. Every donation, no matter the size, makes a difference in rebuilding lives.",
    category: "Emergency Relief",
    targetAmount: 500000,
    raisedAmount: 320000,
    donorCount: 1247,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    organizer: {
      name: "Hope Foundation",
      logo: "https://images.unsplash.com/photo-1599305445771-b38fe0ba9f08?w=100&h=100&fit=crop",
      verified: true
    },
    location: "Sindh, Pakistan",
    endDate: "2024-12-31",
    status: "active",
    featured: true,
    updates: [
      {
        id: 1,
        title: "First Aid Distribution Complete",
        content: "We've successfully distributed first aid kits to 500 families in the affected areas.",
        date: "2024-01-15",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
      },
      {
        id: 2,
        title: "Food Packages Delivered",
        content: "Over 1000 food packages have been delivered to families in need.",
        date: "2024-01-10",
        image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=300&fit=crop"
      }
    ],
    faqs: [
      {
        question: "How will my donation be used?",
        answer: "Your donation will be used to provide immediate relief including food, water, medical supplies, and temporary shelter to flood-affected families."
      },
      {
        question: "Is this organization verified?",
        answer: "Yes, Hope Foundation is a registered NGO with 10+ years of experience in disaster relief."
      },
      {
        question: "Can I track how my donation is used?",
        answer: "Yes, we provide regular updates on our website and social media about how funds are being used."
      }
    ]
  },
  {
    id: 2,
    title: "Education for Underprivileged Children",
    description: "Support education for children from low-income families. Help us build schools and provide educational materials.",
    longDescription: "Education is the key to breaking the cycle of poverty. This campaign focuses on building schools in rural areas and providing educational materials, uniforms, and meals for underprivileged children. We believe every child deserves access to quality education regardless of their economic background.",
    category: "Education",
    targetAmount: 300000,
    raisedAmount: 180000,
    donorCount: 892,
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=600&fit=crop",
    organizer: {
      name: "Education First",
      logo: "https://images.unsplash.com/photo-1599305445771-b38fe0ba9f08?w=100&h=100&fit=crop",
      verified: true
    },
    location: "Punjab, Pakistan",
    endDate: "2024-11-30",
    status: "active",
    featured: true,
    updates: [],
    faqs: []
  },
  {
    id: 3,
    title: "Clean Water Initiative",
    description: "Provide clean drinking water to communities without access to safe water sources.",
    longDescription: "Access to clean water is a basic human right. This initiative aims to install water filtration systems and wells in communities that currently lack access to safe drinking water.",
    category: "Health & Water",
    targetAmount: 200000,
    raisedAmount: 95000,
    donorCount: 456,
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=600&fit=crop",
    organizer: {
      name: "Water for All",
      logo: "https://images.unsplash.com/photo-1599305445771-b38fe0ba9f08?w=100&h=100&fit=crop",
      verified: true
    },
    location: "Balochistan, Pakistan",
    endDate: "2024-10-15",
    status: "active",
    featured: false,
    updates: [],
    faqs: []
  },
  {
    id: 4,
    title: "Medical Equipment for Rural Hospital",
    description: "Help equip a rural hospital with essential medical equipment to serve the community better.",
    longDescription: "Rural hospitals often lack basic medical equipment. This campaign aims to provide essential medical equipment to improve healthcare services in underserved areas.",
    category: "Healthcare",
    targetAmount: 400000,
    raisedAmount: 250000,
    donorCount: 678,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
    organizer: {
      name: "Health Care Foundation",
      logo: "https://images.unsplash.com/photo-1599305445771-b38fe0ba9f08?w=100&h=100&fit=crop",
      verified: true
    },
    location: "KPK, Pakistan",
    endDate: "2024-12-15",
    status: "active",
    featured: false,
    updates: [],
    faqs: []
  },
  {
    id: 5,
    title: "Women's Empowerment Program",
    description: "Support women's skill development and entrepreneurship programs in rural communities.",
    longDescription: "Empowering women creates stronger communities. This program provides skill development training, microfinance opportunities, and entrepreneurship support to women in rural areas.",
    category: "Women's Rights",
    targetAmount: 150000,
    raisedAmount: 75000,
    donorCount: 234,
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=600&fit=crop",
    organizer: {
      name: "Women's Rights Organization",
      logo: "https://images.unsplash.com/photo-1599305445771-b38fe0ba9f08?w=100&h=100&fit=crop",
      verified: true
    },
    location: "Sindh, Pakistan",
    endDate: "2024-09-30",
    status: "active",
    featured: false,
    updates: [],
    faqs: []
  },
  {
    id: 6,
    title: "Orphanage Support Fund",
    description: "Provide ongoing support for orphaned children including food, education, and healthcare.",
    longDescription: "Every child deserves love, care, and opportunities. This fund provides ongoing support for orphaned children, covering their basic needs and educational expenses.",
    category: "Children",
    targetAmount: 100000,
    raisedAmount: 45000,
    donorCount: 189,
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop",
    organizer: {
      name: "Children's Hope",
      logo: "https://images.unsplash.com/photo-1599305445771-b38fe0ba9f08?w=100&h=100&fit=crop",
      verified: true
    },
    location: "Islamabad, Pakistan",
    endDate: "2024-08-31",
    status: "active",
    featured: false,
    updates: [],
    faqs: []
  }
];

// Seed data for categories
const seedCategories = [
  { id: 1, name: "Emergency Relief", icon: "🚨", color: "red" },
  { id: 2, name: "Education", icon: "📚", color: "blue" },
  { id: 3, name: "Health & Water", icon: "💧", color: "cyan" },
  { id: 4, name: "Healthcare", icon: "🏥", color: "green" },
  { id: 5, name: "Women's Rights", icon: "👩", color: "pink" },
  { id: 6, name: "Children", icon: "👶", color: "orange" },
  { id: 7, name: "Environment", icon: "🌱", color: "emerald" },
  { id: 8, name: "Community", icon: "🤝", color: "purple" }
];

// Mock API class
class MockAPI {
  constructor() {
    this.baseURL = '/api';
    this.init();
  }

  init() {
    // Initialize localStorage with seed data if not exists
    if (!localStorage.getItem('donation_campaigns')) {
      localStorage.setItem('donation_campaigns', JSON.stringify(seedCampaigns));
    }
    if (!localStorage.getItem('donation_categories')) {
      localStorage.setItem('donation_categories', JSON.stringify(seedCategories));
    }
    if (!localStorage.getItem('donation_donations')) {
      localStorage.setItem('donation_donations', JSON.stringify([]));
    }
    if (!localStorage.getItem('donation_users')) {
      localStorage.setItem('donation_users', JSON.stringify([]));
    }
  }

  // Simulate network delay
  delay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Get campaigns
  async getCampaigns(filters = {}) {
    await this.delay();
    let campaigns = JSON.parse(localStorage.getItem('donation_campaigns'));
    
    // Apply filters
    if (filters.category) {
      campaigns = campaigns.filter(c => c.category === filters.category);
    }
    if (filters.search) {
      campaigns = campaigns.filter(c => 
        c.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        c.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.status) {
      campaigns = campaigns.filter(c => c.status === filters.status);
    }
    if (filters.featured) {
      campaigns = campaigns.filter(c => c.featured);
    }

    // Apply sorting
    if (filters.sort === 'newest') {
      campaigns.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
    } else if (filters.sort === 'most_funded') {
      campaigns.sort((a, b) => b.raisedAmount - a.raisedAmount);
    } else if (filters.sort === 'most_donors') {
      campaigns.sort((a, b) => b.donorCount - a.donorCount);
    }

    return campaigns;
  }

  // Get single campaign
  async getCampaign(id) {
    await this.delay();
    const campaigns = JSON.parse(localStorage.getItem('donation_campaigns'));
    return campaigns.find(c => c.id === parseInt(id));
  }

  // Get categories
  async getCategories() {
    await this.delay();
    return JSON.parse(localStorage.getItem('donation_categories'));
  }

  // Create donation
  async createDonation(donationData) {
    await this.delay();
    const donations = JSON.parse(localStorage.getItem('donation_donations'));
    const campaigns = JSON.parse(localStorage.getItem('donation_campaigns'));
    
    const donation = {
      id: Date.now(),
      ...donationData,
      date: new Date().toISOString(),
      status: 'completed'
    };

    // Update campaign raised amount
    const campaignIndex = campaigns.findIndex(c => c.id === donation.campaignId);
    if (campaignIndex !== -1) {
      campaigns[campaignIndex].raisedAmount += donation.amount;
      campaigns[campaignIndex].donorCount += 1;
      localStorage.setItem('donation_campaigns', JSON.stringify(campaigns));
    }

    donations.push(donation);
    localStorage.setItem('donation_donations', JSON.stringify(donations));

    return donation;
  }

  // Get user donations
  async getUserDonations(userId) {
    await this.delay();
    const donations = JSON.parse(localStorage.getItem('donation_donations'));
    return donations.filter(d => d.userId === userId);
  }

  // Auth methods
  async login(credentials) {
    await this.delay();
    const users = JSON.parse(localStorage.getItem('donation_users'));
    const user = users.find(u => u.email === credentials.email);
    
    if (user && user.password === credentials.password) {
      const token = 'mock_jwt_' + Date.now();
      localStorage.setItem('donation_auth_token', token);
      localStorage.setItem('donation_current_user', JSON.stringify(user));
      return { user, token };
    }
    throw new Error('Invalid credentials');
  }

  async register(userData) {
    await this.delay();
    const users = JSON.parse(localStorage.getItem('donation_users'));
    
    if (users.find(u => u.email === userData.email)) {
      throw new Error('User already exists');
    }

    const user = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString()
    };

    users.push(user);
    localStorage.setItem('donation_users', JSON.stringify(users));

    const token = 'mock_jwt_' + Date.now();
    localStorage.setItem('donation_auth_token', token);
    localStorage.setItem('donation_current_user', JSON.stringify(user));
    
    return { user, token };
  }

  async logout() {
    localStorage.removeItem('donation_auth_token');
    localStorage.removeItem('donation_current_user');
  }

  async getCurrentUser() {
    const token = localStorage.getItem('donation_auth_token');
    if (!token) return null;
    
    const user = localStorage.getItem('donation_current_user');
    return user ? JSON.parse(user) : null;
  }

  // Create campaign (for NGOs)
  async createCampaign(campaignData) {
    await this.delay();
    const campaigns = JSON.parse(localStorage.getItem('donation_campaigns'));
    const campaign = {
      id: Date.now(),
      ...campaignData,
      raisedAmount: 0,
      donorCount: 0,
      status: 'active',
      featured: false,
      updates: [],
      faqs: []
    };

    campaigns.push(campaign);
    localStorage.setItem('donation_campaigns', JSON.stringify(campaigns));
    return campaign;
  }

  // Get user campaigns (for NGOs)
  async getUserCampaigns(userId) {
    await this.delay();
    const campaigns = JSON.parse(localStorage.getItem('donation_campaigns'));
    return campaigns.filter(c => c.organizer.id === userId);
  }

  // Get stats
  async getStats() {
    await this.delay();
    const campaigns = JSON.parse(localStorage.getItem('donation_campaigns'));
    const donations = JSON.parse(localStorage.getItem('donation_donations'));
    
    const totalRaised = campaigns.reduce((sum, c) => sum + c.raisedAmount, 0);
    const totalDonors = donations.length;
    const totalCampaigns = campaigns.length;
    const activeCampaigns = campaigns.filter(c => c.status === 'active').length;

    return {
      totalRaised,
      totalDonors,
      totalCampaigns,
      activeCampaigns
    };
  }
}

// Create singleton instance
const mockAPI = new MockAPI();

export default mockAPI;
