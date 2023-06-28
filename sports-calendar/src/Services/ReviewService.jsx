import api from "../http-common";

const getReviews = (pageNumber = 1, pageSize = 10, sortOrder = 'DESC', orderBy = 'Rating') => {
  return api.get("/Review", {
    params: {
      pageNumber,
      pageSize,
      sortOrder,
      orderBy
    }
  });
};


const getReview = (id) => {
  return api.get(`/Review/${id}`);
};

const createReview = (review) => {
  return api.post("/Review", review);
};

const updateReview = (id, review) => {
  return api.put(`/Review/${id}`, review);
};

const removeReview = (id) => {
  return api.delete(`/Review/${id}`);
};

const ReviewService = {
  getReviews,
  getReview,
  createReview,
  updateReview,
  removeReview
};

export default ReviewService;
