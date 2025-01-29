import type React from "react"
import { useState, useEffect } from "react"
import { Form, Button, Card} from "react-bootstrap"
import image from '../assets/cryptoImage.jpeg'
import { useNavigate } from "react-router-dom"

const LoginForm: React.FC = () => {
  const [address, setaddress] = useState<string>("")
  const [currentTime, setCurrentTime] = useState<string>("")
  const [greeting, setGreeting] = useState<string>("")
const navigate = useNavigate()
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString())

      const hour = now.getHours()
      if (hour < 12) {
        setGreeting("Good morning")
      } else if (hour < 18) {
        setGreeting("Good afternoon")
      } else {
        setGreeting("Good evening")
      }
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate('/dashboard')
    console.log("Login attempted with:", { address })
  }

  return (
    <Card className="mt-2 px-lg-5">
      <Card.Header className="text-center">
        <h2>ETHERRDS ETH-USD</h2>
        <p>{currentTime}</p>
         <Card.Img style={{height:'4cm'}}src={image} alt="ETH Mining" />
      </Card.Header>
      <Card.Body>
        <h4 >{greeting}.</h4>
        <h5 className="text-center"> Login</h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicaddress">
            <Form.Label>Wallet address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
              required
            />
          </Form.Group>

         
          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default LoginForm

