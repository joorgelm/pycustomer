<template>
    <transition name="fade">
        <keep-alive>
            <div>
                <v-app-bar app color="primary" dark>
                    <slot name="header" />
                  <v-toolbar-title>Application</v-toolbar-title>
                </v-app-bar>
                <slot name="body" />
                <v-footer color="primary" app>
                  <span class="white--text">&copy; 2020</span>
                </v-footer>
            </div>
        </keep-alive>
    </transition>
</template>

<script>
export default {
    name: 'Main'
}
</script>

<style scoped>

</style>