import type { CustomersProps } from "./definitions";
import bruceImg from '@/public/assets/users/bruce.jpg';
import celestineImg from '@/public/assets/users/celestine.jpg';
import justineImg from '@/public/assets/users/justine.jpg';
import jasonImg from '@/public/assets/users/jason.png';
import rebeccaImg from '@/public/assets/users/rebecca.jpg';
import paulaImg from '@/public/assets/users/paula.jpg';
import MariaImg from '@/public/assets/users/maria.jpg';

export const customers: CustomersProps[] = [
    {
        id: 1,
        username: "Emil",
        lastname: "Nier",
        img: bruceImg,
        spend: 44,
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
        country: "Sweden",
        city: "Stockholm",
        connected: true
    },
    {
        id: 7,
        username: "Maria",
        lastname: "Solengard",
        img: MariaImg,
        spend: 232,
        country: "Denmark",
        city: "Copenhagen",
        connected: false
    }
];