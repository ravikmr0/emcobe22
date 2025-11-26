# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Contact API & Email configuration

This project includes a serverless contact API at `/api/contact` which sends emails using `nodemailer`.

- Production (recommended): set the environment variables `MAIL` and `MAIL_APP_PASSWORD` (or `Mail` / `Mail_App_Password`) in your hosting provider (e.g., Vercel). For Gmail, create an App Password and use it as `MAIL_APP_PASSWORD`.
- If env vars are not set, the API will automatically create a Nodemailer Ethereal test account (for local development) and return a `previewUrl` in the response so you can view the generated email in your browser.

Quick test (local dev using Vite):

```powershell
curl -X POST "http://localhost:5173/api/contact" -H "Content-Type: application/json" -d '{"firstName":"Alice","lastName":"Smith","email":"alice@example.com","message":"Hello from test"}'
```

If you use the Ethereal test account, the response JSON will include a `previewUrl` you can open to view the message.

In production, always set the `MAIL` and `MAIL_APP_PASSWORD` env vars and ensure the account allows programmatic SMTP access (for Gmail use App Password).
