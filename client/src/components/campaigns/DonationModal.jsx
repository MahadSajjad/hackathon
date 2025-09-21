import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useDonation } from '../../contexts/DonationContext';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const DonationModal = ({ isOpen, onClose, campaign, onDonate }) => {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [loading, setLoading] = useState(false);
  const { makeDonation } = useDonation();
  const { user } = useAuth();

  const presetAmounts = [500, 1000, 2500, 5000, 10000];

  const handleAmountSelect = (selectedAmount) => {
    setAmount(selectedAmount);
    setIsCustom(false);
    setCustomAmount('');
  };

  const handleCustomAmount = (value) => {
    setCustomAmount(value);
    setAmount(value);
    setIsCustom(true);
  };

  const handleDonate = async () => {
    if (!user) {
      toast.error('Please login to make a donation');
      return;
    }

    const donationAmount = parseFloat(amount);
    
    if (!donationAmount || donationAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (donationAmount < 100) {
      toast.error('Minimum donation amount is Rs. 100');
      return;
    }

    setLoading(true);
    try {
      const donationData = {
        campaignId: campaign.id,
        userId: user.id,
        amount: donationAmount,
        donorName: user.name,
        donorEmail: user.email,
        campaignTitle: campaign.title
      };

      await makeDonation(donationData);
      
      if (onDonate) {
        onDonate(donationAmount);
      }
      
      onClose();
    } catch (error) {
      console.error('Donation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setAmount('');
    setCustomAmount('');
    setIsCustom(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Donate to ${campaign.title}`}
      size="md"
    >
      <div className="space-y-6">
        {/* Campaign Info */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 line-clamp-2">
                {campaign.title}
              </h4>
              <p className="text-sm text-gray-600">
                by {campaign.organizer.name}
              </p>
            </div>
          </div>
        </div>

        {/* Amount Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Amount (PKR)
          </label>
          
          {/* Preset Amounts */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {presetAmounts.map((presetAmount) => (
              <button
                key={presetAmount}
                onClick={() => handleAmountSelect(presetAmount)}
                className={`p-3 text-center border rounded-lg transition-colors ${
                  amount === presetAmount && !isCustom
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                Rs. {presetAmount.toLocaleString()}
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsCustom(true)}
              className={`p-3 text-center border rounded-lg transition-colors ${
                isCustom
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              Custom
            </button>
            {isCustom && (
              <Input
                type="number"
                placeholder="Enter amount"
                value={customAmount}
                onChange={(e) => handleCustomAmount(e.target.value)}
                min="100"
                className="flex-1"
              />
            )}
          </div>
        </div>

        {/* Donation Summary */}
        {amount && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900">Your Donation:</span>
              <span className="text-xl font-bold text-blue-600">
                Rs. {parseFloat(amount).toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              This will help {campaign.organizer.name} reach their goal
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleDonate}
            disabled={!amount || loading}
            loading={loading}
            className="flex-1"
          >
            {loading ? 'Processing...' : 'Donate Now'}
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="text-xs text-gray-500 text-center">
          <p>🔒 Secure donation • 100% goes to the cause • Tax deductible</p>
        </div>
      </div>
    </Modal>
  );
};

export default DonationModal;
