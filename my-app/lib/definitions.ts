export type State = {
    status: "success";
    message: string;} | {
        status: "error";
        message: string;
        errors?: Array<{
            path: string;
            message: string;
        }>;
} | null | undefined;

export type GeoLocationData = {
    ip:	string;
    country_code: string;
    country_name: string;
    region_name: string;
    city_name: string;
    latitude: number;
    longitude: number;
    zip_code: string; 
    time_zone: string; 
    asn: string; 
    as: string; 
    is_proxy: boolean;	
};

export type ListOfItemsProps = {
    readonly id: number;
    readonly item: string;
}

export type EmailProps = {
    id: string;
    src: string;
    message: string;
    dst: string;
    isOpen: boolean;
    createdAt: Date;
}
