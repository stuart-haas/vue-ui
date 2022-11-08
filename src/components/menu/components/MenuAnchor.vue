<template>
  <div class="Menu_MenuAnchor">
    <slot :toggle="toggle">
      <Button @click="toggle">Menu</Button>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { Button } from '@/components';

const toggle = inject('toggle') as (...payload: any[]) => void;
</script>
