import { useStore } from 'vuex';
import { ImageItem, Seller } from '../store/types/types';

export default function useImageFilterAndMapping() {
  const store = useStore();

  // Validate if an image URL is accessible
  const isValidImage = async (url: string): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  // Filter invalid images and assign sellers to images
  const filterAndMapImages = async (images: ImageItem[]): Promise<ImageItem[]> => {
    const sellers = store.state.sellers.sellers;
    const validImages = await Promise.all(
      images.map(async (image) => (await isValidImage(image.url)) ? image : null)
    );
    const filteredImages = validImages.filter(Boolean) as ImageItem[];

    return assignSellersToImages(filteredImages, sellers);
  };

  // Assign sellers to the images
  const assignSellersToImages = (images: ImageItem[], sellers: Seller[]) => {
    return images.map((image, index) => ({
      ...image,
      seller: sellers[index % sellers.length],
    }));
  };

  return {
    isValidImage,
    filterAndMapImages,
    assignSellersToImages
  };
}
