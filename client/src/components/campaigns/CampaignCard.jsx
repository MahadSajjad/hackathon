import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import Badge from '../ui/Badge';
import DonationModal from './DonationModal';

const CampaignCard = ({ campaign, onDonate }) => {
  const [showDonationModal, setShowDonationModal] = useState(false);
  
  const progressPercentage = (campaign.raisedAmount / campaign.targetAmount) * 100;
  const daysLeft = Math.ceil((new Date(campaign.endDate) - new Date()) / (1000 * 60 * 60 * 24));
  
  const handleDonate = (amount) => {
    if (onDonate) {
      onDonate(campaign.id, amount);
    }
    setShowDonationModal(false);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Emergency Relief': 'red',
      'Education': 'blue',
      'Health & Water': 'cyan',
      'Healthcare': 'green',
      'Women\'s Rights': 'pink',
      'Children': 'orange',
      'Environment': 'emerald',
      'Community': 'purple'
    };
    return colors[category] || 'default';
  };

  return (
    <>
      <Card hover className="h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img
            src={campaign.image}
            alt={campaign.title}
            className="w-full h-full object-cover"
          />
          {campaign.featured && (
            <Badge 
              variant="warning" 
              className="absolute top-3 left-3"
            >
              Featured
            </Badge>
          )}
          <Badge 
            variant={getCategoryColor(campaign.category)}
            className="absolute top-3 right-3"
          >
            {campaign.category}
          </Badge>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {campaign.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
            {campaign.description}
          </p>

          {/* Organizer */}
          <div className="flex items-center mb-4">
            <img
              src={campaign.organizer.logo}
              alt={campaign.organizer.name}
              className="w-8 h-8 rounded-full mr-2"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {campaign.organizer.name}
              </p>
              {campaign.organizer.verified && (
                <Badge variant="success" size="sm">
                  Verified
                </Badge>
              )}
            </div>
          </div>

          {/* Progress */}
          <div className="mb-4">
            <ProgressBar
              value={campaign.raisedAmount}
              max={campaign.targetAmount}
              color="blue"
              showLabel
              label={`Raised ${campaign.raisedAmount.toLocaleString()}`}
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>Goal: {campaign.targetAmount.toLocaleString()}</span>
              <span>{progressPercentage.toFixed(1)}%</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-between text-sm text-gray-600 mb-4">
            <span>{campaign.donorCount} donors</span>
            <span>{daysLeft > 0 ? `${daysLeft} days left` : 'Ended'}</span>
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-auto">
            <Button
              variant="primary"
              size="sm"
              className="flex-1"
              onClick={() => setShowDonationModal(true)}
            >
              Donate Now
            </Button>
            <Button
              variant="outline"
              size="sm"
              as={Link}
              to={`/campaigns/${campaign.id}`}
            >
              View Details
            </Button>
          </div>
        </div>
      </Card>

      {/* Donation Modal */}
      <DonationModal
        isOpen={showDonationModal}
        onClose={() => setShowDonationModal(false)}
        campaign={campaign}
        onDonate={handleDonate}
      />
    </>
  );
};

export default CampaignCard;
