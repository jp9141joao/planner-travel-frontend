import { NewLifecycle, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom"
import { getItemSessionStorage, setItemSessionStorage } from "./utils/utils";
import { getTrip } from "@/service/service";
import TripDetails from "@/pages/TripDetails";
import { useToast } from "@/hooks/use-toast";

export const RouterWatcher = () => {
    const location = useLocation();
    const { dismiss } = useToast();


    useEffect(() => {
        const path: string | null = getItemSessionStorage('currentPath');

        if (!path) {
            setItemSessionStorage('currentPath', location.pathname);
        } else {
            setItemSessionStorage('currentPath', location.pathname);
            setItemSessionStorage('previousPath', path);
        }

        const mainPaths = ['/viewTrips' ,'/tripDetails']
        const alterPaths = ['/viewExpenses', '/itinerary', '/toDoList', '/MyPiggyBank'];
        const currentPath: string | null = getItemSessionStorage('currentPath');
        const previousPath: string | null = getItemSessionStorage('previousPath');
        const verifyA = currentPath && previousPath && ['/viewTrips', '/tripDetails', '/selectTrip'].includes(currentPath) && [...alterPaths, '/tripDetails','/editTrip'].includes(previousPath) ;
        const verifyB = currentPath && ![...mainPaths, ...alterPaths, '/editTrip'].includes(currentPath);
        const verifyC = previousPath && ![...mainPaths,...alterPaths, '/editTrip'].includes(previousPath);
        
        if (verifyA || verifyB || verifyC) {
            sessionStorage.removeItem('tripId');
        }

        if (currentPath != previousPath) {
            dismiss();
        }
    }, [location.pathname]);

    return null;
  };