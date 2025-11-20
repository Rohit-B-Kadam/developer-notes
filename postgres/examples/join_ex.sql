-- Users that have >16 bookmarks
SELECT * FROM users WHERE users.id IN (SELECT user_id FROM bookmarks GROUP BY user_id HAVING count(*) > 16);


SELECT count(*), user_id FROM bookmarks GROUP BY user_id HAVING count(*) > 16;


SELECT id, first_name, count FROM users JOIN LATERAL (SELECT count(*), user_id FROM bookmarks WHERE user_id = users.id GROUP BY user_id HAVING count(*) > 16) as bookmarks on true limit 10;


SELECT id, first_name, count FROM users JOIN  (	
	SELECT count(*), user_id FROM bookmarks 
	GROUP BY user_id HAVING count(*) > 16
) as whales  
on users.id = whales.user_id 
ORDER BY count desc limit 10;