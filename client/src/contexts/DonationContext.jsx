import React, { createContext, useContext, useState, useEffect } from 'react';
import mockAPI from '../services/mockApi';
import toast from 'react-hot-toast';

const DonationContext = createContext();

export const useDonation = () => {
  const context = useContext(DonationContext);
  if (!context) {
    throw new Error('useDonation must be used within a DonationProvider');
  }
  return context;
};

export const DonationProvider = ({ children }) => {
  const [donations, setDonations] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({
    totalRaised: 0,
    totalDonors: 0,
    totalCampaigns: 0,
    activeCampaigns: 0
  });
  const [loading, setLoading] = useState(false);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [campaignsData, categoriesData, statsData] = await Promise.all([
        mockAPI.getCampaigns(),
        mockAPI.getCategories(),
        mockAPI.getStats()
      ]);
      
      setCampaigns(campaignsData);
      setCategories(categoriesData);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to load initial data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const loadCampaigns = async (filters = {}) => {
    setLoading(true);
    try {
      const campaignsData = await mockAPI.getCampaigns(filters);
      setCampaigns(campaignsData);
      return campaignsData;
    } catch (error) {
      console.error('Failed to load campaigns:', error);
      toast.error('Failed to load campaigns');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const loadCampaign = async (id) => {
    try {
      const campaign = await mockAPI.getCampaign(id);
      return campaign;
    } catch (error) {
      console.error('Failed to load campaign:', error);
      toast.error('Failed to load campaign details');
      return null;
    }
  };

  const loadUserDonations = async (userId) => {
    try {
      const userDonations = await mockAPI.getUserDonations(userId);
      setDonations(userDonations);
      return userDonations;
    } catch (error) {
      console.error('Failed to load user donations:', error);
      toast.error('Failed to load donation history');
      return [];
    }
  };

  const makeDonation = async (donationData) => {
    try {
      const donation = await mockAPI.createDonation(donationData);
      
      // Update local state
      setDonations(prev => [...prev, donation]);
      
      // Reload campaigns to update raised amounts
      await loadCampaigns();
      
      // Reload stats
      const newStats = await mockAPI.getStats();
      setStats(newStats);
      
      toast.success('Donation successful! Thank you for your contribution.');
      return donation;
    } catch (error) {
      console.error('Donation failed:', error);
      toast.error('Donation failed. Please try again.');
      throw error;
    }
  };

  const createCampaign = async (campaignData) => {
    try {
      const campaign = await mockAPI.createCampaign(campaignData);
      
      // Update local state
      setCampaigns(prev => [...prev, campaign]);
      
      toast.success('Campaign created successfully!');
      return campaign;
    } catch (error) {
      console.error('Campaign creation failed:', error);
      toast.error('Failed to create campaign');
      throw error;
    }
  };

  const loadUserCampaigns = async (userId) => {
    try {
      const userCampaigns = await mockAPI.getUserCampaigns(userId);
      return userCampaigns;
    } catch (error) {
      console.error('Failed to load user campaigns:', error);
      toast.error('Failed to load your campaigns');
      return [];
    }
  };

  const value = {
    donations,
    campaigns,
    categories,
    stats,
    loading,
    loadCampaigns,
    loadCampaign,
    loadUserDonations,
    makeDonation,
    createCampaign,
    loadUserCampaigns,
    refreshStats: loadInitialData
  };

  return (
    <DonationContext.Provider value={value}>
      {children}
    </DonationContext.Provider>
  );
};
