<template>
  <div>
    <span
      :class="`${width} ${padding} ${defaultClass} ${customColor}`"
      v-on="$listeners"
    >
      {{ title }}
      <slot />
    </span>
  </div>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    title: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "w-[10em]",
    },
    padding: {
      type: String,
      default: "p-2",
    },
    customColor: {
      type: String,
      default: "hover:bg-teal-400 hover:border-teal-400 hover:text-white",
    },
    defaultClass: {
      type: String,
      default: `block text-center text-sm text-slate-500 rounded-lg border-2 hover:cursor-pointer`,
    },
  },
};
</script>

<style></style>
