import { Card, Image, Badge } from "react-bootstrap";
import type { Publicacion } from "./types";

interface PostProps {
  post: Publicacion;
  avatarUrl: string;
}

const Post: React.FC<PostProps> = ({ post, avatarUrl }) => {
  return (
    <Card className="p-3 mb-3 shadow-sm border-0">
      <div className="d-flex">
        <Image
          src={avatarUrl}
          roundedCircle
          width={48}
          height={48}
          className="me-3"
        />
        <div>
          <div className="d-flex align-items-center justify-content-between">
            <strong>{post.User.nickName}</strong>
          </div>

          <p>{post.description}</p>
          <div className="mb-2">
            {post.Tags.map((tag, idx) => (
              <Badge key={idx} bg="success" className="me-1">
                #{tag.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Post;
