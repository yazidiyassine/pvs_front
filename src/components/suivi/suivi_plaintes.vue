<template>
  <v-data-table
    :headers="headers"
    :items="plaint"
    hide-default-footer
     loading
    loading-text="Loading... Please wait"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>وضعية الشكايات المحالة</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="مرجع الشكاية"
        single-line
        hide-details
      ></v-text-field>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          
          <v-card>
            <v-card-text>
              <v-container>
                    <v-text-field
                      v-model="editedItem.refPlaint"
                      label="القرار"
                    ></v-text-field>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
  export default {
    data: () => ({
      dialog: false,
       search: '',
      dialogDelete: false,
      headers: [
        {
          text: 'مرجع الشكاية',
          align: 'start',
          sortable: false,
          value: 'refPlaint',
        },
        {  sortable: false },
        { text: 'تاريخ التسجيل', value: 'dateEnreg', sortable: false },
        { text: 'تاريخ الاحالة', value: 'dateAffect', sortable: false },
        { text: 'تصفح', value: 'voir',sortable: false },
        { text: 'تغيير', value: 'actions', sortable: false },
      ],
      plaint: [],
      editedIndex: -1,
      editedItem: {
        refPlaint: '',
        
      },
    }),
    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.plaint = [
          {}
        ]
      },

      editItem (item) {
        this.editedIndex = this.plaint.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.plaint[this.editedIndex], this.editedItem)
        } else {
          this.plaint.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>