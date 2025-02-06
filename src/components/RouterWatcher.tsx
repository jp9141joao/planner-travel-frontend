import { NewLifecycle, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom"
import { getItemSessionStorage, setItemSessionStorage } from "./utils/utils";
import { getTrip } from "@/service/service";
import TripDetails from "@/pages/TripDetails";

export const RouterWatcher = () => {
    const location = useLocation();


    useEffect(() => {
        const path: string | null = getItemSessionStorage('currentPath');

        if (!path) {
            setItemSessionStorage('currentPath', location.pathname);
        } else {
            setItemSessionStorage('currentPath', location.pathname);
            setItemSessionStorage('previousPath', path);
        }

        const currentPath: string | null = getItemSessionStorage('currentPath');
        const previousPath: string | null = getItemSessionStorage('previousPath');
        const verifyA = previousPath && currentPath == '/viewTrips' && ['/tripDetails','/editTrip'].includes(previousPath);
        const verifyB = currentPath && !['/viewTrips' ,'/tripDetails','/editTrip'].includes(currentPath);
        const verifyC = previousPath && !['/viewTrips' ,'/tripDetails','/editTrip'].includes(previousPath);
        
        if (verifyA || verifyB || verifyC) {
            sessionStorage.removeItem('tripId');
        }
    }, [location.pathname]);

    return null;
  };