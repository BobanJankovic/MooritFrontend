export class Mooring {
    id?: number;
    name?: string;
    length?: number;
    width?: number;
    isOccupied?: boolean;
    latitude?: number;
    longitude?: number;
    price?: number;
    locationId?: number;
    location?: {
        id?: number;
        name?: string;
        latitude?: number;
        longitude?: number;
        moorings?: object[]
    }
}
