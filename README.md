# Movie Search App

A modern React application for searching and exploring movies using the OMDb API. Built with TypeScript, Material-UI, and Redux Toolkit.

## 🌟 Features

- **Search Movies**: Search for movies, series, and episodes
- **Advanced Filtering**: Filter by year and type
- **Responsive Design**: Works on both desktop and mobile devices
- **Dark/Light Mode**: Toggle between dark and light themes
- **Grid/Table View**: Switch between different view modes
- **Pagination**: Browse through search results efficiently
- **Detailed Movie Info**: View comprehensive information about each movie
- **Persistent Settings**: Saves theme preference and view settings

## 🛠️ Technologies

- React 18
- TypeScript
- Material-UI (MUI)
- Redux Toolkit
- React Router v6
- Axios
- Lodash
- Vite

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/serkan-uslu/frontend-case.git
cd frontend-case
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your OMDb API key:

```bash
VITE_OMDB_API_KEY=your_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173` to see the app in action.



## 🎯 Usage

1. **Search**: Enter at least 3 characters in the search bar
2. **Filter**: Use the year and type filters to refine results
3. **View**: Toggle between grid and table views
4. **Theme**: Switch between dark and light modes
5. **Details**: Click on any movie to view detailed information

## 📱 Responsive Design

- Mobile-first approach
- Adaptive layout for different screen sizes
- Touch-friendly interface
- Bottom navigation for mobile devices

## 🔍 Search Features

- Debounced search
- Minimum 3 characters required
- Year filter (1888-present)
- Type filter (movie/series/episode)
- Items per page selection

## 🎨 UI/UX Features

- Loading skeletons
- Empty state messages
- Error handling
- Smooth transitions
- Responsive images
- Back to top button

## 🔧 Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier

### Project Structure

src/
├── components/ # Reusable components
├── config/ # Configuration files
├── hooks/ # Custom hooks
├── pages/ # Page components
├── store/ # Redux store and slices
├── types/ # TypeScript types
└── utils/ # Utility functions


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OMDb API](http://www.omdbapi.com/) for providing movie data
- [Material-UI](https://mui.com/) for the component library
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [Vite](https://vitejs.dev/) for the build tool
- [Prettier](https://prettier.io/) for code formatting
- [ESLint](https://eslint.org/) for code linting
- [Husky](https://typicode.github.io/husky/#/) for git hooks
