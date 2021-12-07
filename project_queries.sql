\c cs_077_120_126
-- simple: List  msn and name of soldier born before 1950

Select msn,name
from soldier
where dob < '01-01-1950';

-- simple List the name of soldier who belongs to regiment which has its hqcity located in kashmir
 Select msn 
 from (soldier join regiment on msn=s_msn)
 where hqcity ='Kashmir';
 
 
 -- complex: List the names of soldiers who have at least one dependent.
 
SELECT msn,name
FROM soldier
WHERE EXISTS (SELECT * 
FROM dependents
WHERE msn=msn_of_sol) ;


 -- Complex: List the names of soldiers who have no  dependent.
 (SELECT msn,name 
 from soldier)
 EXCEPT
(SELECT msn,name
FROM soldier
WHERE EXISTS (SELECT * 
FROM dependents
WHERE msn=msn_of_sol) );

-- Complex: using nested query retrieve names of soldiers whos height is greater than the height of soldier whos weight is 75
SELECT msn,name                                                                             
FROM soldier
WHERE height > ALL (SELECT height
FROM soldier where weight=75 );

--Complex retrive the names of soldier who have been awarded PVC and is specialised in infantary 
(select msn,name
from soldier
where speciality='Infantary')
Intersect
(
select msn ,name 
from soldier,medal
where msn=soldier_msn and medalname='Param Vir Chakra');

--simple: increasing the no_of_units of rations by 20% where inventory id is I004
update  ration 
set no_of_units = 1.2 * no_of_units from inventory 
where inventory_num = inventory_id and inventory_id='I004'

-- aggregate,complex,nested Name,msn and rank of soldiers with more than one medal
select distinct msn,name,rank from soldier,regiment where msn in (select soldier_msn from medal group by soldier_msn having count(*)>1);

--  simple: weapon name and type where number of weapon units is greater than 500
select weapon_name,weapon_type from weapons where no_of_units>500;


-- simple dependents of soldiers who have fought in wars 
select msn,name,dependent_name,warname from soldier,regiment,war,dependents where soldier.msn = regiment.s_msn and war.reg_code = regiment.regiment_code and soldier.msn=dependents.msn_of_sol;


-- simple: min and max weight and height
select min(height),min(weight),max(height),max(weight) from soldier;

--nested complex All regiment name and weapon name where number of weapons > 500
select rname,weapon_name from regiment,weapons,inventory where(  select weapons.no_of_units > 500 ) and weapons.inv_id = inventory.inventory_id and inventory.regimentcode = regiment.regiment_code;

-- education of soldiers who have more than one medal
select distinct msn,name,major,school from soldier,regiment,education where msn in (select soldier_msn from medal group by soldier_msn having count(*)>1) and soldier.msn = education.s_id;

-- regiment and war name and location for wars that have taken place before the year 2000 
select rname,district,state from location,war,regiment where regiment.regiment_code in (select reg_code from war where war.startdate < '01-01-2000' )and regiment.regiment_code = war.reg_code and location.war_name = war.warname;

