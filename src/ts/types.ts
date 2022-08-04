export enum Mode {
  Weather,
  Settings,
}

export interface Location {
  //city: string;
  fetchedAt: number; // milliseconds
  data: any;
}
