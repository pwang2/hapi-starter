<template>
  <div>
    <div class="message">{{message}}</div>
    <div class="prop-message message">{{pmessage}}</div>
    <marquee direction="down" width="250" height="200" behavior="alternate" style="border:1px solid
#534534">
    <marquee behavior="alternate"> {{asyncMessage}} </marquee>
    </marquee>
  </div>
</template>

<script>
// NOTE: should allow share vue component to be referenced in page
export default {
  name: 'hello-world',
  props: ['pmessage'],
  data() {
    return { message: 'hello world from vue component!', asyncMessage: '' }
  },
  created() {
    setTimeout(async () => {
      const { default: codemirror } = await import('codemirror')
      const { version } = codemirror
      this.asyncMessage = `codemirror ${version} loaded`
    }, 1000)
  }
}
</script>

<style>
.message {
  font-size: 20px;
  color: green;
}
</style>
