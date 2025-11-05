import { useEffect, useState } from "react";
import "../../common/admin.css";
import BreadCrumb from "../../layouts/BreadCrumb";
import { getOrders } from "../../services/home-api";

export default function OrdersSection() {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const token = sessionStorage.getItem("vidmaAuthToken") || "";

  const handleGetOrders = async () => {
    try {
      const response = await getOrders(token);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    handleGetOrders();
  }, []);

  return (
    <div>
      <BreadCrumb title="Orders" />

      <div>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
            cursor: "pointer",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>#</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Customer Name</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Ordered Items Count</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Order Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "20px" }}>
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <tr
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  style={{
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f9ff")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{index + 1}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {order.customerName}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {order.orderItems.length}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {order.orderedTime.split("T")[0]}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Beautiful Modal */}
      {selectedOrder && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedOrder(null)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              borderRadius: "12px",
              width: "90%",
              maxWidth: "600px",
              padding: "25px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              animation: "fadeIn 0.3s ease",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ color: "#15688b", margin: 0 }}>Order Details</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                  color: "#000000ff",
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ marginTop: "15px", color: "#333" }}>
              <p>
                <strong>Customer Name:</strong> {selectedOrder.customerName}
              </p>
              <p>
                <strong>Email:</strong> {selectedOrder.customerEmail || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong> {selectedOrder.customerPhone || "N/A"}
              </p>
              <p>
                <strong>Address:</strong> {selectedOrder.customerAddress || "N/A"}
              </p>
              <p>
                <strong>Order Date:</strong> {selectedOrder.orderedTime.split("T")[0]}
              </p>
            </div>

            <h3 style={{ marginTop: "20px", color: "#15688b" }}>Ordered Items</h3>
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                marginTop: "10px",
                maxHeight: "200px",
                overflowY: "auto",
                color: "#333"
              }}
            >
              {selectedOrder.orderItems.map((item: any, i: number) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #eee",
                    padding: "8px 0",
                  }}
                >
                  <span>{item.productName}</span>
                  <span>{item.color}</span>
                  <span>Qty: {item.quantity}</span>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "25px" }}>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{
                  backgroundColor: "#15688b",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 20px",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
