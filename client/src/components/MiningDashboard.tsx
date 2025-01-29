import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Nav, Spinner } from "react-bootstrap";
import image from '../assets/cryptoImage.jpeg';
import { useNavigate } from "react-router-dom";

interface AccountHolder {
  name: string;
  depositAmount: number;
  withdrawalAmount: number;
  fee: number;
  status: string;
  requestedWithdrawalAmount: number;
}

const MiningDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("withdrawals");
  const [accountHolder, setAccountHolder] = useState<AccountHolder | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {

    const storedAccountHolder = localStorage.getItem('cAccountHolder');
    if (!storedAccountHolder) {
      navigate('/login')
    }

  
    const fetchAccountHolder = async () => {
      try {
        const response = await fetch('http://localhost:5000/account-holder');
        const data = await response.json();
        setAccountHolder(data);
     
      } catch (error) {
        console.error('Failed to fetch account holder data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountHolder();
  }, [navigate]);

  if (loading) {
    return (
      <div className="mining-dashboard bg-light min-vh-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!accountHolder) {
    return (
      <div className="mining-dashboard bg-light min-vh-100 d-flex justify-content-center align-items-center">
        <Card className="text-center">
          <Card.Body>
            <Card.Text>No account holder data found.</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <div className="mining-dashboard bg-light min-vh-100">
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center p-3 bg-white border-bottom">
        <div className="d-flex justify-content-between w-100">
          <h5 className="col-4">Hello, {accountHolder.name}</h5>
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
          <Card.Img style={{ height: '4cm' }} src={image} alt="ETH Mining" />
          <Card.Body className="d-flex flex-column justify-content-end ">
            <h5 className="">ETH - USDT</h5>
            <p className="lead">Wallet Mining</p>
            <h6 className="fw-bold">Your Reward is {accountHolder.withdrawalAmount}ETH</h6>
            <Button variant="primary" onClick={() => navigate('/withdraw')} className="mt-3">Withdraw</Button>
          </Card.Body>
        </Card>

        {/* Navigation Tabs */}
        <Nav variant="tabs" activeKey={activeTab} onSelect={(selectedKey) => setActiveTab(selectedKey || "withdrawals")} className="mt-4">
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
                <Col className="fw-bold">{accountHolder.depositAmount} USDT</Col>
              </Row>
              <Row>
                <Col className="text-muted">Wallet Balance</Col>
                <Col className="fw-bold"> {accountHolder.withdrawalAmount} ETH</Col>
              </Row>
              <Row>
                <Col className="text-muted">Unpaid Withdraw Fee</Col>
                <Col className="fw-bold"> {accountHolder.fee} ETH</Col>
              </Row>
              {accountHolder.requestedWithdrawalAmount>0&&<Row>
                <Col className="text-muted">Requested Withdrawal Amount</Col>
                <Col className="fw-bold"> {accountHolder.requestedWithdrawalAmount}</Col>
              </Row>
}
              <Row>
                <Col className="text-muted">Withdrawal Status</Col>
                <Col className="fw-bold"> {accountHolder.status === 'none' ? 'No withdrawal has been made yet' : 'Pending withdraw subject to payment of withdrawal fee'}</Col>
              </Row>

            </Card.Body>
          </Card>
        ) : (
          <Card className="mt-4">
            <Card.Body>
              <Row>
                <Col className="text-muted">Account Name</Col>
                <Col className="fw-bold">{accountHolder.name}</Col>
              </Row>
              <Row>
                <Col className="text-muted">Amount Held</Col>
                <Col className="fw-bold">{accountHolder.depositAmount}USDT</Col>
              </Row>
              <Row>
                <Col className="text-muted">Returns</Col>
                <Col className="fw-bold">{accountHolder.withdrawalAmount}.00 ETH</Col>
              </Row>
            </Card.Body>
          </Card>
        )}
      </Container>
    </div>
  );
};

export default MiningDashboard;