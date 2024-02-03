<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;Filter
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        density="compact"
        label="Search"
        single-line
        flat
        hide-details
        variant="solo-filled"
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :loading="loading"
      v-model:search="search"
      class="table"
      sortable
      :items="rows"
    >
      <template v-slot:[`item.image`]="{ item }">
        <v-card class="my-2" elevation="2" rounded>
          <v-img
            v-if="item.image"
            :src="`${item.image}`"
            height="64"
            cover
          ></v-img>
          <img
            v-else
            alt="logo"
            :src="require('@/assets/notfound.png')"
            height="64"
          />
        </v-card>
      </template>
      <template v-slot:[`item.id`]="{ item }">
        <div @click="toggleModal(item.id)" class="text-link">{{ item.id }}</div>
      </template>
      <template v-if="statusProp === 'ALL'" v-slot:[`item.status`]="{ item }">
        <status-component :statusProp="item.status"></status-component>
      </template>
      <template v-slot:[`item.date`]="{ item }">
        {{ item.date }}
      </template>
      <template v-slot:[`item.crew`]="{ item }">
        <div>{{ item.crew.length }}</div>
      </template>
    </v-data-table>
    <v-dialog v-model="isOpenModal" width="auto">
      <v-card>
        <v-card-text class="modal-head"> รายละเอียด </v-card-text>
        <v-card-text>
          <div>รายละเอียด: {{ row?.details }}</div>
          <div>ข้อมูลจรวด: {{ row?.rocket }}</div>
          <div>
            นักบิน:
            <div v-for="item in row?.crew" :key="item.id">
              {{ item.crew }}
            </div>
          </div>
          <div>ฐานที่ยิง: {{ row?.launchpad }}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="isOpenModal = false"
            >Close Dialog</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import StatusComponent from "@/components/StatusComponent.vue";
import { ref, PropType } from "vue";
import axios from "axios";
import { onMounted } from "vue";
import { Column, statusEnum } from "@/components/type";
import { useDate } from "vuetify";

export default {
  name: "HomeView",
  props: {
    status: {
      type: String as PropType<statusEnum>,
      require: true,
    },
  },
  components: {
    StatusComponent,
  },
  setup(props: any) {
    const rows = ref<Column[]>([]);
    const row = ref();
    const search = ref("");
    const date = useDate();
    const isOpenModal = ref(false);
    const loading = ref(false);
    const API_URL = "https://api.spacexdata.com/v5";

    const getLaunches = () => {
      if (props.status === statusEnum.ALL) {
        return axios.get(`${API_URL}/launches`);
      } else if (props.status === statusEnum.LAUNCHED) {
        return axios.get(`${API_URL}/launches/past`);
      }
      return axios.get(`${API_URL}/launches/upcoming`);
    };

    const getLaunchesById = (id: string) => {
      return axios.get(`${API_URL}/launches/${id}`);
    };

    const toggleModal = async (id: string) => {
      try {
        isOpenModal.value = true;
        const lauchesById = await getLaunchesById(id);
        row.value = { ...lauchesById.data };
      } catch (error) {
        console.log(error);
      }
    };

    const checkStatus = (isUpcoming: boolean) => {
      if (isUpcoming) {
        return statusEnum.UNLAUNCH;
      }
      return statusEnum.LAUNCHED;
    };

    onMounted(async () => {
      loading.value = true;
      try {
        const res = await getLaunches();
        rows.value = res.data.map((item: any) =>
          props.status === statusEnum.ALL
            ? {
                name: item.name,
                image: item.links.patch?.small,
                id: item.id,
                status: checkStatus(item.upcoming),
                date: date.format(item.date_local, "fullDateWithWeekday"),
                crew: [...item.crew],
              }
            : {
                name: item.name,
                image: item.links.patch?.small,
                id: item.id,
                date: date.format(item.date_local, "fullDateWithWeekday"),
                crew: [...item.crew],
              }
        );
        loading.value = false;
      } catch (error) {
        console.log(error);
      }
    });

    return {
      rows,
      row,
      search,
      loading,
      statusProp: props.status,
      isOpenModal,
      toggleModal,
    };
  },
};
</script>

<style scoped>
.table {
  border-radius: 8px;
}
.text-link {
  cursor: pointer;
  text-decoration: underline;
  color: #002992;
}

.modal-head {
  text-align: center;
  font-weight: bold;
  font-size: large;
  color: white;
  background-color: #002992;
}
</style>
