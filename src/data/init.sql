DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS skill;
DROP TABLE IF EXISTS project_skill;

CREATE TABLE project (
    id INTEGER,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    image VARCHAR(255) NULL,
    link VARCHAR(255) NULL,
    download BOOLEAN NOT NULL,
    
    
    PRIMARY KEY (id)
);

CREATE TABLE skill (
    id INTEGER,
    name VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NULL,
    
    PRIMARY KEY (id)
);

CREATE TABLE project_skill (
    project_id INT,
    skill_id INT,
    
    PRIMARY KEY (project_id, skill_id),
    FOREIGN KEY (project_id) REFERENCES project(id),
    FOREIGN KEY (skill_id) REFERENCES skill(id)
);