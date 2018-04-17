<template>
  <div>
    <em>Powered By</em>
    <img width="100" height="100" src="../assets/images/webpack.svg"/>
    <img width="272" height="92" src="../assets/images/google-logo.png"/>
    <div class="message">{{message}}</div>
    <div class="prop-message message">{{pmessage}}</div>
    <h2 :style="{color:loaded?'green':'black'}">
      <span v-text="loaded?'loaded':'loading'"></span> asynchronously from split chunk
    </h2>
    <marquee direction="down" width="250" height="200" behavior="alternate">
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
    return {
      message: 'hello world from vue component!',
      asyncMessage: '',
      loaded: false
    }
  },
  created() {
    setTimeout(async () => {
      const { default: codemirror } = await import('codemirror')
      const { version } = codemirror
      this.asyncMessage = `codemirror ${version} loaded`
      this.loaded = true
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
