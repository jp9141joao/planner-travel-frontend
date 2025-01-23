import { getUser } from "@/service/service";
import { setItemSessionStorage } from "./utils/utils";
import ImgAdventure from '../assets/undraw_adventure-map_8hg8.svg';
import ImgAdventureMap from '../assets/undraw_adventure-map_8hg8.svg';
import ImgAircraft from '../assets/undraw_aircraft_re_m05i.svg';
import ImgDeparting from '../assets/undraw_departing_010k (2).svg';
import ImgForgotPassword from '../assets/undraw_forgot-password_odai_inverted.svg';
import ImgPageNotFound from '../assets/undraw_page-not-found_6wni.svg';
import ImgTravelers from '../assets/undraw_travelers_re_y25a.svg';
import ImgWorld from '../assets/undraw_world_re_768g.svg';

export const LoadData = async () => {
    try {
        const imgAdventure = new Image();
        imgAdventure.src = ImgAdventure;

        const imgAdventureMap = new Image();
        imgAdventureMap.src = ImgAdventureMap;

        const imgAircraft = new Image();
        imgAircraft.src = ImgAircraft;

        const imgDeparting = new Image();
        imgDeparting.src = ImgDeparting;

        const imgForgotPassword = new Image();
        imgForgotPassword.src = ImgForgotPassword;

        const imgPageNotFound = new Image();
        imgPageNotFound.src = ImgPageNotFound;

        const imgTravelers = new Image();
        imgTravelers.src = ImgTravelers;

        const imgWorld = new Image();
        imgWorld.src = ImgWorld;
        
        const token = localStorage.getItem('authToken');

        if (!token) {
            return;
        }

        const userData = await getUser();

        if (!userData) {
            localStorage.removeItem('authToken');
            throw new Error('User data could not be retrieved from the token. Please try again.');
        }

        setItemSessionStorage('user', userData.data);
    } catch (error: any) {
        console.error(error);
        localStorage.removeItem('authToken');
    }
};