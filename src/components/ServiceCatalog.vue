<template>
  <div class="service-catalog">
    <div class="header-container">
      <div class="header-left">
        <h1 class="header-text">
          {{ textAssets.service_hub }}
        </h1>
        <p class="header-subtext">
          {{ textAssets.service_hub_subtext }}
          <a href="#">{{ textAssets.learn_more }}</a>
        </p>
      </div>
      <div class="header-right">
        <SearchInput @update-service="updateServices($event)" />
        <button
          class="add-service-button"
          @click="triggerAlert()"
        >
          <img src="../assets/Icons.svg">
          <span>{{ textAssets.service_package }}</span>
        </button>
      </div>
    </div>
    <div v-if="!apiStore.loading.value">
      <div
        v-if="currPageServices.length"
        class="catalog"
      >
        <ServiceCard
          v-for="(service, id) in currPageServices"
          :key="id"
          class="catalog-card"
          :service-data="service"
        />
      </div>
      <div
        v-else
        data-testid="no-results"
      >
        No services
      </div>
    </div>
    <div
      v-else
      class="loader-container"
    >
      <div class="loader" />
    </div>
  </div>
  <div
    v-if="currPageServices.length"
    class="pagination"
  >
    <button
      class="arrows"
      :disabled="currPage === 0"
      @click="prevPage"
    >
      <img
        alt="Back"
        height="20"
        src="../assets/back-arrow.png"
        width="18"
      >
    </button>
    <span class="pagination-data">{{ currPage * 9 + 1 }} to
      {{
        currPage + 1 === totalPages
          ? apiStore.services.value.length
          : currPage * 9 + 9
      }}
      of {{ apiStore.services.value.length }} services</span>
    <button
      class="arrows"
      :disabled="currPage + 1 === totalPages"
      @click="nextPage"
    >
      <img
        alt="Next"
        height="20"
        src="../assets/forward-arrow.png"
        width="18"
      >
    </button>
  </div>
</template>

<script setup lang="ts">
import useServices from '../composables/useServices'
import { computed, ref } from 'vue'
import { SearchInput, ServiceCard } from './index'
import { textAssets } from '../composables/serviceCatalog.utils'
import { getElementsByPage } from '../composables/serviceCatalog.utils'

const apiStore = useServices()
const currPage = ref(0)
const currPageServices = computed(() => {
  if (apiStore.services.value?.length > 0) {
    const services = getElementsByPage(apiStore.services.value, currPage.value)
    return services
  }
  return []
})
const updateServices = (value:string)=>{
  currPage.value = 0
  apiStore.getServices(value)
}
const totalPages = computed(() => {
  if (apiStore?.services?.value?.length) {
    return Math.ceil(apiStore.services.value.length / 9)
  }
  return 0
})
const prevPage = () => {
  currPage.value -= 1
}
const nextPage = () => {
  currPage.value += 1
}
const triggerAlert = ()=>{
  window.alert('Service Added')
}
</script>

<style lang="scss" scoped>
.service-catalog {
  margin: 20px 0 20px 1vw;
  max-width: 100vw;
}

.catalog {
  display: flex;
  flex-wrap: wrap;
  margin: 1vw 0 0 0;
}

.service {
  border: 1px solid #999;
  border-radius: 10px;
  margin: 6px;
  padding: 8px 16px;
  width: 200px;

  p:first-of-type {
    color: #333;
    font-weight: 700;
  }

  p {
    color: #666;
  }
}

.header-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 30px 0;
  width: 100%;
}

.header-left {
  width: 66vw;
}

.header-right {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr;
  height: 44px;
  width: 430px;
}

.header-text {
  margin-bottom: 20px;
}

.add-service-button {
  align-items: center;
  background-color: #07a88d;
  border: none;
  border-radius: 25px;
  color: white;
  display: grid;
  font-size: 16px;
  grid-template-columns: 1fr 11fr;
  justify-content: center;
  padding: 10px 15px;
  width: 197px;
}

.catalog-card {
  background-color: #ffffff;
  margin: 10px;
  width: 31vw;
}

@media(min-width:720px) and (max-width: 1279px){
  .catalog-card{
    width: 45vw;
  }
  .header-container{
    display: initial;
    .header-right{
      margin: 10px 0;
    }
  }
}

@media (max-width: 719px){
  .catalog-card{
    width: 97vw;
  }
  .header-container{
    display: initial;
    .header-right{
      margin: 10px 0;
    }
  }
}

.pagination {
  align-items: center;
  display: flex;
  height: 8vh;
  justify-content: center;
  text-align: center;
}
.pagination-data {
  align-items: center;
  color: #707888;
  display: flex;
  font-size: 13px;
  font-weight: 600;
  height: 8vh;
  justify-content: center;
  line-height: 20px;
  text-align: center;
  text-decoration-skip-ink: none;
  text-underline-position: from-font;
}

.arrows {
  background-color: #f2f6fe;
  border: 1px solid #0000001a;
  border-radius: 25px;
  height: 44px;
  margin: 20px;
  width: 44px;
}

.loader-container{
  display: flex;
  width: 100vw;
  height: 80vh;
  text-align: center;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.loader {
  animation: spin 1s ease infinite;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #09f;
  border-radius: 50%;
  height: 36px;
  width: 36px;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
