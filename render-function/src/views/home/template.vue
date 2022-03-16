<template>
  <div>
    <my-button>
      this is default content
      <template v-slot="{ user, on }">
        <div>{{ user.name }}</div>
        <button v-on="on">emit</button>
      </template>
      <template v-slot:footer="{ footer }">
        <div>{{ footer.type }}</div>
      </template>
    </my-button>
  </div>
</template>
