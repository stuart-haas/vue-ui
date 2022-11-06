<template>
  <Topbar />
  <Layout>
    <Navigation />
    <Layout.Main>
      <router-view />
    </Layout.Main>
  </Layout>
</template>

<script setup lang="ts">
import { Layout, Navigation, Topbar } from '@/components';
</script>
