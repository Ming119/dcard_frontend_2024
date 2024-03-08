import User from './User';

interface Label {
  name: string;
  color: string;
};

export interface Post {
  number: number;
  title: string;
  body: string;
  comments: number;
  labels: Label[];
  createdAt: string;
  user: User;
};

export default Post;
