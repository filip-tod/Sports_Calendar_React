import http from "../http-common";

const getReviews = () => {
  return http.get("/Review");
};

const getReview = (id) => {
  return http.get(`/Review/${id}`);
};

const createReview = (review) => {
  return http.post("/Review", review);
};

const updateReview = (id, review) => {
  return http.put(`/Review/${id}`, review);
};

const removeReview = (id) => {
  return http.delete(`/Review/${id}`);
};

const ReviewService = {
  getReviews,
  getReview,
  createReview,
  updateReview,
  removeReview
};

export default ReviewService;
