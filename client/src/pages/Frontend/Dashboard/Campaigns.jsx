import React, { useState } from "react";
import { message } from "antd"; // AntD message import

const Campaigns = () => {
    const [campaigns, setCampaigns] = useState([
        { id: 1, title: "Fund for children of underprivileged families", description: "We are a non-profit organization that provides funding for children of underprivileged families.", target: 100000, current: 25000, donateAmount: "" },
        { id: 2, title: "Fund for children of needy families", description: "We are a non-profit organization that provides funding for children of needy families.", target: 50000, current: 10000, donateAmount: "" },
        { id: 3, title: "Fund for Flood affected families", description: "We are a non-profit organization that provides funding for families affected by floods.", target: 200000, current: 75000, donateAmount: "" },
    ]);

    const handleInputChange = (id, value) => {
        setCampaigns((prev) =>
            prev.map((campaign) =>
                campaign.id === id ? { ...campaign, donateAmount: value } : campaign
            )
        );
    };

    const handleDonate = (id) => {
        setCampaigns((prev) =>
            prev.map((campaign) => {
                if (campaign.id === id) {
                    const amount = parseInt(campaign.donateAmount) || 0;
                    if (amount <= 0) {
                        message.error("⚠️ Please enter a valid donation amount");
                        return campaign;
                    }
                    return {
                        ...campaign,
                        current: Math.min(campaign.current + amount, campaign.target),
                        donateAmount: "",
                    };
                }
                return campaign;
            })
        );
    };

    return (
        <div className="container my-5">
            <div className="row">
                {campaigns.map((campaign) => {
                    const progress = Math.min(
                        (campaign.current / campaign.target) * 100,
                        100
                    );

                    return (
                        <div key={campaign.id} className="col-md-4 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{campaign.title}</h5>
                                    <p className="card-text">{campaign.description}</p>

                                    <div className="progress mb-3">
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{ width: `${progress}%` }}
                                            aria-valuenow={progress}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            {progress.toFixed(0)}%
                                        </div>
                                    </div>

                                    <p>
                                        Raised: Rs. {campaign.current} / Rs. {campaign.target}
                                    </p>

                                    <input
                                        type="number"
                                        className="form-control mb-2"
                                        placeholder="Enter amount"
                                        value={campaign.donateAmount}
                                        onChange={(e) =>
                                            handleInputChange(campaign.id, e.target.value)
                                        }
                                    />

                                    <button
                                        className="btn btn-primary m-2"
                                        onClick={() => handleDonate(campaign.id)}
                                    >
                                        Donate Now
                                    </button>
                                    <button className="btn btn-secondary m-2">Learn More</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Campaigns;
