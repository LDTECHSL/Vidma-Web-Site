import { useEffect, useState } from "react";
import "../../common/admin.css";
import BreadCrumb from "../../layouts/BreadCrumb";
import { getOrders } from "../../services/home-api";

export default function OrdersSection() {

    const [orders, setOrders] = useState<any[]>([]);
    const token = sessionStorage.getItem("vidmaAuthToken") || "";

    const handleGetOrders = async () => {
        try {
            const response = await getOrders(token);
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    useEffect(() => {
        handleGetOrders();
    }, []);

    return (
        <div>
            <BreadCrumb title="Orders" />

            <div>
                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#f5f5f5" }}>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>#</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Customer Name</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Ordered Items Count</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Order Date</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
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
                                <tr key={order.id}>
                                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{index + 1}</td>
                                    <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>{order.customerName}</td>
                                    <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>{order.orderItems.length}</td>
                                    <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>{order.orderedTime.split("T")[0]}</td>
                                    <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>{order.status}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
