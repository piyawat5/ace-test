<template>
  <div class="text-center">
    <v-dialog v-model="isOpen" width="auto">
      <v-card>
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="isOpen">Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: any) {
    return { isOpen: props.dialog };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.icon-container {
  border-top-left-radius: 34px;
  color: white;
  background: #002992;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 84px;
  height: 84px;
}

.title {
  display: flex;
}

.text-container {
  border-bottom: 5px solid #002992;
  background-color: rgba(255, 255, 255, 0.3);
  border-top-right-radius: 34px;
  display: flex;
  align-items: center;
  font-size: 24px;
  padding: 0px 36px;
  height: 84px;
  width: 100%;
}
</style>
