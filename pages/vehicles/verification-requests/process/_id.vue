<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <h4 class="header-title mb-4">Vehicle details info</h4>
            <b-tabs justified nav-class="nav-tabs nav-bordered">
              <b-tab title="Vehicle Info" active>

                <div class="row">
                  <div class="form-group col-md-4 row">
                    <label class="col-md-4 col-form-label">Vehicle Type :</label>
                    <div class="col-md-8 mt-2">
                      <div>{{ vehicleInfo.vehicle_type }}</div>
                    </div>
                  </div>

                  <div class="form-group col-md-4 row">
                    <label class="col-md-4 col-form-label">Brand : </label>
                    <div class="col-md-8 mt-2">
                      <div>{{ vehicleInfo.brand || '' }}</div>
                    </div>
                  </div>

                  <div class="form-group col-md-4 row">
                    <label class="col-md-4 col-form-label">Capacity : </label>
                    <div class="col-md-8 mt-2">
                      <div>{{ vehicleInfo.capacity || '' }}</div>
                    </div>
                  </div>

                  <div class="form-group col-md-4 row">
                    <label class="col-md-4 col-form-label">Chassis Number : </label>
                    <div class="col-md-8 mt-2">
                      <div>{{ vehicleInfo.chassis_number || '' }}</div>
                    </div>
                  </div>

                  <div class="form-group col-md-4 row">
                    <label class="col-md-4 col-form-label">Color : </label>
                    <div class="col-md-8 mt-2">
                      <div>{{ vehicleInfo.color || '' }}</div>
                    </div>
                  </div>

                  <div class="form-group col-md-4 row">
                    <label class="col-md-4 col-form-label">Country : </label>
                    <div class="col-md-8 mt-2">
                      <div>{{ vehicleInfo.country || '' }}</div>
                    </div>
                  </div>

                  <div class="form-group col-md-4 row">
                    <label class="col-md-4 col-form-label">Engine Number : </label>
                    <div class="col-md-8 mt-2">
                      <div>{{ vehicleInfo.engine_number || '' }}</div>
                    </div>
                  </div>

                  <div class="form-group col-md-4 row">
                    <label class="col-md-4 col-form-label">Fuel Type : </label>
                    <div class="col-md-8 mt-2">
                      <div>{{ vehicleInfo.fuel_type || '' }}</div>
                    </div>
                  </div>

                  <div class="form-group col-md-4 row">
                    <label class="col-md-4 col-form-label">Gear Type : </label>
                    <div class="col-md-8 mt-2">
                      <div>{{ vehicleInfo.gear_type || '' }}</div>
                    </div>
                  </div>

                  <div class="form-group col-md-4 row">
                    <label class="col-md-4 col-form-label">Millage : </label>
                    <div class="col-md-8 mt-2">
                      <div>{{ vehicleInfo.millage || '' }}</div>
                    </div>
                  </div>

                  <div class="form-group col-md-4 row">
                    <label class="col-md-4 col-form-label">Model : </label>
                    <div class="col-md-8 mt-2">
                      <div>{{ vehicleInfo.model || '' }}</div>
                    </div>
                  </div>

                  <div class="form-group col-md-4 row">
                    <label class="col-md-4 col-form-label">Brand : </label>
                    <div class="col-md-8 mt-2">
                      <div>{{ vehicleInfo.brand || '' }}</div>
                    </div>
                  </div>

                  <div class="form-group col-md-4 row">
                    <label class="col-md-4 col-form-label">Tires Number : </label>
                    <div class="col-md-8 mt-2">
                      <div>{{ vehicleInfo.tires_number || '' }}</div>
                    </div>
                  </div>

                  <div class="form-group col-md-4 row">
                    <label class="col-md-4 col-form-label">Vehicle CC : </label>
                    <div class="col-md-8 mt-2">
                      <div>{{ vehicleInfo.vehicle_cc || '' }}</div>
                    </div>
                  </div>

                  <div class="form-group col-md-4 row">
                    <label class="col-md-4 col-form-label">Vehicle Length : </label>
                    <div class="col-md-8 mt-2">
                      <div>{{ vehicleInfo.vehicle_length }}</div>
                    </div>
                  </div>

                  <div class="form-group col-md-4 row">
                    <label class="col-md-4 col-form-label">Vehicle Number : </label>
                    <div class="col-md-8 mt-2">
                      <div>{{ vehicleInfo.vehicle_number }}</div>
                    </div>
                  </div>

                  <div class="form-group col-md-4 row">
                    <label class="col-md-4 col-form-label">Default Contact No : </label>
                    <div class="col-md-8 mt-2">
                      <div>{{ vehicleInfo.default_contact_no }}</div>
                    </div>
                  </div>
                </div>
              </b-tab>
              <b-tab title="Vehicle Images">
                <div class="card">
                  <div class="card-body">
                    <h4 class="header-title">Vehicle Images</h4>
                    <p class="sub-header">
                      Here is the list of the vehicle images.
                    </p>
                    <div class="popup-gallery">
                      <div v-for="(src, index) in vehicleImages" :key="index" class="float-left mr-2" @click="() => showImg(index)">
                        <img :src="src" width="120" />
                      </div>
                      <vue-easy-lightbox :visible="visible" :imgs="vehicleImages" :index="index" @hide="handleHide"></vue-easy-lightbox>
                    </div>
                  </div>
                </div>
              </b-tab>
              <b-tab title="Driver Info">
                <div class="form-group row">
                  <label class="col-md-2 col-form-label">Name</label>
                  <div class="col-md-10">
                    <div>
                      <span>{{ driverInfo.name || '' }}</span>
                      <div class="popup-gallery">
                        <img :src="driverInfo.profile_image" width="120" @click="singleProfileImage = true" />
                        <vue-easy-lightbox :visible="singleProfileImage" :imgs="driverInfo.profile_image" @hide="singleProfileImage = false"></vue-easy-lightbox>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-md-2 col-form-label">Address</label>
                  <div class="col-md-10">
                    <div>{{ driverInfo.address || '' }}</div>
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-md-2 col-form-label">Phone No</label>
                  <div class="col-md-10">
                    <div>{{ driverInfo.phone_no || '' }}</div>
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-md-2 col-form-label">Date of birth</label>
                  <div class="col-md-10">
                    <div>{{ driverInfo.dob || '' }}</div>
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-md-2 col-form-label">NID No</label>
                  <div class="col-md-10">
                    <div>{{ driverInfo.nid || '' }}</div>
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-md-2 col-form-label">Driving Licence</label>
                  <div class="col-md-10">
                    <div>
                      {{ driverInfo.driving_licence || '' }}
                      <div class="popup-gallery">
                        <img :src="driverInfo.driving_licence_image" width="120" @click="singleLicenseImage = true" />
                        <vue-easy-lightbox :visible="singleLicenseImage" :imgs="driverInfo.driving_licence_image" @hide="singleLicenseImage = false"></vue-easy-lightbox>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-md-2 col-form-label">Licence Expiry</label>
                  <div class="col-md-10">
                    <div>{{ driverInfo.driving_licence_expiry || '' }}</div>
                  </div>
                </div>
              </b-tab>
              <b-tab title="Owner Info">
                <div class="form-group row">
                  <label class="col-md-2 col-form-label">Name</label>
                  <div class="col-md-10">
                    <div>{{ ownerInfo.name }}</div>
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-md-2 col-form-label">Address</label>
                  <div class="col-md-10">
                    <div>{{ ownerInfo.address }}</div>
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-md-2 col-form-label">Contact</label>
                  <div class="col-md-10">
                    <div>{{ ownerInfo.contact }}</div>
                  </div>
                </div>
              </b-tab>
            </b-tabs>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <h4 class="header-title mb-4">Process Request</h4>
            <form @submit.prevent="submitAction">
              <span v-if="vehicleInfo.refType ==`byAdmin`">
                <div class="form-group">
                  <label>Select your action</label>
                  <select class="form-control" v-model="selectedDrivingLicenceType" required @change="getDriverList">
                    <option value="">-- Select Licence Type --</option>
                    <option value="1">Heavy</option>
                    <option value="2">Medium</option>
                    <option value="3">Light</option>
                    <option value="4">Motorcycle</option>
                    <option value="5">Three Wheelers</option>
                    <option value="6">PSV</option>
                    <option value="7">Others</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Assign Driver</label>
                  <select class="form-control" v-model="selectedDriver" required>
                    <option value="">Select Driver</option>
                    <option :value="singleDriver['_id']['$oid']" v-for="(singleDriver,index) in driverList" :key="index">{{ singleDriver.first_name || '' + ' ' + singleDriver.last_name || '' }}</option>
                  </select>
                </div>
              </span>
              <span v-else>
                <div class="form-group">
                  <label>Select vehicle type</label>
                  <select class="form-control" v-model="selectedDrivingLicenceType" required>
                    <option value="">-- Select Vehicle Type --</option>
                    <option value="1">Heavy</option>
                    <option value="2">Medium</option>
                    <option value="3">Light</option>
                    <option value="4">Motorcycle</option>
                    <option value="5">Three Wheelers</option>
                    <option value="6">PSV</option>
                    <option value="7">Others</option>
                  </select>
                </div>
              </span>

              <div class="form-group">
                <label>Select Status</label>
                <select class="form-control" v-model="driverStatus" required>
                  <option value="">-- Select Action --</option>
                  <option value="verified">Verified</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div class="form-group" v-if="driverStatus==`rejected`">
                <label>Reason</label>
                <textarea class="form-control" rows="2" v-model="comment" required></textarea>
              </div>
              <button type="submit" class="btn btn-primary float-right">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {get_vehicle_info,get_unoccupied_drivers,vehicle_verification} from "@/api/urls";
import error from "@/layouts/error";

export default {
  name: "processVerificationRequest",
  middleware: 'authenticate',
  head() {
    return {
      title: process.env.APP_NAME + ` | ${this.title}`
    }
  },
  data() {
    return {
      title: 'Vehicle Verification request processing',
      items: [{
        text: 'Admin',
        href: '/',
      },
        {
          text: 'Vehicle verification requests',
          href: '/vehicles/verification-requests',
        }
      ],
      errorMessage: '',

      vehicleInfo : {
        brand:'',
        capacity:'',
        address:'',
        chassis_number:'',
        color:'',
        country:'',
        engine_number:'',
        fuel_type:'',
        gear_type:'',
        millage:'',
        model:'',
        tires_number:'',
        vehicle_cc:'',
        vehicle_length:'',
        vehicle_number:'',
        vehicle_type:'',
        default_contact_no:'',
        refType:''
      },
      vehicleImages: [],
      driverInfo: {
        name : '',
        profile_image : '',
        address : '',
        phone_no : '',
        dob : '',
        nid : '',
        driving_licence : '',
        driving_licence_image : '',
        driving_licence_expiry : '',
      },
      ownerInfo : {
        name: '',
        address: '',
        contact: ''
      },
      index: 0,
      visible: false,
      singleProfileImage: false,
      singleLicenseImage: false,
      selectedDrivingLicenceType : '',
      driverList:[],
      selectedDriver: '',
      driverStatus: '',
      comment: ''

    }
  },
  computed: {
  },
  mounted() {
    this.getVehicleInfo();
  },
  methods: {
    getVehicleInfo(){
      let self = this;
      const token = this.$cookies.get('accessToken');
      let config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
      }

      this.$axios.$get(get_vehicle_info+this.$route.params.id, config).then((res) => {
        if (res.error === true){
          self.$router.push('/vehicles/verification-requests');
          self.$toasted.error('Invalid vehicle ID',{ duration:5000, position: 'top-center' })
        }
        else {
          this.vehicleInfo.vehicle_type=res.data.vehicleTypeTitle;
          this.vehicleInfo.brand=res.data.brandTitle;
          this.vehicleInfo.capacity=res.data.capacity;
          this.vehicleInfo.address=res.data.carAddress;
          this.vehicleInfo.chassis_number=res.data.chassisNumber;
          this.vehicleInfo.color=res.data.color;
          this.vehicleInfo.country=res.data.country;
          this.vehicleInfo.engine_number=res.data.engineNumber;
          this.vehicleInfo.fuel_type=res.data.fuelTypeTitle;
          this.vehicleInfo.gear_type=res.data.gearType;
          this.vehicleInfo.millage=res.data.millage;
          this.vehicleInfo.model=res.data.model;
          this.vehicleInfo.tires_number=res.data.tiresNumber;
          this.vehicleInfo.vehicle_cc=res.data.vehicleCC;
          this.vehicleInfo.vehicle_length=res.data.vehicleLength;
          this.vehicleInfo.vehicle_number=res.data.vehicleNumber;
          this.vehicleInfo.default_contact_no=res.data.default_contact_number;
          this.vehicleImages=res.data.vehicle_imgs;
          this.vehicleInfo.refType=res.data.refType;

        //  For Driver Info
          if (res.data.driverDetails.length > 0){
            this.driverInfo.name=res.data.driverDetails[0].name;
            this.driverInfo.profile_image=res.data.driverDetails[0].image;
            this.driverInfo.address=res.data.driverDetails[0].address;
            this.driverInfo.phone_no=res.data.driverDetails[0].phone_no;
            this.driverInfo.dob=res.data.driverDetails[0].dob;
            this.driverInfo.nid=res.data.driverDetails[0].nid;
            this.driverInfo.driving_licence=res.data.driverDetails[0].drivingLicence;
            this.driverInfo.driving_licence_image=res.data.driverDetails[0].drivingLicenceImg;
            this.driverInfo.driving_licence_expiry=res.data.driverDetails[0].drivingLicenceExpiry;
          }

          //  For Owner Info
          if (res.data.ownerDetails.length > 0) {
            this.ownerInfo.name = res.data.ownerDetails[0].name;
            this.ownerInfo.address = res.data.ownerDetails[0].address;
            this.ownerInfo.contact = res.data.ownerDetails[0].contact;
          }

        }
      }).catch((error)=>{
        console.log(error)
      });
    },

    getDriverList(){
      let self = this;
      const token = this.$cookies.get('accessToken');
      let config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
      }

      this.$axios.$get(get_unoccupied_drivers+this.selectedDrivingLicenceType, config).then((res) => {
        if (res.error === true){
          self.$toasted.success('No Driver Found',{ duration:5000, position: 'top-center' })
        }
        else {
          this.driverList=res.data;
        }
      }).catch((error)=>{
        console.log(error)
      });
    },

    showImg(index) {
      this.index = index;
      this.visible = true;
    },

    handleHide() {
      this.visible = false;
    },

    submitAction(){
      let self = this;
      const token = this.$cookies.get('accessToken');
      let config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
      };
      let payload = {
        "activeStatus":this.driverStatus,
        "comment" : this.comment,
        "vehicleLicenceType" : this.selectedDrivingLicenceType,
        "refType" : this.vehicleInfo.refType,
        "driverId" : this.selectedDriver
      }

      this.$axios.$put(vehicle_verification+this.$route.params.id, payload, config).then((res) => {
        if (res.error === true){
          self.$toasted.error(error.msg,{ duration:5000, position: 'top-center' })
        }
        else {
          self.$router.push('/vehicles/verification-requests');
          self.$toasted.success('Vehicle Verification processed successfully',{ duration:5000, position: 'top-center' })
        }
      }).catch((error)=>{
        self.$toasted.error('Something went wrong, please try again letter.',{ duration:5000, position: 'top-center' })
      });
    }
  },
}
</script>

<style scoped>

</style>
