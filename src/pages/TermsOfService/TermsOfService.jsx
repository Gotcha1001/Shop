import React from 'react';

export default function TermsOfService() {
    return (
        <section className="p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 2xl:p-16 bg-gradient-to-r from-blue-400 to-white">
            {/* Title */}
            <div className="text-center font-serif text-4xl font-bold text-primary-950 mb-8">
                Terms of Service
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-black p-4 rounded-lg shadow-lg flex items-center justify-center">
                    <img
                        src="https://images.pexels.com/photos/5632406/pexels-photo-5632406.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="Shopping Image 1"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                <div className="bg-black p-4 rounded-lg shadow-lg flex items-center justify-center">
                    <img
                        src="https://images.pexels.com/photos/5632391/pexels-photo-5632391.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="Shopping Image 2"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                <div className="bg-black p-4 rounded-lg shadow-lg flex items-center justify-center">
                    <img
                        src="https://images.pexels.com/photos/5632405/pexels-photo-5632405.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="Shopping Image 3"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
            </div>

            {/* Terms of Service Content */}
            <div className="bg-black text-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-center">Terms and Conditions</h2>
                <p className="text-lg mb-4">
                    Welcome to [Your Shopping Cart Name]! By using our website and purchasing products through our platform, you agree to the following terms and conditions. Please read them carefully.
                </p>
                <p className="text-lg mb-4">
                    1. **Use of Service**: Our e-commerce platform allows you to browse, select, and purchase various products. By using our platform, you agree to provide accurate information during checkout and follow our payment policies.
                </p>
                <p className="text-lg mb-4">
                    2. **Payment and Billing**: All payments must be made upfront through our supported payment methods. Please ensure your billing information is up to date and accurate. We reserve the right to cancel or refuse any order for any reason.
                </p>
                <p className="text-lg mb-4">
                    3. **Shipping and Delivery**: We aim to provide timely shipping and delivery of all products. However, delivery times may vary based on your location and other factors. You will receive a tracking number once your order has been dispatched.
                </p>
                <p className="text-lg mb-4">
                    4. **Returns and Refunds**: You may request a return or refund under certain conditions, as detailed in our return policy. Please review our return policy for more information on eligible products and timelines.
                </p>
                <p className="text-lg mb-4">
                    5. **User Conduct**: By using our platform, you agree to refrain from any illegal or harmful activity. Misuse of the platform, such as fraudulent transactions or unauthorized access, may result in account suspension or legal action.
                </p>
                <p className="text-lg mb-4">
                    6. **Liability**: We are not liable for any damages, losses, or delays caused by third-party services such as shipping providers or payment gateways. Your use of our platform is at your own risk.
                </p>
                <p className="text-lg">
                    If you have any questions regarding our terms of service, please contact our support team at <a href="mailto:wesleyolivier443@gmail.com" className="text-yellow-300 hover:underline">WesleyOlivier443@gmail.com</a>.
                </p>
            </div>
        </section>
    );
}
