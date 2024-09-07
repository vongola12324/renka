# RenKa

RenKa is a song practice app that allows users to view lyrics synchronized with YouTube videos. Practice your favorite songs and improve your singing skills with RenKa!

> **Note**: This project was created with the assistance of AI, specifically using the Claude 3.5 Sonnet model from Anthropic, in conjunction with the ChatGPT Code Interpreter.

## Features

- Search and browse a collection of songs
- View synchronized lyrics while watching YouTube videos
- Dark mode support
- Responsive design for desktop and mobile devices

## Getting Started

... (rest of the README content) ...

## How to Add Songs

To add new songs to RenKa, follow these steps:

1. Update the `public/songs.json` file:
   - Add a new entry with the song's `videoId`, `title`, and `artist`.
   - Example:
     ```json
     {
       "videoId": "dQw4w9WgXcQ",
       "title": "Never Gonna Give You Up",
       "artist": "Rick Astley"
     }
     ```

2. Create a new JSON file for the song's lyrics:
   - Name the file `[videoId].json` (e.g., `dQw4w9WgXcQ.json`).
   - Place it in the `public/lyrics/` directory.
   - Use the following format for the lyrics:
     ```json
     {
       "references": [
         {
           "url": "https://example.com/source-of-lyrics",
           "description": "Original lyrics"
         },
         {
           "url": "https://example.com/translation",
           "description": "English translation"
         }
       ],
       "lyrics": [
         {
           "time": {"minutes": 0, "seconds": 32, "length": 3},
           "text": "Never gonna give you up",
           "furigana": [] // Leave empty if not applicable
         },
         // ... more lyrics ...
       ]
     }
     ```

3. Ensure the YouTube video is available and not region-locked.

4. Rebuild and redeploy the app to include the new song.

**Important Notice:**
- If the lyrics are not originally written by you, you MUST include a `reference` field with a link to the source of the lyrics.
- Ensure you have the right to use and display the lyrics. Respect copyright laws and obtain necessary permissions.
- This project is for educational purposes only. Do not use copyrighted material without proper authorization.

Note: Adding lyrics without proper attribution or permission may lead to copyright infringement. Always err on the side of caution and provide proper credit to the original sources.

## How to Deploy

RenKa is set up with GitHub Actions for automatic deployment to GitHub Pages.

1. Push your changes to the `master` branch.
2. GitHub Actions will automatically build and deploy your app to the `gh-pages` branch.
3. Your app will be live at `https://your-username.github.io/renka/`

For manual deployment, you can still follow these steps:

1. Ensure you have Node.js and npm installed on your system.

2. Clone the repository:
   ```bash
   git clone https://github.com/your-username/renka.git
   cd renka
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Build the project:
   ```bash
   npm run build
   ```

5. Deploy to GitHub Pages:
   - Make sure you have the `push-dir` package installed (it should be in the devDependencies).
   - Run the deploy script:
     ```bash
     npm run deploy
     ```
   - This will build the app and push it to the `gh-pages` branch of your repository.

6. Configure GitHub Pages:
   - Go to your repository on GitHub.
   - Navigate to Settings > Pages.
   - Under "Source", select the `gh-pages` branch.
   - Save the changes.

7. Your app should now be live at `https://your-username.github.io/renka/`

Note: If you're deploying to a different platform, you may need to adjust the base URL in your `nuxt.config.ts`:

## Contributing

Contributions to RenKa are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.