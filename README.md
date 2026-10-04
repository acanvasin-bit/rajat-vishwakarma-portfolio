# Rajat Vishwakarma — Portfolio

A responsive, static portfolio site. GitHub Pages can host it for free and publish updates automatically when this repository's `main` branch changes. On GitHub Free, the repository must be public, and the website itself is public.

## Publish with GitHub Pages

1. Create a **public** GitHub repository for the site and upload these files.
2. Open the repository's **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Choose the `main` branch and the `/ (root)` folder, then save.
5. GitHub will show the website URL on that same Pages settings screen after the first publish.

## Update the site later

For normal text, video links, client links, and gallery captions, edit **`portfolio-content.js`**. That file has the portfolio information grouped into `profile`, `projects`, `frames`, and `clients`.

On GitHub, open `portfolio-content.js`, select the pencil icon, make the edits, and choose **Commit changes**. GitHub Pages publishes the change automatically, usually within a few minutes.

To add a project or client, copy a nearby item in the matching list and replace its title, description, and links. Keep commas between list items. A project can use a YouTube thumbnail for its `image`, or one of the graphic Instagram poster styles already in the file.

To add a gallery photo, upload a JPG or PNG into `assets/frames/`, then add an item to the `frames` list in `portfolio-content.js` with its path, alt text, and caption. To change the appearance, edit `style.css`; to change the page structure, edit `index.html`.

The site is plain HTML, CSS, and JavaScript, so it has no build step or paid service requirement.
