export enum Mode {
  Weather,
  Settings,
}

export interface Location {
  fetchedAt: number; // milliseconds
  data: any;
}
