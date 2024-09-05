import React from 'react';

export default function PrivacyPolicy() {
    return (
        <section className="p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 2xl:p-16 bg-gradient-to-r from-blue-400 to-white">
            {/* Title */}
            <div className="text-center font-serif text-4xl font-bold text-primary-950 mb-8">
                Privacy Policy
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-black p-4 rounded-lg shadow-lg flex items-center justify-center">
                    <img
                        src="https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Privacy Policy Image 1"
                        className="w-full h-full object-contain rounded-lg"
                    />
                </div>
                <div className="bg-black p-4 rounded-lg shadow-lg flex items-center justify-center">
                    <img
                        src="https://images.pexels.com/photos/5632384/pexels-photo-5632384.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Privacy Policy Image 2"
                        className="w-full h-full object-contain rounded-lg"
                    />
                </div>
                <div className="bg-black p-4 rounded-lg shadow-lg flex items-center justify-center">
                    <img
                        src="https://images.pexels.com/photos/5632400/pexels-photo-5632400.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="Privacy Policy Image 3"
                        className="w-full h-full object-contain rounded-lg"
                    />
                </div>
            </div>

            {/* Privacy Policy Content */}
            <div className="bg-black text-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-center">Privacy Policy</h2>
                <p className="text-lg mb-4">
                    Welcome to ShopEasy! We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your information while you use our shopping services.
                </p>
                <p className="text-lg mb-4">
                    1. **Information Collection**: We collect personal information such as your name, shipping address, email address, and payment details when you make a purchase or create an account on our platform. This helps us process your orders efficiently and keep you informed about your purchases.
                </p>
                <p className="text-lg mb-4">
                    2. **Usage of Information**: Your data is used to facilitate order processing, shipping, and communication regarding your orders. We may also send you promotional emails about new products, special offers, or other updates related to our store.
                </p>
                <p className="text-lg mb-4">
                    3. **Data Security**: Protecting your data is our top priority. We use industry-standard encryption and security protocols to safeguard your personal information during transactions and data storage.
                </p>
                <p className="text-lg mb-4">
                    4. **Third-Party Services**: We work with third-party providers, such as payment processors and shipping companies, to ensure smooth transactions and deliveries. These third parties are required to use your data solely for the purposes of fulfilling your order and must adhere to strict confidentiality agreements.
                </p>
                <p className="text-lg mb-4">
                    5. **Changes to Policy**: This Privacy Policy may be updated periodically to reflect changes in our practices or in the law. We encourage you to review this page regularly for any updates. Your continued use of our services after such updates constitutes your acceptance of the revised policy.
                </p>
                <p className="text-lg">
                    If you have any questions or concerns regarding our Privacy Policy, feel free to contact us at <a href="mailto:WesleyOlivier443@gmail.com" className="text-yellow-300 hover:underline">WesleyOlivier443@gmail.com</a>.
                </p>
            </div>
        </section>
    );
}
