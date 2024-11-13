<template>
  <div
    class="modal-overlay"
    @click="closeModal"
  >
    <div
      class="modal-content"
      @click.stop
    >
      <div class="service-name">
        {{ serviceData.name }}
      </div>
      <div class="versions">
        Versions ({{ serviceData.versions.length }})
      </div>
      <div
        v-for="(version, index) in serviceData.versions"
        :key="index"
        class="version-details"
        :class="index+1<serviceData.versions.length?'version-border':''"
      >
        <p class="version-name">
          v{{ version.name }}
        </p>
        <p class="version-description">
          {{ version.description }}
        </p>
        <div class="service-type-container">
          <span
            class="service-type"
            :class="
              serviceData.type === 'HTTP'
                ? 'hightlight-type'
                : 'non-hightlight-type'
            "
          >HTTP</span>
          <span
            class="service-type"
            :class="
              serviceData.type === 'REST'
                ? 'hightlight-type'
                : 'non-hightlight-type'
            "
          >REST</span>
        </div>
        <div class="developer-container">
          <span class="developer-details-container"><div class="developer-name">
                                                      {{ formattedNames[index] }}
                                                    </div>
            <div class="update-days-ago">
              {{ formattedDates[index] }} days ago
            </div></span>
          <span class="img-container">
            <img
              v-if="version.developer"
              class="avatar"
              height="20"
              :src="version.developer.avatar"
              width="20"
            >
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  calculateDaysAgo,
  formatName,
} from '@/composables/serviceCatalog.utils'
const props = defineProps({
  serviceData: {
    type: Object,
    default: () => {},
    required: false,
  },
})

const formattedDevDetails = computed(() => {
  const serviceData = props.serviceData
  const formattedName = []
  const updatedDaysAgo = []
  if (serviceData?.versions?.length > 0) {
    for (let i = 0; i < serviceData.versions.length; i += 1) {
      if (serviceData.versions[i].developer?.name) {
        const splitName = formatName(serviceData.versions[i].developer.name)
        formattedName.push(splitName)
      }
      if (serviceData.versions[i].updated_at) {
        const updatedDatesAgo = calculateDaysAgo(
          serviceData.versions[i].updated_at,
        )
        updatedDaysAgo.push(updatedDatesAgo)
      }
    }
    return { names: formattedName, dates: updatedDaysAgo }
  }
  return {}
})

const formattedNames = computed(()=>{
  if (formattedDevDetails.value?.names) {
    return formattedDevDetails.value.names
  }
  return []
})

const formattedDates = computed(()=>{
  if (formattedDevDetails.value?.dates) {
    return formattedDevDetails.value.dates
  }
  return []
})

const emit = defineEmits(['close-modal'])

const closeModal = () => {
  emit('close-modal', false)
}
</script>

<style>
.modal-overlay {
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
}
.modal-content {
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: 772px;
}
.service-name {

  font-size: 20px;
  font-weight: 600;
  height: 24px;
  line-height: 24px;
  margin-bottom: 20px;
  text-align: center;
  text-decoration-skip-ink: none;
  text-underline-position: from-font;
}
.versions {

  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 10px;
  text-align: left;
  text-decoration-skip-ink: none;
  text-underline-position: from-font;
}
.version-details {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr 3fr;
  padding: 5px;
}
.version-border{
  border-bottom: 1px solid#F1F1F5;
}
.version-name {
  align-content:center ;

  font-size: 13px;
  font-weight: 600;
  line-height: 24px;
  text-align: left;
  text-decoration-skip-ink: none;
  text-underline-position: from-font;
}
.version-description {
  align-content: center;
  color: #8a8a8a;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  text-align: left;
  text-decoration-skip-ink: none;
  text-underline-position: from-font;
}
.service-type-container{
  align-content: center;
}
.service-type {
  border-radius: 4px;
  color: #1155cb;

  font-size: 10px;
  font-weight: 500;
  line-height: 14px;
  margin: 5px;
  padding: 5px;
  text-align: left;
  text-decoration-skip-ink: none;
  text-underline-position: from-font;
}
.hightlight-type {
  background-color: #bdd3f9;
}
.non-hightlight-type {
  background-color: #f8f8fa;
}
.developer-container {
  align-items: center;
  display: flex;
  flex-direction: row-reverse;
}
.avatar {
  background-position: center;
  background-size: cover;
  border: 2px solid white;
  border-radius: 25px;
}
.developer-name {

  font-size: 13px;
  font-weight: 600;
  line-height: 24px;
  text-align: left;
  text-decoration-skip-ink: none;
  text-underline-position: from-font;
}
.update-days-ago {
  color: #8a8a8a;

  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  text-align: left;
  text-decoration-skip-ink: none;
  text-underline-position: from-font;
}
.img-container{
  height: 100%;
  padding: 0 5px;
}
.developer-details-container{
width: 114px;
}
</style>
