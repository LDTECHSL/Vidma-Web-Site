import { useEffect, useState } from "react";
import "../../common/admin.css";
import BreadCrumb from "../../layouts/BreadCrumb";
import { getForms } from "../../services/home-api";
import { Modal, Box, Typography, Button } from "@mui/material";

export default function FeedbacksSection() {
  const [reviewsData, setReviewsData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);

  const recordsPerPage = 10;

  const handleGetFeedbacks = async () => {
    try {
      const response = await getForms();
      setReviewsData(response.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  useEffect(() => {
    handleGetFeedbacks();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(reviewsData.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = reviewsData.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleRowClick = (review: any) => {
    setSelectedFeedback(review);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedFeedback(null);
  };

  return (
    <div>
      <BreadCrumb title="Feedbacks" />
      <div className="feedbacks-list">
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <th style={{ border: "1px solid #ddd", padding: "8px", width: "5%" }}>#</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", width: "15%" }}>Name</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", width: "20%" }}>Email</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", width: "40%" }}>Comment</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", width: "20%" }}>Reaction</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((review, index) => (
              <tr
                key={review.id}
                style={{
                  borderBottom: "1px solid #ddd",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onClick={() => handleRowClick(review)}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9f9f9")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
              >
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {(currentPage - 1) * recordsPerPage + index + 1}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    maxWidth: "150px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={review.name}
                >
                  {review.name}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    maxWidth: "200px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={review.email}
                >
                  {review.email}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    maxWidth: "400px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={review.comment}
                >
                  {review.comment}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    maxWidth: "150px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={review.reaction}
                >
                  {review.reaction}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: "6px 12px",
              backgroundColor: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
            }}
          >
            Prev
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: "6px 12px",
              backgroundColor: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal for Feedback Details */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            wordWrap: "break-word",
          }}
        >
          {selectedFeedback && (
            <>
              <Typography variant="h6" gutterBottom>
                Feedback Details
              </Typography>
              <Typography>
                <strong>Name:</strong> {selectedFeedback.name}
              </Typography>
              <Typography>
                <strong>Email:</strong> {selectedFeedback.email}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>Comment:</strong> {selectedFeedback.comment}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>Reaction:</strong> {selectedFeedback.reaction}
              </Typography>

              <Button
                onClick={handleCloseModal}
                sx={{
                  mt: 3,
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#115293" },
                }}
              >
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
