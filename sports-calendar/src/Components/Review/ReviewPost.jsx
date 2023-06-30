import React, { useState } from 'react';
import ReviewService from '../../Services/ReviewService';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router';

function ReviewPost() {
  const eventId= useParams();
  console.log("reviewpost eventId: " + eventId.eventId);
  const [review, setReview] = useState({
    id: null,
    content: "",
    rating: 0,
    eventId: "",
    userId: "2441c11d-5d94-49ee-9efc-01378308f909",
    attended: true,
    isActive: true,
    updatedByUserId: "",
    createdByUserId: "",
    dateCreated: new Date(Date.UTC()),
    dateUpdated: new Date(Date.UTC())
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setReview({ ...review, [name]: value });
  };

  const createReview = () => {
    review.eventId=eventId.eventId;
    // review.updatedByUserId=
    console.log(review);
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
          <textarea name="content" value={review.content} onChange={handleInputChange} />
        </label>
        <label>
          Rating:
          <input type="number" name="rating" value={review.rating} onChange={handleInputChange} />
        </label>
        <button type="button" onClick={createReview}>Create</button>
      </form>
    </div>
  );
}

export default ReviewPost;
