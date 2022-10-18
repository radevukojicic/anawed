<template>
    <nav class="mb-15">

    <v-app-bar
    elevation="9"
    class="mb-5"
    fixed    
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <span class="font-weight-light">Admin</span>
        <span>Panel</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
 
           <v-btn
        class="mr-3"
        @click="toggleDarkMode" 
        :value="darkMode" 
        elevation="5"
        icon
        >
        <v-icon>mdi-theme-light-dark</v-icon>
        </v-btn>
        <!-- <v-switch
         @click="toggleDarkMode"
      v-model="switch1"
      :label="`Switch 1: ${switch1.toString()}`"
    ></v-switch> -->
      <v-btn 
      @click="logout" 
       text
      class="mx-2"
      outlined
      
      >
      <span  class=".d-sm-none .d-md-flex mr-2">ODJAVI SE</span>
      <v-icon>mdi-logout</v-icon>
     
      </v-btn>
       
   
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      temporary
      fixed    
      
    >
    <v-app-bar
    class="mb-4 bars"
    elevation="0"
      dark

    >
      <v-app-bar-nav-icon color="white" @click="drawer = false"></v-app-bar-nav-icon>

      <v-toolbar-title color="white">
        <span  class="font-weight-light">Admin</span>
        <span>Panel</span>
      </v-toolbar-title>

   
    </v-app-bar>

      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="text--accent-4"
        >
          
     

      
          <v-list-item v-for="link in links" :key="link.text" router :to="link.route">

            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    </nav>
</template>

<script>
export default {
     data: () => ({
       switch1: true,
      darkMode: false,
      drawer: false,
      group: null,
      links:[
        { icon: "mdi-ring" , text: "Wedding Stories", route: "/wed-albums"},
        { icon: "mdi-home" , text: "Naslovna", route: "/dashboard"},
        { icon: "mdi-airplane" , text: "Travel", route: "/travelView"},
        { icon: "mdi-shoe-heel" , text: "Weddings", route: "/weddingsView"},
        { icon: "mdi-gift-outline" , text: "Birthdays", route: "/birthdaysView"},
        { icon: "mdi-instagram" , text: "Social Media", route: "/socialView"},


      ]
    }),

      methods: {
      toggleDarkMode: function () {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        this.darkMode = !this.darkMode;
      },
      logout() {
        window.localStorage.removeItem("token"); 
        this.$router.push({ path: "/login" });
    },
    },

    computed: {
      switchLabel: function () {
        return this.darkMode ? 'light' : 'dark';
      }
    }
    
}
</script>

<style scoped>
.igor{
  font-size: 20px;
}
.bars{
  background: red;
}
</style>