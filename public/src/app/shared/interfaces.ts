export interface User {
  id?: string,
  isAdmin: boolean;
  name: string,
  email: string,
  password: string
}

export interface Genres {
  _id?: string,
  name: string
}

export interface Movie {
  _id?: string,
  title: string,
  genreId: string,
  numberInStock: number,
  dailyRentalRate: number
}

export interface Rental {
  _id?: string,
  customerId: string,
  movieId: string,
  customer?: Customer,
  movie?: Movie,
  dateOut?: Date,
  dateReturned?: Date,
  rentalFee?: number
}

export interface Customer {
  _id?: string,
  name: string,
  phone: string,
  isGold?: boolean
}

export interface Filter {
  start?: Date
  end?: Date
  rental?: number
}
