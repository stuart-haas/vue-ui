<template>
  <Topbar />
  <Layout>
    <Navigation>
      <Navigation.Item to="/" icon="fas fa-code-branch">
        Repositories
      </Navigation.Item>
      <Navigation.Item to="/archive" icon="fas fa-archive">
        Archive
      </Navigation.Item>
      <Navigation.Item to="/settings" icon="fas fa-cog">
        Settings
      </Navigation.Item>
    </Navigation>
    <Layout.Main>
      <Layout.RouterView />
    </Layout.Main>
  </Layout>
</template>

<script setup lang="ts">
import { Layout, Navigation, Topbar } from '@/components';
</script>
