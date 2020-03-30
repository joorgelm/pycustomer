<template>
    <v-navigation-drawer :value="drawer" @input="update($event)" app>
      <v-list dense>
        <v-list-item v-for="(item, index) in $props.items" :key="index" link>
          <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{item.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="mx-2 mb-4">
          <v-btn block color="secondary" outlined @click="$emit('bottom-click')">{{ $props.bottomitem.text }}</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

</template>
<script>
export default {
  name: "PyNavDrawer",
  props: {
    items: {
      type: Array,
      required: true
    },
    bottomitem: {
      type: Object,
      required: false
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    visible() {
      this.drawer = this.drawer === true ? false : true
    },
  },
  data() {
    return {
      drawer: this.$props.visible
    };
  },
  methods:{
      update (event) {
          this.drawer = event
      }
  }
};
</script>