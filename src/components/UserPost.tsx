import { Card, Image } from "react-bootstrap"

interface postProps {
  nickName: string
  description: string
  avatarUrl: string
  tagsIds: [number]
}

const Post: React.FC<postProps> = ({nickName, description, avatarUrl}) => {
  return (
    <Card className="p-3 mb-3 shadow-sm border-0">
      <div className="d-flex">
        <Image src={avatarUrl} roundedCircle width={48} height={48} className="me-3" />
        <div>
          <div className="d-flex align-items-center justify-description-between">
            <strong>{nickName}</strong>
          </div>

          <p>{description}</p>
        </div>
      </div>
    </Card>
  )
}

export default Post
