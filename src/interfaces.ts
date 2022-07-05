export type Pokemon = {
  national_number: string;
  evolution: { name: string } | null;
  sprites: {
    normal: string;
    large: string;
    animated: string;
  };
  name: string;
  type: string[];
  total: number;
  hp: number;
  attack: number;
  defense: number;
  sp_atk: number;
  sp_def: number;
  speed: number;
};
