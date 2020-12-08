<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="header-title">All users</h4>
            <p class="text-muted font-13 mb-4"></p>
            <div class="row mb-md-2">
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
                    Show&nbsp;
                    <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;entries
                  </label>
                </div>
              </div>
              <!-- Search -->
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_filter" class="dataTables_filter text-md-right">
                  <label class="d-inline-flex align-items-center">
                    Search:
                    <b-form-input v-model="filter" type="search" placeholder="Search..." class="form-control form-control-sm ml-2"></b-form-input>
                  </label>
                </div>
              </div>
              <!-- End search -->
            </div>
            <!-- Table -->
            <div class="table-responsive mb-0">
              <b-table :items="driversList" :fields="fields" responsive="sm" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
                <template #cell(name)="data">
                  {{ data.item.first_name + ' ' + data.item.last_name }}
                </template>
                <!--                <template #cell(actions)="row">-->
                <!--                  <b-button size="sm" class="mr-1" variant="success" @click.prevent="editData(row.item['_id']['$oid'])">-->
                <!--                    Edit-->
                <!--                  </b-button>-->
                <!--                  &lt;!&ndash;                  <b-button size="sm" variant="danger">&ndash;&gt;-->
                <!--                  &lt;!&ndash;                    Delete&ndash;&gt;-->
                <!--                  &lt;!&ndash;                  </b-button>&ndash;&gt;-->
                <!--                </template>-->
              </b-table>
            </div>
            <div class="row">
              <div class="col">
                <div class="dataTables_paginate paging_simple_numbers float-right">
                  <ul class="pagination pagination-rounded mb-0">
                    <!-- pagination -->
                    <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"></b-pagination>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {verified_drivers_list} from "@/api/urls";

export default {
  name: "drivers",
  middleware: 'authenticate',
  head() {
    return {
      title: `${this.title} | ` + process.env.APP_NAME
    }
  },
  data() {
    return {
      title: 'Verified drivers',
      items: [{
        text: 'Admin',
        href: '/',
      },
        {
          text: 'Drivers',
          active: true,
        }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: 'age',
      sortDesc: false,
      fields: [
        'Name',
        {
          key: 'email',
          sortable: false
        },
        {
          key: 'phone_no',
          sortable: false
        },
        {
          key: 'address',
          sortable: false
        },
        {
          key: 'country',
          sortable: false
        },
        {
          key: 'default_contact_number',
          sortable: false
        }
      ],
      errorMessage: '',
      driversList : []
    }
  },
  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.driversList.length
    }
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
    this.getAllDriversList();
  },
  methods: {
    /**
     * Search the table data with search input
     */
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    editData(id){
      // this.$router.push('fuel-category/edit/'+id);
    },
    getAllDriversList(){
      let self = this;
      const token = this.$cookies.get('accessTokenAdmin');
      let config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
      }

      self.$axios.$get(verified_drivers_list, config).then((res) => {
        if (res.error === true){
          this.errorMessage=res.msg
        }
        else {
          this.driversList=res.data;
        }
      }).catch((error)=>{
        console.log(error)
      });
    }
  },
}
</script>

<style scoped>

</style>
