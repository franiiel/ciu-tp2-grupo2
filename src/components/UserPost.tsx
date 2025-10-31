import { Card, Image } from "react-bootstrap"

interface TweetProps {
  name: string
  username: string
  content: string
  avatarUrl: string
  date: string
}

const Tweet: React.FC<TweetProps> = ({ name, username, content, avatarUrl, date }) => {
  return (
    <Card className="p-3 mb-3 shadow-sm border-0">
      <div className="d-flex">
        <Image src={avatarUrl} roundedCircle width={48} height={48} className="me-3" />
        <div>
          <div className="d-flex align-items-center justify-content-between">
            <strong>{name}</strong>
            <small className="text-muted">{date}</small>
          </div>
          <p className="text-muted">@{username}</p>
          <p>{content}</p>
        </div>
      </div>
    </Card>
  )
}

export default Tweet
