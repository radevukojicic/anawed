<template>
<div >
 
     <v-btn
      dark
      small
      color="primary"
      elevation="2"
      class="mt-8 ml-8 pa-5"
      @click="dialogAdd = true"

    >
     <v-icon
        class="mr-2"
        small
        color="secondary"
      >
        fa-add
      </v-icon>
      <span 

       class="add">
      Dodaj vjenčanje
      </span>
      </v-btn>
      <v-btn
      dark
      small
      color="red"
      elevation="2"
      class="mt-8 ml-8 pa-5"
      @click="dialogDeleteAll = true"

    >
     <v-icon
        class="mr-2"
        small
      >
        fa-trash
      </v-icon>
      <span class="add">
      Obriši vjenčanja
      </span>
      </v-btn>

 <v-container style="width:80%" class="mt-12">
      <v-layout row wrap>
        <v-flex
         v-for="item in this.images"
         :key="item._id"
        >
          <v-card
          :loading="loadingCard"
           width="254"
           class="ma-4"
         >
    <v-img
       :src="`http://localhost:3000/`+item.image"
        aspect-ratio="1"
        class="grey lighten-2"
    ></v-img>

    <v-card-title>{{item.name}}</v-card-title>

  
    <v-divider class="mx-4"></v-divider>
 

    <v-card-actions>
      <v-btn
      id="op1"
      class="mr-2"
      dark
      small
      color="primary"
      elevation="2"
      fab
      @click="editItem(item._id, item.name)"

    >
     <v-icon
        
        small
        color="secondary"
      >
        fa-pen-to-square
      </v-icon>
      </v-btn>

      <v-spacer></v-spacer>

    <router-link :to="`wed-albums/`+item._id">

      <v-btn
      id="op1"
      class="pa-5"
      small
      color="primaryBtn"
      elevation="2"
      
    >
    <span style="font-size:15px; color: white;">
     Otvori

    </span>
      </v-btn>
      </router-link>


      <v-spacer></v-spacer>

      
     <v-btn
      dark
      small
      color="red"
      elevation="2"
      fab
       @click="deleteItem(item._id)"

    >
     <v-icon
        
        small
      >
        fa-trash
      </v-icon>
      </v-btn>

    </v-card-actions>
  </v-card>
        </v-flex>
      </v-layout>
  </v-container>

    <v-dialog
        v-model="dialog"
        width="500"
      >
        <v-card>
          <v-card-title>
            Brisanje vjenčanja
          </v-card-title>
          <v-card-text>
            Da li ste sigurni da želite da obrišete ovo vjenčanje?
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="info"
              text
              @click="dialog=false"
            >
            <v-icon >mdi-close-circle</v-icon>
              Odustani
            </v-btn>
            <v-btn
              color="red"
              text
              @click="deleteFotografija(id)"
            >
            <v-icon>mdi-delete</v-icon>
              Obriši
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
             <v-dialog
        v-model="dialogEdit"
        width="500"
      >
        <v-card>
          <v-card-title>
            Izmena vjenčanja <br>

          </v-card-title>
          <v-card-text>
          <v-form 
        ref="form" 
        @submit.prevent="editFotografija"
        > 
          <h3 style="color:red">{{this.erMsg}}</h3>

<v-text-field
    placeholder="Ime"
    prepend-icon="mdi-card-text"
    label="Upišite novo ime"
    v-model="name" 

  ></v-text-field>
  <v-file-input
    placeholder="Fotografije"
    prepend-icon="mdi-camera"
    accept="image/*" 
    label="Izaberite fotografiju"
    v-model="image" 

  ></v-file-input>
  </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="info"
              text
              @click="dialogEdit=false"
            >
            <v-icon >mdi-close-circle</v-icon>

              Odustani
            </v-btn>
            <v-btn
              color="green"
              text
              :loading="Editloading"

              @click="editFotografija(id, name)"
            >
             <v-icon >mdi-content-save</v-icon>

              Izmeni
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
        <v-dialog
        v-model="dialogAdd"
        width="500"
      >
        <v-card>
          <v-card-title>
            Dodaj fotografije
          </v-card-title>
          <v-card-text>
          <v-form 
        ref="form" 
        @submit.prevent="dodajFotografiju"
        > 
          <h3 style="color:red">{{this.erMsgAdd}}</h3>

           <v-text-field
    placeholder="Ime"
    prepend-icon="mdi-card-text"
    label="Upišite ime"
    v-model="name" 

  ></v-text-field>
   <v-file-input
    prepend-icon="mdi-camera"
    accept="image/*" 
    label="Izaberite fotografiju"
    v-model="imageAdd" 
    ref="uploadFiles"
    color="pink"

  ></v-file-input>
  </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="info"
              text
              @click="dialogAdd=false"
            >
            <v-icon >mdi-close-circle</v-icon>

              Odustani
            </v-btn>
            <v-btn
              color="green"
              text
              :loading="loading"
              @click="dodajFotografiju()"
            >
            <v-icon >mdi-content-save</v-icon>

              Dodaj
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="dialogDeleteAll"
        width="500"
      >
        <v-card>
          <v-card-title>
            Obrišite vjenčanja
          </v-card-title>
          <v-card-text>
            <span class="er">
            Da li ste sigurni da želite da obrišete sva vjenčanja?<br>
            Povratak neće biti moguć!!!
            </span>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="info"
              text
              @click="dialogDeleteAll=false"
            >
            <v-icon >mdi-close-circle</v-icon>
              Odustani
            </v-btn>
            <v-btn
              color="red"
              text
              @click="deleteAllFotografija()"
            >
            <v-icon>mdi-delete</v-icon>
              Obriši sve
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</div>
 
</template>


<script>
import apiPost from "../../services/service"
// @ is an alias to /src

  export default {
    data: () => ({
      search: "",
      dialog: false,
      dialogEdit: false,
      dialogAdd: false,
      dialogDeleteAll: false,
      itemsPerPage: 4,
      images: [],
      image:[],
      imageAdd:[],
      tab: null,
      loading: false,
      loadingCard: false,
      name: null,
      Editloading: false,
      editname: "",
      erMsg : '',
      erMsgAdd: ""
      
    
    }),

    async mounted () {
      try {
        // Simple GET request using axios
       await apiPost.getCards().then(async response => {
          this.images = await response.data
       })
       
      } catch (error) {
        console.log(error.message)
      }
    },


    methods: {
     async deleteFotografija(id){
      try {
        console.log(id)
       await apiPost.deleteCard(id)
       .then(response => {
            console.log(response.data)
        })
       this.dialog = false;
       await apiPost.getCards().then(async response => {
          this.images = await response.data
       })
     
      } catch (error) {
        console.log(error.message)
        
      }
      
       
       
     },
     async deleteAllFotografija(){
      try {
        await apiPost.deleteCardAll().then(response => {
        console.log(response.data)
       })
       await apiPost.getCards().then(async response => {
          this.images = await response.data;
          this.dialogDeleteAll = false;
       })
     
      } catch (error) {
        console.log(error.message)
        
      }
      
       
       
     },
     async editFotografija(id, name){
      try {
        let formData = new FormData();
           if (this.name != '') {
      this.Editloading = true

          formData.append("image[]", this.image);
          formData.append("name", name);
 
          await apiPost.editCard(id,formData)
          .then(response => {
            console.log(response.data)
          })
          await apiPost.getCards().then(async response => {
          this.images = await response.data
          this.dialogEdit = false;
          this.name = null
          this.image = []
          this.Editloading = false
         this.erMsg = ""

       })
      }
      else{
        this.erMsg = "Ime je obavezno"
      }
      } catch (error) {
        console.log(error.message)
      }       
     },
      deleteItem(id) {
      console.log(id)
      this.id = id
      this.dialog = true
    },
     editItem(id, name) {
      console.log(id)
      this.id = id
      this.name = name
      console.log(this.editname)
      this.dialogEdit = true
    },
  
    async dodajFotografiju(){
      
       let formData = new FormData()
       try {
          formData.append("image[]", this.imageAdd)
          formData.append("name", this.name )
          if (this.imageAdd.length != 0 && this.name) {
            
       this.loading = true;

          await apiPost.createCard(formData)
          .then(async response => {
            console.log(await response.data)
          })
          await apiPost.getCards()
          .then(async response => {
             let data  = await response.data
             this.images = data
          })
          this.dialogAdd = false;
          this.imageAdd = []
          this.name = null
          this.loading = false;
          this.erMsgAdd = ''
       }
       else{
        this.erMsgAdd = "Ime i slika su obavezne"
      }
        
       } catch (error) {
        console.log(error.message)
       }
         
     }
       ,
     reserve () {
        
        this.loading = true
        setTimeout(() => (this.loading = false), 2000)

        //card loading
        this.loadingCard = true
        setTimeout(() => (this.loadingCard = false), 2000)
      },
     

     
    },
  }
</script>




<style scoped>
  .bottom-gradient {
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
  }

  .repeating-gradient {
    background-image: repeating-linear-gradient(-45deg,
                        rgba(255,0,0,.25),
                        rgba(255,0,0,.25) 5px,
                        rgba(0,0,255,.25) 5px,
                        rgba(0,0,255,.25) 10px
                      );
  }
  .v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .9;
  position: absolute;
  width: 100%;
}
.add{
  font-size: 15px;
}
.er{
  font-size: 15px ;
}
a{
  text-decoration: none;
}
</style>