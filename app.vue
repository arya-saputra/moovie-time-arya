<template>
  <MHeader></MHeader>
  <main class="bg-[#1E232B]">
    <NuxtPage></NuxtPage>
  </main>
  <MFooter></MFooter>
</template>
<script setup lang="ts">
import MHeader from "~/components/MHeader.vue";
import MFooter from "~/components/MFooter.vue";
import { useMovieStore } from "~/stores/movie";

const movieStore = useMovieStore();

onMounted(() => {
  movieStore.getGenres();
});
</script>