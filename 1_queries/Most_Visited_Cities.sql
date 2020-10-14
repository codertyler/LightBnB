select properties.city, count(reservations) as total_reservations 
from reservations 
join properties on reservations.property_id = properties.id
group by city
order by total_reservations desc;