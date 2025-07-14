import { BsBuildings } from "react-icons/bs";
import { CiHardDrive } from "react-icons/ci";
import { FcLandscape } from "react-icons/fc";
import { LuTableProperties } from "react-icons/lu";
import { PiBuildingApartmentDuotone } from "react-icons/pi";

export const services = [
  {
    name:"Lands", 
    img: <FcLandscape />,
    des: "Vast lands available for residential, commercial, or agricultural development."
  },
  {
    name:"Buildings", 
    img: <BsBuildings />,
    des: "Diverse selection of commercial buildings, offices, and retail spaces."
  },
  {
    name:"Residential Homes", 
    img: <PiBuildingApartmentDuotone />,
    des: "Find your dream home from our exclusive collection of houses and apartment"
  },
  {
    name:"Cars & Bikes", 
    img: <CiHardDrive />,
    des: "Premium vehicles, from luxury cars to reliable motorcycles, for every need."
  },
  {
    name:"House & Office Properties", 
    img: <LuTableProperties />,
    des: "Integrated solutions for both residential living and professional oddice space"
  },
];