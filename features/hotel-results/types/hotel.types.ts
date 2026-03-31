export type Hotel = {
  id: number;
  name: string;
  price: number;
  rating: number;
  location: string;
  image: string;
  distance?: number;
};

export type CreateHotelPayload = Omit<Hotel, "id">;
