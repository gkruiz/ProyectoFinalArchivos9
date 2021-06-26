const oracledb = require('oracledb');

Datos =  {
    user: 'system',
    password: 'Asdf1234.,',
    connect: '172.0.0.1:1521/orcl' 
}

async function Connection(sql, binds, autoCommit){
    let open = await oracledb.getConnection(Datos);
    let consulta = await open.execute(sql, binds, { autoCommit });
    open.release();
    return consulta;
}

exports.Connection = Connection;