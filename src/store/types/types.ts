import { SellersState } from '../modules/sellers';
import { GameState } from '../modules/game';
import { ImagesState } from '../modules/images';

export interface RootState {
  sellers: SellersState;
  game: GameState;
  images: ImagesState;
}


export interface ImageItem {
    id: string;
    url: string;
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
  }
  