<template>
    <section v-if="nowPlay" class="hero-carousel bg-[#1E232B] py-[8%]">
        <Carousel v-bind="config" class="hero-slides">
            <Slide v-for="slide in nowPlay?.results" :key="slide.id">
                <NuxtLink :to="`/movies/${slide.id}`">
                    <div class="flex text-white w-full text-left px-[50px]">
                        <div class="cover-image w-[30%] relative z-[2]">
                            <img :src="`${baseUrl}${slide.poster_path}`" class="h-[114%] w-full object-cover mt-[-20px] ml-[40px] rounded" />
                        </div>
                        <div class="bg-[#000] py-5 pl-[10%] pr-2 rounded-lg w-[70%] h-[280px] overflow-hidden">
                            <div class="ratings flex items-center gap-2">
                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.84818 2.13274C8.19526 1.32678 9.338 1.32678 9.68509 2.13274L10.7225 4.54183C10.8673 4.87801 11.1842 5.10823 11.5487 5.14203L14.1604 5.38427C15.0342 5.46531 15.3873 6.55212 14.7281 7.13127L12.7575 8.86241C12.4825 9.10398 12.3615 9.47648 12.4419 9.83355L13.0186 12.3924C13.2116 13.2484 12.2871 13.9201 11.5325 13.4721L9.27719 12.1329C8.96247 11.946 8.5708 11.946 8.25607 12.1329L6.00072 13.4721C5.24619 13.9201 4.32169 13.2484 4.51463 12.3924L5.09133 9.83355C5.17181 9.47648 5.05077 9.10398 4.77579 8.86241L2.8052 7.13127C2.14594 6.55212 2.49906 5.46531 3.37284 5.38427L5.98461 5.14203C6.34907 5.10823 6.66594 4.87801 6.81072 4.54183L7.84818 2.13274Z" fill="#FFB802"/>
                                </svg>
                                {{ slide.vote_average }}
                            </div>
                            <h3 class="text-[34px] font-[500] leading-[.9em] mt-1">
                                {{ slide.title }}
                            </h3>
                            <div class="info flex gap-4 w-full text-[14px] mt-2">
                                {{ slide.release_date.split('-')[0] }} • {{ findGenre(slide.genre_ids[0])?.name }}
                            </div>
                            <div class="description text-[12px] mt-3 h-[45%] overflow-hidden">{{ slide.overview }}</div>
                        </div>
                    </div>
                </NuxtLink>
            </Slide>

            <template #addons>
                <Navigation />
                <Pagination />
            </template>
        </Carousel>
    </section>
    <section class="movie-contaniner py-[10%] bg-[#1b1e22] text-white">
        <div class="container max-w-[1200px] mx-auto w-full">
            <div class="container-head flex justify-between relative">
                <div class="bg-[#E74C3C] h-[6px] top-[-8px] w-[100px] absolute"></div>
                <h3 class="text-[24px]">Discover Movies</h3>
                <div class="flex justify-end gap-2">
                    <button class="bg-[#FF0000] text-white rounded-full py-1 px-4 text-[14px]">Popularity</button>
                    <button class="focus:bg-[#FF0000] bg-[#00000033] text-white rounded-full py-1 px-4 text-[14px]">Release Date</button>
                </div>
            </div>

            <div class="container-movies mt-10 flex justify-between flex-wrap">
                <MCard v-for="movie in movieData?.results" :movie="movie" :genres="genres" customClass="w-[19%]"></MCard>
            </div>
        </div>
    </section>
  </template>
  <script setup>
  import "vue3-carousel/dist/carousel.css";
  import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
  import movieApi from "~/services/movie";
  import MCard from '~/components/movie/MCard.vue';
  
  const movieData = ref({});
  const baseUrl = ref('http://image.tmdb.org/t/p/w500/');
  const genres = ref([]);
  const config = ref({
    itemsToShow: 2.6,
    height: '60vh',
    wrapAround: true,
  });
  
  const nowPlay = ref([]);
  
  const findGenre = (id) => {
    const genre = genres.value.find((genre) => genre.id === id);
    return genre;
  };
  
  onMounted(() => {
    movieApi.getDiscover("include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc").then((res) => {
      movieData.value = res.data;
    });
  
    movieApi.getNowPlaying('language=en-US&page=1').then((res) => {
      nowPlay.value = res.data;
    });
  
    movieApi.getGenre().then((res) => {
      genres.value = res.data.genres;
    });
  });
  </script>
  <style>
  .hero-slides .carousel__slide.carousel__slide--active {
    transform: scale(1.4);
    position: relative;
    z-index: 3;
    filter: brightness(1);
  }
  
  .hero-slides .carousel__slide {
    filter: brightness(.5);
  }

  .carousel__pagination-button::after {
    width: 10px;
    height: 10px;
    border-radius: 60px;
  }
  .carousel__pagination-button--active::after {
    background: #E74C3C !important;
    width: 60px;
  }
  </style>