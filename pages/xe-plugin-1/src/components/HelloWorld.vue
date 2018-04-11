<template>
  <div>
    <h3>Awesome!!</h3>
    <div class="message">{{message}}</div>
    <div class="prop-message message">{{pmessage}}</div>
  </div>
</template>

<script>
// NOTE: should allow share vue component to be referenced in page
export default {
  name: 'hello-world',
  props: ['pmessage'],
  data() {
    return { message: 'hello world from vue component!' }
  }
}
</script>

<style>
.message {
  font-size: 20px;
  color: green;
}
</style>
