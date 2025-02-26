import axios from "axios";

const API_URL = `${process.env.REACT_APP_BASE_API_URL}/blogs`;

export const fetchBlogs = () => axios.get(API_URL);
export const fetchSingleBlog = (blogId) => axios.get(`${API_URL}/${blogId}`);
export const deleteBlog = (blogId) => {
  const accessToken = localStorage.getItem("accessToken");
  return axios.delete(`${API_URL}/${blogId}`, {
    headers: {
      Authorization: accessToken,
    },
  });
};

export const fetchComments = (blogId) =>
  axios.get(`${API_URL}/${blogId}/comments`);

export const postBlog = async (blogData) => {
  const accessToken = localStorage.getItem("accessToken");
  return axios.post(API_URL, blogData, {
    headers: {
      Authorization: accessToken,
    },
  });
};

export const postComment = ({ blogId, content }) => {
  const accessToken = localStorage.getItem("accessToken");
  return axios.post(
    `${API_URL}/${blogId}/comments`,
    {
      content,
    },
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
};

export const uploadImage = async (coverImage) => {
  const formData = new FormData();
  formData.append("image", coverImage);
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_API_URL}/upload`,
    formData
  );
  return response.data.imageUrl;
};

export const updateBlog = async (id, blogData) => {
  const accessToken = localStorage.getItem("accessToken");
  return axios.put(`${API_URL}/${id}`, blogData, {
    headers: {
      Authorization: accessToken,
    },
  });
};

export const fetchMyBlogs = () => {
  const accessToken = localStorage.getItem("accessToken");
  return axios.get(`${API_URL}/my-blogs`, {
    headers: {
      Authorization: accessToken,
    },
  });
};
