import { Card, Button, Image } from "react-bootstrap"

interface PerfilHeaderProps {
  name: string
  username: string
  bio: string
  avatarUrl: string
  followers: number
  following: number
}

const PerfilHeader: React.FC<PerfilHeaderProps> = ({
  name,
  username,
  bio,
  avatarUrl,
  followers,
  following,
}) => {
  return (
    <Card className="p-3 shadow-sm border-0 rounded-3">
      <div className="d-flex align-items-center">
        <Image src={avatarUrl} roundedCircle width={80} height={80} className="me-3" />
        <div>
          <h4>{name}</h4>
          <p className="text-muted">@{username}</p>
          <p>{bio}</p>
          <div className="text-muted">
            <span className="me-3"><strong>{followers}</strong> seguidores</span>
            <span><strong>{following}</strong> siguiendo</span>
          </div>
        </div>
      </div>
      <Button variant="success" className="mt-3 align-self-start">Seguir</Button>
    </Card>
  )
}

export default PerfilHeader
