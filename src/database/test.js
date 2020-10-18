const Database = require('./db.js');
const FAKEDATA = require('./fakedata.js')
const saveOrphanage = require('./saveOrphanage.js');

Database.then(async (db) => {
    //inserir dados na tabela
    FAKEDATA.forEach(async obj => {await saveOrphanage(db, obj)})
    
    //consultar dados da tabela
    const selectedOrphanages = await db.all('SELECT * FROM orphanages');
    console.log(selectedOrphanages);

    //editar dados da tabela
    //excluir dados da tabela
    //await db.run('DELETE FROM orphanages WHERE id = "4"')
})