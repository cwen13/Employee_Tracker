INSERT INTO department (name)
VALUES ("Finance"),
       ("Purchasing"),
       ("Engineering"),
       ("Accounts"),
       ("Project Managment");
       
INSERT INTO role (title, salary, department_id)
VALUES ("Director", 100000.00, 1),
       ("Producer",75000.00,1),
       ("Constructor",90000.00,2),
       ("Snake wrangler",65000.00,2),
       ("Pigeon Tamer",78000.00,2),
       ("Goalie",90000.00,3),
       ("Forward Sales",45000.00,3),
       ("Backend Defender",45000.00,3),
       ("Tire Inflator",45000.00,4),
       ("Bench Warmer",15000.00,4),
       ("Manager",25000.00,4);
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jason","Tremmer",11,NULL),
       ("Jeremy","Wrenth",1,1),
       ("Luren","Tekes",3,1),
       ("Samanatha","Quain",4,1),      
       ("Peter","Thinkil",5,1),
       ("Kalya","Wilker",11,NULL),
       ("Otter","Waiter",7,6),
       ("Rachel","Dortmender",7,6),
       ("Yule","Lossen",4,6),
       ("Aaron","Rector",10,6),
       ("Withers","Temdner",3,6),
       ("Paul","Slimkat",8,6),
       ("Gerry","Neider",9,6),
       ("Laura","Miller",2,6),
       ("Trevor","Seellender",6,6);
