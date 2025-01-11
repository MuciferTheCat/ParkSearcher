export interface ParkingSpace {
  id: string;
  center: { lat: number; lon: number };
  tags: Record<string, string>;
}
