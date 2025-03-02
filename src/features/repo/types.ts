export interface Repo {
  id: number;
  name: string;
  description: string;
  url: string;
  owner: {
    login: string;
    url: string;
  };
  stars: number;
}
