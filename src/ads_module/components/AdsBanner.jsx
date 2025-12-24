import { useEffect, useState } from "react";
import useAds from "../hooks/useAds";

function AdsBanner() {
    const {ads, enable, loading, error} = useAds(); // Retrieve ads, loading state, kill switch, and errors from the custom hook
    const [currentIndex, setCurrentIndex] = useState(0); // Index of the currently displayed ad
    const [closed, setClosed] = useState(false); // Local close state so the user can hide the banner without affecting others
    const [isFading, setIsFading] = useState(false); // Controls fade-in / fade-out animation between ads

    useEffect(() => {
        if (ads.length <= 1) return; // No rotation needed if there's only one ad

        // Automatically rotate ads every 2 seconds with a fade transition
        const interval = setInterval(() => {
            setIsFading(true);

            // Wait for fade-out before switching to the next ad
            setTimeout(() => {
                setCurrentIndex(prev => (prev + 1) % ads.length);
                setIsFading(false); // Trigger fade-in
            }, 300); // Matches CSS fade duration
        }, 2000);

        // Cleanup interval when ads change or component unmounts
        return () => clearInterval(interval);
    }, [ads]);

    // Display loading spinner while fetching data
    if (loading) {
        return (
            <div className="flex justify-center items-center w-full h-40">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>

        );
    }

    if(!enable || closed) return null; // Do not render anything if ads are disabled globally or closed locally
    if(error) return <p> Error : {error}</p>; // Display error message if something went wrong
    if(!ads.length) return null; // No ads available

    const ad = ads[currentIndex];
    return(
        <div className="relative max-w-xl mx-auto">

            {/* Close button — only hides the banner locally */}
            <button onClick={() => setClosed(true)} 
                className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-black/70 transition z-1">
                x
            </button>

            {/* Clickable ad with fade animation */}
            <a href={ad.link} target="_blank" rel="noopener noreferrer" className="block max-w-xl mx-auto">
                <img src={ad.image_url} alt="Ad" 
                    className={`w-full h-auto rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 ${ isFading ? "fade-out" : "fade-in" }`} />
            </a>

        </div>
    );
}

export default AdsBanner;