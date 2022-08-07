<template>
  <div>
    <v-card elevation="2" outlined class="mx-auto my-auto justify-center">
      <v-toolbar class="smallnavbar mb-3" flat height="34px" app>
        <v-toolbar-title class="darkgrey--text text-h5"
          >الاطلاع على الاحالة</v-toolbar-title
        >
      </v-toolbar>

      <v-form dense ref="form" v-model="valideform" class="ma-0 pa-0 px-2">
        <v-row no-gutters dense>
          <v-col cols="12" sm="5" class="ml-2">
            <v-autocomplete
              :rules="[() => !!viceProc || 'المرجوا ملأ هذا الحقل']"
              :items="viceProc"
              item-text="nom"
              item-value="id"
              placeholder="مساعدة في البحث"
              no-data-text="لا يوجد"
              label="ممثل النيابة"
              required
              outlined
              dense
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="4" class="ml-2">
            <v-btn text class="mt-1 blue" elevation="2" height="30px"
            @click="display = !display" >
              <v-icon right>mdi-magnify</v-icon>
              بحث
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-card elevation="2" outlined class="mx-auto my-auto mt-3 justify-center">
      <v-toolbar class="smallnavbar" flat height="34px" app>
        <v-toolbar-title class="darkgrey--text text-h5"
          >الشكايات</v-toolbar-title
        ></v-toolbar>
        <suivi_plainteVue v-show="display"></suivi_plainteVue>
    </v-card>
        <v-card elevation="2" outlined class="mx-auto my-auto mt-3 justify-center">
      <v-toolbar class="smallnavbar" flat height="34px" app>
        <v-toolbar-title class="darkgrey--text text-h5"
          >المحاضر</v-toolbar-title
        ></v-toolbar>
        <suivi_pvVue v-show="display"></suivi_pvVue>
    </v-card>
  </div>
</template>

<script>
import suivi_plainteVue from '@/components/suivi/suivi_plaintes.vue';
import suivi_pvVue from '@/components/suivi/suivi_pvs.vue';
export default {
    data() {
        return {
            display: false,
        }
    },
    components: {
        suivi_plainteVue,
        suivi_pvVue
    }
};
</script>
