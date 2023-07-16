import axios from 'axios';

export default class FakeCommunity {
    constructor() {}
    async getCommunityList() {
        return axios.get('/community/getCommunityList.json').then((res) => res.data)
    }
    async getCommunitySearch() {
        return axios.get('/community/search.json').then((res) => res.data)
    }
    async getCommunityDetail() {
        return axios.get('/community/getCommunityDetail.json').then((res) => res.data)
    }
    async getCommunityCategoryList() {
        return axios.get('/community/getCommunityCategoryList.json').then((res) => res.data)
    }
}
