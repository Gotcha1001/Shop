import React from 'react';

const PaymentNotify = () => {
    // This route will be hit by PayFast for notifications. It might not need a specific UI,
    // as it is mainly for backend processing. You may log the details or update the payment status in your backend.

    return (
        <div>
            <h1>Payment Notification Received</h1>
            <p>This page handles payment notifications from PayFast.</p>
        </div>
    );
};

export default PaymentNotify;
