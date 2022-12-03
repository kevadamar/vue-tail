<template>
  <div>
    <v-select
      :class="`${width} style-chooser`"
      :options="data"
      :value="value"
      v-on="$listeners"
      :placeholder="placeholder"
      @input="(v) => $emit('update', v)"
    ></v-select>
  </div>
</template>

<script>
export default {
  name: "SearchSelect",
  props: {
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
  watch: {
    value: function (newValue, oldValue) {
      console.log(oldValue);
      this.stateValue = newValue;
    },
  },
};
</script>

<style>
:root {
  --vs-search-input-bg: red;
}
.style-chooser {
  /* margin-bottom: 17px; @kevadamar*/
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
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
