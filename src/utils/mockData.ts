import { Movie, Genre } from '../types';

export const genres: Genre[] = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' }
];

export const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'Stranger Things',
    description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.',
    backdrop_path: 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    poster_path: 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop',
    release_date: '2016-07-15',
    vote_average: 8.7,
    genre_ids: [18, 14, 27],
    runtime: 51,
    type: 'tv'
  },
  {
    id: '2',
    title: 'The Crown',
    description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the twentieth century.',
    backdrop_path: 'https://images.pexels.com/photos/1707820/pexels-photo-1707820.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    poster_path: 'https://images.pexels.com/photos/1707820/pexels-photo-1707820.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop',
    release_date: '2016-11-04',
    vote_average: 8.6,
    genre_ids: [18, 36],
    runtime: 58,
    type: 'tv'
  },
  {
    id: '3',
    title: 'Ozark',
    description: 'A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder money to appease a drug boss.',
    backdrop_path: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    poster_path: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop',
    release_date: '2017-07-21',
    vote_average: 8.4,
    genre_ids: [80, 18],
    runtime: 60,
    type: 'tv'
  },
  {
    id: '4',
    title: 'The Witcher',
    description: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.',
    backdrop_path: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    poster_path: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop',
    release_date: '2019-12-20',
    vote_average: 8.2,
    genre_ids: [18, 14, 12],
    runtime: 60,
    type: 'tv'
  },
  {
    id: '5',
    title: 'Money Heist',
    description: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.',
    backdrop_path: 'https://images.pexels.com/photos/164455/pexels-photo-164455.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    poster_path: 'https://images.pexels.com/photos/164455/pexels-photo-164455.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop',
    release_date: '2017-05-02',
    vote_average: 8.3,
    genre_ids: [80, 18, 53],
    runtime: 67,
    type: 'tv'
  },
  {
    id: '6',
    title: 'Dark',
    description: 'A family saga with a supernatural twist, set in a German town, where the disappearance of two young children exposes the relationships among four families.',
    backdrop_path: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    poster_path: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop',
    release_date: '2017-12-01',
    vote_average: 8.8,
    genre_ids: [80, 18, 9648, 878, 53],
    runtime: 60,
    type: 'tv'
  },
  {
    id: '7',
    title: 'Black Mirror',
    description: 'An anthology series exploring a twisted, high-tech multiverse where humanity\'s greatest innovations and darkest instincts collide.',
    backdrop_path: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    poster_path: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop',
    release_date: '2011-12-04',
    vote_average: 8.8,
    genre_ids: [18, 878, 53],
    runtime: 60,
    type: 'tv'
  },
  {
    id: '8',
    title: 'The Queen\'s Gambit',
    description: 'Orphaned at the tender age of nine, prodigious introvert Beth Harmon discovers and masters the game of chess in 1960s USA.',
    backdrop_path: 'https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    poster_path: 'https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop',
    release_date: '2020-10-23',
    vote_average: 8.6,
    genre_ids: [18],
    runtime: 60,
    type: 'tv'
  }
];

export const featuredMovie = mockMovies[0];

export const moviesByGenre = {
  trending: mockMovies.slice(0, 6),
  drama: mockMovies.filter(movie => movie.genre_ids.includes(18)),
  crime: mockMovies.filter(movie => movie.genre_ids.includes(80)),
  sciFi: mockMovies.filter(movie => movie.genre_ids.includes(878)),
  thriller: mockMovies.filter(movie => movie.genre_ids.includes(53))
};