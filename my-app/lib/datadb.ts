import type { CustomersProps } from "./definitions";
import bruceImg from '@/public/assets/images/users/bruce.jpg';
import celestineImg from '@/public/assets/images/users/celestine.jpg';
import justineImg from '@/public/assets/images/users/justine.jpg';
import jasonImg from '@/public/assets/images/users/jason.png';
import rebeccaImg from '@/public/assets/images/users/rebecca.jpg';
import paulaImg from '@/public/assets/images/users/paula.jpg';
import koalaImg from '@/public/assets/images/users/user_icon.jpg';
import MariaImg from '@/public/assets/images/users/maria.jpg';

export const customers: CustomersProps[] = [
    {
        id: 1,
        username: "Emil",
        lastname: "Nier",
        img: bruceImg,
        spend: 44,
        artQuantity: 9,
        address: "not set",
        country: "Germany",
        city: "Berlin",
        isConnected: true
    },
    {
        id: 2,
        username: "Devola",
        lastname: "Twins",
        img: celestineImg,
        spend: 109,
        artQuantity: 17,
        address: "not set",
        country: "Japan",
        city: "Kasugai",
        isConnected: false
    },
    {
        id: 3,
        username: "Natacha",
        lastname: "Romanoff",
        img: justineImg,
        spend: 232,
        artQuantity: 23,
        address: "not set",
        country: "Japan",
        city: "Narita",
        isConnected: true
    },
    {
        id: 4,
        username: "Clark",
        lastname: "Kent",
        img: jasonImg,
        spend: 232,
        artQuantity: 77,
        address: "not set",
        country: "USA",
        city: "Metropolis",
        isConnected: true
    },
    {
        id: 5,
        username: "Rebecca",
        lastname: "Miller",
        img: rebeccaImg,
        spend: 232,
        artQuantity: 102,
        address: "not set",
        country: "USA",
        city: "Gotham City",
        isConnected: false
    },
    {
        id: 6,
        username: "Paula",
        lastname: "Bell",
        img: paulaImg,
        spend: 232,
        artQuantity: 231,
        address: "Kungsbroplan 1",
        country: "Sweden",
        city: "Stockholm",
        isConnected: true
    },
    {
        id: 7,
        username: "Esteban",
        lastname: "Catanea",
        img: koalaImg,
        spend: 177,
        artQuantity: 33,
        address: "Spychertenstrasse 3",
        country: "Switzerland",
        city: "Thun",
        isConnected: true
    },
    {
        id: 8,
        username: "Maria",
        lastname: "Solengard",
        img: MariaImg,
        spend: 442,
        artQuantity: 53,
        address: "Vester Voldgade 4",
        country: "Denmark",
        city: "Copenhagen",
        isConnected: false
    }
];