export interface Dimensions {
  readonly width: number;
  readonly height: number;
  readonly depth: number;
}

export interface Review {
  readonly rating: number;
  readonly comment: string;
  readonly date: string;
  readonly reviewerName: string;
  readonly reviewerEmail: string;
}

export interface ProductMeta {
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly barcode: string;
  readonly qrCode: string;
}

export interface Product {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly price: number;
  readonly discountPercentage: number;
  readonly rating: number;
  readonly stock: number;
  readonly tags: readonly string[];
  readonly brand?: string;
  readonly sku: string;
  readonly weight: number;
  readonly dimensions: Dimensions;
  readonly warrantyInformation: string;
  readonly shippingInformation: string;
  readonly availabilityStatus: string;
  readonly reviews: readonly Review[];
  readonly returnPolicy: string;
  readonly minimumOrderQuantity: number;
  readonly meta: ProductMeta;
  readonly thumbnail: string;
  readonly images: readonly string[];
}
