<template>
    <section class="search bg-[#1b1e22] text-white">
        <div class="search-container flex gap-3 w-full max-w-[1200px] mx-auto justify-between items-start py-[6%] flex-wrap">
            <div class="container-head w-full flex justify-between relative">
                <div class="bg-[#E74C3C] h-[6px] top-[-8px] w-[100px] absolute"></div>
                <h3 class="text-[24px]">Movies</h3>
            </div>
            <aside class="filter-container w-[27%]">
                <div class="mt-[10%] bg-[#12161d] min-h-[20vh] w-full">
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
                    <div class="container-movies mt-7 flex justify-between flex-wrap">
                        <div v-for="movie in movieData?.results" class="group w-[24%] mb-3 relative overflow-hidden rounded">
                            <div class="absolute right-0 top-0 bg-[rgba(0,0,0,.4)] py-1 px-2 text-[18px]">
                            {{ movie.vote_average }}
                            </div>
                            <div class="absolute transition-all h-0 left-0 top-0 bg-[#333] text-[18px] w-full group-hover:h-full flex justify-center items-center overflow-hidden">
                                <div class="hover-info w-[80%] mx-auto text-center">
                                    <div class="rating w-full justify-center flex items-center mx-auto mb-3">
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.0815 2.13274C15.4286 1.32678 16.5714 1.32678 16.9185 2.13274L20.0912 9.50027C20.236 9.83645 20.5529 10.0667 20.9173 10.1005L28.9047 10.8413C29.7785 10.9223 30.1316 12.0091 29.4724 12.5883L23.4459 17.8825C23.1709 18.124 23.0499 18.4966 23.1303 18.8536L24.894 26.679C25.087 27.535 24.1625 28.2067 23.4079 27.7587L16.5106 23.6632C16.1958 23.4763 15.8042 23.4763 15.4894 23.6632L8.59208 27.7587C7.83755 28.2067 6.91305 27.535 7.10599 26.679L8.86967 18.8536C8.95015 18.4965 8.82911 18.124 8.55413 17.8825L2.52763 12.5883C1.86837 12.0091 2.2215 10.9223 3.09527 10.8413L11.0827 10.1005C11.4471 10.0667 11.764 9.83645 11.9088 9.50027L15.0815 2.13274Z" fill="#FFB802"/>
                                        </svg>
                                        <span class="ml-2">{{ movie.vote_average }}</span>
                                    </div>
                                    <div class="mb-3">{{ findGenre(movie.genre_ids[0])?.name }}</div>
                                    <NuxtLink :to="`/movies/${movie.id}`">
                                        <button class="btn bg-[red] w-[60%] mx-auto py-1 rounded-full mt-3 text-sm">View</button>
                                    </NuxtLink>
                                </div>
                            </div>
                            <img :src="`${baseUrl}${movie.poster_path}`" class="w-full rounded" />
                            <div class="py-3">
                                <h3 class="">{{ movie.title }}</h3>
                                <p class="text-[#555] text-[14px]">{{ movie.release_date.split('-')[0] }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </section>
</template>
<script setup>
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
    genres:[]
});
// <option>Release Date</option>
/* <option>Title A-Z</option>
    <option>Title Z-A</option>
    <option>Highest Ratings</option>
    <option>Lowest Ratings</option> */
const sorts = ref([
    {value: 'popularity.desc', text: 'Popularity'},
    {value: 'primary_release_date.desc', text: 'Release Date'},
    {value: 'revenue.desc', text: 'Highest Revenue'},
    {value: 'revenue.asc', text: 'Lowest Revenue'},
    {value: 'title.asc', text: 'Title A-Z'},
    {value: 'title.desc', text: 'Title Z-A'},
    {value: 'vote_average.desc', text: 'Highest Ratings'},
    {value: 'vote_average.asc', text: 'Lowest Ratings'},
])

const findGenre = (id) => {
    const genre = genres.value.find((genre) => genre.id === id);
    return genre;
};

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
        query = query + `&with_genres=${route.query.g}`
    }

    if (options.value.genres.length) {
        query = query + `&with_genres=${options.value.genres}`
    }

    query = query + '&page=1';

    movieApi.getDiscover(query).then((res) => {
        movieData.value = res.data;
    });
}

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