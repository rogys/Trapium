Para fazer funcionar -><br />
Node instalado, abrir o terminal e rodar:<br />
<code>npm init<br />
npm install express express-session mysql2 ejs</code><br />
Isso instala as pendencias do projeto. É necessário um banco de dados MySQL:<br />
Correr esse comando para criar as tabelas necessárias:<br />
<code>CREATE DATABASE local_api;<br />
USE local_api;<br />
CREATE TABLE users (<br />
id INT AUTO_INCREMENT PRIMARY KEY,<br />
email VARCHAR(200) NOT NULL UNIQUE,<br />
password VARCHAR(255) NOT NULL,<br />
create_at TIMESTAMP DEFAULT CURRENT_TIMEsTAMP<br />
);<br />
CREATE TABLE posts (<br />
id INT AUTO_INCREMENT PRIMARY KEY,<br />
email VARCHAR(200) NOT NULL,<br />
text TEXT NOT NULL,<br />
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP<br />
);</code>
Rodar: node app.js