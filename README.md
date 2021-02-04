# find-a-movie
An embedded screenshot of the app

![start page](/images/whattowatchstartpage.png)

![result page](/images/whattowatchresultpage.png)

List of the Technologies used
- Javascript
- HTML
- CSS
- API (http://www.omdbapi.com/)
- favicon generator
- button genertor

Your User stories – who are your users, what do they want and why?

My webpage will let users find movies/shows that they want to watch.
Features that will be available will be searching by a movie/show name or by keyword and associated titles will appear in a list of 10 with click for more to load more results

I would also like to include a function that when the user clicks on the title, they will be able to also view additional information about the movie (such as genre,runtime, year, actors and summary)

"As a user, I want to be able to look up a movie/show, so that I can learn more about the movie/show before I watch it"


Your Wireframes – sketches of major views / interfaces in your application
![wireframe start page](/images/wireframestart.png)

![wireframe start page](/images/wireframeresult.png)


Descriptions of any Unsolved problems or major hurdles you had to overcome

One of the major hurdles that were faced in the making of the project was implementing the click for more option. At first I had started to nest fetches within each other and hard coding the page numbers but as I was doing it I recognized that it is not DRY code and that there has to be a way to  make this simplier and more dynamic. I started looking at my code and saw that only the pagenumber was different from the rest and set a pageNumber variable and incremented it each time the button was pressed. 

![load more](/images/loadmorecode.png)

Other hurdles were resetting the page after each search which I was able to complete with adding a clear function and implementing that before each fetch so the page is cleaned/resetted before adding more data.

![clear function](/images/clearfunction.png)

A current unsolved problem is the API Key. 