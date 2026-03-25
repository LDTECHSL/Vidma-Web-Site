import { useEffect, useState } from "react";
import "../../common/admin.css";
import BreadCrumb from "../../layouts/BreadCrumb";
import { deleteOrderCommand, getOrders } from "../../services/home-api";
import { showError, showSuccess } from "../../components/Toast";

export default function OrdersSection() {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
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

  const formatOrderDateTime = (value?: string) => {
    if (!value) return "N/A";
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value;
    return parsed.toLocaleString();
  };

  const isHexColor = (value?: string | null) => /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test((value || "").trim());

  const displayValue = (value?: string | null) => {
    const normalized = (value || "").trim();
    return normalized ? normalized : "N/A";
  };

  const openDeleteDialog = (order: any) => {
    setDeleteTarget(order);
  };

  const closeDeleteDialog = () => {
    if (isDeleting) return;
    setDeleteTarget(null);
  };

  const handleDeleteOrder = async () => {
    if (!deleteTarget?.customerId) {
      showError("Invalid order selected.");
      return;
    }

    try {
      setIsDeleting(true);
      await deleteOrderCommand(deleteTarget.customerId, token);

      setOrders((prev) => prev.filter((order) => order.customerId !== deleteTarget.customerId));
      if (selectedOrder?.customerId === deleteTarget.customerId) {
        setSelectedOrder(null);
      }
      setDeleteTarget(null);
      showSuccess("Order deleted successfully.");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.title ||
        "Failed to delete order.";
      showError(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="orders-section">
      <BreadCrumb title="Orders" />

      <div className="orders-table-wrap">
        <table className="orders-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer Name</th>
              <th>Ordered Items</th>
              <th>Ordered Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="orders-empty">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <tr
                  key={order.customerId || index}
                  onClick={() => setSelectedOrder(order)}
                  className="orders-table-row"
                >
                  <td>{index + 1}</td>
                  <td>{displayValue(order.customerName)}</td>
                  <td>{order.orderItems?.length || 0}</td>
                  <td>{formatOrderDateTime(order.orderedTime)}</td>
                  <td>
                    <button
                      type="button"
                      className="orders-delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        openDeleteDialog(order);
                      }}
                    >
                      Complete Order
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div
          className="orders-modal-overlay"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="orders-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="orders-modal-header">
              <div>
                <h2 className="orders-modal-title">Order Details</h2>
                <p className="orders-modal-subtitle">
                  Ordered on {formatOrderDateTime(selectedOrder.orderedTime)}
                </p>
              </div>
              <button className="orders-modal-close" onClick={() => setSelectedOrder(null)}>
                ✕
              </button>
            </div>

            <div className="orders-customer-grid">
              <div className="orders-info-card">
                <span className="orders-info-label">Customer</span>
                <span className="orders-info-value">{displayValue(selectedOrder.customerName)}</span>
              </div>
              <div className="orders-info-card">
                <span className="orders-info-label">Email</span>
                <span className="orders-info-value">{displayValue(selectedOrder.customerEmail)}</span>
              </div>
              <div className="orders-info-card">
                <span className="orders-info-label">Phone</span>
                <span className="orders-info-value">{displayValue(selectedOrder.customerPhone)}</span>
              </div>
              <div className="orders-info-card">
                <span className="orders-info-label">Address</span>
                <span className="orders-info-value">{displayValue(selectedOrder.customerAddress)}</span>
              </div>
            </div>

            <div className="orders-items-panel">
              <h3 className="orders-items-title">Ordered Items</h3>
              <div className="orders-items-table-wrap">
                <table className="orders-items-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Color</th>
                      <th>Material</th>
                      <th>Thickness</th>
                      <th>Length</th>
                      <th>Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.orderItems?.length ? (
                      selectedOrder.orderItems.map((item: any, i: number) => (
                        <tr key={item.orderItemId || i}>
                          <td>{displayValue(item.productName)}</td>
                          <td>
                            <div className="orders-color-cell">
                              {isHexColor(item.color) ? (
                                <span
                                  className="orders-color-swatch"
                                  style={{ backgroundColor: item.color }}
                                  title={item.color}
                                />
                              ) : (
                                <span className="orders-empty-color">-</span>
                              )}
                              <span>{displayValue(item.color)}</span>
                            </div>
                          </td>
                          <td>{displayValue(item.material)}</td>
                          <td>{displayValue(item.thickness)}</td>
                          <td>{displayValue(item.length)}</td>
                          <td>{item.quantity || 0}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="orders-empty">No items found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="orders-modal-footer">
              <button className="orders-close-btn" onClick={() => setSelectedOrder(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="orders-confirm-overlay" onClick={closeDeleteDialog}>
          <div className="orders-confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <h3>Warning</h3>
            <p>
              Are you sure? Once you complete this record, it will be permanently deleted.
            </p>
            <div className="orders-confirm-actions">
              <button type="button" className="orders-cancel-btn" onClick={closeDeleteDialog} disabled={isDeleting}>
                No
              </button>
              <button type="button" className="orders-confirm-delete-btn" onClick={handleDeleteOrder} disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
