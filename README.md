# Movie App - Next.js, typescript, tailwind css Project

This is a Next.js-based application that fetches and displays movie data, allowing users to add movies to their wishlist and manage favorites. The app uses state management and various components to handle data fetching, UI rendering, and user interaction.

## Project Setup

### 1. Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/your-username/movie-app.git
cd movie-app
```
### 2. install Npm 
```bash
npm install

```
### 3. Setup Environment Variables

For accessing movie data, this project uses the [The Movie Database API](https://developer.themoviedb.org/reference/intro/getting-started). You can get started by checking out their [API documentation](https://developer.themoviedb.org/reference/intro/getting-started).

```bash
NEXT_PUBLIC_API_TOKEN=https://api.example.com  # Example API URL

```
### 4. Folder Structure
```bash

├── app/                    # Main app directory for pages and components
│   ├── components/         # Shared UI components like `Card`, `Search`, `Fave`, etc.
│   │   ├── Card.tsx        # Displays movie cards
│   │   ├── Search.tsx      # Search input for querying movies
│   │   ├── Fave.tsx        # Displays favorite movies
│   │   └── SkeletonCard.tsx # Skeleton loader for lazy-loaded components
│   ├── pages/              # Pages in the app
│   │   ├── wishlist.tsx    # Wishlist page
│   │   ├── slug/           # Home page or other specific pages
│   │   │   └── page.tsx
│   │   ├── Wishlist/       # Another folder for a Wishlist-specific page
│   │   │   └── page.tsx
│   ├── store.tsx              # Store for state management (e.g., Zustand)

```

### 5. Run the development
```bash
npm run dev

```

# Project Design Choices

## 1. **Suspense & Lazy Loading**
   - **Suspense:** Used for lazy loading components like `Fave` with `Suspense` wrapped around it to improve performance and user experience by only loading components when needed.
   - **Skeleton Loader:** `SkeletonCard.tsx` is used to provide a loading state, enhancing UX when movie data is being fetched asynchronously, making the UI feel responsive.

## 2. **Routing & Page Structure**
   - **File-Based Routing:** Pages are organized under the `pages/` directory following Next.js conventions for automatic routing.
   - **Dynamic Routing:** Dynamic pages like `slug/` and `wishlist.tsx` enable route-based content changes. This structure supports easy scaling as new pages or dynamic routes are added.

## 3. **Search & Filtering with `useSearchParams`**
   - **Search Handling:** The `Home` component uses `searchParams` to access the query string for filtering movie results.
   - **Dynamic Filtering:** `Card.tsx` filters movies based on the query param, ensuring the movie list updates dynamically based on user input.








    