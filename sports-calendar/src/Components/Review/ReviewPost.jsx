import React, { useState } from 'react';
import ReviewService from '../../Services/ReviewService';
import { v4 as uuidv4 } from 'uuid';

function ReviewPost() {
  const [review, setReview] = useState({
    Id: uuidv4(),
    Content: "",
    Rating: 0,
    EventId: "bbb75a72-228e-4dfa-8e58-2beed90b0c92",
    UserId: "2441c11d-5d94-49ee-9efc-01378308f909",
    Attended: true,
    IsActive: true,
    UpdatedByUserId: "0d3fa5c2-684c-4d88-82fd-cea2197c6e86",
    CreatedByUserId: "0d3fa5c2-684c-4d88-82fd-cea2197c6e86",
    DateCreated: new Date(Date.UTC()),
    DateUpdated: new Date(Date.UTC())
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setReview({ ...review, [name]: value });
  };

  const createReview = () => {
    ReviewService.createReview(review)
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      <h2>Create New Review</h2>
      <form>
        <label>
          Content:
          <textarea name="Content" value={review.Content} onChange={handleInputChange} />
        </label>
        <label>
          Rating:
          <input type="number" name="Rating" value={review.Rating} onChange={handleInputChange} />
        </label>
        <button type="button" onClick={createReview}>Create</button>
      </form>
    </div>
  );
}

export default ReviewPost;
