import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDonation } from '../contexts/DonationContext';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import ProgressBar from '../components/ui/ProgressBar';
import Badge from '../components/ui/Badge';
import DonationModal from '../components/campaigns/DonationModal';
import toast from 'react-hot-toast';

const CampaignDetails = () => {
  const { id } = useParams();
  const { loadCampaign, makeDonation } = useDonation();
  const { user } = useAuth();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [activeTab, setActiveTab] = useState('story');

  useEffect(() => {
    loadCampaignDetails();
  }, [id]);

  const loadCampaignDetails = async () => {
    setLoading(true);
    try {
      const campaignData = await loadCampaign(id);
      setCampaign(campaignData);
    } catch (error) {
      console.error('Failed to load campaign:', error);
      toast.error('Failed to load campaign details');
    } finally {
      setLoading(false);
    }
  };

  const handleDonate = async (amount) => {
    if (!user) {
      toast.error('Please login to make a donation');
      return;
    }

    try {
      const donationData = {
        campaignId: campaign.id,
        userId: user.id,
        amount: amount,
        donorName: user.name,
        donorEmail: user.email,
        campaignTitle: campaign.title
      };

      await makeDonation(donationData);
      await loadCampaignDetails(); // Refresh campaign data
    } catch (error) {
      console.error('Donation failed:', error);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: campaign.title,
        text: campaign.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-300 rounded-lg mb-8"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="text-center py-12">
          <div className="text-6xl mb-4">😞</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Campaign not found
          </h3>
          <p className="text-gray-600 mb-4">
            The campaign you're looking for doesn't exist or has been removed.
          </p>
          <Button as={Link} to="/campaigns">
            Browse Campaigns
          </Button>
        </Card>
      </div>
    );
  }

  const progressPercentage = (campaign.raisedAmount / campaign.targetAmount) * 100;
  const daysLeft = Math.ceil((new Date(campaign.endDate) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <div className="relative">
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="primary">
                  {campaign.category}
                </Badge>
              </div>
              {campaign.featured && (
                <div className="absolute top-4 right-4">
                  <Badge variant="warning">
                    Featured
                  </Badge>
                </div>
              )}
            </div>

            {/* Campaign Info */}
            <Card>
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {campaign.title}
                  </h1>
                  <p className="text-lg text-gray-600">
                    {campaign.description}
                  </p>
                </div>

                {/* Organizer */}
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={campaign.organizer.logo}
                    alt={campaign.organizer.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {campaign.organizer.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Badge variant="success" size="sm">
                        Verified
                      </Badge>
                      <span className="text-sm text-gray-600">
                        {campaign.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8">
                    {[
                      { id: 'story', label: 'Story' },
                      { id: 'updates', label: 'Updates' },
                      { id: 'faq', label: 'FAQ' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-2 px-1 border-b-2 font-medium text-sm ${
                          activeTab === tab.id
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="min-h-64">
                  {activeTab === 'story' && (
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed">
                        {campaign.longDescription}
                      </p>
                    </div>
                  )}

                  {activeTab === 'updates' && (
                    <div className="space-y-6">
                      {campaign.updates && campaign.updates.length > 0 ? (
                        campaign.updates.map((update) => (
                          <Card key={update.id}>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-gray-900">
                                  {update.title}
                                </h4>
                                <span className="text-sm text-gray-500">
                                  {new Date(update.date).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-gray-700">{update.content}</p>
                              {update.image && (
                                <img
                                  src={update.image}
                                  alt={update.title}
                                  className="w-full h-48 object-cover rounded-lg"
                                />
                              )}
                            </div>
                          </Card>
                        ))
                      ) : (
                        <p className="text-gray-500 text-center py-8">
                          No updates available yet.
                        </p>
                      )}
                    </div>
                  )}

                  {activeTab === 'faq' && (
                    <div className="space-y-4">
                      {campaign.faqs && campaign.faqs.length > 0 ? (
                        campaign.faqs.map((faq, index) => (
                          <Card key={index}>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">
                                {faq.question}
                              </h4>
                              <p className="text-gray-700">{faq.answer}</p>
                            </div>
                          </Card>
                        ))
                      ) : (
                        <p className="text-gray-500 text-center py-8">
                          No FAQs available yet.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Donation Card */}
            <Card>
              <div className="space-y-6">
                {/* Progress */}
                <div>
                  <ProgressBar
                    value={campaign.raisedAmount}
                    max={campaign.targetAmount}
                    color="blue"
                    showLabel
                    label={`Raised ${campaign.raisedAmount.toLocaleString()}`}
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>Goal: {campaign.targetAmount.toLocaleString()}</span>
                    <span>{progressPercentage.toFixed(1)}%</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {campaign.donorCount}
                    </div>
                    <div className="text-sm text-gray-600">Donors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {daysLeft > 0 ? daysLeft : 0}
                    </div>
                    <div className="text-sm text-gray-600">
                      {daysLeft > 0 ? 'Days Left' : 'Ended'}
                    </div>
                  </div>
                </div>

                {/* Donate Button */}
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => setShowDonationModal(true)}
                >
                  Donate Now
                </Button>

                {/* Share Button */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleShare}
                >
                  Share Campaign
                </Button>
              </div>
            </Card>

            {/* Trust Indicators */}
            <Card>
              <h3 className="font-semibold text-gray-900 mb-4">Why Trust This Campaign?</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <span className="text-sm text-gray-700">Verified Organization</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <span className="text-sm text-gray-700">Regular Updates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <span className="text-sm text-gray-700">Transparent Process</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <span className="text-sm text-gray-700">Secure Payment</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Donation Modal */}
        <DonationModal
          isOpen={showDonationModal}
          onClose={() => setShowDonationModal(false)}
          campaign={campaign}
          onDonate={handleDonate}
        />
      </div>
    </div>
  );
};

export default CampaignDetails;
