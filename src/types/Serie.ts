export interface Serie {
  id: number;
  name: string;
  image: {
    medium: string;
    original: string;
  } | null;
  genres: string[];
  summary: string;
  rating: {
    average: number | null;
  };
}