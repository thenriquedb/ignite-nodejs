interface ICar {
  id: string;
  name: string;
  brand: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  available: boolean;
  category_id: string;
  created_at: string;
}

export { ICar };
