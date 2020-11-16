<template>
  <div>
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <h4 class="header-title mb-3">Add New Fuel Category</h4>

            <form role="form" @submit.prevent="addFuelCategory">
              <b-form-group id="fieldset-1" description="This type will be added to the category list." label="Fuel category title" label-for="exampleInputEmail1">
                <b-form-input id="exampleInputEmail1" type="text" placeholder="Fuel Category Title" v-model="categoryTitle" required></b-form-input>
              </b-form-group>
              <b-form-group label="Fuel category rate" label-for="exampleInputPassword1">
                <b-form-input id="exampleInputPassword1" type="number" placeholder="Fuel Rate" v-model="categoryRate" required></b-form-input>
              </b-form-group>
              <b-button type="submit" variant="primary">Submit</b-button>
            </form>
          </div>
        </div>
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </div>
</template>

<script>
import {add_fuel_category} from "@/api/urls";

export default {
  name: "createFuelType",
  middleware: "authenticate",
  head() {
    return {
      title: `${this.title} | Minton - Nuxtjs Responsive Admin Dashboard Template`,
    };
  },
  data() {
    return {
      title: "Fuel Category",
      items: [{
        text: "Admin",
        href: "/",
      },
        {
          text: "Fuel Category",
          href: "/fuel-category",
        },
        {
          text: "Add New",
          active: true,
        },
      ],
      checked: true,
      checked2: false,
      status: 'accepted',
      status2: 'not_accepted',
      selected: 'A',
      categoryTitle: '',
      categoryRate: '',
      errorMessage: ''
    };
  },
  methods:{
    addFuelCategory(){
      let self = this;
      const token = this.$cookies.get('accessToken');
      let config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
      }
      let payload = {
        title: self.categoryTitle,
        rate: self.categoryRate
      }

      self.$axios.$post(add_fuel_category, payload, config).then((res) => {
        if (res.error === true){
          this.errorMessage=res.msg
        }
        else {
          this.$router.push('/fuel-category');
        }
      }).catch((error)=>{
        console.log(error)
      });
    }
  }
}
</script>

<style scoped>

</style>
