<template>
  <div class="card">
    <div
      class="card-body"
      @click="openServiceModal()"
    >
      <div class="card-body-row-one">
        <div
          v-if="service_status"
          class="service_status"
        >
          <img
            v-if="service_status === 'published'"
            alt="Icon"
            height="20"
            src="@\assets\GreenTick.png"
            width="20"
          >
          <img
            v-else-if="service_status === 'unpublished'"
            alt="Icon"
            height="20"
            src="@\assets\XCross.png"
            width="20"
          >
          <img
            v-else
            alt="Icon"
            height="20"
            src="@\assets\InProgress.png"
            width="20"
          >
          <p
            v-if="serviceStatusText[service_status]"
            class="serviceStatusText"
          >
            {{ serviceStatusText[service_status] }}
          </p>
        </div>
        <div class="versions">
          <button>
            {{ serviceData.versions.length }} version<span
              v-if="serviceData.versions.length > 1"
            >s</span>
          </button>
        </div>
      </div>
      <div class="card-body-row-two">
        {{ serviceData.name }}
      </div>
      <div class="card-body-row-three">
        {{ serviceData.description }}
      </div>
      <div class="card-body-row-four">
        <div class="service-metrics">
          <ul
            v-if="serviceData.configured"
            class="service-metrics-list"
          >
            <li>
              <span class="metrics-list-bold-text">{{ metrics.latency }}ms</span>
              <span class="metrics-list-grey-text"> latency</span>
            </li>
            <li>
              <span class="metrics-list-bold-text">{{ (metrics.uptime * 100).toFixed(2) }}%</span>
              <span class="metrics-list-grey-text"> uptime</span>
            </li>
            <li>
              <span
                v-if="metrics.requests < 1000"
                class="metrics-list-bold-text"
              >{{ metrics.requests }}</span>
              <span
                v-else
                class="metrics-list-bold-text"
              >{{ Math.round(metrics.requests / 1000) }}k</span>
              <span class="metrics-list-grey-text"> requests</span>
              <span> · </span>
              <span class="metrics-list-bold-text">{{
                Math.round(metrics.errors * 100)
              }}%</span>
              <span class="metrics-list-grey-text"> errors</span>
            </li>
          </ul>
          <ul
            v-else
            class="service-metrics-list unpublished-list"
          >
            <li class="metrics-list-grey-text unpublished-list-item">
              Not configured with runtime yet
            </li>
          </ul>
        </div>
        <div
          v-if="serviceData.versions.length>0"
          class="avatars-container"
        >
          <img
            v-if="uniqueAvatarUrls.value[0]"
            class="avatar first-avatar"
            height="40"
            :src="uniqueAvatarUrls.value[0]"
            width="40"
          >
          <img
            v-if="uniqueAvatarUrls.value[1]"
            class="avatar second-avatar"
            height="40"
            :src="uniqueAvatarUrls.value[1]"
            width="40"
          >
          <div
            v-if="uniqueAvatarCount>0"
            class="avatar avatar-count"
          >
            + {{ uniqueAvatarCount }}
          </div>
        </div>
      </div>
    </div>
    <ServiceModal
      v-if="isModalOpen"
      class="service-modal"
      :service-data="serviceData"
      @close-modal="closeServiceModal"
    />
  </div>
</template>
<script setup lang="ts">

import { ref, computed } from 'vue'
import { serviceStatusText } from '@/composables/serviceCatalog.utils'
import { ServiceModal } from './index'

const isModalOpen = ref(false)
const props = defineProps({
  serviceData: { type: Object, required: false, default: () => {} },
})

const service_status = computed(() => {
  if (props.serviceData) {
    const published: boolean = props.serviceData.published
    const configured: boolean = props.serviceData.configured
    if (!configured) {
      return 'in_progress'
    } else {
      if (published) {
        return 'published'
      } else {
        return 'unpublished'
      }
    }
  }
  return ''
})

const metrics = computed(() => {
  if (props.serviceData.metrics) {
    return props.serviceData.metrics
  }
  return {}
})

const uniqueAvatarCount = computed(() => {
  let uniqueAvatars = ref(0)
  if (props.serviceData && props.serviceData.versions) {
    const names = props.serviceData.versions.map((ver: { developer: { name: any; }; }) => ver.developer?.name)
    const uniqueNames = new Set(names)
    uniqueAvatars.value = uniqueNames.size
  }
  return uniqueAvatars.value - 2
})

const uniqueAvatarUrls = computed(() => {
  let uniqueAvatarUrls = ref<string[]>([])
  let uniqueAvatarName = ref<string[]>([])
  if (props.serviceData && props.serviceData.versions) {
    for (let j = 0;j < props.serviceData.versions.length;j += 1) {
      const ver = props.serviceData.versions[j]
      if (!uniqueAvatarName.value.includes(ver.developer?.name)) {
        uniqueAvatarUrls.value.push(ver.developer?.avatar)
        uniqueAvatarName.value.push(ver.developer?.name)
      }
      if (uniqueAvatarUrls.value.length === 2) {
        break
      }
    }
  }
  return uniqueAvatarUrls
})
const openServiceModal = ()=>{
  isModalOpen.value = true
}
const closeServiceModal = ()=>{
  console.log('on')
  isModalOpen.value = false
}
</script>
<style scoped>
.card {
  background-color: whitesmoke;
  border-radius: 8px;
  height: 264px;
  margin-right: 1vw;
  width: 100%;
}
.card-body {
  padding: 16px;
}
.card-body-row-one {
  display: grid;
  grid-template-columns: 2fr 1fr;
  height: 33px;
  margin-bottom: 20px;
}
.card-body-row-two {

  font-size: 20px;
  font-weight: 600;
  height: 24px;
  line-height: 24px;
  margin-bottom: 10px;
  padding: 0 10px;
  text-align: left;
  text-decoration-skip-ink: none;
  text-underline-position: from-font;
}
.card-body-row-three {
  -webkit-box-orient: vertical;
  color: #707888;
  display: -webkit-box;

  font-size: 13px;
  font-weight: 400;
  height: 40px;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  line-height: 20px;
  margin-bottom: 10px;
  overflow: hidden;
  padding: 0 10px;
  text-align: left;
  text-decoration-skip-ink: none;
  text-overflow: ellipsis;
  text-underline-position: from-font;
}
.card-body-row-four {
  align-items: center;
  display: grid;
  grid-template-columns: 2fr 1fr;
  height: 100px;
}
.card-title {
  font-size: 1.5em;
  margin: 0;
}
.service_status {
  align-items: center;
  display: flex;
  text-align: center;
  vertical-align: center;
}
.serviceStatusText {
  color: #3c4557;
  font-size: 12px;
  font-weight: 400;
  height: 16px;
  line-height: 1.5;
  padding: 0 5px;
}
.versions {
  align-items: center;
  display: flex;
  flex-direction: row-reverse;
  button {
    align-items: center;
    background-color: #f2f6fe;
    border: none;
    border-radius: 25px;
    color: #5888db;
    height: 33px;
    justify-content: center;
    width: 88px;
  }
}
.service-metrics-list {
  margin: 0;
  padding-left: 26px;
  ::marker {
    color: #42d782;
  }
}
.metrics-list-bold-text {
  color: #3c4557;

  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  text-align: left;
  text-decoration-skip-ink: none;
  text-underline-position: from-font;
}
.metrics-list-grey-text {
  color: #707888;

  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  text-align: left;
  text-decoration-skip-ink: none;
  text-underline-position: from-font;
}
.unpublished-list {
  display: flex;
  height: 57.6px;
  ::marker {
    color: #b6b6bd;
  }
}
.unpublished-list-item {
  margin-top: auto;
}
.avatars-container {
  align-items: center;
  display: flex;
  flex-direction: row-reverse;
}
.avatar {
  background-position: center;
  background-size: cover;
  border: 2px solid white;
  border-radius: 25px;
  left: 0;
  margin-left: -20px;
  z-index: 1;
}
.avatar:nth-child(2) {
  left: 30px;
  z-index: 2;
}
.avatar:nth-child(3) {
  left: 60px;
  z-index: 3;
}
.avatar-count {
  align-content: center;
  background-color: #f1f1f8;
  color: #777d8a;
  height: 40px;
  text-align: center;
  width: 40px;
}
.service-modal{
    z-index: 999;
}
</style>
