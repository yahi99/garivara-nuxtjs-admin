<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="header-title">Vehicle verification requests</h4>
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
              <b-table :items="pendingVehicles" :fields="fields" responsive="sm" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
                <template #cell(sl)="data">
                  {{ data.index + 1 }}
                </template>
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
import {pending_vehicle_list} from "@/api/urls";

export default {
  name: "allVerificationRequests",
  middleware:'authenticate',
  head() {
    return {
      title: `${process.env.APP_NAME} | ${this.title}`,
    };
  },
  data() {
    return {
      title: "Vehicle verification request",
      pendingVehicles:[],
      items: [{
        text: 'Admin',
        href: '/',
      },
        {
          text: 'Verification requests',
          href: '/vehicles/verification-requests',
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
        { key: 'vehicleTitle', label: 'Vehicle title', sortable: false },
        { key: 'carAddress', label: 'Address', sortable: false },
        { key: 'model', label: 'Model', sortable: false },
        { key: 'chassisNumber', label: 'Chassis Number', sortable: false },
        { key: 'millage', label: 'Millage', sortable: false },
        'actions'
      ],
      errorMessage:''
    };
  },
  methods:{
    getPendingVehicleList(){
      let self = this;
      const token = this.$cookies.get('accessTokenAdmin');
      let config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
      }

      this.$axios.$get(pending_vehicle_list, config).then((res) => {
        if (res.error === true){
          self.errorMessage=res.msg;
        }
        else {
          self.pendingVehicles=res.data;
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
      this.$router.push('/vehicles/verification-requests/process/'+id);
    },
  },
  computed: {
    rows() {
      return this.pendingVehicles.length
    }
  },
  mounted() {
    this.totalRows = this.items.length;
    this.getPendingVehicleList();
  }
}
</script>

<style scoped>

</style>
