<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="header-title">Pending drivers list</h4>
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
              <b-table :items="pendingDrivers" :fields="fields" responsive="sm" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
                <template #cell(actions)="row">
                  <b-button size="sm" class="mr-1" variant="success" @click.prevent="editData(row.item['_id']['$oid'])">
                    Edit
                  </b-button>
                  <!--                  <b-button size="sm" variant="danger">-->
                  <!--                    Delete-->
                  <!--                  </b-button>-->
                </template>
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
import {pending_driver_list} from "@/api/urls";

export default {
  name: "pendingDrivers",
  middleware:'authenticate',
  head() {
    return {
      title: `${process.env.APP_NAME} | ${this.title}`,
    };
  },
  data() {
    return {
      title: "Pending Drivers",
      pendingDrivers:[],
      items: [{
        text: 'Admin',
        href: '/',
      },
        {
          text: 'Pending drivers',
          href: '/drivers/pending-drivers',
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
        { key: 'drivers.name', label: 'Name', sortable: false },
        { key: 'drivers.phone_no', label: 'Phone No', sortable: false },
        { key: 'drivers.address', label: 'Address', sortable: false },
        { key: 'drivers.drivingLicence', label: 'Driving Licence', sortable: false },
        { key: 'drivers.nid', label: 'NID', sortable: false },
        'actions'
      ],
      errorMessage:''
    };
  },
  methods:{
    getPendingDriverList(){
      let self = this;
      const token = this.$cookies.get('accessTokenAdmin');
      let config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
      }

      this.$axios.$get(pending_driver_list, config).then((res) => {
        if (res.error === true){
          self.errorMessage=res.msg;
        }
        else {
          self.pendingDrivers=res.data;
        }
      }).catch((error)=>{
        console.log(error)
      });
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    editData(id){
      this.$router.push('/drivers/pending-drivers/process/'+id);
    },
  },
  computed: {
    rows() {
      return this.pendingDrivers.length
    }
  },
  mounted() {
    this.totalRows = this.items.length;
    this.getPendingDriverList();
  }
}
</script>

<style scoped>

</style>
