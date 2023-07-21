import axios from 'axios';

export default class FakeCommunity {
  constructor() {}
  async getCommunityList(page?: number | string) {
    return axios
      .get(`/community/getCommunityList-page${page || 1}.json`)
      .then(res => res.data);
  }
  async getCommunitySearch() {
    return axios.get('/community/search.json').then(res => res.data);
  }
  async getCommunityDetail() {
    return axios
      .get('/community/getCommunityDetail.json')
      .then(res => res.data);
  }
  async getCommunityCategoryList(category: string) {
    return axios
      .get(`/community/getCommunityCategoryList-${category}.json`)
      .then(res => res.data);
  }
}