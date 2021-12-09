drop database cs_077_120_126;
create database cs_077_120_126;

\c cs_077_120_126

create table soldier (
                        msn varchar(50) Primary key,
                        name varchar(50) not null,
                        dob date not null,
                        height int not null,
                        weight int not null,
                        gender char not null,
                        rank varchar(50) not null,
                        speciality varchar(50)
                        );

create table regiment (
                        regiment_code varchar(50) Primary key,
                        rname varchar(50) not null,
                        hqcity varchar(50) not null,
                        currstrength int not null,
                        maxstrength int not null,
                        commanderid varchar(50) not null,
                        s_msn varchar(50) not null,
                        foreign key (s_msn) references soldier (msn)
                        ON DELETE CASCADE
                        );

create table medal (
                        medalid varchar(50) Primary key,
                        medalname varchar(50) not null,
                        soldier_msn varchar(50) not null,
                        foreign key (soldier_msn) references soldier (msn)
                        ON DELETE CASCADE
                    );

create table assignment(
                        assignmentcode varchar(50) Primary key,
                        assigment_name varchar(50) not null,
                        startdate date not null,
                        enddate date not null,
                        outcome varchar(50) not null,
                        position varchar(50) not null,
                        sol_msn varchar(50) not null,
                        foreign key (sol_msn) references soldier (msn)
                        ON DELETE CASCADE
                        );

create table war(
                    warname varchar(50) Primary key,
                    startdate date not null,
                    status varchar(50) not null,
                    reg_code varchar(50),
                    foreign key (reg_code) references regiment(regiment_code)
                    ON DELETE CASCADE
                );

create table location(
                        district varchar(50) Primary key,
                        state varchar(50) not null,
                        country varchar(50) not null,
                        pincode int not null,
                        msn_sol varchar(50) not null,
                        war_name varchar(50) not null,
                        foreign key (msn_sol) references soldier (msn) ON DELETE CASCADE,
                        foreign key(war_name) references war(warname)
                        
                    );

create table dependents(
                        msn_of_sol varchar(50),
                        dependent_name varchar(50) not null,
                        dependent_age int not null,
                        foreign key (msn_of_sol) references soldier (msn)
                        ON DELETE CASCADE
                        );

create table education(
                        school varchar(50) not null,
                        major varchar(50) not null,
                        s_id varchar(50) not null,
                        foreign key (s_id) references soldier (msn)
                        ON DELETE CASCADE
                        );

create table inventory(
                        inventory_id varchar(50) Primary key,
                        capacity int not null,
                        regimentcode varchar(50) not null,
                        foreign key (regimentcode) references regiment (regiment_code)
                        ON DELETE CASCADE
                        );

create table weapons(
                        weaponid varchar(50) Primary key,
                        weapon_name varchar(50) not null,
                        inv_id varchar(50) not null,
                        no_of_units int not null,
                        weapon_type varchar(50) not null,
                        foreign key (inv_id) references inventory (inventory_id)
                        ON DELETE CASCADE
				        );

create table vehicles(
                        vehicleid varchar(50) Primary key,
                        vehicle_name varchar(50) not null,
                        inven_id varchar(50) not null,
                        no_of_units int not null,
                        vehicle_type varchar(50) not null,
                        fuel varchar(50) not null,
                        foreign key (inven_id) references inventory (inventory_id)
                        ON DELETE CASCADE
				        );

create table ration(
                        rationid varchar(50) Primary key,
                        supply_date date not null,
                        inventory_num varchar(50) not null,
                        no_of_units int not null,
                        ration_type varchar(50) not null,
                        foreign key (inventory_num) references inventory (inventory_id)
                        ON DELETE CASCADE
				        );
