async function routes(fastify, options) {
    
    fastify.post(
        '/book/register',
        async(request,reply) =>{

            const {name} = request.body
            const {edition} = request.body
            const {genre} = request.body
            const {author} = request.body
            const {code} = request.body
            
            fastify.knex("books")
                .insert({
                    name:name,
                    edition: edition,        
                    genre:genre,
                    author:author,
                    code:code
                })   
            .then(
                newRegister => reply.send(newRegister)
            )
        },
    )

    fastify.put(
        '/book/:id/update',
        async(request, reply) => {
            const {id} = request.params
            const {name} = request.body
            const {edition} = request.body
            const {genre} = request.body
            const {author} = request.body
            const {code} = request.body
            fastify.knex("books")
                .where('id', id)
                .update({
                    name: name,
                    edition: edition,
                    genre: genre,
                    author: author,
                    code: code 
                }).then(data => {
                    if(!data === 1){
                        const result = "erro"
                    }
                    const result = "alterado"
                    reply.send(result)
                })
        }
    )

    fastify.delete(
        '/book/:id/delete',
        async(request, reply) => {
            const {id} = request.params

            fastify.knex('books')
                .where('id', id)
                .del()
                .then(data => reply.send(data));
        }
    )
    
    fastify.get(
        '/book',
        async(request, reply) => {
            const {id} = request.params

            fastify.knex('books')
                .select('*')
                .then(data => reply.send(data));
        }
    )

    fastify.get(
        "/new_books",
        async (request, reply) => {
    
          fastify.knex("books")
            .select('*')
            .orderBy('id', 'desc')
            .then(data => reply.send(data.slice(0,8)))
        }
      )

}
module.exports = routes