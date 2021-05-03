import Link from 'next/link'
import { Container, Modal, Jumbotron, Row, Card, Button } from 'react-bootstrap'

const Home = () => (
  <>
    <Jumbotron>
      <h1>A beautiful training portal base for your whole organisation.</h1>
    </Jumbotron>
    <Container fluid className="homeButtons">
      <Link href={`/course/`}>
        <Button variant="primary">View my courses</Button>
      </Link>
    </Container>
  </>
)

export default Home
