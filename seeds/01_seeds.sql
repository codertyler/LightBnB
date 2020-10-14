INSERT INTO users (name, email, password)
VALUES ('Tyler Shandro', 'shandro@ahs.ca', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Harper PM', 'former@pm.ca', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Brother Al', 'broal@cpa.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (
owner_id, 
title, 
description, 
thumbnail_photo_url, 
cover_photo_url, 
cost_per_night, 
parking_spaces, 
number_of_bathrooms, 
number_of_bedrooms, 
country, 
street, 
city, 
province, 
post_code,
active)
VALUES (
1, 
'description', 
'nice house',
'https://novarearchitecture.co.nz/wp-content/uploads/2015/02/Childs-House-Thumbnail.jpg', 
'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS6FiGTkUWxT7D4PQbROEzAraK5rG4-cyvf4g&usqp=CAU',
930,
6,
4,
8, 
'Canada', 
'44 Tyler Way', 
'Bombay',
'Quebec',
'1234',
true),
(2,'so so house', 'description', 'https://novarearchitecture.co.nz/wp-content/uploads/2015/02/Childs-House-Thumbnail.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS6FiGTkUWxT7D4PQbROEzAraK5rG4-cyvf4g&usqp=CAU', 
930, 6,4,8, 'Canada', '45 Asa Way', 'NYC','Ontario','23243', true),
(3, 'awesome house','description', 'https://novarearchitecture.co.nz/wp-content/uploads/2015/02/Childs-House-Thumbnail.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS6FiGTkUWxT7D4PQbROEzAraK5rG4-cyvf4g&usqp=CAU', 
930, 6,4,8, 'Canada', '44 HellWay', 'Kenney','Alberta','9911',true);

INSERT INTO reservations(start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11', '2018-09-15', 1, 1),
('2019-03-22', '2019-04-01',2,2),
('2020-05-20', '2020-05-31', 3,3);


INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1,1,1,5, 'messages'),
(2,2,2,4,'messages'),
(3,3,3,3,'messages');
