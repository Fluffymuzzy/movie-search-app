# Movie Search App
This is a simple movie search application built with Next.js and the OMDB API. It allows users to search for movies by title and displays a list of matching movies with basic information about each one. When a user clicks on a movie from the list, they are taken to a details page that displays more information about that movie, such as plot, actors, and ratings.

The application was built using TypeScript, Next.js, Tailwind CSS, and Redux for state management. It also implements pagination for search results and allows users to save their favorite movies.
## Getting Started
To get started, clone the repository and install the dependencies:
>>>git clone https://github.com/your-username/movie-search-app.git
cd movie-search-app
npm install 

Before running the application, you will need to obtain an OMDB API key from http://www.omdbapi.com/. Once you have your API key, create a .env.local file in the root of the project and add your API key or add your api key in next config as follows:
>>>module.exports = {
  nextConfig,
  env: {
    api_key: "YOUR_API_KEY",
  },
  }
  
  To start the development server, run:
  >>> npm run dev OR yarn run dev
 
  Open http://localhost:3000 in your browser to see the application.
  ## Features
  ### Search Bar
  The search bar allows users to search for movies by title. As the user types their search query, the application makes requests to the OMDB API and displays matching movies in real-time.
 ### Movie List
  The movie list displays a list of matching movies with basic information such as title, year of release, and poster image. Users can click on a movie to view more information about it.
### Movie Details
  The movie details page displays more information about a selected movie, such as plot, actors, and ratings.
### Pagination
The movie list is paginated, allowing users to navigate through multiple pages of search results.
### Favorite Movies
Users can save their favorite movies by clicking on the heart icon next to a movie. The list of favorite movies is stored in the browser's local storage and is displayed on a separate page.
### Adaptive Design
The application is designed to be responsive and adapts to different screen sizes.

### Credits
This application was created by Fluffymuzzy as a coding exercise. The OMDB API was used to fetch movie data. The following libraries and frameworks were used:

Next.js
React
TypeScript
Tailwind CSS
Redux Toolkit
Axios
React Icons