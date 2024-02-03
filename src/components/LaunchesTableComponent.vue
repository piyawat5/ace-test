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
      :items="items"
    >
      <template v-slot:[`item.image`]="{ item }">
        <v-card class="my-2" elevation="2" rounded>
          <v-img :src="`${item.image}`" height="64" cover></v-img>
        </v-card>
      </template>
      <template v-slot:[`item.id`]="{ item }">
        <div class="text-link">{{ item.id }}</div>
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
    const API_URL = "https://api.spacexdata.com/latest";

    const getLaunches = () => {
      return axios.get(`${API_URL}/launches`);
    };
    const items = ref<Column[]>([]);
    const search = ref("");
    const date = useDate();
    const loading = ref(false);

    const checkStatus = (value: Date) => {
      const launchDate = new Date(value).getTime();
      if (launchDate <= Date.now()) {
        return statusEnum.LAUNCHED;
      }
      return statusEnum.UNLAUNCH;
    };

    onMounted(async () => {
      loading.value = true;
      const now = Date.now();

      try {
        const res = await getLaunches();

        items.value = res.data
          .filter((item: any) => {
            if (props.status === statusEnum.ALL) {
              return true;
            } else if (props.status === statusEnum.LAUNCHED) {
              const launchDate = new Date(item.date_local).getTime();
              return launchDate <= now;
            } else {
              const launchDate = new Date(item.date_local).getTime();
              return launchDate > now;
            }
          })
          .map((item: any) =>
            props.status === statusEnum.ALL
              ? {
                  name: item.name,
                  image: item.links.patch.small,
                  id: item.id,
                  status: checkStatus(item.date_local),
                  date: date.format(item.date_local, "fullDateWithWeekday"),
                  crew: [...item.crew],
                }
              : {
                  name: item.name,
                  image: item.links.patch.small,
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

    return { items, search, loading, statusProp: props.status };
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
</style>
