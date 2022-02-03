export const dropUsersTableSQL = "DROP TABLE IF EXISTS Users";
export const dropQuotesTableSQL = "DROP TABLE IF EXISTS Quotes";
export const dropViewQuotesTableSQL = "DROP TABLE IF EXISTS ViewQuotes";

export const createUsersTableSQL = `CREATE TABLE Users (
    id INT NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(100) NOT NULL,
    registerDate varchar(50) NOT NULL,
    role varchar(8) NOT NULL,
    state tinyint(1) DEFAULT '1',
    dailyQuote varchar(50) DEFAULT NULL,
    allQuotes tinyint(1) NOT NULL DEFAULT '1',
    PRIMARY KEY (id),
    UNIQUE KEY email (email)
)`;

export const createQuotesTableSQL = `CREATE TABLE Quotes (
    id INT NOT NULL AUTO_INCREMENT,
    quote varchar(255) NOT NULL,
    writer varchar(255) NOT NULL,
    role varchar(8) DEFAULT NULL,
    idUser int NOT NULL,
    registerDate varchar(50) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY id (id)
)`;

export const createViewQuotesTableSQL = `CREATE TABLE ViewQuotes (
    userId int NOT NULL,
    quoteId int NOT NULL,
    PRIMARY KEY (userId,quoteId)
)`;
