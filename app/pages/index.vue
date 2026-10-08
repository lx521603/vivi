<script setup lang="ts">
const { data: versions, error, pending } = await useFetch('/api/releases', {
  server: false,
  transform: (data: any) => {
    if (!Array.isArray(data)) return []
    return data.map(release => ({
      tag: release.tag_name,
      title: release.name || release.tag_name,
      date: release.published_at,
      markdown: release.body || ''
    }))
  }
})

const title = '薇薇'
const description = '薇薇-91.pt'
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/changelog-light.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UChangelogVersions
    as="main"
    :indicator-motion="false"
    :ui="{
      root: 'py-16 sm:py-24 lg:py-32',
      indicator: 'inset-y-0'
    }"
  >
    <UChangelogVersion
      v-for="version in versions"
      :key="version.tag"
      v-bind="version"
      :ui="{
        root: 'flex items-start',
        container: 'max-w-7xl min-w-0',
        header: 'border-b border-default pb-4',
        title: 'text-3xl',
        date: 'text-xs/9 text-highlighted font-mono',
        indicator: 'sticky top-0 pt-16 -mt-16 sm:pt-24 sm:-mt-24 lg:pt-32 lg:-mt-32'
      }"
    >
      <template #body>
        <AppMarkdown
          v-if="version.markdown"
          :value="version.markdown"
        />
      </template>
    </UChangelogVersion>
  </UChangelogVersions>
</template>