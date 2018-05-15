export default ({ router }) => {
  router.addRoutes([
    { path: '/musdb', redirect: '/datasets/musdb.html' },
    { path: '/@:foo', redirect: '/references.html#ref-:foo' },
  ])
}
