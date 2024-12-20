<template>
    <section class="movie-detail">
        <!-- HERO -->
        <section class="movie-hero text-white h-[500px] bg-[black] flex flex-wrap items-end" :style="`background: url(http://image.tmdb.org/t/p/w1280/${movie.backdrop_path}) no-repeat center top, rgba(0,0,0,0.6); background-size:cover; background-blend-mode: overlay`">
            <div class="w-[1200px] py-1 mx-auto flex mt-[15%] relative">
                <!-- ${baseUrl}${movie.backdrop_path} -->
                <img :src="`${baseUrl}${movie.poster_path}`" class="absolute w-[20%] rounded shadow" />
                <div class="pl-[22%]">
                    <h4 class="text-[18px]">{{ movie.release_date?.split("-")[0] }}</h4>
                    <h2 class="text-[36px] font-[500]">{{ movie.title }}</h2>
                    <p class="text-sm">
                        <span v-for="(gen,k) in movie.genres">
                            {{ gen.name }}
                            <i class="mr-1" v-if="k !== movie.genres.length - 1">,</i>
                        </span>
                    </p>
                </div>
            </div>
            <div class="w-full bg-[#00000080]">
                <div class="w-[1200px] py-4 mx-auto flex relative">
                    <div class="pl-[22%] flex items-center justify-between">
                        <div class="rating justify-center flex items-center mx-auto text-[36px] pr-5">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.0815 2.13274C15.4286 1.32678 16.5714 1.32678 16.9185 2.13274L20.0912 9.50027C20.236 9.83645 20.5529 10.0667 20.9173 10.1005L28.9047 10.8413C29.7785 10.9223 30.1316 12.0091 29.4724 12.5883L23.4459 17.8825C23.1709 18.124 23.0499 18.4966 23.1303 18.8536L24.894 26.679C25.087 27.535 24.1625 28.2067 23.4079 27.7587L16.5106 23.6632C16.1958 23.4763 15.8042 23.4763 15.4894 23.6632L8.59208 27.7587C7.83755 28.2067 6.91305 27.535 7.10599 26.679L8.86967 18.8536C8.95015 18.4965 8.82911 18.124 8.55413 17.8825L2.52763 12.5883C1.86837 12.0091 2.2215 10.9223 3.09527 10.8413L11.0827 10.1005C11.4471 10.0667 11.764 9.83645 11.9088 9.50027L15.0815 2.13274Z" fill="#FFB802"/>
                            </svg>
                            <span class="ml-2 font-[500]">{{ movie.vote_average }}</span>
                        </div>
                        <div class="score px-4 border border-0 border-r-[1px] border-[#FFFFFF33]">
                            <p class="text-[#555]">User Score</p>
                            <p>{{ movie.vote_count }}</p>
                        </div>
                        <div class="language px-4 border border-0 border-r-[1px] border-[#FFFFFF33]">
                            <p class="text-[#555]">Languages</p>
                            <p>
                                <span v-for="(lang,k) in movie.spoken_languages">
                                    {{ lang.name }}
                                    <i class="mr-1" v-if="k !== movie.spoken_languages.length - 1">,</i>
                                </span>
                            </p>
                        </div>
                        <div class="status px-4 border border-0 border-r-[1px] border-[#FFFFFF33]">
                            <p class="text-[#555]">Status</p>
                            <p>{{ movie.status }}</p>
                        </div>
                        <div class="budget px-4 border border-0 border-r-[1px] border-[#FFFFFF33]">
                            <p class="text-[#555]">Budget</p>
                            <p>${{ addCommas(movie.budget) }}</p>
                        </div>
                        <div class="company px-4 border border-0 border-r-[1px] border-[#FFFFFF33]">
                            <p class="text-[#555]">Production</p>
                            <p class="truncate text-ellipsis max-w-[210px]">
                                <span v-for="(item,k) in movie.production_companies">
                                    {{ item.name }}
                                    <i class="mr-1" v-if="k !== movie.production_companies.length - 1">,</i>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- DETAILS -->
        <section class="bg-white pt-5">
            <!-- OVERVIEW -->
            <div class="w-[1200px] py-1 mx-auto flex relative">
                <div class="pl-[22%]">
                    <h3 class="text-[red] font-[500]">OVERVIEW</h3>
                    <p class="mt-3 leading-[2em] w-[70%]">{{ movie.overview }}</p>
                </div>
            </div>

            <!-- REVIEWS -->
            <div class="w-[1200px] mt-[5%] mx-auto relative pb-[5%]">
                <h3 class="text-[red] font-[500]">REVIEWS</h3>
                <Carousel v-if="reviews.results?.length" v-bind="config" class="w-full items-start mt-6 py-3">
                    <Slide v-for="review in reviews.results" :key="review.id" class="bg-[#F9F9F9] p-7 rounded-lg block text-left shadow items-start">
                        <div class="review-content">
                            <div class="flex w-full text-left items-center justify-between">
                                <div class="flex gap-2">
                                    <div class="rounded-full h-[40px] w-[40px] bg-[grey] overflow-hidden">
                                        <img :src="`${baseUrl}${review.author_details.avatar_path}`" class="w-full" />
                                    </div>
                                    <div class="ml-2">
                                        <h3>{{ review.author }}</h3>
                                        <p class="text-[10px]">{{ review.created_at }}</p>
                                    </div>
                                </div>
                                <div class="py-2 px-4 bg-[#c1c1c1] flex justify-center items-start rounded">
                                    <svg width="15" height="14" class="mt-3" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.58155 1.13274C6.92863 0.326777 8.07137 0.326779 8.41845 1.13274L9.56338 3.79138C9.70816 4.12756 10.025 4.35778 10.3895 4.39158L13.2718 4.65891C14.1456 4.73995 14.4987 5.82676 13.8394 6.40591L11.6647 8.31637C11.3897 8.55794 11.2687 8.93044 11.3492 9.28751L11.9856 12.1114C12.1786 12.9674 11.2541 13.6391 10.4995 13.1911L8.01056 11.7132C7.69584 11.5263 7.30416 11.5263 6.98944 11.7132L4.50046 13.1911C3.74593 13.6391 2.82144 12.9674 3.01437 12.1114L3.65082 9.28751C3.73129 8.93044 3.61026 8.55794 3.33527 8.31637L1.16056 6.40591C0.501297 5.82676 0.854425 4.73995 1.7282 4.65891L4.61051 4.39158C4.97497 4.35778 5.29184 4.12756 5.43662 3.79138L6.58155 1.13274Z" fill="#FFB802"/>
                                    </svg>

                                    <span class="text-[36px]">{{ review.author_details.rating }}</span>
                                </div>
                            </div>
                            <p class="mt-6">{{ review.content }}</p>
                        </div>
                    </Slide>

                    <!-- <template #addons>
                        <Navigation />
                        <Pagination />
                    </template> -->
                </Carousel>
                <div v-else class="flex w-full h-[20vh] justify-center items-center text-[#333]">No Reviews</div>
            </div>
        </section>

        <!-- RECOMMENDATIONS -->
        <section class="text-white">
            <div class="w-[1200px] mt-[5%] mx-auto relative pb-[5%]">
                <h3 class=" font-[500]">RECOMMENDATION MOVIES</h3>

                <div v-if="recommendations.results?.length" class="recommendation-wrapper mt-4 w-full flex overflow-x-scroll gap-3">
                    <MCard v-for="(rec, k) in recommendations?.results" :movie="rec" :genres="genres" customClass="min-w-[285px]"></MCard>
                </div>
                <div v-else class="flex w-full h-[20vh] justify-center items-center text-[#777777]">No Movies</div>
            </div>
        </section>
    </section>
</template>
<script setup>
import { onMounted } from "vue";
import MCard from '~/components/movie/MCard.vue';

import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";
import movieApi from "~/services/movie";
import { useRoute } from "vue-router";

const route = useRoute();
const config = ref({
    itemsToShow: 2,
    snapAlign: 'start',
    gap:25
});
const movie = ref({});
const reviews = ref([]);
const genres = ref([]);
const baseUrl = ref('http://image.tmdb.org/t/p/w500/');
const recommendations = ref({});

const addCommas = (num) => {
    return num > 0? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : num;
}

onMounted(() => {
    movieApi.getDetails(route.params.id).then((res) => {
        movie.value = res.data;
        movieApi.getReviews(route.params.id).then((res) => {
            reviews.value = res.data;
        });

        movieApi.getRecommendations(route.params.id).then((res) => {
            recommendations.value = res.data;
        });
    });

    movieApi.getGenre().then((res) => {
      genres.value = res.data.genres;
    });
})
</script>
<style scoped>
.carousel__slide {
    align-items: start !important;
}
</style>