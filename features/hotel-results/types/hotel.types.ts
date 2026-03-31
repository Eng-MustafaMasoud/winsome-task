export type Hotel = {
  id: number;
  name: string;
  price: number;
  rating: number;
  location: string;
  image: string;
};

export type CreateHotelPayload = Omit<Hotel, "id">;
