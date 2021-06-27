CREATE USER alex WITH ENCRYPTED PASSWORD 'alex';
GRANT ALL PRIVILEGES ON DATABASE TW to alex;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO alex;


DROP TYPE IF EXISTS categ_moneda;
DROP TYPE IF EXISTS tipuri_produs;

CREATE TYPE categ_moneda AS ENUM( 'store of value', 'security', 'testchain', 'meme');
CREATE TYPE tipuri_produs AS ENUM('DeFi', 'Storage', 'Innovation', 'Stable');

DROP TABLE moneda;
CREATE TABLE IF NOT EXISTS moneda (
   id serial PRIMARY KEY,
   nume VARCHAR(50) UNIQUE NOT NULL,
   descriere TEXT,
   pret NUMERIC(8,2) NOT NULL,
   popularitate INT NOT NULL CHECK (popularitate>0),   
   rating INT NOT NULL CHECK (rating>=0), 
   tip_produs tipuri_produs DEFAULT 'DeFi',
   categorie categ_moneda DEFAULT 'store of value',
   parere VARCHAR(50) NOT NULL,
   pareri_trecute VARCHAR [], --pot sa nu fie specificare deci nu punem NOT NULL
   investitie_buna BOOLEAN NOT NULL DEFAULT FALSE,
   imagine VARCHAR(300),
   data_adaugare TIMESTAMP DEFAULT current_timestamp
);


INSERT into moneda (nume, descriere, pret, popularitate, rating, tip_produs, categorie, parere, pareri_trecute, investitie_buna, imagine) VALUES 
('Binance Coin','Binance Coin',42,8,5,'DeFi','security','rau','{"bun"}',False,'binance-coin.png'),
('Bitcoin','Bitcoin',65,6,6,'Storage','meme','rau','{"rau","mediu","bun"}',False,'bitcoin.png'),
('Bitcoin Cash','Bitcoin Cash',92,5,3,'Storage','store of value','rau','{"mediu"}',False,'bitcoin-cash.png'),
('Cardano','Cardano',96,8,7,'Stable','testchain','bun','{"mediu","rau"}',True,'cardano.png'),
('Chainlink','Chainlink',95,4,2,'Innovation','security','bun','{"bun","rau","mediu"}',False,'chainlink.png'),
('Dogecoin','Dogecoin',48,5,3,'Storage','security','rau','{"bun","rau","rau"}',False,'dogecoin.png'),
('Ethereum','Ethereum',36,1,3,'DeFi','testchain','rau','{"rau","rau","mediu"}',True,'ethereum.png'),
('Litecoin','Litecoin',91,10,1,'Innovation','testchain','bun','{"mediu"}',True,'litecoin.png'),
('Polkadot','Polkadot',24,5,5,'DeFi','store of value','rau','{"mediu","rau","bun"}',True,'polkadot.png'),
('Stellar','Stellar',27,4,8,'Innovation','testchain','bun','{"mediu"}',True,'stellar.png'),
('Tether','Tether',16,10,9,'DeFi','testchain','bun','{"mediu","bun","mediu"}',True,'tether.png'),
('Theta','Theta',25,3,1,'Storage','security','bun','{"bun"}',False,'theta.png'),
('Uniswap','Uniswap',91,2,7,'Stable','meme','bun','{"mediu","rau"}',False,'uniswap.png'),
('Usd Coin','Usd Coin',51,2,5,'Innovation','testchain','bun','{"rau","bun","rau"}',True,'usd-coin.png'),
('Wrapped Bitcoin','Wrapped Bitcoin',54,4,6,'Storage','security','mediu','{"bun","mediu","rau"}',False,'wrapped-bitcoin.png'),
('Xrp','Xrp',31,4,9,'DeFi','meme','bun','{"rau","mediu","bun"}',True,'xrp.png');
