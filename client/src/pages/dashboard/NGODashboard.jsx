import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useDonation } from '../../contexts/DonationContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import toast from 'react-hot-toast';

const NGODashboard = () => {
  const { user } = useAuth();
  const { createCampaign, loadUserCampaigns } = useDonation();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    category: '',
    targetAmount: '',
    image: '',
    location: '',
    endDate: ''
  });

  useEffect(() => {
    if (user) {
      loadCampaigns();
    }
  }, [user]);

  const loadCampaigns = async () => {
    setLoading(true);
    try {
      const userCampaigns = await loadUserCampaigns(user.id);
      setCampaigns(userCampaigns);
    } catch (error) {
      console.error('Failed to load campaigns:', error);
      toast.error('Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    setCreateLoading(true);

    try {
      const campaignData = {
        ...formData,
        targetAmount: parseFloat(formData.targetAmount),
        organizer: {
          id: user.id,
          name: user.name,
          logo: `https://ui-avatars.com/api/?name=${user.name}&background=blue&color=white`,
          verified: true
        }
      };

      await createCampaign(campaignData);
      await loadCampaigns();
      setShowCreateModal(false);
      setFormData({
        title: '',
        description: '',
        longDescription: '',
        category: '',
        targetAmount: '',
        image: '',
        location: '',
        endDate: ''
      });
    } catch (error) {
      console.error('Failed to create campaign:', error);
      toast.error('Failed to create campaign');
    } finally {
      setCreateLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const totalRaised = campaigns.reduce((sum, campaign) => sum + campaign.raisedAmount, 0);
  const totalDonors = campaigns.reduce((sum, campaign) => sum + campaign.donorCount, 0);
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;

  // Prepare data for charts
  const campaignData = campaigns.map(campaign => ({
    name: campaign.title.length > 20 ? campaign.title.substring(0, 20) + '...' : campaign.title,
    raised: campaign.raisedAmount,
    target: campaign.targetAmount,
    donors: campaign.donorCount
  }));

  const categories = [
    'Emergency Relief',
    'Education',
    'Health & Water',
    'Healthcare',
    'Women\'s Rights',
    'Children',
    'Environment',
    'Community'
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-300 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              NGO Dashboard
            </h1>
            <p className="text-gray-600">
              Manage your campaigns and track your impact
            </p>
          </div>
          <Button onClick={() => setShowCreateModal(true)}>
            Create Campaign
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {totalRaised.toLocaleString()}
              </div>
              <div className="text-gray-600">Total Raised (PKR)</div>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {totalDonors}
              </div>
              <div className="text-gray-600">Total Donors</div>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {activeCampaigns}
              </div>
              <div className="text-gray-600">Active Campaigns</div>
            </div>
          </Card>
        </div>

        {/* Charts */}
        {campaigns.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Campaign Performance
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={campaignData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip formatter={(value) => [`PKR ${value.toLocaleString()}`, 'Amount']} />
                    <Bar dataKey="raised" fill="#10B981" name="Raised" />
                    <Bar dataKey="target" fill="#E5E7EB" name="Target" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Donor Growth
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={campaignData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="donors" stroke="#3B82F6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        )}

        {/* Campaigns List */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Your Campaigns
            </h3>
            <Badge variant="primary">
              {campaigns.length} Total
            </Badge>
          </div>

          {campaigns.length > 0 ? (
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {campaign.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {campaign.category} • {campaign.location}
                      </p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-500">
                          Raised: PKR {campaign.raisedAmount.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500">
                          Goal: PKR {campaign.targetAmount.toLocaleString()}
                        </span>
                        <Badge variant={campaign.status === 'active' ? 'success' : 'default'}>
                          {campaign.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      as={Link}
                      to={`/campaigns/${campaign.id}`}
                    >
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No campaigns yet
              </h3>
              <p className="text-gray-600 mb-4">
                Create your first campaign to start raising funds for your cause.
              </p>
              <Button onClick={() => setShowCreateModal(true)}>
                Create Your First Campaign
              </Button>
            </div>
          )}
        </Card>

        {/* Create Campaign Modal */}
        <Modal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title="Create New Campaign"
          size="lg"
        >
          <form onSubmit={handleCreateCampaign} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Campaign Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter campaign title"
              />

              <Input
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                as="select"
              >
                <option value="">Select category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </Input>
            </div>

            <Input
              label="Short Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Brief description of your campaign"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Detailed Story
              </label>
              <textarea
                name="longDescription"
                value={formData.longDescription}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tell the full story of your campaign"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Target Amount (PKR)"
                name="targetAmount"
                type="number"
                value={formData.targetAmount}
                onChange={handleChange}
                required
                placeholder="Enter target amount"
                min="1000"
              />

              <Input
                label="End Date"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Image URL"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                placeholder="https://example.com/image.jpg"
              />

              <Input
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="City, Country"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={createLoading}
                disabled={createLoading}
              >
                Create Campaign
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default NGODashboard;
