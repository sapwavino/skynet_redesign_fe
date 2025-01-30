<script>
import TestimonialsCard from "@/components/TestimonialsCard.vue";
import {Vue3Marquee} from "vue3-marquee";

export default {
  name: "Testimonials",
  components: {Vue3Marquee, TestimonialsCard}
}
</script>

<template>
  <div>
    <div class="mt-10 min-h-10" id="testimonials"></div>
    <h2 class="header text-center">Trusted by 1000+ website owners worldwide</h2>
    <div class="mx-auto">
      <Vue3Marquee pause-on-hover>
        <TestimonialsCard role="App Developer" name="Garid Hamid"
                          quote="Just 3 months in and we can easily tell the difference!"
                          img="https://media.istockphoto.com/id/1438969575/photo/smiling-young-male-college-student-wearing-headphones-standing-in-a-classroom.jpg?s=612x612&w=0&k=20&c=yNawJP9JGXU6LOL262ME5M1U2xxNKQsvT7F9DZhZCh4="/>
        <TestimonialsCard role="Database Engineer" name="Paul Ighor"
                          quote="We built the whole identity of our fintech solutions on Skynet."
                          img="https://img.freepik.com/premium-photo/portrait-young-man-with-computer-table_1048944-9460572.jpg?semt=ais_hybrid"/>
        <TestimonialsCard role="AI Engineer" name="Jamila Kabir"
                          quote="Incredible performance.Our startup app is going great"
                          img="https://www.shutterstock.com/image-photo/studio-shot-photo-black-woman-260nw-2559358989.jpg"/>
        <TestimonialsCard role="Web Developer" name="Vino Samari" quote="Great price point for my hosting needs"
                          img="https://static.vecteezy.com/system/resources/thumbnails/043/171/636/small/ai-generated-man-with-glasses-smiling-at-laptop-free-photo.jpeg"/>
      </Vue3Marquee>
    </div>
  </div>
</template>

<style scoped>

</style>