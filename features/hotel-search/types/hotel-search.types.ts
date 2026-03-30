export type LocationOption = {
  label: string;
  value: string;
};

export type GuestsState = {
  adults: number;
  children: number;
  rooms: number;
};

export type SearchFormValues = {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: GuestsState;
};
