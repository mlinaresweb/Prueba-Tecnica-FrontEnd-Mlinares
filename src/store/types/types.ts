import { SellersState } from '../modules/sellers';
import { GameState } from '../modules/game';
import { ImagesState } from '../modules/images';
import { ClientState } from '../modules/client';

export interface RootState {
  sellers: SellersState;
  game: GameState;
  images: ImagesState;
  client:ClientState;
}


export interface ImageItem {
    id: string;
    url: string;
    link:string;
    seller: {
      id: string;
      name: string;
      points: number;
    };
  }

  export interface AlegraSellerResponse {
    id: string;
    name: string;
    status: string;
  }

  export interface Seller {
    id: string;
    name: string;
    status: string;
    points: number;
    imageUrl?: string;
  }
  export interface Client {
    id?: number;
    name?: string;
    identification?: string;
    phonePrimary?: string;
    phoneSecondary?: string;
    fax?: string;
    mobile?: string;
    email?: string;
    address?: {
      address?: string;
      city?: string;
    };
  }
  
  export interface Item {
    name?: string;
    description?: string | null;
    price?: number;
    discount?: number;
    reference?: string | null;
    quantity?: number;
    id?: number;
    irpfApplied?: boolean;
    tax?: number;
    total?: number;
  }
  
  export interface Factura {
    id?: string;
    date?: Date;
    dueDate?: Date;
    datetime?: string;
    observations?: string | null;
    anotation?: string | null;
    termsConditions?: string | null;
    status?: string;
    client?: Client;
    numberTemplate?: {
      id?: string;
      prefix?: string | null;
      number?: string;
      text?: string | null;
      documentType?: string;
      fullNumber?: string;
      formattedNumber?: string;
    };
    subtotal?: number;
    discount?: number;
    tax?: number;
    total?: number;
    totalPaid?: number;
    balance?: number;
    decimalPrecision?: string;
    warehouse?: {
      id?: string;
      name?: string;
    };
    term?: string;
    equivalenceSurchargeApplied?: boolean;
    paymentMethod?: string | null;
    seller?: {
      id?: string;
      name?: string;
      identification?: string | null;
      observations?: string | null;
    };
    priceList?: {
      id?: number;
      name?: string;
    };
    items?: Item[];
    costCenter?: string | null;
    printingTemplate?: {
      id?: string;
      name?: string;
      pageSize?: string;
    };
  }
  
  export interface GoogleCustomSearchResponse {
    items: ImageItem[];
  }
  
  export interface UnsplashImage {
    id: string;
    urls: { small: string };
    links: { html: string };
  }

  export interface DropdownOption {
    label: string;
    value: string;
  }