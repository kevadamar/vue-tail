<template>
  <div :class="`${width}`">
    <ValidationProvider v-slot="{ errors }" :rules="rules">
      <div class="flex flex-col w-full">
        <input
          :disabled="disabled"
          :value="value"
          @input="$emit('update', $event.target.value)"
          v-on="$listeners"
          :type="type"
          :class="`bg-gray-100 rounded p-3 ${
            errors.length > 0 ? 'border-2 border-red-500' : ''
          }`"
          :placeholder="!placeholder ? title : placeholder"
        />
        <span v-if="showText && errors.length > 0" class="text-red-500 mt-1">{{
          errors[0]
        }}</span>
      </div>
    </ValidationProvider>
  </div>
</template>

<script>
export default {
  name: "AppInput",
  props: {
    showText: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "text",
    },
    width: {
      type: String,
      default: "",
    },
    rules: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    value: {
      type: [String, Object, Number],
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
  data: function () {
    return {
      stateValue: "",
    };
  },
};
</script>
