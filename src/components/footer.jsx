import React from 'react';
import { NavLink } from 'react-router-dom';


const Footer = () => {
    const playClickSound = () => {
        const clickSound = new Audio("/Put.mp3");
        clickSound.play();
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="gradient-background2 text-white py-6">
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
                <ul className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <li>
                        <NavLink
                            to="/data-protection"
                            onClick={playClickSound}
                            className={({ isActive }) =>
                                isActive ? "text-teal-400" : "text-gray-100 hover:text-teal-300"
                            }
                        >
                            Data Protection
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/terms-of-service"
                            onClick={playClickSound}
                            className={({ isActive }) =>
                                isActive ? "text-teal-400" : "text-gray-100 hover:text-teal-300"
                            }
                        >
                            Terms of Service
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/privacy"
                            onClick={playClickSound}
                            className={({ isActive }) =>
                                isActive ? "text-teal-400" : "text-gray-100 hover:text-teal-300"
                            }
                        >
                            Privacy Policy
                        </NavLink>
                    </li>
                </ul>



                <div className="mt-6 sm:mt-0 flex items-center mb-5">
                    <img
                        src="/Logo.png"
                        alt="Art"
                        className="horizontal-spin"
                        style={{ height: '150px', width: '150px' }}
                    />
                </div>

            </div>

            <div className="text-center mt-4">
                <p className="text-sm text-black">&copy; {currentYear} CODENOW101. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
