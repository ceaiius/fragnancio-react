export interface Filters { 
    price?: string | number;
    price_min?: number;
    price_max?: number;
    brand? : string | number;
    size?: string | number;
    condition?: string | number;
    note?: string | number;
    on_sale?: boolean;
}