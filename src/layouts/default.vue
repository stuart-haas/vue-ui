<template>
  <Topbar />
  <Layout>
    <Navigation>
      <Navigation.Item to="/" icon="fas fa-home"> Dashboard </Navigation.Item>
      <Navigation.Item to="/" icon="fas fa-tasks"> Projects </Navigation.Item>
      <Navigation.Item to="/" icon="fas fa-archive"> Archive </Navigation.Item>
      <Navigation.Item to="/" icon="fas fa-cog"> Settings </Navigation.Item>
    </Navigation>
    <Layout.Main>
      <router-view />
    </Layout.Main>
  </Layout>
</template>

<script setup lang="ts">
import { Layout, Navigation, Topbar } from '@/components';
</script>
