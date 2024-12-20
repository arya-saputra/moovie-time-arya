<template>
    <section class="search bg-[#1b1e22] text-white">
        <div class="search-container flex gap-3 w-full max-w-[1200px] mx-auto justify-between items-start py-[6%] flex-wrap">
            <div class="container-head w-full flex justify-between relative">
                <div class="bg-[#E74C3C] h-[6px] top-[-8px] w-[100px] absolute"></div>
                <h3 class="text-[24px]">Movies</h3>
            </div>
            <aside class="filter-container w-[27%]">
                <div class="mt-[10%] bg-[#12161d] min-h-[20vh] w-full shadow">
                    <div class="sort-title px-3 py-5 w-full border border-t-0 border-x-0 border-b-[#333]">
                        Sort Result By
                    </div>
                    <div class="sort-select px-3 py-5 w-full border border-t-0 border-x-0 border-b-[#333]">
                        <div class="group w-full relative">
                            <button id="dropdownDefaultButton" class="text-white bg-[#2F363F] focus:outline-none font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center w-full flex justify-between focus:outline-0" type="button">
                                {{ options.sort.text? options.sort.text : '--Sort movies--'  }} 
                                <svg class="transition-all rotate-180 group-hover:rotate-0" width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 0L9.33013 7.5L0.669873 7.5L5 0Z" fill="#C4C4C4"/>
                                </svg>

                            </button>

                            <!-- Dropdown menu -->
                            <div id="dropdown" class="z-10 w-full absolute hidden divide-y divide-gray-100 rounded-lg shadow w-44 bg-black group-hover:block">
                                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                    <li v-for="sort in sorts" @click="options.sort=sort; search()">
                                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{{ sort.text }}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div class="filter-title px-3 py-5 w-full border border-t-0 border-x-0 border-b-[#333]">
                        Genre
                    </div>
                    <div class="filter-inputs px-3 py-5 w-full">
                        <div v-for="genre in genres" class="flex items-center justify-between py-2">
                            <label :for="`orange-checkbox-${genre.id}`" class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ genre.name }}</label>
                            <!-- <input v-model="options.genres" :id="`orange-checkbox-${genre.id}`" type="checkbox" :value="genre.id" class="w-5 h-5 text-orange-500 bg-gray-100 border-gray-300 rounded checked:bg-[orange] focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" @change="search" /> -->
                            <div class="inline-flex items-center">
                                <label class="flex items-center cursor-pointer relative">
                                    <input type="checkbox" class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-orange-600 checked:border-orange-600" :id="`orange-checkbox-${genre.id}`" v-model="options.genres" :value="genre.id" @change="search" />
                                    <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                        </svg>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
            <section class="movie-container w-[70%]">
                <div class="container max-w-[1200px] mx-auto w-full">
                    <div v-if="movieData.results?.length" class="container-movies mt-7 flex justify-between flex-wrap">
                        <MCard v-for="movie in movieData?.results" :movie="movie" :genres="genres" customClass="w-[24%]"></MCard>
                        <div class="w-full text-center mt-3">
                            <button class="bg-[#FF0000] p-2 text-white rounded-full px-9" @click="options.page++; search()">Load More</button>
                        </div>
                    </div>
                    <div v-else class="flex w-full h-[40vh] justify-center items-center text-[#777777]">No Movies available</div>
                </div>
            </section>
        </div>
    </section>
</template>
<script setup>
import MCard from "~/components/movie/MCard.vue";
import "vue3-carousel/dist/carousel.css";
import movieApi from "~/services/movie";
import { useRoute } from "vue-router";

const route = useRoute();
const movieData = ref({});
const baseUrl = ref('http://image.tmdb.org/t/p/w500/');
const genres = ref([]);
const nowPlay = ref([]);

const options = ref({
    sort:"popularity.desc",
    genres:[],
    page:1,
});
// <option>Release Date</option>
/* <option>Title A-Z</option>
    <option>Title Z-A</option>
    <option>Highest Ratings</option>
    <option>Lowest Ratings</option> */
const sorts = ref([
    {value: 'popularity.asc', text: 'Popularity Ascending'},
    {value: 'popularity.desc', text: 'Popularity Descending'},
    {value: 'primary_release_date.asc', text: 'Release Date Ascending'},
    {value: 'primary_release_date.desc', text: 'Release Date Descending'},
    {value: 'vote_average.desc', text: 'Ratings Descending'},
    {value: 'vote_average.asc', text: 'Ratings Ascending'},
]);
    
const search = () => {
    let query =  '';
    if (route.query.k) {
        query = `with_keywords=${route.query.k}`;
    }

    if (route.query.sort) {
        query = query + `&sort_by=${route.query.sort}`
    }

    if (options.value.sort) {
        query = query + `&sort_by=${options.value.sort.value}`
    }

    if (route.query.g) {
        options.value.genres.push(route.query.g);
        query = query + `&with_genres=${route.query.g}`
    }

    if (options.value.genres.length) {
        query = query + `&with_genres=${options.value.genres}`
    }

    query = query + '&page=' + options.value.page;

    movieApi.getDiscover(query).then((res) => {
        if (options.value.page == 1) {
            movieData.value = res.data;
        } else {
            movieData.value.results.push(...res.data.results);
        }
    });
};

onMounted(() => {
    if (route.query) {
        search();
    } else {
        movieApi.getDiscover("include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc").then((res) => {
            movieData.value = res.data;
        });
    }

    movieApi.getGenre().then((res) => {
        genres.value = res.data.genres;
    });
});
</script>
<style>
.class {

}
</style>