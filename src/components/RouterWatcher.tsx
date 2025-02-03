import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom"

export const RouterWatcher = () => {
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState<string | null>(null);
    const [previousPath, setPreviousPath] = useState<string | null>(null);

    useEffect(() => {

        if ((previousPath && (previousPath == '/tripDetails' || previousPath == '/editTrip') && previousPath != currentPath) || ((currentPath == '/tripDetails' || currentPath == '/editTrip') && previousPath != currentPath)) {
            sessionStorage.removeItem('tripId');
        }
    }, [currentPath, previousPath])
  
    useEffect(() => {
        if (!currentPath) {
            setCurrentPath(location.pathname);
        }else if (currentPath) {
            setPreviousPath(currentPath);
            setCurrentPath(location.pathname);
        }
  
    }, [location.pathname]);
  
    return null;
  };