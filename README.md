# J. Tosta - Website for Psicologa Jaqueline Tosta

This is a Next.js web application built for Psicologa Jaqueline Tosta, hosted and integrated with Firebase.

## Features

*   **Homepage:** Hero section, Bio, Services overview, and Call-to-Action.
*   **About Page:** Detailed background and therapeutic approach.
*   **Blog:** List of articles (Placeholder). Individual article view (Placeholder).
    *   *Future:* Comment system for authenticated users.
*   **Contact Page:** WhatsApp contact button.
    *   *Future:* Email form for authenticated users.
*   **Sticky WhatsApp Button:** Easy access to contact via WhatsApp.
*   **Firebase Integration:** Planned for authentication, Firestore (for blog/comments), and Hosting.
*   **Styling:** Tailwind CSS with shadcn/ui components, following the specified color theme (Soft Blue, Light Green, Muted Orange).
*   **Mobile-First Design:** Responsive layout optimized for all screen sizes.

## Getting Started

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm or yarn
*   A Firebase project set up.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd j-tosta-website # Assuming the repo folder name might change
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Firebase Setup

1.  **Create a Firebase Project:** Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2.  **Enable Firebase Services:**
    *   **Authentication:** Enable Google Sign-In (and potentially Email/Password if needed later).
    *   **Firestore Database:** Create a Firestore database in production mode. Set up security rules appropriately (e.g., allow public reads for blog posts, authenticated writes for comments).
    *   **Hosting:** Set up Firebase Hosting. You might connect your custom domain (`jstosta.com`) here later.
3.  **Get Firebase Config:**
    *   In your Firebase project settings, go to "Project settings" > "General" tab.
    *   Scroll down to "Your apps" and click the Web icon (`</>`) to register a new web app.
    *   Copy the `firebaseConfig` object.
4.  **Environment Variables:**
    *   Create a `.env.local` file in the root of your project.
    *   Add your Firebase configuration keys to this file, prefixed with `NEXT_PUBLIC_`:
        ```
        NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
        NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
        NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
        # Add NEXT_PUBLIC_MEASUREMENT_ID if you use Google Analytics
        # NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
        ```
    *   **Important:** Add `.env.local` to your `.gitignore` file to prevent committing sensitive keys.
5.  **Initialize Firebase in the App:**
    *   Create a Firebase initialization file (e.g., `src/lib/firebase/config.ts`).
    *   Import `initializeApp` from `firebase/app` and use the environment variables to configure Firebase. (You'll need to implement this part based on the specific Firebase features you use).

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:9002](http://localhost:9002) (or your specified port) with your browser to see the result.

### Building for Production

```bash
npm run build
# or
yarn build
```

This will create an optimized production build in the `.next` folder.

### Deployment (Firebase Hosting)

1.  **Install Firebase CLI:**
    ```bash
    npm install -g firebase-tools
    ```
2.  **Login to Firebase:**
    ```bash
    firebase login
    ```
3.  **Initialize Firebase in your project (if not already done):**
    ```bash
    firebase init hosting
    ```
    *   Select your Firebase project.
    *   Configure hosting options:
        *   **Public directory:** `.next` (This might need adjustment depending on Next.js version and static export settings, but often Firebase handles Next.js deployments automatically with the right framework detection). Consult Firebase Hosting docs for Next.js. Usually, you might just point to the root or let Firebase detect it. For dynamic Next.js apps, the setup is slightly different than just a static site.
        *   **Configure as a single-page app:** No (Firebase handles Next.js routing).
        *   **Set up automatic builds and deploys with GitHub?** Choose based on your preference.
    *   *Note:* Firebase Hosting now has better built-in support for Next.js. Follow the official Firebase guide for deploying Next.js apps for the most up-to-date instructions. You might need `firebase.json` configured for rewrites to `/` if using SSR/ISR.
4.  **Deploy:**
    ```bash
    firebase deploy --only hosting
    ```

## Roadmap (Future Features)

*   User Authentication (Google Sign-In via Firebase Auth).
*   Blog comment system (using Firestore for storage, requiring authentication).
*   Authenticated contact form (to prevent spam).
*   Potential scheduling system.
*   Potential Stripe integration for payments.
*   Admin dashboard (if necessary).

## Customization

*   **Colors:** Modify the HSL variables in `src/app/globals.css`.
*   **Content:** Update text, images, and links directly in the page components (`src/app/**/*.tsx`).
*   **WhatsApp Number:** Change the phone number in `src/components/whatsapp-button.tsx` and relevant links.
*   **Domain:** Update `sitemap.xml` and `robots.txt` generation, and configure the custom domain in Firebase Hosting.

*   **Firestore Database Setup for Blog Posts:**
    *   In the Firebase Console, create a Firestore database.
    *   Define a collection (e.g., "blogPosts") to store your blog post data. Each document in this collection will represent a single blog post.
    *   Fields for each blog post document should include: `title`, `content`, `author`, `date`, `imageUrl`, `imageHint`, and potentially a `comments` subcollection.
    *   **Security Rules:** Configure Firestore security rules to allow read access for everyone but restrict write access to authenticated users (e.g., the admin).

*   **Updating the App to Fetch Blog Data:**
    *   Modify `src/app/blog/page.tsx` to fetch blog post data from Firestore instead of using the placeholder data (`allBlogPosts`).
    *   Use the Firebase SDK (`firebase/firestore`) to query the "blogPosts" collection.
    *   Map the Firestore documents to your existing blog post data structure.
    *   Handle loading states and potential errors when fetching data.
    *   Modify `src/app/blog/[id]/page.tsx` to fetch individual blog post data from Firestore based on the `id` parameter.
    *   Update `src/app/sitemap.xml/route.ts` to dynamically generate sitemap entries from your Firestore blog posts.

*   **Admin Interface (Future):**
    *   To allow your client to easily manage blog content, you'll need to create an admin interface.
    *   This interface would allow them to create, edit, and delete blog posts in the Firestore database.
    *   Consider using a library like React Hook Form for form management and Firebase Authentication for securing the admin area.


## Rollout and Deployment

### Initiating a Rollout

A "rollout" refers to the process of deploying updates to the live version of the website. This ensures that the latest changes are accessible to users. Below are the detailed steps to create and complete a rollout:

#### From VS Code or Similar Environments

**Step 1: Development and Testing**

   -   **Code Updates:** Make necessary changes to the website's codebase, such as fixing bugs, adding new features, or modifying content.
   -   **Local Testing:** Thoroughly test all changes on your local development server (using `npm run dev` or `yarn dev`) to ensure everything functions as expected.
   -   **Commit Changes:** Once satisfied, commit the changes to your Git repository using `git commit -m "Your commit message"`.

**Step 2: Building for Production**

   -   **Production Build:** Run the build command to prepare your code for deployment:

```