import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDonation } from '../contexts/DonationContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import CampaignCard from '../components/campaigns/CampaignCard';

const Home = () => {
  const { campaigns, stats, loadCampaigns } = useDonation();
  const [featuredCampaigns, setFeaturedCampaigns] = useState([]);

  useEffect(() => {
    loadCampaigns({ featured: true });
  }, []);

  useEffect(() => {
    setFeaturedCampaigns(campaigns.filter(c => c.featured).slice(0, 3));
  }, [campaigns]);

  const statsData = [
    {
      number: stats.totalRaised.toLocaleString(),
      label: 'Total Raised',
      icon: '💰',
    },
    {
      number: stats.totalDonors.toLocaleString(),
      label: 'Donors',
      icon: '👥',
    },
    {
      number: stats.totalCampaigns.toLocaleString(),
      label: 'Campaigns',
      icon: '🎯',
    },
    {
      number: stats.activeCampaigns.toLocaleString(),
      label: 'Active Now',
      icon: '⚡',
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Make a Difference
              <span className="block text-gray-300">One Donation at a Time</span>
            </h1>
            <p className="text-xl md:text-2xl text-white-400 mb-8 max-w-3xl mx-auto">
              Connect with causes that matter to you. Support verified campaigns and see the impact of your generosity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="outline"
                as={Link}
                to="/campaigns"
                className="bg-white text-black border border-black hover:bg-gray-100"
              >
                Browse Campaigns
              </Button>
              <Button
                size="lg"
                variant="outline"
                as={Link}
                to="/register"
                className="border-white text-white hover:bg-white hover:text-black"
              >
                Start Donating
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Featured Campaigns
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover verified campaigns making a real impact in communities around the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              as={Link}
              to="/campaigns"
              className="bg-black text-white hover:bg-gray-800"
            >
              View All Campaigns
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple steps to make a meaningful impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Browse Campaigns', description: 'Explore verified campaigns and find causes that resonate with you.', icon: '🔍' },
              { step: '2', title: 'Choose Amount', description: 'Select a donation amount or choose from preset options.', icon: '💳' },
              { step: '3', title: 'Make Impact', description: 'Your donation goes directly to the cause and makes a real difference.', icon: '✨' }
            ].map((item, index) => (
              <Card key={index} className="text-center">
                <div className="text-6xl mb-4">{item.icon}</div>
                <div className="text-2xl font-bold text-black mb-2">{item.step}</div>
                <h3 className="text-xl font-semibold text-black mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Why Trust DonateHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We ensure your donations reach the right people and make real impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Verified Organizations', description: 'All campaigns are verified and vetted by our team.', icon: '✅' },
              { title: 'Transparent Process', description: 'Track how your donations are used with regular updates.', icon: '📊' },
              { title: 'Secure Payments', description: 'Your payment information is encrypted and secure.', icon: '🔒' },
              { title: 'Direct Impact', description: '100% of donations go directly to the cause.', icon: '🎯' }
            ].map((item, index) => (
              <Card key={index} className="text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-black mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of donors who are already making an impact. Every donation counts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="outline"
              as={Link}
              to="/campaigns"
              className="border-white text-white hover:bg-white hover:text-black"
            >
              Start Donating
            </Button>
            <Button
              size="lg"
              variant="outline"
              as={Link}
              to="/register"
              className="border-white text-white hover:bg-white hover:text-black"
            >
              Create Account
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
