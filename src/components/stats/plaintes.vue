<template>
  <div class="chercher_plaint">
    <v-spacer></v-spacer>
    <v-card elevation="2" outlined class="mx-auto my-auto">
      <v-toolbar lighten class="smallnavbar mb-7" flat height="34px" app>
        <v-toolbar-title class="lightengrey--text text-h6">
          إحصائيات التقديم
        </v-toolbar-title>
      </v-toolbar>
      <v-form class="px-5">
        <v-row justify align-content-center no-gutters>
          <span class="font-weight-black">الاحصاء ب : </span>
          <v-col cols="12" sm="4">
            <v-select
              v-model="selected"
              :items="items"
              item-text="name"
              item-value="value"
              outlined
              label="الاحصاء ب "
              dense
            ></v-select>
          </v-col>
        </v-row>
        <div v-if="selected == 'vicep'">
          <v-row class="mt-5" dense justify align-content-center no-gutters>
            <span class="font-weight-black">ممثل النيابة : </span>
            <v-col cols="12" sm="5">
              <v-autocomplete
                :rules="[() => !!viceProc || 'المرجوا ملأ هذا الحقل']"
                item-text="nom"
                item-value="id"
                placeholder="مساعدة في البحث"
                no-data-text="لا يوجد"
                label="ممثل النيابة"
                required
                outlined
                dense
              ></v-autocomplete
            ></v-col>
          </v-row>
        </div>
        <div v-if="selected == 'dateEn'">
          <v-row class="mt-5" dense justify align-content-center no-gutters>
            <span class="font-weight-black">تاريخ تسجيل الشكاية :</span>

            <v-col cols="12" sm="4" class="mx-4">
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                :return-value.sync="cher.de"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    prepend-icon="mdi-calendar"
                    readonly
                    dense
                    label="من"
                    v-bind="attrs"
                    v-on="on"
                    outlined
                  ></v-text-field>
                </template>
                <v-date-picker v-model="cher.de" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu1 = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu1.save(cher.de)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" sm="4" class="mx-4">
              <v-menu
                ref="menu2"
                v-model="menu2"
                :close-on-content-click="false"
                :return-value.sync="cher.a"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    prepend-icon="mdi-calendar"
                    readonly
                    label="إلى"
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    dense
                  ></v-text-field>
                </template>
                <v-date-picker no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu2 = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu2.save(cher.a)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </div>
        <v-row no-gutters class="ma-0 pa-0">
          <v-col cols="12" sm="4"></v-col>
          <v-card-actions class="ma-0 pa-0">
            <v-btn
              text
              @click="display = !display"
              lighten
              class="mb-2 blue pr-3 pl-4"
              elevation="2"
              height="30px"
              :loading="loading"
            >
              <v-icon right>mdi-magnify</v-icon>
              بحث
            </v-btn>
          </v-card-actions>
        </v-row>
      </v-form>
    </v-card>

    <v-row class="mt-5" v-show="display">
      <v-col cols="13" sm="4">
        <v-card class="elevation-1" color="green lighten-3">
          <v-card-title class="text-h6">
            الشكايات المعالجة
            <v-icon
              class="shrink ma-2"
              contain
              size="35px"
              style="flex-basis: 65px"
              >mdi-progress-check</v-icon
            >
          </v-card-title>

          <v-divider lighten class="mt-2"></v-divider>
          <v-card-actions class="text-h6 pa-4">
            العدد الاجمالي
            <v-spacer></v-spacer>
            <span class="text-h6 ml-10"> ({{ statistic.Traiter }}) </span>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="13" sm="4">
        <v-card class="elevation-1" color="orange lighten-3">
          <v-card-title class="text-h6">
            الشكايات في طور المعالجة
            <v-icon
              class="shrink ma-2"
              contain
              size="35px"
              style="flex-basis: 65px"
              >mdi-progress-alert</v-icon
            >
          </v-card-title>

          <v-divider lighten class="mt-2"></v-divider>
          <v-card-actions class="text-h6 pa-4">
            العدد الاجمالي
            <v-spacer></v-spacer>
            <span class="text-h6 ml-10"> ({{ statistic.enCours }}) </span>
          </v-card-actions>
        </v-card>
      </v-col>

      <!--- fin stat-->
      <v-col cols="13" sm="4">
        <v-card class="elevation-1" color="red lighten-2">
          <v-card-title class="text-h6">
            الشكايات غير المعالجة
            <v-icon class="shrink ma-2" contain size="30px"
              >mdi-progress-close</v-icon
            >
          </v-card-title>

          <v-divider lighten class="mt-2"></v-divider>
          <v-card-actions class="text-h6 pa-4">
            العدد الاجمالي
            <v-spacer></v-spacer>
            <span class="text-h6 ml-10"> ({{ statistic.NonTraiter }}) </span>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "",
      items: [
        { name: "تاريخ التسجيل", value: "dateEn" },
        { name: "ممثل النيابة", value: "vicep" },
      ],
      display: false,
      loading: false,
      cher: {
        de: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
        a: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
      },

      statistic: {},
    };
  },
};
</script>
