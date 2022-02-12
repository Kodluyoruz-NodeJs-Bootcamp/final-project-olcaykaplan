export type commentRegister = {
  comment: string;
};
export type user = {
  id: number;
  name: string;
  surname: string;
  email: string;
  picture: string;
};
export type comment = commentRegister & {
  id: number;
  user: user;
};

type postCommon = {
  id: number;
  comments: Array<comment>;
  user: user;
  isPublished?: boolean;
  createDate?: string;
}

// Movie
export type movieLike = {
  id: number;
  movieId: number;
  user: user;
};

export type movieRegister = {
  name?: string | FormDataEntryValue | null;
  content?: string | FormDataEntryValue | null;
  releasedYear?: number | FormDataEntryValue | null;
  originalLanguage?: string | FormDataEntryValue | null;
};

export type movie = movieRegister & postCommon & {
  likes: Array<movieLike>;
};

// Actor

export type actorLike = {
  id: number;
  actorId: number;
  user: user;
};

export type actorRegister = {
  name?: string | FormDataEntryValue | null;
  surname?: string | FormDataEntryValue | null;
  dateOfBirth?: string | FormDataEntryValue | null;
  gender?: string | FormDataEntryValue | null;
};

export type actor = actorRegister &  postCommon &{
  likes: Array<actorLike>;
};
