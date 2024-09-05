import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Contact() {
    return (
        <section className="p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 2xl:p-16 bg-gray-100">
            <div className="text-center font-serif text-4xl font-bold text-primary-950 mb-8">
                Contact Us
            </div>

            <div className="flex justify-center mb-12">
                <img
                    src="https://images.pexels.com/photos/207489/pexels-photo-207489.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Placeholder Image"
                    className="w-full max-w-2xl rounded-lg shadow-lg"
                />
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-6 mb-8">
                <div className="flex flex-col items-center space-y-4 mt-12">
                </div>

                {/* Contact Info Card */}
                <div className="bg-black text-yellow-500 rounded-lg shadow-lg p-6 w-full sm:w-1/3 mx-auto">
                    <h3 className="text-xl font-bold mb-4 text-center">Contact Information</h3>
                    <div className="flex flex-col items-center mb-4">
                        <a href="tel:+27610910748" className="text-xl font-semibold text-primary-900 flex items-center space-x-2">
                            <i className="fas fa-phone-alt text-primary-900 text-4xl horizontal-spin"></i>
                            <span>078 0077368</span>
                        </a>
                    </div>
                    <p className="mb-2 mt-3 text-center">
                        Email: <a href="mailto:fakeemail@example.com" className="text-yellow-300 hover:underline">wesleyolivier443@gmail.com</a>
                    </p>
                </div>
            </div>

            <div className="flex justify-center mb-8">
                {/* <a href="https://linkedin.com/in/heinrich-visser-29887547" target="_blank" rel="noopener noreferrer" className="text-xl font-semibold flex items-center space-x-2">
                    <svg className="w-12 h-12 horizontal-spin" fill="#0A66C2" viewBox="0 0 24 24">
                        <path d="M19.5 3h-15C3.67 3 3 3.67 3 4.5v15c0 .83.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5v-15c0-.83-.67-1.5-1.5-1.5zM8 17H5v-9h3v9zm-1.5-10.5c-1.09 0-1.5-.77-1.5-1.5S5.41 3 6.5 3s1.5.77 1.5 1.5-1.08 1.5-1.5 1.5zM19 17h-3v-4.5c0-1.07-.03-2.43-1.5-2.43-1.5 0-1.73 1.14-1.73 2.32V17h-3v-9h2.93c.04.5.2.93.54 1.3.8-.83 1.95-1.3 3.35-1.3 3.35V17h3z"></path>
                    </svg>
                </a> */}

                <a href="https://www.facebook.com/profile.php?id=100076128222000&mibextid=qi2Omg&rdid=EvzsXTcUNS6t7TId&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F7b9vuP7z9JvfhdkL%2F%3Fmibextid%3Dqi2Omg" target="_blank" rel="noopener noreferrer">
                    <FaFacebook size={40} className="ml-4 text-blue-600 hover:opacity-75 horizontal-spin" />
                </a>

                <a href="https://wa.me/27780077368" target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp size={40} className="ml-4 text-green-600 hover:opacity-75 horizontal-spin" />
                </a>




            </div>
        </section>
    );
}
