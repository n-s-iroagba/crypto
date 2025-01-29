import React, { useState } from "react";
import { Container, Row, Col, Button, Card, Nav } from "react-bootstrap";
import image from '../assets/cryptoImage.jpeg'
import { useNavigate } from "react-router-dom";

const MiningDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("withdrawals");
  const navigate = useNavigate()

  return (
    <div className="mining-dashboard bg-light min-vh-100">
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center p-3 bg-white border-bottom">
        <div className="d-flex justify-content-between w-100">
          <h5 className="col-4">Hello, {'Ovshany Ron'}</h5>
          <div className="d-flex align-items-center gap-2 col-4s">
            <small className="fw-semibold">ETH-USDT</small>
          </div>
          <div className="d-flex align-items-center col-4 gap-2">
            <small className="text-muted text-center">
              {new Date().toLocaleString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
            </small>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <Container className="py-4">
        <Card className="text-center text-black bg-light">
          <Card.Img style={{height:'4cm'}} src={image} alt="ETH Mining" />
          <Card.Body className="d-flex flex-column justify-content-end ">
            <h5 className="">ETH - USDT</h5>
            <p className="lead">Wallet Mining</p>
            <h6 className="fw-bold">Your Reward is 50ETH</h6>
            <Button variant="primary" onClick={()=>navigate('/withdraw')} className="mt-3">Withdraw</Button>
          </Card.Body>
        </Card>

        {/* Navigation Tabs */}
        <Nav variant="tabs" activeKey={activeTab} onSelect={(selectedKey) => setActiveTab(selectedKey||"withdrawals")} className="mt-4">
          <Nav.Item>
            <Nav.Link eventKey="my-account">My Account</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="withdrawals">Withdrawals</Nav.Link>
          </Nav.Item>
        </Nav>

        {/* Conditional Rendering based on activeTab */}
        {activeTab === "withdrawals" ? (
          <Card className="mt-4">
            <Card.Body>
              <Row>
                <Col className="text-muted">Amount Deposited</Col>
                <Col className="fw-bold">50000.0000 USDT</Col>
              </Row>
              <Row>
                <Col className="text-muted">Wallet Balance</Col>
                <Col className="fw-bold">50 ETH</Col>
              </Row>
              <Row>
                <Col className="text-muted">Unpaid Withdraw Fee</Col>
                <Col className="fw-bold">5 ETH</Col>
              </Row>
              <Row>
                <Col className="text-muted">Withdrawal Status</Col>
                <Col className="fw-bold">Not yet Initiated</Col>
              </Row>
            </Card.Body>
          </Card>
        ) : (
          <Card className="mt-4">
            <Card.Body>
              <Row>
                <Col className="text-muted">Account Name</Col>
                <Col className="fw-bold">{'Ovshany Ron'}</Col>
              </Row>
              <Row>
                <Col className="text-muted">Amount Held</Col>
                <Col className="fw-bold">50000 USDT</Col>
              </Row>
              <Row>
                <Col className="text-muted">Return Rate</Col>
                <Col className="fw-bold">50.0000 ETH</Col>
              </Row>
            </Card.Body>
          </Card>
        )}
      </Container>

      
    </div>
  );
};

export default MiningDashboard;
