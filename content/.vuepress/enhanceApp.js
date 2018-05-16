export default ({ router }) => {
  router.addRoutes([
    { path: '/musdb', redirect: '/datasets/musdb.html' },
  ])
}
