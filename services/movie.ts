import ApiService from "~/services/api";

export default {
    async getDiscover(data: any) {
        return ApiService.get(`/discover/movie?${data}`);
    },
    async getNowPlaying(data: any) {
        return ApiService.get(`/movie/now_playing?${data}`);
    },
    async getGenre() {
        return ApiService.get('/genre/movie/list');
    },
    async getDetails(id: any) {
        return ApiService.get(`/movie/${id}`);
    },
    async getReviews(id: any) {
        return ApiService.get(`/movie/${id}/reviews`);
    },
    async getRecommendations(id: any) {
        return ApiService.get(`/movie/${id}/recommendations`)
    },
    async getKeywordSuggestion(q: any) {
        return ApiService.get(`/search/keyword?query=${q}`);
    }
}