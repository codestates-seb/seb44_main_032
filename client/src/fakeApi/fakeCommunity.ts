import axios from 'axios'

export default class FakeCommunity {
    constructor() {}
    async getCommunityList() {
        return axios.get('/community/getCommunityList.json').then((res) => res.data)
    }
}
