# Innovasoft Client Management Application

This project is a client management application built with React and TypeScript. It allows users to create, read, update, and delete client information, as well as manage associated interests.

## Features

- **Client Management**: Create, edit, and delete clients.
- **Interest Management**: Manage interests associated with clients.
- **Responsive Design**: The application is designed to be responsive and user-friendly.
- **API Integration**: Communicates with a backend API for data persistence.

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

- Node.js (v14 or later)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   ```

2. Navigate to the project directory:
   ```bash
   cd your-repo-name
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application

In the project directory, you can run:

#### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `npm test`

Launches the test runner in interactive watch mode.

#### `npm run build`

Builds the app for production to the `build` folder.

## Project Structure

```
src/
  ├── components/     # Reusable components
  ├── contexts/      # React Context providers
  ├── services/      # API services and other business logic
  ├── hooks/         # Custom React hooks
  ├── utils/         # Utility functions and helpers
  ├── assets/        # Static assets (images, fonts, etc.)
  ├── pages/         # Page components
  ├── App.tsx        # Main App component
  └── index.tsx      # Application entry point
```

## Dependencies

- React v17
- Material-UI
- React Router DOM
- Axios for API requests

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
