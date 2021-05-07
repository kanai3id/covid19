<template>
  <v-range-slider
    v-model="sliderValue"
    :value="sliderValue"
    :min="min"
    :max="max"
    thumb-label="always"
    style="padding-top: 35px;"
    color="rgba(0, 136, 48, 1)"
    track-color="rgba(0, 136, 48, 0.3)"
  >
    <template v-slot:thumb-label="props">
      {{ getSliderLabels(props.value) }}
    </template>
  </v-range-slider>
</template>

<script>
export default {
  name: 'DateSelectSlider',
  props: {
    chartData: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      required: true
    },
    min: {
      type: Number,
      required: true,
      default: 0
    },
    max: {
      type: Number,
      required: true,
      default: 1
    },
    labelFormatter: {
      type: Function,
      required: false,
      default: () => (d, _) => d.label
    }
  },
  data() {
    return {
      sliderValue: this.value
    }
  },
  watch: {
    sliderValue(newValue, _oldValue) {
      this.$emit('sliderInput', newValue)
    },
    value(newValue) {
      this.sliderValue = newValue
    }
  },
  methods: {
    getSliderLabels(index) {
      if (index < this.chartData.length) {
        return this.labelFormatter(
          this.chartData[index],
          this.sliderValue[0] === index
        )
        // return this.chartData[index].label
      }
      return this.chartData[this.chartData.length - 1]?.label ?? ''
    }
  }
}
</script>
