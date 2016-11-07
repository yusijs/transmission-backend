export class DBResponse {
  private message(strings, ...values) {
    return `Collection ${values[1]} (${values[0]}) inserted into the local DB`;
  }

  public response: {
    message: string;
    status: number;
  };

  constructor(values) {
    this.response = {
      message: this.message`${values.id} ${values.name}`,
      status: 1
    };
  }
}

export const genres = {
  '12': 'Adventure',
  '14': 'Fantasy',
  '16': 'Animation',
  '18': 'Drama',
  '27': 'Horror',
  '28': 'Action',
  '35': 'Comedy',
  '36': 'History',
  '37': 'Western',
  '53': 'Thriller',
  '80': 'Crime',
  '99': 'Documentary',
  '878': 'Science Fiction',
  '9648': 'Mystery',
  '10402': 'Music',
  '10749': 'Romance',
  '10751': 'Family',
  '10752': 'War',
  '10770': 'TV Movie'
};
