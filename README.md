# MovieApi
A project for handling different-different Api request to fecth Movie from database in many ways.
1. Connect with MongoDB
 2. Create a POST api to save a movie into database. POST /add-movie 
3. Create a GET api to fetch all the movies stores in the database. GET /get-all
 4. Create a GET api in which we will send movie id in query param and from backend only single movie having same movie id will be fetched. GET /get-single?id={id}
 5. Create a GET api to fetch movies using pagination. GET /get-paginated?page={page}&size={size} 
Example: page=1 size=10 [ Fetch first 10 Records From Collection] page=2 size=10
 [ Skip first (page-1)*size records and fetch next 10 records. page =5 size=5 [Skip first 25 records and fetch next 5 records]
