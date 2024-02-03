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
    <v-dialog
      style="font-family: IBM Plex Sans Thai, sans-serif"
      max-width="700px"
      v-model="isOpenModal"
      width="auto"
    >
      <v-card>
        <v-card-text class="modal-head"> รายละเอียด </v-card-text>
        <img
          v-if="row?.links.patch.small"
          :src="`${row.links.patch.small}`"
          style="margin: 24px auto"
          height="200px"
          width="200px"
        />
        <img
          v-else
          alt="logo"
          :src="require('@/assets/notfound.png')"
          style="margin: 24px auto"
          height="200px"
          width="200px"
        />
        <v-card-text class="section card-container">
          <div>
            รายละเอียด: <span class="text-content">{{ row?.details }}</span>
          </div>
          <hr style="border-top: rgb(211, 211, 211)" />
          <div style="text-decoration: underline">ข้อมูลจรวด</div>
          <div class="rocket-info-container">
            <div>
              ชื่อ: <span class="text-content">{{ row?.rocket?.name }}</span>
            </div>
            <div>
              ประเภท: <span class="text-content">{{ row?.rocket?.type }}</span>
            </div>
            <div>
              Active:
              <span class="text-content">{{ row?.rocket?.active }}</span>
            </div>
            <div>
              ประเทศ:
              <span class="text-content">{{ row?.rocket?.country }}</span>
            </div>
            <div>
              บริษัท:
              <span class="text-content">{{ row?.rocket?.company }}</span>
            </div>
            <div>
              คำอธิบาย:
              <span class="text-content">{{ row?.rocket?.description }}</span>
            </div>
            <div style="width: 100%; display: flex; flex-wrap: wrap; gap: 16px">
              <div>
                สูง:
                <span class="text-content"
                  >{{ row?.rocket?.height.meters }}เมตร</span
                >
              </div>
              <div>
                เส้นผ่านศูนย์กลาง :
                <span class="text-content"
                  >{{ row?.rocket?.diameter.meters }}เมตร</span
                >
              </div>
              <div>
                มวล:
                <span class="text-content"
                  >{{ row?.rocket?.mass.meters }}เมตร</span
                >
              </div>
            </div>
          </div>
          <hr style="border-top: rgb(211, 211, 211)" />
          <div>
            นักบิน:
            <span v-for="(item, i) in row?.crew" :key="item.id">
              <span class="text-content">{{ item }}</span
              >{{ row.crew.length - 1 !== i ? ", " : "" }}
            </span>
          </div>
          <div>
            ฐานที่ยิง:
            <span class="text-content">{{ row?.launchpad?.full_name }}</span>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="isOpenModal = false"
            >ย้อนกลับ</v-btn
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
    const allCrews = ref();
    const search = ref("");
    const date = useDate();
    const isOpenModal = ref(false);
    const loading = ref(false);
    const API_URL = "https://api.spacexdata.com/v5";
    const API_URL_OLD = "https://api.spacexdata.com/v4";

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

    const getRocketById = (id: string) => {
      return axios.get(`${API_URL_OLD}/rockets/${id}`);
    };

    const getLaunchpadById = (id: string) => {
      return axios.get(`${API_URL_OLD}/launchpads/${id}`);
    };

    const getCrews = () => {
      return axios.get(`${API_URL_OLD}/crew`);
    };

    const toggleModal = async (id: string) => {
      try {
        isOpenModal.value = true;
        const lauchesById = await getLaunchesById(id);
        const launchpadById = await getLaunchpadById(
          lauchesById.data.launchpad
        );
        const rocketById = await getRocketById(lauchesById.data.rocket);

        row.value = {
          ...lauchesById.data,
          rocket: {
            ...rocketById.data,
          },
          crew: checkCrew(allCrews.value.data, lauchesById.data.crew),
          launchpad: {
            ...launchpadById.data,
          },
        };
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

    const checkCrew = (allCrews: any[], crew: any[]) => {
      let crewName: string[] = [];
      crew.forEach((c) => {
        const findCrew = allCrews.find((item) => c.crew === item.id);
        if (findCrew) {
          crewName = [...crewName, findCrew.name];
        }
      });

      return crewName;
    };

    onMounted(async () => {
      loading.value = true;
      try {
        const res = await getLaunches();
        allCrews.value = await getCrews();

        rows.value = res.data.map((item: any) =>
          props.status === statusEnum.ALL
            ? {
                name: item.name,
                image: item.links.patch?.small,
                id: item.id,
                status: checkStatus(item.upcoming),
                date: date.format(item.date_local, "fullDateWithWeekday"),
                crew: checkCrew(allCrews.value.data, item.crew),
              }
            : {
                name: item.name,
                image: item.links.patch?.small,
                id: item.id,
                date: date.format(item.date_local, "fullDateWithWeekday"),
                crew: checkCrew(allCrews.value.data, item.crew),
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

.rocket-info-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.section {
  font-weight: bold;
}

.text-content {
  font-weight: 400 !important;
  color: grey;
}

.card-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
