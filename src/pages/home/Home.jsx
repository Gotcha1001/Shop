import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { auth, db } from "../../Firebaseconfig/firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

import Spinner from "../../SpecialSetups/Spinner";

const Home = () => {
    const adminEmail = "admin@example.com";

    const [backgroundMediaUrl, setBackgroundMediaUrl] = useState("");
    const [mainImageUrl, setMainImageUrl] = useState("");
    const [showBackgroundDialog, setShowBackgroundDialog] = useState(false);
    const [showMainImageDialog, setShowMainImageDialog] = useState(false);
    const [newMediaUrl, setNewMediaUrl] = useState("");
    const [isBackgroundVideo, setIsBackgroundVideo] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const [hasProfile, setHasProfile] = useState(false); // State to track if the user has a profile
    const [isLoading, setIsLoading] = useState(true); // State for loading state

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setCurrentUser(user.email);
                setIsAdmin(user.email === adminEmail);
                checkUserProfile(user.uid); // Check if user has a profile
            } else {
                setCurrentUser(null);
                setIsAdmin(false);
                setHasProfile(false); // Reset profile status when user logs out
            }
        });

        const fetchBackgroundMedia = async () => {
            try {
                const docRef = doc(collection(db, "settings"), "background");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setBackgroundMediaUrl(data.backgroundMediaUrl || "");
                    setIsBackgroundVideo(data.isBackgroundVideo || false);
                    setMainImageUrl(data.mainImageUrl || "");
                    console.log("Fetched Data:", data); // Verify data fetched
                    console.log("Main Image URL:", data.mainImageUrl); // Verify URL
                } else {
                    setBackgroundMediaUrl("");
                    setIsBackgroundVideo(false);
                    setMainImageUrl("");
                }
            } catch (error) {
                console.error("Error fetching background media:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBackgroundMedia();
    }, []);

    const checkUserProfile = async (uid) => {
        try {
            const profileRef = doc(db, "profiles", uid);
            const profileSnap = await getDoc(profileRef);
            if (profileSnap.exists()) {
                setHasProfile(true);
            } else {
                setHasProfile(false);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    const handleBackgroundMediaSubmit = async () => {
        const isVideo = newMediaUrl.endsWith(".mp4");
        setBackgroundMediaUrl(newMediaUrl);
        setIsBackgroundVideo(isVideo);
        setShowBackgroundDialog(false);
        setNewMediaUrl("");

        const docRef = doc(collection(db, "settings"), "background");
        await setDoc(docRef, { backgroundMediaUrl: newMediaUrl, isBackgroundVideo: isVideo, mainImageUrl }); // Update background media
    };

    const handleMainImageUrlSubmit = async () => {
        setMainImageUrl(newMediaUrl);
        setShowMainImageDialog(false);
        setNewMediaUrl("");

        const docRef = doc(collection(db, "settings"), "background");
        await setDoc(docRef, { backgroundMediaUrl, isBackgroundVideo, mainImageUrl: newMediaUrl }); // Update main image URL
    };


    useEffect(() => {
        console.log("Main Image URL updated:", mainImageUrl);
    }, [mainImageUrl]);




    if (isLoading) {
        return <Spinner />; // Show spinner while loading
    }

    return (
        <div
            className="relative flex min-h-screen flex-col items-center justify-start p-4"
            style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                filter: "brightness(90%)", // slightly reduce brightness
            }}
        >
            {isBackgroundVideo ? (
                <video
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    src={backgroundMediaUrl}
                    autoPlay
                    loop
                    muted
                />
            ) : (
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        backgroundImage: `url(${backgroundMediaUrl})`,
                    }}
                />
            )}

            {currentUser === adminEmail && (
                <>
                    <button
                        className="relative left-4 top-3 z-10 mb-4 rounded-full bg-teal-600 px-4 py-2 text-white shadow-lg transition-colors duration-300 hover:bg-teal-700 md:left-3"
                        onClick={() => setShowBackgroundDialog(true)}
                    >
                        Change Background
                    </button>
                    <button
                        className="relative left-4 top-3 z-10 mb-4 rounded-full bg-teal-600 px-4 py-2 text-white shadow-lg transition-colors duration-300 hover:bg-teal-700 md:left-3"
                        onClick={() => setShowMainImageDialog(true)}
                    >
                        Change Main Image
                    </button>
                </>
            )}

            <h1 className="gradient-background1 mb-8 rounded-full p-3 text-center text-3xl font-bold text-white hover:bg-teal-600 md:text-4xl">
                CODE NOW
            </h1>

            {/* Main Image Changeable */}
            <div className="mb-8 w-full max-w-xl md:w-3/4">
                <img
                    src={mainImageUrl}
                    alt="Main Image"
                    className="zoom mx-auto rounded-lg shadow-lg"
                    style={{
                        maxWidth: "100%",
                        height: "auto",
                        display: 'block',
                        position: 'relative', // Required for z-index to work
                        zIndex: 10           // Apply the z-index here
                    }}
                />
            </div>


            {/* Profile Button
            {currentUser && (
                <>
                    {hasProfile ? (
                        <button
                            className=" animate-bounce mb-4 rounded-full bg-teal-600 px-4 py-2 text-white shadow-lg transition-colors duration-300 hover:bg-teal-700"
                            onClick={openProfileDialog}
                        >
                            Change Profile
                        </button>
                    ) : (
                        <button
                            className="zoom mb-4 rounded-full bg-teal-600 px-4 py-2 text-white shadow-2xl transition-colors duration-300 hover:bg-black"
                            onClick={openProfileDialog}
                        >
                            Create Profile
                        </button>
                    )}
                </>
            )} */}


            {/* Background Carousel */}
            <Carousel
                className="mb-8 w-full md:w-3/4"
                style={{ maxWidth: "600px" }}
                interval={1000}
            >
                <Carousel.Item>
                    <img
                        className="d-block w-full transform rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                        src="https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-full transform rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                        src="https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-full transform rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                        src="https://images.pexels.com/photos/2983364/pexels-photo-2983364.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-full transform rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                        src="https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="Fourth slide"
                    />
                </Carousel.Item>

            </Carousel>

            {/* Artwork Grid */}
            <div className="mt-4 grid w-full grid-cols-1 gap-4 md:w-3/4 md:grid-cols-2 lg:grid-cols-3">
                <div className="h-64 w-full transform overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                    <img
                        className="object-co h-full w-full"
                        src="https://images.pexels.com/photos/50987/money-card-business-credit-card-50987.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="Artwork"
                    />
                </div>
                <div className="h-64 w-full transform overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                    <img
                        className="h-full w-full object-cover"
                        src="https://images.pexels.com/photos/6413702/pexels-photo-6413702.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="Artwork"
                    />
                </div>
                <div className="h-64 w-full transform overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                    <img
                        className="h-full w-full object-cover"
                        src="https://images.pexels.com/photos/6214390/pexels-photo-6214390.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="Artwork"
                    />
                </div>
                <div className="h-64 w-full transform overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                    <img
                        className="h-full w-full object-cover"
                        src="https://images.pexels.com/photos/2876659/pexels-photo-2876659.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="Artwork"
                    />
                </div>
                <div className="h-64 w-full transform overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                    <img
                        className="h-full w-full object-cover"
                        src="https://images.pexels.com/photos/6969975/pexels-photo-6969975.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="Artwork"
                    />
                </div>
                <div className="h-64 w-full transform overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                    <img
                        className="h-full w-full object-cover"
                        src="https://images.pexels.com/photos/5264947/pexels-photo-5264947.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="Artwork"
                    />
                </div>
            </div>

            {/* Background Media Dialog */}
            {showBackgroundDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                        <h2 className="mb-4 text-xl font-semibold">
                            Enter Background Media URL
                        </h2>
                        <input
                            type="text"
                            value={newMediaUrl}
                            onChange={(e) => setNewMediaUrl(e.target.value)}
                            placeholder="Enter image or video URL"
                            className="mb-4 w-full rounded border border-gray-300 p-2"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowBackgroundDialog(false)}
                                className="mr-2 rounded bg-gray-300 px-4 py-2 text-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleBackgroundMediaSubmit}
                                className="rounded bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Image URL Dialog */}
            {showMainImageDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                        <h2 className="mb-4 text-xl font-semibold">
                            Enter Main Image URL
                        </h2>
                        <input
                            type="text"
                            value={newMediaUrl}
                            onChange={(e) => setNewMediaUrl(e.target.value)}
                            placeholder="Enter image URL"
                            className="mb-4 w-full rounded border border-gray-300 p-2"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowMainImageDialog(false)}
                                className="mr-2 rounded bg-gray-300 px-4 py-2 text-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleMainImageUrlSubmit}
                                className="rounded bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Home;
