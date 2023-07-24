import axios from 'axios';

// axios.defaults.baseURL = process.env.REACT_APP_SERVER;
import dailyJson from '../../public/community/getCommunityCategoryList-DAILY.json'
import dayTripJson from '../../public/community/getCommunityCategoryList-DAYTRIP.json'
import companyJson from '../../public/community/getCommunityCategoryList-COMPANY.json'
import travelJson from '../../public/community/getCommunityCategoryList-TRAVEL.json'
import getCommunityList1Json from '../../public/community/getCommunityList-page1.json'
import getCommunityList2Json from '../../public/community/getCommunityList-page2.json'
import getCommunityList3Json from '../../public/community/getCommunityList-page3.json'
import getMyPageJson from '../../public/mypage/getMyPage.json'
import editMyPageJson from '../../public/mypage/editMyPage.json'

export const getCommunityList = async (query: {
    pageSize?: number
    page?: number
    search?: string
    category?: string
}) => {
  const { pageSize, page, search, category } = query;
  try {

    if (search) {
      const response = await axios.get(
        `/community/search?query=${search}`
      );
      return response.data;
    }

    const response = await axios.get(
      `/community/${category || 'all'}?size=${pageSize || 10}&page=${page || 1}`
    );
    return response.data;
  } catch (error) {
    // TODO: dummy 제거
    if (category) {
      if (category === 'DAILY') {
        return dailyJson
      }
      if (category === 'DAYTRIP') {
        return dayTripJson
      }
      if (category === 'TRAVEL') {
        return travelJson
      }
      if (category === 'COMPANY') {
        return companyJson
      }

      return getCommunityList1Json
    }

    if (page === 2) {
      return getCommunityList2Json
    }
    if (page === 3) {
      return getCommunityList3Json
    }

    return getCommunityList1Json
    // return error;
  }
};


// my page
export const deleteUser = async (userId?: number) => {
try {
  // TODO: axios.delete가 맞는지 BE랑 확인 필요
  const response = await axios.delete(
    `/user/delete/${userId || 1}`
  );

  return response.data;
} catch (error) {
  return error;
}
};

export const getUserInfo = async (userId?: number) => {
try {
  const response = await axios.get(
    `/user/${userId || 1}`
  );

  return response.data;
} catch (error) {
  return getMyPageJson.data // TODO: dummy 제거
  // return error;
}
};

export const patchUserInfo = async (userId?: number, body: {
  name: string
  nickname: string
  password: string
  email: string
}) => {
try {
  const response = await axios.patch(
    `/user/edit/${userId || 1}`,
    body
  );

  return response.data;
} catch (error) {
  return editMyPageJson.data // TODO: dummy 제거
  // return error;
}
};
