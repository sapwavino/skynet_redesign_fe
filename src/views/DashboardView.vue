<script>
export default {
  name: "Dashboard",
  data() {
    return {
      countries: [
        {name: "GHS", flag: "🇬🇭"},
        {name: "KSH", flag: "🇰🇪"},
        {name: "NGN", flag: "🇳🇬"},
        {name: "GBP", flag: "🇬🇧"},
        {name: "USD", flag: "🇺🇸"}
      ],
      selectedCurrency: 'NGN'
    };
  }
}
</script>

<script setup>
import {onMounted} from "vue";
import {getLastLogin} from "../utils/helper_functions.js";

onMounted(() => {
  const isLoggedIn = JSON.parse(window.localStorage.getItem('isLoggedIn'))
  if (!isLoggedIn) {
    window.location.href = '/auth/login';
  }
})
defineProps({layout: "DashboardLayout"});
</script>

<template>
  <section class="flex">
    <!--      SIDEBAR-->
    <div class="h-[85vh] w-1/4 px-5 pt-1 border-r border-r-gray-700 overflow-y-auto hidden md:block">


      <!--        OVERVIEW, DOMAINS, HOSTING, CLOUD, EMAIL, DATABASE-->
      <section class="flex flex-col px-5 pb-3 gap-y-1">
        <router-link
            class="dashLink"
            to="/dashboard"
            exact-active-class="dashLinkActive">

          <svg xmlns="http://www.w3.org/2000/svg"
               :class="{'dashLinkSVG dark:fill-gray-800': $route.path === '/dashboard', 'fill-gray-400 dark:fill-customGold mr-5': $route.path !== '/dashboard'}"
               viewBox="5.0 -20.0 110.0 135.0" height="1.5rem">
            <path
                d="m16.461 56.406c-3.1602 0-3.1602-4.8008 0-4.8008h25.32c3.1602 0 3.1602 4.8008 0 4.8008zm0-30.449c-3.1602 0-3.1602-4.8008 0-4.8008h52.199c3.1602 0 3.1602 4.8008 0 4.8008zm64.68 15.277h-16.562v10.32h16.559zm-18.961-4.8008h21.359c1.3242 0 2.3984 1.0742 2.3984 2.3984v15.121c0 1.3242-1.0742 2.3984-2.3984 2.3984h-21.359c-1.3242 0-2.3984-1.0742-2.3984-2.3984v-15.121c0-1.3242 1.0742-2.3984 2.3984-2.3984zm29.16-29.035h-82.68c-2.3594 0-4.2617 1.9336-4.2617 4.2617v54.242c0 1.168 0.48047 2.2344 1.2539 3.0078l-0.003906 0.003906c0.77344 0.76953 1.8398 1.2461 3.0117 1.2461h82.68c1.168 0 2.2344-0.48047 3.0078-1.2539l0.003906 0.003906c0.76953-0.77344 1.2461-1.8398 1.2461-3.0117l0.003906-54.238c0-2.3398-1.9219-4.2617-4.2617-4.2617zm-35.977 67.562h-10.727c-1.5117 8.7812-5.4414 13.781-9.5547 17.641h29.836c-4.1133-3.8594-8.043-8.8594-9.5547-17.641zm-38.902-33.781c-3.1602 0-3.1602-4.8008 0-4.8008h25.32c3.1602 0 3.1602 4.8008 0 4.8008z"
                fill-rule="evenodd"/>
          </svg>
          Overview
        </router-link>

        <router-link
            class="dashLink"
            to="/dashboard/domains?tab=buy"
            exact-active-class="dashLinkActive">

          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 80" x="0px" y="0px"
              height="1.7rem"
              :class="{'dashLinkSVG dark:fill-gray-800': $route.path === '/dashboard/domains', 'fill-gray-400 dark:fill-customGold mr-5': $route.path !== '/dashboard/domains'}">
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
          Domains
        </router-link>

        <router-link
            class="dashLink"
            to="/dashboard/hosting?tab=new"
            exact-active-class="dashLinkActive">

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
               :class="{'dashLinkSVG dark:fill-gray-800': $route.path === '/dashboard/hosting', 'fill-gray-400 dark:fill-customGold mr-5': $route.path !== '/dashboard/hosting'}"
               height="1.5rem">
            <path
                d="M480 160H32c-17.673 0-32-14.327-32-32V64c0-17.673 14.327-32 32-32h448c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32zm-48-88c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm112 248H32c-17.673 0-32-14.327-32-32v-64c0-17.673 14.327-32 32-32h448c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32zm-48-88c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm112 248H32c-17.673 0-32-14.327-32-32v-64c0-17.673 14.327-32 32-32h448c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32zm-48-88c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24z"/>
          </svg>
          Hosting
        </router-link>

        <router-link
            class="dashLink"
            to="/dashboard/cloud"
            exact-active-class="dashLinkActive">

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="dashLinkSVG" height="1.2rem"
               :class="{'dashLinkSVG dark:fill-gray-800': $route.path === '/dashboard/cloud', 'fill-gray-400 dark:fill-customGold mr-5': $route.path !== '/dashboard/cloud'}">
            <path
                d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4z"/>
          </svg>
          Cloud
        </router-link>

        <router-link
            class="dashLink"
            to="/dashboard/email"
            exact-active-class="dashLinkActive">

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="dashLinkSVG" height="1.5rem"
               :class="{'dashLinkSVG dark:fill-gray-800': $route.path === '/dashboard/email', 'fill-gray-400 dark:fill-customGold mr-5': $route.path !== '/dashboard/email'}">
            <path
                d="M256 8C118.941 8 8 118.919 8 256c0 137.059 110.919 248 248 248 48.154 0 95.342-14.14 135.408-40.223 12.005-7.815 14.625-24.288 5.552-35.372l-10.177-12.433c-7.671-9.371-21.179-11.667-31.373-5.129C325.92 429.757 291.314 440 256 440c-101.458 0-184-82.542-184-184S154.542 72 256 72c100.139 0 184 57.619 184 160 0 38.786-21.093 79.742-58.17 83.693-17.349-.454-16.91-12.857-13.476-30.024l23.433-121.11C394.653 149.75 383.308 136 368.225 136h-44.981a13.518 13.518 0 0 0-13.432 11.993l-.01.092c-14.697-17.901-40.448-21.775-59.971-21.775-74.58 0-137.831 62.234-137.831 151.46 0 65.303 36.785 105.87 96 105.87 26.984 0 57.369-15.637 74.991-38.333 9.522 34.104 40.613 34.103 70.71 34.103C462.609 379.41 504 307.798 504 232 504 95.653 394.023 8 256 8zm-21.68 304.43c-22.249 0-36.07-15.623-36.07-40.771 0-44.993 30.779-72.729 58.63-72.729 22.292 0 35.601 15.241 35.601 40.77 0 45.061-33.875 72.73-58.161 72.73z"/>
          </svg>
          Email
        </router-link>

        <router-link
            class="dashLink"
            to="/dashboard/database"
            exact-active-class="dashLinkActive">

          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              class="dashLinkSVG" height="1.5rem"
              :class="{'dashLinkSVG dark:fill-gray-800': $route.path === '/dashboard/database', 'fill-gray-400 dark:fill-customGold mr-5': $route.path !== '/dashboard/database'}">
            <path
                d="M448 73.143v45.714C448 159.143 347.667 192 224 192S0 159.143 0 118.857V73.143C0 32.857 100.333 0 224 0s224 32.857 224 73.143zM448 176v102.857C448 319.143 347.667 352 224 352S0 319.143 0 278.857V176c48.125 33.143 136.208 48.572 224 48.572S399.874 209.143 448 176zm0 160v102.857C448 479.143 347.667 512 224 512S0 479.143 0 438.857V336c48.125 33.143 136.208 48.572 224 48.572S399.874 369.143 448 336z"/>
          </svg>

          Database
        </router-link>
      </section>

      <hr class="mr-5 dark:border-gray-500"/>

      <!--        MY ORDERS, INVOICES, WALLET, SUPPORT, NOTIFICATIONS-->
      <section class="flex flex-col p-5 gap-y-1">
        <router-link
            class="dashLink"
            to="/dashboard/my-orders"
            exact-active-class="dashLinkActive">

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" height="1.2rem"
               :class="{'dashLinkSVG dark:fill-gray-800': $route.path === '/dashboard/my-orders', 'fill-gray-400 dark:fill-customGold mr-6': $route.path !== '/dashboard/my-orders'}">
            <path
                d="M504.717 320H211.572l6.545 32h268.418c15.401 0 26.816 14.301 23.403 29.319l-5.517 24.276C523.112 414.668 536 433.828 536 456c0 31.202-25.519 56.444-56.824 55.994-29.823-.429-54.35-24.631-55.155-54.447-.44-16.287 6.085-31.049 16.803-41.548H231.176C241.553 426.165 248 440.326 248 456c0 31.813-26.528 57.431-58.67 55.938-28.54-1.325-51.751-24.385-53.251-52.917-1.158-22.034 10.436-41.455 28.051-51.586L93.883 64H24C10.745 64 0 53.255 0 40V24C0 10.745 10.745 0 24 0h102.529c11.401 0 21.228 8.021 23.513 19.19L159.208 64H551.99c15.401 0 26.816 14.301 23.403 29.319l-47.273 208C525.637 312.246 515.923 320 504.717 320zM403.029 192H360v-60c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v60h-43.029c-10.691 0-16.045 12.926-8.485 20.485l67.029 67.029c4.686 4.686 12.284 4.686 16.971 0l67.029-67.029c7.559-7.559 2.205-20.485-8.486-20.485z"/>
          </svg>
          Orders
        </router-link>

        <router-link
            class="dashLink"
            to="/dashboard/invoices?tab=unpaid"
            exact-active-class="dashLinkActive">

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
               :class="{'dashLinkSVG dark:fill-gray-800': $route.path === '/dashboard/invoices', 'fill-gray-400 dark:fill-customGold mr-7': $route.path !== '/dashboard/invoices'}"
               height="1.5rem">
            <path
                d="M377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-153 31V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zM64 72c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8V72zm0 80v-16c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8zm144 263.88V440c0 4.42-3.58 8-8 8h-16c-4.42 0-8-3.58-8-8v-24.29c-11.29-.58-22.27-4.52-31.37-11.35-3.9-2.93-4.1-8.77-.57-12.14l11.75-11.21c2.77-2.64 6.89-2.76 10.13-.73 3.87 2.42 8.26 3.72 12.82 3.72h28.11c6.5 0 11.8-5.92 11.8-13.19 0-5.95-3.61-11.19-8.77-12.73l-45-13.5c-18.59-5.58-31.58-23.42-31.58-43.39 0-24.52 19.05-44.44 42.67-45.07V232c0-4.42 3.58-8 8-8h16c4.42 0 8 3.58 8 8v24.29c11.29.58 22.27 4.51 31.37 11.35 3.9 2.93 4.1 8.77.57 12.14l-11.75 11.21c-2.77 2.64-6.89 2.76-10.13.73-3.87-2.43-8.26-3.72-12.82-3.72h-28.11c-6.5 0-11.8 5.92-11.8 13.19 0 5.95 3.61 11.19 8.77 12.73l45 13.5c18.59 5.58 31.58 23.42 31.58 43.39 0 24.53-19.05 44.44-42.67 45.07z"/>
          </svg>
          Invoices
        </router-link>

        <router-link
            class="dashLink"
            to="/dashboard/wallet"
            exact-active-class="dashLinkActive">

          <svg
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="dashLinkSVG" height="1.4rem"
              :class="{'dashLinkSVG dark:fill-gray-800 ': $route.path === '/dashboard/wallet', 'fill-gray-400 dark:fill-customGold mr-10': $route.path !== '/dashboard/wallet'}">
            <path
                d="M461.2 128H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h384c8.84 0 16-7.16 16-16 0-26.51-21.49-48-48-48H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h397.2c28.02 0 50.8-21.53 50.8-48V176c0-26.47-22.78-48-50.8-48zM416 336c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"/>
          </svg>

          Wallet
        </router-link>

        <router-link
            class="dashLink relative"
            to="/dashboard/notifications"
            exact-active-class="dashLinkActive">

          <div class="absolute right-[5%] bg-green-500 text-gray-50 rounded-full py-1 px-3 text-sm">1</div>

          <svg
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="dashLinkSVG" height="1.5rem"
              :class="{'dashLinkSVG dark:fill-gray-800': $route.path === '/dashboard/notifications', 'fill-gray-400 dark:fill-customGold mr-5': $route.path !== '/dashboard/notifications'}">
            <path
                d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"/>
          </svg>

          Notifications
        </router-link>

        <router-link
            class="dashLink"
            to="/dashboard/support"
            exact-active-class="dashLinkActive">

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 40" x="0px" y="0px" class="dashLinkSVG"
               height="1.9rem"
               :class="{'dashLinkSVG dark:fill-gray-800': $route.path === '/dashboard/support', 'fill-gray-400 dark:fill-customGold mr-3': $route.path !== '/dashboard/support'}">
            <g>
              <path
                  d="M27,30a.99943.99943,0,0,1-1,1H6a.99943.99943,0,0,1-1-1,11,11,0,0,1,22,0ZM16,5a6,6,0,1,0,6,6A6.00657,6.00657,0,0,0,16,5ZM7,14a2.0026,2.0026,0,0,0,2-2V10a2,2,0,0,0-4,0v2A2.0026,2.0026,0,0,0,7,14ZM16,3a7.99442,7.99442,0,0,1,6.73853,3.70569,3.97063,3.97063,0,0,1,1.92871-.67206,9.97873,9.97873,0,0,0-17.33448,0,3.97063,3.97063,0,0,1,1.92871.67206A7.99442,7.99442,0,0,1,16,3Zm9,5a2.0026,2.0026,0,0,0-2,2v2a1.99727,1.99727,0,0,0,.91644,1.67627A3.00048,3.00048,0,0,1,21,16a1,1,0,0,0,0,2,4.99436,4.99436,0,0,0,4.92279-4.23639A1.99439,1.99439,0,0,0,27,12V10A2.0026,2.0026,0,0,0,25,8Z"/>
            </g>
          </svg>

          Support
        </router-link>
      </section>


      <hr class="mr-5 dark:border-gray-500"/>

      <!--      DOCS, SETTINGS -->
      <section class="flex flex-col p-5 gap-y-1">
        <router-link
            class="dashLink"
            to="/dashboard/profile-settings?tab=personal"
            exact-active-class="dashLinkActive">
          <svg
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" height="1.5rem"
              class="dashLinkSVG"
              :class="{'dashLinkSVG dark:fill-gray-800': $route.path === '/dashboard/profile-settings', 'fill-gray-400 dark:fill-customGold mr-3': $route.path !== '/dashboard/profile-settings'}">
            <path
                d="M610.5 373.3c2.6-14.1 2.6-28.5 0-42.6l25.8-14.9c3-1.7 4.3-5.2 3.3-8.5-6.7-21.6-18.2-41.2-33.2-57.4-2.3-2.5-6-3.1-9-1.4l-25.8 14.9c-10.9-9.3-23.4-16.5-36.9-21.3v-29.8c0-3.4-2.4-6.4-5.7-7.1-22.3-5-45-4.8-66.2 0-3.3.7-5.7 3.7-5.7 7.1v29.8c-13.5 4.8-26 12-36.9 21.3l-25.8-14.9c-2.9-1.7-6.7-1.1-9 1.4-15 16.2-26.5 35.8-33.2 57.4-1 3.3.4 6.8 3.3 8.5l25.8 14.9c-2.6 14.1-2.6 28.5 0 42.6l-25.8 14.9c-3 1.7-4.3 5.2-3.3 8.5 6.7 21.6 18.2 41.1 33.2 57.4 2.3 2.5 6 3.1 9 1.4l25.8-14.9c10.9 9.3 23.4 16.5 36.9 21.3v29.8c0 3.4 2.4 6.4 5.7 7.1 22.3 5 45 4.8 66.2 0 3.3-.7 5.7-3.7 5.7-7.1v-29.8c13.5-4.8 26-12 36.9-21.3l25.8 14.9c2.9 1.7 6.7 1.1 9-1.4 15-16.2 26.5-35.8 33.2-57.4 1-3.3-.4-6.8-3.3-8.5l-25.8-14.9zM496 400.5c-26.8 0-48.5-21.8-48.5-48.5s21.8-48.5 48.5-48.5 48.5 21.8 48.5 48.5-21.7 48.5-48.5 48.5zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm201.2 226.5c-2.3-1.2-4.6-2.6-6.8-3.9l-7.9 4.6c-6 3.4-12.8 5.3-19.6 5.3-10.9 0-21.4-4.6-28.9-12.6-18.3-19.8-32.3-43.9-40.2-69.6-5.5-17.7 1.9-36.4 17.9-45.7l7.9-4.6c-.1-2.6-.1-5.2 0-7.8l-7.9-4.6c-16-9.2-23.4-28-17.9-45.7.9-2.9 2.2-5.8 3.2-8.7-3.8-.3-7.5-1.2-11.4-1.2h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c10.1 0 19.5-3.2 27.2-8.5-1.2-3.8-2-7.7-2-11.8v-9.2z"/>
          </svg>
          Settings
        </router-link>

        <router-link
            class="dashLink"
            to="/dashboard/docs"
            exact-active-class="dashLinkActive">
          <svg
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
              :class="{'dashLinkSVG dark:fill-gray-800': $route.path === '/dashboard/invoices', 'fill-gray-400 dark:fill-customGold mr-5': $route.path !== '/dashboard/invoices'}"
              height="1.5rem">
            <path
                d="M552 64H88c-13.255 0-24 10.745-24 24v8H24c-13.255 0-24 10.745-24 24v272c0 30.928 25.072 56 56 56h472c26.51 0 48-21.49 48-48V88c0-13.255-10.745-24-24-24zM56 400a8 8 0 0 1-8-8V144h16v248a8 8 0 0 1-8 8zm236-16H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm-208-96H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm0-96H140c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h360c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12z"/>
          </svg>

          Docs
        </router-link>


      </section>


      <hr class="mr-5 mb-5 dark:border-gray-500"/>

      <!--        PROFILE + BALANCE -->
      <div class="flex items-center">
        <img
            src="https://media.istockphoto.com/id/1438969575/photo/smiling-young-male-college-student-wearing-headphones-standing-in-a-classroom.jpg?s=612x612&w=0&k=20&c=yNawJP9JGXU6LOL262ME5M1U2xxNKQsvT7F9DZhZCh4="
            alt="userImg" class="rounded-full h-14 w-14 object-cover border-4 border-customGold mb-3"/>
        <div class="flex flex-col px-5">

          <h2 class="header">John Doe</h2>
          <h2 class="muteSubheader">john@doe.com</h2>
          <h2 class="muteSmallSubheader" style="font-size: 0.6rem; font-weight: bolder !important;">Last login: {{getLastLogin()}}</h2>
        </div>
      </div>
      <div class="flex items-center mt-5">
        <div class="block w-1/2">
          <select id="country"
                  class="h-12 border-2 border-customGold dark:text-gray-300 rounded-2xl block py-2.5 px-4 focus:outline-none font-bold cursor-pointer text-center"
                  v-model="selectedCurrency">
            <option v-for="(country, idx) in countries" :key="idx" :value="country.name">{{ country.flag }}
              {{ country.name }}
            </option>
          </select>
        </div>
        <button class="flat-border-btn-base-small w-full rounded-2xl w-1/2 ">Balance: <span
            class="text-base">0.00</span></button>
      </div>

    </div>

    <!--      MAIN AREA-->
    <div class="w-full h-[85vh] overflow-y-auto p-5">
      <router-view></router-view>
    </div>

  </section>
</template>

<style scoped>

</style>
