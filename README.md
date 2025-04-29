# Book Reading Tracker

A simple and elegant web application to track your reading progress. Built with Vue 3 and the Composition API.

## Features

- 📚 Add books with title, author, page count, and reading status
- 🔍 Search and filter books by title, author, and reading status
- ⭐ Mark books as favorites
- 🌓 Dark mode support
- 💾 Data persistence using localStorage
- 📱 Responsive design for all devices
- 🧪 Unit tests for core functionality

## Project Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run unit tests
npm run test

# Build for production
npm run build
```

## Technical Stack

- Vue 3 with Composition API
- Vite for build tooling
- SCSS for styling
- VueUse for composables
- Vitest for testing

## Project Structure

```
src/
├── components/         # Vue components
├── composables/        # Reusable composition functions
├── assets/            # Static assets
└── __tests__/         # Unit tests
```

## Features in Detail

### Book Management

- Add new books with required title and optional details
- Update reading status (To Read, Reading, Completed)
- Delete books from your list
- Track total pages

### Search and Filter

- Search books by title or author
- Filter by reading status
- Show only favorite books
- View reading statistics

### User Experience

- Dark/Light mode toggle
- Responsive design for mobile and desktop
- Form validation
- Persistent storage
- Clean and intuitive interface

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT
