const Database = require('./database/db.js');
const saveOrphanage = require('./database/saveOrphanage.js');

module.exports = {
  //index: function(req,res){}
  index(req, res) {
    const city = req.query.city;
    return res.render("index");
  },

  async orphanage(req, res) {
    const id = req.query.id;
    try{
      //colocar o orphanage pelo banco
      const db = await Database;
      const results = await db.all(`SELECT * FROM orphanages WHERE id="${id}"`);
      const orphanage = results[0];

      orphanage.images = orphanage.images.split(',');
      orphanage.firstImage = orphanage.images[0];
      orphanage.open_on_weekends = Boolean(orphanage.open_on_weekends);

      return res.render('orphanage', { orphanage });
      }
      catch (err){
        console.log(err.message);
        return res.send('Erro no banco de dados!')
      }
    },

  async orphanages(req, res) {
    try{
    //colocar o orphanage pelo banco
    const db = await Database;
    const orphanages = await db.all('SELECT * FROM orphanages');
    return res.render('orphanages', { orphanages });
    }
    catch (err){
      console.log(err.message);
      return res.send('Erro no banco de dados!')
    }
  },

  createOrphanage(req, res){
    return res.render('create-orphanage');
  },

  async saveOrphanage(req, res){
    const fields = req.body

    //validar se todos os campos estao preenchidos
    if (Object.values(fields).includes('')) {
      return res.send('Todos os campos devem ser preenchidos!');
    }
    try {
      const db = await Database;
    await saveOrphanage(db,{
      lat: fields.lat,
      lng: fields.lng,
      name: fields.name,
      about: fields.about,
      whatsapp: fields.whatsapp,
      images: fields.images.toString(),
      instructions: fields.instructions,
      opening_hours: fields.opening_hours,
      open_on_weekends: fields.open_on_weekends
    });
    //redirecionamento
    return res.redirect('/orphanages')
    } catch (error) {
      console.log(error);
      return res.send('Erro no banco de dados!')
    }
    //salvar um orfanato
    
  }
};
