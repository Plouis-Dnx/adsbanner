import { useEffect, useState } from "react";
import useAds from "../hooks/useAds";

function AdsBanner() {
    const {ads, enable, loading, error} = useAds(); // Get data
    const [currentIndex, setCurrentIndex] = useState(0); // Change ad
    const [closed, setClosed] = useState(false); // Close pop-up
    const [isFading, setIsFading] = useState(false); // Fading animation

    useEffect(() => {
        if (ads.length <= 1) return;

        const interval = setInterval(() => {
            setIsFading(true);

            setTimeout(() => {
                setCurrentIndex(prev => (prev + 1) % ads.length);
                setIsFading(false);
            }, 300);
        }, 2000);

        return () => clearInterval(interval);
    }, [ads]);

    if (loading) {
        return (
            <div className="w-full h-40 bg-blue-300 rounded-xl animate-pulse"></div>
        );
    }

    if(!enable || closed) return null;
    if(error) return <p> Error : {error}</p>;
    if(!ads.length) return null; // No ads

    const ad = ads[currentIndex];
    return(
        <div className="relative max-w-xl mx-auto">
            <button onClick={() => setClosed(true)} 
                className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-black/70 transition">
                x
            </button>

            <a href={ad.link} target="_blank" rel="noopener noreferrer" className="block max-w-xl mx-auto">
                <img src={ad.image_url} alt="Ad" 
                    className={`w-full h-auto rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 ${ isFading ? "fade-out" : "fade-in" }`} />
            </a>

        </div>
    );
}

export default AdsBanner;