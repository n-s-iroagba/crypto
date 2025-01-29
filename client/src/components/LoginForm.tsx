import React, { useState, useEffect } from "react";
import { Form, Button, Card,  Spinner, Alert } from "react-bootstrap";
import image from '../assets/cryptoImage.jpeg';
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [address, setAddress] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<string>("");
  const [greeting, setGreeting] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());

      const hour = now.getHours();
      if (hour < 12) {
        setGreeting("Good morning");
      } else if (hour < 18) {
        setGreeting("Good afternoon");
      } else {
        setGreeting("Good evening");
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Show the spinner
    setError(null); // Reset error message

    try {
      const response = await fetch("https://server-crypto.fly.dev/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ walletAddress: address }),
      });

       const data =  await response?.json().then(data =>JSON.stringify(data));

      if (response.ok) {
        localStorage.setItem("cAccountHolder", data);
        navigate("/dashboard");
      }else{
        setError('Wrong wallet address.')
      }
    } catch (error) {
      console.error(error)
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Hide the spinner
    }
  };

  return (
    <Card className="mt-2 px-lg-5">
      <Card.Header className="text-center">
        <h2>ETHERRDS ETH-USD</h2>
        <p>{currentTime}</p>
        <Card.Img style={{ height: '4cm' }} src={image} alt="ETH Mining" />
      </Card.Header>
      <Card.Body>
        <h4>{greeting}.</h4>
        <h5 className="text-center">Login</h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Label>Wallet address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Login"}
          </Button>
        </Form>

        {/* Show error alert if login fails */}
        {error && (
          <Alert variant="danger" className="mt-3 text-center">
            {error}
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default LoginForm;
