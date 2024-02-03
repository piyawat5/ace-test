<template>
  <div>
    <div v-if="status === statusEnumVar.LAUNCHED" class="status green">
      ปล่อยแล้ว
    </div>
    <div v-else class="status red">ยังไม่ปล่อย</div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, PropType } from "vue";
import { statusEnum } from "./type";

export default {
  props: {
    statusProp: {
      type: String as PropType<statusEnum>,
      default: new Date(),
    },
  },

  setup(props: any) {
    const status = ref(statusEnum.LAUNCHED);
    const statusEnumVar = statusEnum;
    const checkStatus = (statusProp: statusEnum) => {
      if (statusProp === statusEnum.LAUNCHED) {
        status.value = statusEnum.LAUNCHED;
        return;
      }
      status.value = statusEnum.UNLAUNCH;
    };
    onMounted(() => {
      checkStatus(props.statusProp);
    });

    return { status, checkStatus, statusEnumVar };
  },
};
</script>

<style scoped>
.status {
  text-align: center;
  height: 25px;
  border-radius: 40px;
  width: 100px;
}

.red {
  background: #ffe9e6;
  border: 1px solid #d01900;
  color: #d01900;
}
.green {
  background: #eeffef;
  border: 1px solid #0fb500;
  color: #0fb500;
}
</style>
