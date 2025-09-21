import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useDonation } from '../../contexts/DonationContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const DonorDashboard = () => {
  const { user } = useAuth();
  const { loadUserDonations, donations } = useDonation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserDonations(user.id);
      setLoading(false);
    }
  }, [user]);

  const totalDonated = donations.reduce((sum, donation) => sum + donation.amount, 0);
  const totalCampaigns = new Set(donations.map(d => d.campaignId)).size;

  // Prepare data for charts
  const monthlyData = donations.reduce((acc, donation) => {
    const month = new Date(donation.date).toLocaleDateString('en-US', { month: 'short' });
    const existing = acc.find(item => item.month === month);
    if (existing) {
      existing.amount += donation.amount;
      existing.count += 1;
    } else {
      acc.push({ month, amount: donation.amount, count: 1 });
    }
    return acc;
  }, []);

  const categoryData = donations.reduce((acc, donation) => {
    const category = donation.campaignTitle.split(' ')[0]; // Simplified category extraction
    const existing = acc.find(item => item.name === category);
    if (existing) {
      existing.value += donation.amount;
    } else {
      acc.push({ name: category, value: donation.amount });
    }
    return acc;
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Here's your donation activity and impact summary.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {totalDonated.toLocaleString()}
              </div>
              <div className="text-gray-600">Total Donated (PKR)</div>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {donations.length}
              </div>
              <div className="text-gray-600">Total Donations</div>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {totalCampaigns}
              </div>
              <div className="text-gray-600">Campaigns Supported</div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Donations Chart */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Monthly Donations
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`PKR ${value.toLocaleString()}`, 'Amount']} />
                  <Bar dataKey="amount" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Category Distribution */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Donation by Category
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`PKR ${value.toLocaleString()}`, 'Amount']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Recent Donations */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Donations
            </h3>
            <Button variant="outline" as={Link} to="/campaigns">
              Browse More Campaigns
            </Button>
          </div>

          {donations.length > 0 ? (
            <div className="space-y-4">
              {donations.slice(0, 5).map((donation) => (
                <div
                  key={donation.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {donation.campaignTitle}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {new Date(donation.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">
                      PKR {donation.amount.toLocaleString()}
                    </div>
                    <Badge variant="success" size="sm">
                      Completed
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💝</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No donations yet
              </h3>
              <p className="text-gray-600 mb-4">
                Start making a difference by supporting a cause you care about.
              </p>
              <Button as={Link} to="/campaigns">
                Browse Campaigns
              </Button>
            </div>
          )}
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="font-semibold text-gray-900 mb-2">Find Causes</h3>
            <p className="text-gray-600 text-sm mb-4">
              Discover new campaigns that align with your values
            </p>
            <Button variant="outline" as={Link} to="/campaigns">
              Browse Campaigns
            </Button>
          </Card>

          <Card className="text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="font-semibold text-gray-900 mb-2">Track Impact</h3>
            <p className="text-gray-600 text-sm mb-4">
              See how your donations are making a real difference
            </p>
            <Button variant="outline" as={Link} to="/donations">
              View History
            </Button>
          </Card>

          <Card className="text-center">
            <div className="text-4xl mb-4">⚙️</div>
            <h3 className="font-semibold text-gray-900 mb-2">Account Settings</h3>
            <p className="text-gray-600 text-sm mb-4">
              Manage your profile and notification preferences
            </p>
            <Button variant="outline" as={Link} to="/profile">
              Settings
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
