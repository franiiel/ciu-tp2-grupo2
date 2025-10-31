import Container from "react-bootstrap/Container"
import PerfilHeader from "../components/PerfilHeader"
import UserPostList from "../components/UserPostList"

function App() {
  return (
    <Container className="mt-5" style={{ maxWidth: "600px" }}>
      <PerfilHeader
        name="Franiel"
        username="franiel_dev"
        bio=""
        avatarUrl="https://api.dicebear.com/7.x/bottts/svg?seed=Asuna"
        //Fetch a los followers
        followers={320}
        following={180}
      />
      <UserPostList />
    </Container>
  )
}

export default App
