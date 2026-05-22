# Look Who's Talking
 
A web app for tracking and visualizing speaking time distribution in mixed-gendered gender conversations and meetings.
 
Built by [Ylva Kodar](https://github.com/ylvakodar)

## Features
- Track speaking time per gender (women, nonbinary, men)
- Visualize speaking time distribution in pie charts
- Works without login, using local storage
- Logged-in users can save meeting history to a database
- Organize meetings by group (e.g. "The Board", "Sales Team")
- Customizable color themes for gender buttons
## Tech Stack
 
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Auth:** Better Auth
- **ORM:** Prisma
- **Database:** PostgreSQL (Neon)
- **Hosting:** Vercel
- **Charts:** Chart.js / react-chartjs-2
 
## Usage
 
### Without an account
1. Click **New meeting** on the start screen
2. Fill in meeting name and participant count per gender
3. Use the gender buttons to track who is speaking
4. Click **End meeting** to see statistics
### With an account
Same as above, plus:
- Optionally assign the meeting to a group
- Meeting statistics are saved to your account
- View historical statistics
 
 
© 2025 Ylva Kodar
