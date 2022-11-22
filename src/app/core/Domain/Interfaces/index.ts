
export interface iCategory{
    nombre: string;
    foto: string;
}

type BannerType = "banner-card" | "banner-foto" | "banner-slide"
export interface iBanner{
    title: string;
    subtitle: string;
    dead_line: Date;
    url: string;
    foto: string;
    enabled: boolean;
    type: BannerType;
}


export interface iProduct {
    id?: string;
    nombre: string;
    codigo: string;
    foto: string;
    precio_venta: string;
    categoria: string;
    en_oferta: boolean;
    descuento: number;
    rate: number;
    contenido: number;
    medida: string;
    cantidad?: number;
}

export interface iLike {
    likes: number;
}

export interface iUser {
    username: string;
    email: string;
    phone: string;
    password?: string;
    sessionToken?: string;
    emailVerified?: boolean;
}

export interface iAddress {
    direccion: string;
    piso: string;
    indicaciones: string;
    nombre: string;
    principal: boolean;
}

export interface iOrder {
    fecha: Date;
    user: iUser;
    importe: number;
    estado: OrderEstatus;
}

type OrderEstatus = "procesando" | "aceptado" | "enviado" | "entregado"