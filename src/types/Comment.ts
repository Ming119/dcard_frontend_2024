import User from "./User";

export interface Comment {
  id: number;
  body: string;
  createdAt: string;
  user: User;
}

export default Comment;
