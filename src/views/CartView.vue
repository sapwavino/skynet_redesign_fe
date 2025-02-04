<script>
export default {
  name: "Cart",
  computed: {
    cartItems() {
      return this.$store.state.cart.items;
    },
    totalPrice() {
      return this.$store.getters.totalPrice;
    }
  }
}
</script>

<script setup>

</script>

<template>
  <div class="mb-5 min-h-[85vh]">
    <section
        class=" relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
      <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
        <div class="grid grid-cols-12">
          <div
              class="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-10 w-full max-xl:max-w-3xl max-xl:mx-auto">
            <div class="flex items-center justify-between pb-8 border-b border-gray-300">
              <h2 class="font-bold text-3xl text-black">Cart</h2>
              <h2 class="font-bold text-xl leading-8 text-gray-600">3 Items</h2>
            </div>
            <div class="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
              <div class="col-span-12 md:col-span-7">
                <p class="font-normal text-lg leading-8 text-gray-400">Product Details</p>
              </div>
              <div class="col-span-12 md:col-span-5">
                <div class="grid grid-cols-5">
                  <div class="col-span-3">
                    <p class="font-normal text-lg leading-8 text-gray-400 text-center">Quantity</p>
                  </div>
                  <div class="col-span-2">
                    <p class="font-normal text-lg leading-8 text-gray-400 text-center">Total</p>
                  </div>
                </div>
              </div>
            </div>

            <!--            CART ITEM-->
            <div
                class="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-400 group"
                v-for="(item, idx) in cartItems">
              <!--              SVG-->
              <div class="w-full md:max-w-[126px]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 80" x="0px" y="0px"
                    height="8rem">
                  <path
                      d="M18.23169,17.66718c3.91748,2.18512,8.36151,3.43494,13.01831,3.55701V2.26904c-.98059,.02448-1.94916,.09583-2.9043,.21344-4.3717,2.04559-8.03448,7.66602-10.11401,15.18469Z"/>
                  <path
                      d="M35.65515,2.4826c-.95538-.11768-1.92426-.18909-2.90515-.21356V21.22278c4.62561-.12512,9.07867-1.39307,13.00885-3.59155-2.08112-7.50037-5.73907-13.10596-10.1037-15.14862Z"/>
                  <path
                      d="M16.51447,18.4201c-2.59906-1.58307-4.94281-3.57922-6.96344-5.909-4.38855,5.0484-7.10345,11.58234-7.28198,18.73889H14.88818c.05731-4.57831,.63275-8.92102,1.62628-12.8299Z"/>
                  <path
                      d="M28.3457,61.51752c.95514,.11761,1.92371,.18896,2.9043,.21344v-18.95514c-4.65698,.12207-9.10095,1.37183-13.01831,3.55695,2.07953,7.51868,5.74231,13.1391,10.11401,15.18475Z"/>
                  <path
                      d="M16.5144,45.57983c-.99353-3.90887-1.56891-8.25153-1.62622-12.82983H2.26904c.17859,7.15662,2.89337,13.69055,7.28204,18.73901,2.02063-2.32977,4.36426-4.32605,6.96332-5.90918Z"/>
                  <path
                      d="M46.14746,19.13867c-4.06476,2.2041-8.64758,3.4621-13.39746,3.58411v8.52722h14.86224c-.05426-4.31909-.57245-8.41699-1.46478-12.11133Z"/>
                  <path
                      d="M16.38776,31.25h14.86224v-8.52582c-4.78186-.11908-9.35321-1.36389-13.40491-3.55353-.8877,3.6861-1.4032,7.77258-1.45734,12.07935Z"/>
                  <path
                      d="M47.06519,16.86835c2.36914-1.49487,4.50909-3.34711,6.3537-5.48358-3.80072-3.94739-8.67426-6.85278-14.15125-8.23322,3.31793,2.90594,6.05676,7.73694,7.79755,13.7168Z"/>
                  <path
                      d="M16.92688,47.10278c-2.36798,1.49371-4.50604,3.35016-6.35449,5.5033,3.80188,3.95203,8.67859,6.86084,14.15967,8.24231-3.323-2.91071-6.06488-7.75275-7.80518-13.74561Z"/>
                  <path
                      d="M16.92688,16.89716c1.7403-5.99286,4.48218-10.83484,7.80518-13.74554-5.48114,1.38153-10.35785,4.29034-14.15979,8.24243,1.84851,2.15302,3.98657,4.00946,6.35461,5.50311Z"/>
                  <path
                      d="M47.47223,18.36542c1.00195,3.92285,1.58203,8.2851,1.63959,12.88458h12.61914c-.17877-7.16522-2.8999-13.70636-7.29785-18.75726-2.01788,2.30389-4.36432,4.28857-6.96088,5.87268Z"/>
                  <path
                      d="M17.84509,44.82935c4.05164-2.18964,8.62299-3.43451,13.40491-3.55353v-8.52582h-14.86224c.05414,4.30676,.56964,8.39331,1.45734,12.07935Z"/>
                  <path
                      d="M61.49707,53.7876l-9.14795-8.09766,2.28662-1.61914c.56592-.40039,.8374-1.07227,.7085-1.75342-.12891-.68164-.62695-1.20801-1.30029-1.37402l-14.57813-3.5957c-.60059-.15039-1.21973,.02393-1.65674,.46143-.43701,.43701-.60986,1.05664-.46143,1.65674l3.5957,14.57813c.16602,.67334,.69238,1.17139,1.37402,1.30029,.68018,.12939,1.35303-.14258,1.75342-.70801l1.61914-2.28711,8.09766,9.14795c.13721,.15479,.33203,.24609,.53857,.25244,.00781,.00049,.01514,.00049,.02295,.00049,.19873,0,.38965-.07861,.53027-.21973l6.65088-6.65088c.14648-.146,.22559-.34619,.21924-.55322-.00635-.20654-.09766-.40137-.25244-.53857Z"/>
                  <path
                      d="M45.29443,55.50293c-.60852,.86053-1.55725,1.35455-2.60583,1.36768-1.04742,1.56201-2.19385,2.90314-3.42084,3.97784,3.10248-.78192,6.00116-2.06787,8.63104-3.74072l-2.078-2.34747-.52637,.74268Z"/>
                  <path
                      d="M39.48682,54.40332l-2.7699-11.22998c-1.30225-.2207-2.62531-.36218-3.96692-.39789v18.95551c.98071-.02448,1.94946-.09589,2.90466-.2135,2.02728-.94867,3.89899-2.67407,5.53418-4.99304-.82965-.41559-1.46759-1.17163-1.70203-2.12109Z"/>
                  <path
                      d="M35.89111,39.8252c-.24072-.97754-.02344-1.99121,.5957-2.78174,.78418-1.00049,2.10986-1.45654,3.33789-1.15234l7.49213,1.8479c.16058-1.62543,.27399-3.28333,.29541-4.98901h-14.86224v8.52545c1.20544,.03046,2.39856,.13495,3.57477,.30786l-.43365-1.75812Z"/>
                  <path
                      d="M55.50195,45.29541l-.7417,.52539,2.35431,2.08405c2.80005-4.40613,4.4776-9.59039,4.61639-15.15485h-12.61914c-.02289,1.82983-.15027,3.60779-.33228,5.34973l5.62378,1.38708c1.25049,.30811,2.17578,1.28613,2.41504,2.55176,.23926,1.26465-.26514,2.5127-1.31641,3.25684Z"/>
                </svg>
              </div>


              <!--              OTHER DETAILS-->
              <div class="grid grid-cols-1 md:grid-cols-4 w-full">
                <div class="md:col-span-2">
                  <div class="flex flex-col max-[500px]:items-center gap-3">
                    <h6 class="font-semibold text-base leading-7 text-black">{{ item.name }}</h6>
                    <h6 class="font-normal text-base leading-7 text-gray-500 capitalize">{{ item.type }}</h6>
                    <h6 class="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">
                      $120.00</h6>
                  </div>
                </div>
                <div class="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                  <div class="flex items-center h-full">
                    <button
                        class="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                      <svg class="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                           xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                           viewBox="0 0 22 22" fill="none">
                        <path d="M16.5 11H5.5" stroke="" stroke-width="1.6"
                              stroke-linecap="round"/>
                        <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                              stroke-linecap="round"/>
                        <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                              stroke-linecap="round"/>
                      </svg>
                    </button>
                    <input type="text"
                           class="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px]  text-center bg-transparent"
                           placeholder="1">
                    <button
                        class="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                      <svg class="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                           xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                           viewBox="0 0 22 22" fill="none">
                        <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-width="1.6"
                              stroke-linecap="round"/>
                        <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-opacity="0.2"
                              stroke-width="1.6" stroke-linecap="round"/>
                        <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-opacity="0.2"
                              stroke-width="1.6" stroke-linecap="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                  <p class="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600">
                    $120.00</p>
                </div>
              </div>
            </div>


            <!--            PAYMENT CONFIRMATION SECTION-->
            <div class="flex items-center justify-end mt-8">
              <button
                  class="flex items-center px-5 py-3 rounded-full gap-2 border-none outline-0 group font-semibold text-lg leading-8 text-indigo-600 shadow-sm shadow-transparent transition-all duration-500 hover:text-indigo-700">
                Add Coupon Code
                <svg class="transition-all duration-500 group-hover:translate-x-2" xmlns="http://www.w3.org/2000/svg"
                     width="22" height="22" viewBox="0 0 22 22"
                     fill="none">
                  <path
                      d="M12.7757 5.5L18.3319 11.0562M18.3319 11.0562L12.7757 16.6125M18.3319 11.0562L1.83203 11.0562"
                      stroke="#4F46E5" stroke-width="1.6" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
          </div>
          <div
              class=" col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24 lg:py-10">
            <h2 class="font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
              Order Summary</h2>
            <div class="mt-8">
              <div class="flex items-center justify-between pb-6">
                <p class="font-normal text-lg leading-8 text-black">3 Items</p>
                <p class="font-medium text-lg leading-8 text-black">$480.00</p>
              </div>
              <form>
                <label class="flex items-center mb-1.5 text-gray-400 text-sm font-medium">Promo/Coupon Code
                </label>
                <div class="flex pb-4 w-full">
                  <div class="relative w-full ">
                    <div class=" absolute left-0 top-0 py-2.5 px-4 text-gray-300">

                    </div>
                    <input type="text"
                           class="block w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-gray-400 "
                           placeholder="xxxx xxxx xxxx">
                  </div>
                </div>
                <div class="flex items-center border-b border-gray-200">
                  <button
                      class="rounded-lg w-full bg-black py-2.5 px-4 text-white text-sm font-semibold text-center mb-8 transition-all duration-500 hover:bg-black/80">
                    Apply discount
                  </button>
                </div>

                <button
                    class="btn-base w-full mx-auto">
                  Pay $485.00 with Paystack
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>

</style>