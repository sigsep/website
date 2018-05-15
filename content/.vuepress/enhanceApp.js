export default ({ router }) => {
  router.addRoutes([
    { path: '/musdb', redirect: '/datasets/musdb.html' },
    { path: '/methods/:foo', redirect: '/references.html:foo' },
  ])
}
