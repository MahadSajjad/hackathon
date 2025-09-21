import React, { useState, useEffect } from 'react';
import { useDonation } from '../contexts/DonationContext';
import CampaignCard from '../components/campaigns/CampaignCard';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';

const Campaigns = () => {
  const { campaigns, categories, loadCampaigns, loading } = useDonation();
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    sort: 'newest'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 9;

  useEffect(() => {
    loadCampaigns(filters);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    handleFilterChange('search', e.target.value);
  };

  const handleCategoryChange = (category) => {
    handleFilterChange('category', category === filters.category ? '' : category);
  };

  const handleSortChange = (sort) => {
    handleFilterChange('sort', sort);
  };

  const clearFilters = () => {
    setFilters({ search: '', category: '', sort: 'newest' });
  };

  const paginatedCampaigns = campaigns.slice(
    (currentPage - 1) * campaignsPerPage,
    currentPage * campaignsPerPage
  );

  const totalPages = Math.ceil(campaigns.length / campaignsPerPage);

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'most_funded', label: 'Most Funded' },
    { value: 'most_donors', label: 'Most Donors' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Discover Campaigns
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find causes that matter to you and make a meaningful impact
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <div className="space-y-6">
            {/* Search */}
            <div>
              <Input
                type="text"
                placeholder="Search campaigns..."
                value={filters.search}
                onChange={handleSearch}
                className="max-w-md"
              />
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={filters.category === '' ? 'primary' : 'default'}
                  className="cursor-pointer"
                  onClick={() => handleCategoryChange('')}
                >
                  All
                </Badge>
                {categories.map((category) => (
                  <Badge
                    key={category.id}
                    variant={filters.category === category.name ? 'primary' : 'default'}
                    className="cursor-pointer"
                    onClick={() => handleCategoryChange(category.name)}
                  >
                    {category.icon} {category.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Sort by:</label>
                <select
                  value={filters.sort}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {(filters.search || filters.category) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {loading ? 'Loading...' : `${campaigns.length} campaigns found`}
          </p>
          {filters.category && (
            <Badge variant="primary">
              {filters.category}
            </Badge>
          )}
        </div>

        {/* Campaigns Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <div className="h-48 bg-gray-300 rounded-t-lg mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 rounded w-full"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                </div>
              </Card>
            ))}
          </div>
        ) : paginatedCampaigns.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </Button>
                  
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    const isCurrentPage = page === currentPage;
                    const isNearCurrentPage = Math.abs(page - currentPage) <= 2;
                    const isFirstPage = page === 1;
                    const isLastPage = page === totalPages;
                    
                    if (isFirstPage || isLastPage || isNearCurrentPage) {
                      return (
                        <Button
                          key={page}
                          variant={isCurrentPage ? 'primary' : 'outline'}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      );
                    } else if (page === 2 || page === totalPages - 1) {
                      return <span key={page} className="px-2 text-gray-500">...</span>;
                    }
                    return null;
                  })}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <Card className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No campaigns found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or browse all campaigns.
            </p>
            <Button onClick={clearFilters}>
              Clear Filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Campaigns;
