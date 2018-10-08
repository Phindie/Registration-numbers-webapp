DROP TABLE IF EXISTS registry, towns;

create table towns(
  id serial primary key,
    town_name varchar(50) not null,
    town_id varchar(50) not null
);

create table registry(
  id serial not null primary key,
  town_name text not null,
  town_id int not null,
  foreign key(town_id)references towns(id) ON DELETE CASCADE
);



insert into  towns(town_name,  town_id ) values('CapeTown','CA');
  insert into  towns(town_name,  town_id ) values('Bellville','CY');
    insert into  towns(town_name,  town_id ) values('George','CAW');
      insert into  towns(town_name,  town_id ) values('Paarl','CJ');
        insert into  towns(town_name,  town_id ) values('Worcester','CW');
       

       