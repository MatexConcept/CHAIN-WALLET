

import { useState } from "react"
import { ArrowDownLeft, ArrowUpRight, Clock, DollarSign, LogOut, Wallet } from "lucide-react"
import "./Dashboard.css"

export default function Dashboard({onLogout}) {
  const [balance] = useState(13000)
  const [activeTab, setActiveTab] = useState("all")
  const [toast, setToast] = useState({ show: false, message: '', type: '' });


  const transactions = [
    { id: 1, type: "in", amount: 5000, from: "0x8a3...45e2", date: "Mar 8, 10:24 AM", status: "Completed" },
    { id: 2, type: "out", amount: 3000, to: "0x3f5...87c1", date: "Jan 30, 6:15 PM", status: "Completed" },
    { id: 3, type: "in", amount: 8000, from: "0x4e6...78b3", date: "jan 24, 9:20 AM", status: "Completed" },
    { id: 4, type: "out", amount: 2000, to: "0x7c8...12a5", date: "Jan 10, 11:45 AM", status: "Completed" },
    { id: 5, type: "in", amount: 5000, from: "0x4e6...78b3", date: "Dec 29, 9:20 AM", status: "Completed" },
   
  ]

  const filteredTransactions =
    activeTab === "all"
      ? transactions
      : transactions.filter(
          (tx) => (activeTab === "sent" && tx.type === "out") || (activeTab === "received" && tx.type === "in"),
        )

        const handleLogout = () => {
            showToast('Logging out...', 'success');
            setTimeout(() => {
              onLogout();
            }, 1500);
          };

           const showToast = (message, type) => {
    setToast({ show: true, message, type });
    
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

        

  return (
    <div className="dashboard-container">
      <div className="animated-bg"></div>
      <div className="dashboard-header">
        <h1>CHAIN WALLET</h1>
        <button className="logout-button" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </button>
      </div>

      <div className="dashboard-content">
        <div className="card balance-card">
          <div className="card-header">
            <div className="card-description">Total Balance</div>
            <div className="card-title balance-amount">
              <DollarSign className="dollar-sign" />
              {balance.toLocaleString()}
            </div>
          </div>
          <div className="card-content">
            <div className="wallet-address">
              <Wallet className="mr-2 h-4 w-4" />
              <span>0x71C7656EC7ab88b098defB751B7401B5f6d8976F</span>
            </div>
          </div>
          <div className="card-footer action-buttons">
            <button className="custom-button send-button">
              <ArrowUpRight className="mr-2 h-4 w-4" />
              Send
            </button>
            <button className="custom-button receive-button">
              <ArrowDownLeft className="mr-2 h-4 w-4" />
              Receive
            </button>
          </div>
        </div>

        <div className="card transactions-card">
          <div className="card-header">
            <div className="card-title">Transaction History</div>
            <div className="card-description"> recent transactions</div>
          </div>
          <div className="card-content">
            <div className="custom-tabs">
              <div className="tabs-list">
                <button
                  className={`tab-trigger ${activeTab === "all" ? "active" : ""}`}
                  onClick={() => setActiveTab("all")}
                >
                  All
                </button>
                <button
                  className={`tab-trigger ${activeTab === "sent" ? "active" : ""}`}
                  onClick={() => setActiveTab("sent")}
                >
                  Sent
                </button>
                <button
                  className={`tab-trigger ${activeTab === "received" ? "active" : ""}`}
                  onClick={() => setActiveTab("received")}
                >
                  Received
                </button>
              </div>
              <div className="transaction-list">
                {filteredTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className={`transaction-item ${tx.type === "in" ? "transaction-in" : "transaction-out"}`}
                  >
                    <div className="transaction-icon">
                      {tx.type === "in" ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                    </div>
                    <div className="transaction-details">
                      <div className="transaction-title">{tx.type === "in" ? "Received" : "Sent"}</div>
                      <div className="transaction-subtitle">
                        {tx.type === "in" ? `From: ${tx.from}` : `To: ${tx.to}`}
                      </div>
                    </div>
                    <div className="transaction-meta">
                      <div className={`transaction-amount ${tx.type === "in" ? "amount-in" : "amount-out"}`}>
                        {tx.type === "in" ? "+" : "-"}${tx.amount.toLocaleString()}
                      </div>
                      <div className="transaction-date">
                        <Clock className="h-3 w-3 mr-1" />
                        {tx.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>




      </div>

      {toast.show && (
  <div className={`toast ${toast.type === 'error' ? 'toast-error' : 'toast-success'}`}>
    <span>{toast.message}</span>
  </div>
)}
    </div>
  )
}

