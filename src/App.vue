<template>
  <div class="container mx-auto my-10">
    <button @click="setShow" class="flex pt-2 pb-5">
      <span class="text-teal-300"> Cost Detail</span>
      <span>
        <arrow-down :class="`${!show ? '-rotate-90' : ''}`" />
      </span>
    </button>
    <div :class="`w-full h-0  transition-height ${!show ? 'hidden' : ''}`">
      <cost-detail />
      <div class="justify-end flex items-center bg-white pt-10">
        <app-button
          class="mr-3"
          title="Cancel"
          customColor="hover:bg-red-600 border-white hover:border-red-600 hover:text-[#ffffff]"
        />
        <app-button class="mr-3" title="Save As Draft" />
        <app-button
          title="Submit"
          customColor="bg-teal-400 hover:bg-teal-600 text-[#ffffff] border-teal-400 hover:border-teal-600"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/AppButton.vue";
import CostDetail from "@/views/CostDetail.vue";
import ArrowDown from "@/assets/icon/svg/ArrowDown.vue";

export default {
  name: "App",
  components: {
    AppButton,
    CostDetail,
    ArrowDown,
  },
  data: function () {
    return {
      show: true,
    };
  },
  methods: {
    setShow() {
      if (!this.show) {
        this.show = true;
      } else {
        this.show = "";
      }
    },
  },
};
</script>

<style></style>
