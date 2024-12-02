import HttpRouter from './HttpRouter.mjs'

const router = new HttpRouter()

router.get('/', (request, response) => {
  response.send('<h1>Home Page</h1>')
})

router.get('/blog', (request, response) => {
  response.send('<h1>List of Articles</h1>')
})

router.get('/{ category }/{ id }', (request, response) => 
{
  const { category, id } = request.params
  response.send(
    `<h1>${ category.toUpperCase() }: page id ${ id }</h1>`)
})

router.resolve('get', '/')
router.resolve('get', '/blog')
router.resolve('get', '/blog/14')
router.resolve('get', '/test')
