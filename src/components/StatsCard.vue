<template>
  <div class="card card-stats">
    <div class="card-body">
      <div class="row">
        <div class="col">
          <h1 class="card-title mb-0" v-if="title">
            {{ title }}
          </h1>
          <span class="h3 font-weight-bold text-muted mb-0" v-if="subTitle">
            {{ subTitle }}
          </span>
        </div>

        <div class="col-auto">
          <slot name="icon">
            <div class="icon icon-shape rounded-circle shadow" :class="iconClass">
              <img class="w-100" :src="iconSrc" />
            </div>
          </slot>
        </div>
      </div>

      <p class="mt-3 mb-0 text-muted">
        <slot name="footer"></slot>
      </p>
    </div>
  </div>
</template>
<script>

export default {
  name: "stats-card",
  components: {
  },
  props: {
    title: String,
    subTitle: String,
    iconSrc: String,
    iconClass: String
  },
};
</script>
<style></style>
