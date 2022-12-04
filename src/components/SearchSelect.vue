<template>
  <div>
    <ValidationProvider v-slot="{ errors }" :rules="rules">
      <v-select
        :class="`${width} style-chooser ${errors.length > 0 ? 'is-error' : ''}`"
        :options="data"
        :value="value"
        v-on="$listeners"
        :placeholder="placeholder"
        @input="(v) => $emit('update', v)"
      ></v-select>
      <span v-if="showText && errors.length > 0" class="text-red-500 mt-1">{{
        errors[0]
      }}</span>
    </ValidationProvider>
  </div>
</template>

<script>
export default {
  name: "SearchSelect",
  props: {
    showText: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: String,
      default: "",
    },
    data: {
      type: Array,
      required: true,
    },
    setDefault: {
      type: Object,
      default: null,
    },
    width: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "Select an option",
    },
    value: {
      type: [String, Object],
    },
  },
  model: {
    prop: "value",
    event: "update",
  },
};
</script>

<style>
.is-error {
  border: 2px solid #ef4444;
  border-radius: 5px;
}

.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle {
  background: #f3f4f6;
  border: none;
  color: #9ca3af;
}

.style-chooser .vs__search,
.style-chooser .vs__search:focus {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
  fill: #9ca3af;
}

.vs__fade-enter-active,
.vs__fade-leave-active {
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>
