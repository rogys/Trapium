const mysql = require('mysql2');
class Data {
    constructor() {
        this.online = mysql.createConnection({
            host: 'localhost',
            database: 'local_api',
            user: 'root',
            password: '902130'
        });
        this.online.connect(error => {
            if(error) {
                console.log(`Erro ao estabelcer conexão com o banco de dados ${error}`);
                return;
            };
            console.log('Conectado ao banco de dados!');
        });
    };
};
const data = new Data();
module.exports = data;