<script setup>
const config = useRuntimeConfig();
const { data } = await useAsyncData('pageData', () => $fetch(`${config.API_URL}/content/url`, {
  headers: {
    "Accept-Language": "en-US",
    "umb-project-alias": config.UMB_ALIAS,
    "Api-Key": config.API_KEY
  },
  params: {
    url: "/home/",
  },
}), {
  pick: [
    "title",
    "description",
    "socialTitle",
    "socialDescription",
    "socialImage",
    "pageContent",
  ]
}
);
</script>

<template>
  <div>
    <Head lang="en-US">
      <Title>{{ data.title }} title</Title>
      <Meta name="description" :content="data.description" />
      <Meta name="og:title" :content="data.socialTitle" />
      <Meta name="og:description" :content="data.socialDescription" />
      <Meta name="og:type" content="website" />
      <Meta name="og:image" :content="data.socialImage.src" />
    </Head>

    <the-header :items="data.pageContent"></the-header>

    <component
      v-for="section in data.pageContent"
      :key="section._id"
      :is="section.contentTypeAlias"
      :content="section"
      :navLink="section?.navigationTag"
    ></component>
  </div>
</template>
