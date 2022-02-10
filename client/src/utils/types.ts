export type movieRegister = {
    name?: string | FormDataEntryValue | null;
    content?: string | FormDataEntryValue | null;
    releasedYear?: number | FormDataEntryValue | null;
    originalLanguage?: string | FormDataEntryValue | null;
  };
  export type commentRegister = {
    comment: string;
  }
  export type user = {
      id: number;
      name: string;
      surname: string;
      email: string;
      picture: string;
    }
  export type comment = commentRegister & {
    id: number;
    user: user;
  };
  export type like =   {
    id:number;
    movieId: number;
    user: user;
  }
  export type movie = movieRegister & {
    id: number;
    comments: Array<comment>;
    likes: Array<like>;
    user: user;
    isPublished?: boolean;
    createDate?: string;
  };
  