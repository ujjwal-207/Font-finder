# Font Finder

Font Finder is a powerful web application that helps you identify fonts from images and text using Google's Gemini AI API. Whether you've seen a beautiful typeface in an advertisement, on a website, or in a document, Font Finder can help you discover what font it is.

## Features

- **Dual Input Methods**: Upload images or input text to identify fonts
- **AI-Powered Analysis**: Leverages Google's Gemini 1.5 Flash model for accurate font detection
- **Detailed Results**: Provides font names, confidence scores, and style properties
- **User-Friendly Interface**: Clean, responsive design with intuitive controls
- **Modern Tech Stack**: Built with Next.js, React, and Tailwind CSS

## Demo

[Link to live demo](#) (Coming soon)

## Screenshots

![Image Input Mode](fonts\public\fontfinder.png)
_Image analysis mode with drag-and-drop functionality_

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- NPM or Yarn
- Google Gemini API key

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ujjwal-207/Font-finder.git
   cd Font-finder
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with your Gemini API key:

   ```
   GEMINI_API_KEY=your_api_key_here
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

### Text Analysis

1. Select the "Text Input" tab
2. Enter or paste the text sample you want to analyze
3. Click "Detect Font"
4. View the list of detected fonts with confidence scores

### Image Analysis

1. Select the "Image Input" tab
2. Upload an image by:
   - Dragging and dropping an image file
   - Clicking to select a file from your device
   - Pasting an image from clipboard (Ctrl+V / Cmd+V)
3. Click "Detect Font"
4. View the list of detected fonts with confidence scores

## How It Works

Font Finder uses Google's Gemini 1.5 Flash model, a multimodal AI capable of analyzing both text and images. The application sends your input to the Gemini API with carefully crafted prompts that instruct the AI to identify fonts and provide structured data about them.

For images, the application:

1. Converts the image to base64 format
2. Sends it to the Gemini API along with a specialized prompt
3. Processes the JSON response to display the results

For text, the application:

1. Sends the text content to the Gemini API with a font analysis prompt
2. Processes the JSON response to display the results

## Deployment

This application can be easily deployed to platforms like Vercel or Netlify:

### Deploying to Vercel

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Configure the environment variable for your Gemini API key
4. Deploy

## Technologies Used

- **Frontend**: React, Tailwind CSS, Lucide Icons
- **Backend**: Next.js API routes
- **AI**: Google Gemini 1.5 Flash API
- **State Management**: React Hooks
- **File Handling**: react-dropzone

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Gemini for providing the AI capabilities
- Next.js team for the amazing framework
- All contributors and users of Font Finder

## Contact

Ujjwal - [GitHub Profile](https://github.com/ujjwal-207)

Project Link: [https://github.com/ujjwal-207/Font-finder](https://github.com/ujjwal-207/Font-finder)
