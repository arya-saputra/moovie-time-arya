<template>
    <div class="group mb-3 relative overflow-hidden rounded" :class="customClass">
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
        <img :src="`http://image.tmdb.org/t/p/w500${movie.poster_path}`" class="w-full rounded" />
        <div class="py-3">
            <h3 class="">{{ movie.title }}</h3>
            <p class="text-[#555] text-[14px]">{{ movie.release_date.split('-')[0] }}</p>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    movie: {
        type: Object,
    },
    customClass: {
        type: String,
    },
    genres: {
        type: Array,
    }
});

const findGenre = (id) => {
    const genre = props.genres.find((genre) => genre.id === id);
    return genre;
};
</script>