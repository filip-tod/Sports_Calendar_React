import axios from "axios";
export default axios.create({
  baseURL: "https://localhost:44380/api",
  headers: {
    "Content-type": "application/json",
    "Authorization":"bearer EUJXL18mz5q0WiCvM-fiUFpBPPRNqba8XEHgr4K2Cc5xe5pxHUFt8tFhAdZpWO9a8m4NmFdoblvulnnZLX0ij1VlVtoyBZlzn4kNOZBPtboRLa-7wmZ9C2w4XbKG6B1j1-3GUbIoZRrar1NyjU4gaRrzgvwEkyhRrMVE0rQ7x2C4h7IiKDVhoyv5Z4no-GA0RdhkZf8912WGjlZM8Rg6EGy0pok8aMXCzkab-Rugo6aCqTRWoZNLc0NlF9Rg7bwrkm7NOgbq4SQyvIQ7GiUqxJO5FMte8NXehuswbSlEayQhxLL1VCdoAEN67QcqnzAUGfLmu33aGjmzSgkO8AKq0F467b-ivgu0gqcFmyajwG5D7g8v46gJaOe8qyX55v8w"
  }
});