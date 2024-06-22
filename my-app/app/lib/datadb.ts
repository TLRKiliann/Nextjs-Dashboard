import type { CustomersProps } from "./definitions";
import bruceImg from '@/public/assets/users/bruce.jpg';
import celestineImg from '@/public/assets/users/celestine.jpg';
import justineImg from '@/public/assets/users/justine.jpg';
import jasonImg from '@/public/assets/users/jason.png';
import rebeccaImg from '@/public/assets/users/rebecca.jpg';
import paulaImg from '@/public/assets/users/paula.jpg';
import koalaImg from '@/public/assets/users/user_icon.jpg';
import MariaImg from '@/public/assets/users/maria.jpg';

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
        connected: true
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
        connected: false
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
        connected: true
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
        connected: true
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
        connected: false
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
        connected: true
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
        connected: true
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
        connected: false
    }
];