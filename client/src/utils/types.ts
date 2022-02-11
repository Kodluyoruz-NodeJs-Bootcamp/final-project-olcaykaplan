
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
 
  export type movieLike =   {
    id:number;
    movieId: number;
    user: user;
  }

  // Movie
  export type movieRegister = {
    name?: string | FormDataEntryValue | null;
    content?: string | FormDataEntryValue | null;
    releasedYear?: number | FormDataEntryValue | null;
    originalLanguage?: string | FormDataEntryValue | null;
  };

  export type movie = movieRegister & {
    id: number;
    comments: Array<comment>;
    likes: Array<movieLike>;
    user: user;
    isPublished?: boolean;
    createDate?: string;
  };

// Actor


export type actorLike =   {
  id:number;
  actorId: number;
  user: user;
}

  export type actorRegister = {
    name?: string | FormDataEntryValue | null;
    surname?: string | FormDataEntryValue | null;
    dateOfBirth?: string | FormDataEntryValue | null;
    gender?: string | FormDataEntryValue | null;
    isPublished?: boolean;
    createDate?: string;
  };
  
  export type actor = actorRegister & {
    id: number;
    comments: Array<comment>;
    likes: Array<actorLike>;
    user: user;
    isPublished?: boolean;
    createDate?: string;
  }