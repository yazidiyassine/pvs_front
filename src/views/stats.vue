<template>
  <div>
    <v-tabs v-model="tab" active-class="smallnavbar" height="35px" class="mb-3">
      <v-tab class="text-h6 mx-10">
        <v-icon right>mdi-finance</v-icon>
        الشكايات
      </v-tab>
      <v-tab class="text-h6 mx-10">
        <v-icon right>mdi-finance</v-icon>
        المحاضر
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <stat_plaintes />
      </v-tab-item>

      <v-tab-item>
        <stat_pvs />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import stat_plaintes from "@/components/stats/plaintes.vue";
import stat_pvs from "@/components/stats/pvs.vue";

export default {
  components: {
    stat_plaintes,
    stat_pvs,
  },
  data() {
    return {
      tab: null,
    };
  },
};
</script>
