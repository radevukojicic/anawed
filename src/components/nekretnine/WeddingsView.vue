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
      <span class="add">
      Dodaj fotografije
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
      Obriši sve fotografije
      </span>
      </v-btn>
      <v-btn 
        class="ml-10 mt-9"
      ><h1>{{this.category}}</h1></v-btn>

       <v-container  style="width:80%" class="mt-12">
      <v-layout justify-center  row wrap>
        <v-flex
         class="mx-auto"
         v-for="item in this.images"
         :key="item._id"
        >
    <v-hover v-slot="{ hover }">

      <v-img
        width="244"
        :src="`http://localhost:3000/resized/`+item.image"
        :lazy-src="`http://localhost:3000/resized/`+item.image"
        aspect-ratio="1"
        class="grey lighten-2 mb-auto mx-auto mt-9"
      >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
           <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out black  v-card--reveal text-h2 white--text"
            style="height: 100%;"
          >
           <v-btn
           id="op1"
      class="mr-2"
      dark
      small
      color="white"
      elevation="2"
      fab
      @click="editItem(item._id)"

    >
     <v-icon
        
        small
        color="black"
      >
        fa-pen-to-square
      </v-icon>
      </v-btn>

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
        
          </div>
        </v-expand-transition>
        </v-img>
         </v-hover>
        </v-flex>
      </v-layout>
       </v-container>

    <v-dialog
        v-model="dialog"
        width="500"
      >
        <v-card>
          <v-card-title>
            Brisanje fotografije
          </v-card-title>
          <v-card-text>
            Da li ste sigurni da želite da obrišete ovu fotografiju?
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
            Izmena fotografije
          </v-card-title>
          <v-card-text>
          <v-form 
        ref="form" 
        @submit.prevent="editFotografija"
        > 
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
              @click="editFotografija(id)"
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
   <v-file-input
    prepend-icon="mdi-camera"
    accept="image/*" 
    label="Izaberite fotografije"
    v-model="imageAdd" 
    ref="uploadFiles"
    multiple color="pink"

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
            Obrišite sve fotografije
          </v-card-title>
          <v-card-text>
            <span class="er">
            Da li ste sigurni da želite da obrišete sve fotografije?<br>
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
      category:"weddings"
      
    
    }),

    async mounted () {
      try {
        // Simple GET request using axios

       await apiPost.getPosts(this.category).then(async response => {
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
       await apiPost.deletePost(id)
       .then(response => {
            console.log(response.data)
        })
       this.dialog = false;
       await apiPost.getPosts(this.category).then(async response => {
          this.images = await response.data
       })
     
      } catch (error) {
        console.log(error.message)
        
      }
      
       
       
     },
     async deleteAllFotografija(){
      try {
        await apiPost.deletePostAll(this.category).then(response => {
        console.log(response.data)
       })
       await apiPost.getPosts(this.category).then(async response => {
          this.images = await response.data;
          this.dialogDeleteAll = false;
       })
     
      } catch (error) {
        console.log(error.message)
        
      }
      
       
       
     },
     async editFotografija(id){
      try {
        let formData = new FormData();
           if (this.image) {
          formData.append("image[]", this.image);
 
          await apiPost.editPost(id,formData)
          .then(response => {
            console.log(response.data)
          })
          await apiPost.getPosts(this.category).then(async response => {
          this.images = await response.data
          this.image = []
          this.dialogEdit = false;
       })
    

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
     editItem(id) {
      console.log(id)
      this.id = id
      this.dialogEdit = true
    },
  
    async dodajFotografiju(){
      
       this.loading = true;
       let formData = new FormData()
       try {
          let files = this.imageAdd
          let filesLength = files.length
          for(var i = 0; i < filesLength; i++){
            formData.append("image[]", files[i])
          
          }
          formData.append("category", this.category)


          if (this.imageAdd) {
          await apiPost.createPost(formData)
          .then(async response => {
            console.log(await response.data)
          })
          await apiPost.getPosts(this.category)
          .then(async response => {
             let data  = await response.data
             this.images = data
          })
          this.dialogAdd = false;
          this.imageAdd = []
          this.loading = false;
       }
        
       } catch (error) {
        console.log(error.message)
       }
         
     }
       ,
     reserve () {
        this.loading = true
        setTimeout(() => (this.loading = false), 2000)
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
</style>