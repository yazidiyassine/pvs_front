<template>
  <v-data-table
    :headers="headers"
    :items="pvs"
    hide-default-footer
     loading
    loading-text="Loading... Please wait"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>وضعية المحاضر المحالة</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="رقم المحضر"
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
                      v-model="editedItem.numPvs"
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
          text: 'رقم المحضر',
          align: 'start',
          sortable: false,
          value: 'numPvs',
        },
        {  sortable: false },
        { text: 'تاريخ التسجيل', value: 'dateEnreg', sortable: false },
        { text: 'تاريخ الاحالة', value: 'dateAffect', sortable: false },
        { text: 'تصفح', value: 'voir',sortable: false },
        { text: 'تغيير', value: 'actions', sortable: false },
      ],
      pvs: [],
      editedIndex: -1,
      editedItem: {
        numPvs: '',
        
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
        this.pvs = [
          {}
        ]
      },

      editItem (item) {
        this.editedIndex = this.pvs.indexOf(item)
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
          Object.assign(this.pvs[this.editedIndex], this.editedItem)
        } else {
          this.pvs.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>