![Foxy](src/assets/prosperatitle.png) 
# Prospero (AI-Powered Financial Educational App for Low-Income Immigrants)

## Vision
After our team experienced firsthand how financial literacy impacted some of our immigrant parents, we wanted to help other immigrant families with limited resources feel empowered to start their financial journey correctly while balancing the challenges of adjusting to a new place. With Prospera, we made it easier by avoiding overwhelming statistics and instead using Foxy, a friendly avatar that visually represents their financial status. By analyzing income, spending, and dependents, Prospera provides personalized scores, actionable tips, and guidance to help users improve their financial habits and boost their FICO scores.


## Challenges
During the development of Prospera, we encountered several challenges that required collaboration and problem-solving.

Merge Conflicts: One significant hurdle was dealing with merge conflicts, as multiple team members were simultaneously editing the header and financial calculator page. This required careful coordination to resolve overlapping edits and ensure a smooth integration of everyone’s contributions.

OpenAI Integration: Integrating OpenAI into our code presented difficulties, particularly with accessing the API key. This issue prevented Foxy from successfully scraping user-provided information for personalized financial guidance, necessitating extensive debugging to resolve.

Scoring Mechanism Development: We also faced challenges in creating our own measuring score for financial health. This sparked debates about how to effectively scale specific information and data in our calculations. We had to ensure that our scoring mechanism fairly represented users’ financial situations while remaining relevant and actionable. This involved discussions on normalizing household income, spending, and household size without introducing bias, as well as determining appropriate weights for each component of the score.

Through collaboration and persistence, we were able to overcome these challenges and create a robust platform that effectively serves our target audience.

## Misc
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
