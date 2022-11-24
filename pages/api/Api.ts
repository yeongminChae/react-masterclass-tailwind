const API_KEY = "3b45f9cc2e4aedf5c5acc1163b12b24c";
const BASE_PATH = "https://api.themoviedb.org/3";

export enum Types {
  "now_playing" = "now_playing",
  "popular" = "popular",
  "top_rated" = "top_rated",
  "upcoming" = "upcoming",
}

export enum TypeShows {
  "on_the_air" = "on_the_air",
  "airing_today" = "airing_today",
  "popular" = "popular",
  "top_rated" = "top_rated",
}
export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [number, number, number, number];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IGetMoviesResult {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IGetMovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: [
    {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    }
  ];
  production_countries: [
    {
      iso_3166_1: string;
      name: string;
    }
  ];
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface ITvShow {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface ITvShows {
  page: number;
  results: ITvShow[];
  total_pages: number;
}

export interface ITvShowsDetail {
  adult: boolean;
  backdrop_path: string;
  episode_run_time: [number];
  first_air_date: string;
  last_air_date: string;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: [string];
  networks: [
    {
      name: string;
      id: number;
      logo_path: string;
      origin_country: string;
    }
  ];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: [string];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;

  vote_average: number;
  vote_count: number;
}

export async function getMovies(type: Types) {
  return (
    await fetch(
      `${BASE_PATH}/movie/${type}?api_key=${API_KEY}&language=en-US&page=1&region=kr`
    )
  ).json();
}

export async function getMovieDetail(movieId: string | undefined) {
  return (
    await fetch(
      `${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    )
  ).json();
}

export async function getTvShows(type: TypeShows) {
  return (
    await fetch(
      `${BASE_PATH}/tv/${type}?api_key=${API_KEY}&language=en-US&page=1`
    )
  ).json();
}

export async function getTvShowsDetail(tvId: string | undefined) {
  return (
    await fetch(`${BASE_PATH}/tv/${tvId}?api_key=${API_KEY}&language=en-US`)
  ).json();
}

export async function getSearchResult({
  keyword,
  category,
  page,
}: {
  keyword: string | null;
  category: string;
  page: number;
}) {
  return (
    await fetch(
      `${BASE_PATH}/search/${category}?api_key=${API_KEY}&language=en-US&query=${keyword}&page=${page}`
    )
  ).json();
}

export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}
