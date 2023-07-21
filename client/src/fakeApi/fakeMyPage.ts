import axios from 'axios';

export default class FakeMyPage {
    constructor() {}
    async getMyPage() {
        return axios.get('/mypage/getMyPage.json').then((res) => res.data)
    }
}
