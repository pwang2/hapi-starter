import Vue from 'vue'

function requireAll(requireContext) {
  return requireContext
    .keys()
    .map(requireContext)
    .map((d) => d.default)
    .forEach((m) => Vue.component(m.name, m))
}

requireAll(require.context('./components', true, /\.vue$/))

// eslint-disable-next-line no-new
new Vue({ el: '#app' })
