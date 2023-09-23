export interface IProduct {
  id?: number
  title: string, // don't forget to change the property to name
  price: number,
  category: string,
  description: string,
  image: string,
  in_stock: boolean
}

export interface ICart {
  id: number,
  quantity: number
}
