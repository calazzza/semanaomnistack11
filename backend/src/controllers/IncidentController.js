const connection = require('../database/connection');

module.exports = {
    async create(request, response){        
        const { title, description, value } = request.body;    

        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })

        return response.json({ id })
    },
    
    async index(request, response) {    
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();
        
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        response.header('X-Total-Count', count['count(*)']);
        response.header('X-Total-Page', page);
    
        return response.json(incidents);
    },
    
    async listById(request, response){    
        const incident = await connection('incidents').select('*').where('id', request.params.id);
    
        return response.json(incident);
    },

    async delete(request, response){            
        const ong_id = request.headers.authorization;
        const { id } = request.params;

        const incident = await connection('incidents').select('ong_id').where('id', id).first();

        if (incident.ong_id != ong_id){
            return response.status(401).json({ error: 'Operação não autorizada' });            
        }
        
        await connection('incidents').delete().where('id', id);

        return response.json({mensagem: `Caso deletado com sucesso: ${id}`});
    }
}