E-Commerce Platform
Project Overview
This is a React-based e-commerce platform where users can:

View a list of products from an API.
Add or remove items from the shopping cart.
Modify the quantity of cart items.
View a detailed summary with a price breakdown, discount, and total amount.
Receive visual notifications for cart actions.
Features
Product Listing: Fetches product data from FakeStore API and displays it.
Search: Allows users to search for products by title.
Cart Management: Users can add products to the cart, adjust quantities, and remove items.
Notifications: Visual notifications pop up when cart actions are performed.
Cart Summary: Shows total price, coupon discount, platform fee, shipping charges, and final amount.

Project Structure
gdgc/
│
├── public/              # Public assets
├── src/                 # Source code folder
│   ├── assets/          # Static images, icons, etc.
│   ├── components/      # React components
│   │   ├── Cart.css     # Cart component styling
│   │   └── Cart.jsx     # Cart functionality component
│   ├── App.jsx          # Main app component
│   ├── App.css          # Global styles
│   ├── index.css        # Index page CSS
│   └── main.jsx         # Application entry point
├── .gitignore           # Git ignore rules
├── eslint.config.js     # ESLint configuration
├── index.html           # Main HTML file
├── package.json         # Dependencies and scripts
├── package-lock.json    # Dependency lock file
└── vite.config.js       # Vite configuration
Installation and Setup
Prerequisites
Ensure you have the following:

Node.js: You can download it from here.
Steps to Run the Project
Clone the repository:
git clone <repository-url>
cd REACT-HW
Install dependencies
npm install

Run the application:

bash
Copy code
npm run dev
This starts the Vite development server. The app should be accessible at http://localhost:3000.

Component Breakdown
Cart Component (Cart.jsx)
State Management: Uses useState for managing products, cart items, and notifications.
API Call: Axios is used to fetch product data.
Functions: Add, remove, and adjust product quantities in the cart.
Summary Calculation: MRP, discount, total amount.
Visual Notifications: For cart actions (add/remove items).
Styling (Cart.css)
Dark Theme: Modern and minimal look with #121212 background.
Responsive: CSS Grid adjusts layout for screen size.
Animations: Notifications use keyframe animations for fade-in and fade-out effects.
Notification System
Displays a message when items are added/removed from the cart. The notification disappears after 3 seconds.

Cart Summary
Total MRP: Sum of all item prices in the cart.
Coupon Discount: Flat ₹100 discount on the total MRP.
Platform Fee: Fixed fee of ₹30.
Shipping Charges: Flat ₹10 charge.
Total Payable: Final amount after discount, platform fee, and shipping charges.
Future Enhancements
User Authentication: Add login functionality to save cart data.
Persistent Cart: Use localStorage to retain cart data on refresh.
Improved Responsiveness: Enhance for mobile and tablet devices.
Discount Coupons: Let users apply discount codes.
Contributing
To contribute to this project:

Fork the repository.
Create a new feature branch.
Commit your changes.
Push the branch.
Open a pull request.