<script>
export default {
  name: "WhyUsCard",
  props: {
    icon: {
      type: String,
      required: false
    },
    header: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div class="flex flex-col gap-y-3 shadow-2xl rounded-2xl mx-auto mb-10 p-10 w-3/4 dark:bg-gray-900 transform transition-all duration-500 hover:-translate-y-1.5 ease-in-out">
    <div>

      <svg v-if="header === 'Reliability'"
           class="dark:fill-customGold"
           height="2rem"
           viewBox="0 0 576 512"
           xmlns="http://www.w3.org/2000/svg"
      >
        <path
            d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
        />
      </svg>
      <svg v-if="header === 'Performance'"
           class="dark:fill-customGold"
           height="2rem"
           viewBox="0 0 512 512"
           xmlns="http://www.w3.org/2000/svg"
      >
        <path
            d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"
        />
      </svg>
      <svg v-if="header === 'Security'"
           class="dark:fill-customGold"
           height="2rem"
           viewBox="0 0 448 512"
           xmlns="http://www.w3.org/2000/svg"
      >
        <path
            d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"
        />
      </svg>
    </div>
    <h2 class="header">{{ header }}</h2>
    <h2 class="muteSubheader">{{ content }}</h2>
  </div>
</template>

<style scoped>

</style>