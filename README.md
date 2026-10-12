# React + Vite

## Registration API

Registration is saved by the Express API to the MongoDB `Myweb.users` collection. The API stores a bcrypt password hash and does not store the confirm-password value.

1. Copy `server/.env.example` to `server/.env`.
2. Set `MONGO_URI` in `server/.env` to your MongoDB connection string. Keep this file private; it is ignored by Git.
3. In one terminal, run `npm run server` from this project directory.
4. In another terminal, run `npm run dev` and submit the registration form.

The API listens on port `5001` by default. For deployment, host the API separately, set `VITE_API_BASE_URL` to its public HTTPS URL when building the frontend, and set `FRONTEND_ORIGINS` on the API to the frontend's origin.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
You can also try [the experimental native React Compiler support in plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#rust-react-compiler) by using `compiler: true` in the plugin options instead of using the Babel plugin.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
