import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER;

export const getCommunityList = async (query: {
    pageSize?: number
    page?: number
}) => {
  try {
    const { pageSize, page } = query;

    const response = await axios.get(
      `/community?size=${pageSize || 10}&page=${page}`
    );

    return response;
  } catch (error) {
    return error;
  }
};

export const getCommunityCategoryList = async () => {
try {
  const response = await axios.get(
    `/community/${category}`
  );

  return response;
} catch (error) {
  return error;
}
};