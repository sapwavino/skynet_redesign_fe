<script>
export default {
  name: "TestimonialsCard",
  props: {
    img: {
      type: String,
      required: true
    },
    quote: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div class="flex flex-col justify-center shadow-2xl rounded-4xl p-10 mr-3 my-5 dark:bg-gray-900">
    <img :src="img" :alt="name" class="rounded-full h-20 w-20 object-cover border-4 border-customGold mb-3"/>
    <h2 class="text-xl italic dark:text-gray-500"><strong>"</strong><span class="muteSubheader">{{ quote }}</span><strong>"</strong></h2>
    <h2 class="mt-5 font-bold dark:text-gray-500">{{ name }}</h2>
    <h2 class="capitalize font-medium dark:text-gray-500">{{ role }}</h2>
  </div>
</template>

<style scoped>

</style>